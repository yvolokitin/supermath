function checkPrecondition(retriesCount)
{
  if (modelSupports("CCARD")) {
     var retries = retriesCount || 1;
     try {
        var dataModel = toi.diagnosticsService.createDataModelInstance(
       toi.diagnosticsService.DATA_MODEL_ARRIS_STB);
        var hostCCPairInfo = dataModel.getObject(HOSTCCPAIR);
        if (hostCCPairInfo.parameters) {
           for (var i = 0; i < hostCCPairInfo.parameters.length; i++) {
              if (hostCCPairInfo.parameters[i].name == CABLECARDINSERTED &&
                 hostCCPairInfo.parameters[i].value != "YES") {
                 releaseToiInstance(dataModel);
                 return CC_STATUS.CC_NOT_INSERTED;
              }
              else if (hostCCPairInfo.parameters[i].name == VALIDATIONSTATUS &&
                 hostCCPairInfo.parameters[i].value != "Valid") {
                 logmsg("Your cable card is not validated. Trying to validate...");
                 var CCInfo = dataModel.getObject(CABLECARD);
                 releaseToiInstance(dataModel);
                 if (CCInfo.parameters) {
                    for (var j = 0; j < CCInfo.parameters.length; j++) {
                       if (CCInfo.parameters[j].name == UNITADDRESS) {
                          var cableCardUnitAddr = CCInfo.parameters[j].value;
                       }
                    }
                 }
                 var agent = new Zeus(cableCardUnitAddr);
                 agent.askBriareusFor("validate");
                 if (!agent.lastOperationResult) {
                    return CC_STATUS.CC_NOT_VALIDATED;
                 }
                 else if (retries !== 0) {
                    checkPrecondition(retries - 1);
                 }
                 else {
                    return CC_STATUS.CC_NOT_VALIDATED;
                 }
              }
           }
        }
     }
     catch (err) {
        throw new Error("checkPrecondition: " + err);
     }
  }
  return CC_STATUS.OK;
}

function getTunerCount()
{
  try {
    var dataModel = toi.diagnosticsService.createDataModelInstance(toi.diagnosticsService.DATA_MODEL_ARRIS_STB);
    var objectInfo = dataModel.getObject(DIAGGENERAL);
    releaseToiInstance(dataModel);
    if (objectInfo.parameters) {
      for (var i = 0; i < objectInfo.parameters.length; i++) {
        if (objectInfo.parameters[i].name == IBTUNERCOUNT) {
          return objectInfo.parameters[i].value;
        }
      }
    }
    return 0;
  }
  catch (err) {
    throw new Error("getTunerCount: " + err);
  }
}

function getTunerCountByModel()
{
  var model;
  try {
    var infoService = toi.informationService;
    model = infoService.getObject("config.architecture.target").toLowerCase();
  }
  catch (err) {
    throw new Error("getTunerCountByModel: " + err);
  }
  switch (model) {
    case "vms1100":
    case "fms2":
      return 6;
    case "dcx4220":
      return 1;
    default:
      return 0;
  }
}

function modelSupports(capability)
{
  var capabilities = JSON.parse(CAPABILITIES.replace(/\s/g, "")
                                            .replace(/\"1\"/g, "true")
                                            .replace(/\"\"/g, "false"));
  var productName = getInformationObject(
    toi.informationService.CONST_HW_PRODUCTNAME).toUpperCase();
  for (hardware in capabilities) {
    if (hardware.match(productName)) {
      return capabilities[hardware][capability];
    }
  }
}

function getTestBehavior(tuners)
{
  if (tuners > 0) {
    return TEST_BEHAVIOR.QAM_SERVER;
  }
  else if (modelSupports("CLIENT-SERVER")) {
    return TEST_BEHAVIOR.QAM_CLIENT;
  }
  else {
    return TEST_BEHAVIOR.OTHER;
  }
}

function isQAMServerBehavior()
{
  return ENV.BEHAVIOR == TEST_BEHAVIOR.QAM_SERVER;
}

function isQAMClientBehavior()
{
  return ENV.BEHAVIOR == TEST_BEHAVIOR.QAM_CLIENT;
}

function isOperaBlink()
{
  if (navigator.userAgent.indexOf('OPR') > -1) {
    return true;
  }
  return false;
}

function initEnv()
{
  // Initialize JSPP plugins for architectures running Opera Blink
  if (isOperaBlink()) {
    window.__JSPP__.InitializePlugins(false);
  }

  try {
    var tuners;
    tuners = getTunerCount();
  }
  catch (err) {
    tuners = getTunerCountByModel();
  }
  finally {
    ENV.BEHAVIOR = getTestBehavior(tuners);
    ENV.TUNERS = tuners;
  }
}

// ***************************************************************************
// EVENTS FOR FAILURE
// ***************************************************************************
var testFailedEvent = document.createEvent("Event");
testFailedEvent.initEvent("testFailed", true, true);

function testFailed(data)
{
  testFailedEvent.data = data;
  document.dispatchEvent(testFailedEvent);
}

function onTestFailed(event)
{
  document.removeEventListener("testFailed", onTestFailed, false);
  printStepResultWithMessage("FAILED", event.data);
  allPassed = false;
  tearDownTest();
  testStep = 99;
  setTimeToNextStep(0, true);
}

document.addEventListener("testFailed", onTestFailed, false);

// ***************************************************************************
// HELPER FUNCTIONS
// ***************************************************************************
function proceedToNextStep() {
  proceedToNextStepByTimeout(0);
}

function proceedToNextStepByTimeout(time) {
  testStep++; setTimeToNextStep(time);
}

function doActionByKey(positiveAction, negativeAction, skipText) {
  var GREEN = "Green";
  var RED = "Red";
  if (!skipText) {
    logmsg("Press " + GREEN.toUpperCase() + " for 'YES', " +
                        RED.toUpperCase() + " for 'NO'");
  }
  var onKeyPressed = function(event) {
    if ((event.keyIdentifier == GREEN) || (event.keyIdentifier == "U+0194")) {
      positiveAction();
    }
    else if ((event.keyIdentifier == RED) || (event.keyIdentifier == "U+0047")) {
      negativeAction();
    }
    else {
      return;
    }
    document.removeEventListener("keydown", onKeyPressed, false);
  };
  document.addEventListener("keydown", onKeyPressed, false);
}

function proceedToNextStepByKey(skipText)
{
  var positiveAction = function() {
    printStepResultWithMessage("PASSED");
    proceedToNextStep();
  };
  var negativeAction = function() {
    printStepResultWithMessage("FAILED");
    allPassed = false;
    proceedToNextStep();
  };
  doActionByKey(positiveAction, negativeAction, skipText);
}

function proceedToNextStepByAnyKey(msg)
{
  msg?logmsg(msg):logmsg("Press ANY key to start");
  var onKeyPressed = function(event) {
    proceedToNextStep();
    document.removeEventListener("keydown", onKeyPressed, false);
  };
  document.addEventListener("keydown", onKeyPressed, false);
}

function askForRestart()
{
  var GREEN = "Green";
  var YELLOW = "Yellow";
  var onKeyPressed = function(event) {
    if ((event.keyIdentifier == YELLOW) || (event.keyIdentifier == "U+0195")) {
      testStep = 0;
      allPassed = true;
      setTimeToNextStep(0);
      logmsg("");
    }
    else if ((event.keyIdentifier == GREEN) || (event.keyIdentifier == "U+0194")) {
      testStep = 99;
      proceedToNextStep();
    }
    else {
      return;
    }
    document.removeEventListener("keydown", onKeyPressed, false);
  };
  logmsg("Press GREEN to continue, YELLOW to restart this testcase.");
  document.addEventListener("keydown", onKeyPressed, false);
}

function startPlayback(channel, player, controller)
{
  var controller = controller || mediaPlayerController;
  var player = player || mediaPlayer;
  return controller.createSession(player, channel);
}

function stopPlayback(sessionId, controller)
{
  var controller = controller || mediaPlayerController;
  var session = sessionId || -1;
  if (session == -1) {
    return controller.tearDown();
  }
  else {
    return controller.disableSession(session);
  }
}
