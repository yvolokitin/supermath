///////////////////////////// GAME CONSTANTS ////////////////////////////
/** @const {number} */
var PASSED_TIME = 4;
/** @const {number} */
var YELLOW_TIME = 9;
/** @const {number} */
var FAILED_TIME = 10;

/** @const {number} */
var TASK_STEPS = 10;

/** @const {number} */
var MAX_TASK_AMOUNT = 70;

/** @const {string} */
var OPERATION_SUM = '+';
/** @const {string} */
var OPERATION_SUB = '-';
/** @const {string} */
var OPERATION_MUL = '*';
/** @const {string} */
var OPERATION_DIV = '/';

/** @const {string} */
var OPERATION_GREATER = '>';
/** @const {string} */
var OPERATION_SMALLER = '<';
/** @const {string} */
var OPERATION_EQUALLY = '=';

///////////////////////////// GLOBAL VARIABLES ////////////////////////////
/** @type {number} */
var step_timeout = 0;
/** @type {number} */
var task_max_timeout = 10;
/** @type {number} */
var timeout_id = 0;
/** @type {number} */
var passed = 0;
/** @type {number} */
var failed = 0;
/** @type {number} */
var yellowed = 0;

// global game options, will be re-defined in run_game() call
var game = {'type': TYPE_MO, // html div id
            'operations': OPERATION_SUM, // math operations
            'digit_numbers': '1,1', // digit numbers
            'argument': 'result', // which field will be hided
            'timeout': task_max_timeout, // timeout for tasks
            'mode': 'test', // game mode: game (for authorized users) VS. test (for unregistered users - from main page)
            'amount': 30}; // task amount

/*
 used to keep all pre-generated tasks and passed/failed answers from user
 the structure of each element (matrix):
    [number_1, operation, number_2, expected result, user result, result color]
     0         1          2         3                4            5

    for example, [1, '+', 2, 3, '', ''] for in-progress/queued tasks
                 [1, '+', 2, 3, 3, 'p'] for passed answers in time (<3 sec)
                 [1, '+', 2, 3, 3, 'y'] for passed answers out of time (>3 sec)
                 [1, '+', 2, 3, 5, 'r'] for failed answers
*/
var tasks = [];

/** @type {number} */
var number_1 = 0;
/** @type {number} */
var operation = 0;
/** @type {number} */
var number_2 = 0;
/** @type {number} */
var result = 0;

/** @type {number} */
var stars_id = 0;
/** @type {number} */
var stars_counter = 0;

/** @type {number} */
var current_task_number = 0;
/** @type {number} */
var current_task = 0;
/** @type {number} */
var time_watcher = -2;
/** @type {string} */
var pressed_user_result = '';

/** @type {boolean} */
var game_started = false;

///////////////////////////// FUNCTIONS ////////////////////////////
/**
 * Hide or show game hero picture
 * Function changes user.set_hero property
 */
function hide_show_hero() {
    if (user.set_hero === 'true') { // hero is visible
        localStorage.setItem('user_set_hero', 'false'); user.set_hero = 'false';
        $('#hero_icon').attr('src', 'img/icon_hero_hide.png'); $('#hero_img').slideUp(700);

    } else { // hero is hidden
        localStorage.setItem('user_set_hero', 'true'); user.set_hero = 'true';
        $('#hero_icon').attr('src', 'img/icon_hero_show.png'); $('#hero_img').slideDown(700);
    }
}

/**
 * Hide or show game keyboard with numbers
 * Function changes user.set_kbrd property
 */
function hide_show_keyboard() {
    if (user.set_kbrd === 'true') { // keyboard is visible
        localStorage.setItem('user_set_kbrd', 'false'); user.set_kbrd = 'false';
        $('#kbrd_icon').attr('src', 'img/icon_keyboard_hide.png');
        $('#keys_wrapper').slideUp(700);

    } else { // keyboard is hidden
        localStorage.setItem('user_set_kbrd', 'true'); user.set_kbrd = 'true';
        $('#kbrd_icon').attr('src', 'img/icon_keyboard_show.png');
        $('#keys_wrapper').slideDown(700);
    }
}

/**
 * Hide or show game keyboard with numbers
 * Function changes user.set_time property
 */
function hide_show_timer() {
    if (user.set_time === 'true') { // hero is visible, hide it
        if (timeout_id !== 0) {
            clearTimeout(timeout_id);
        }

        localStorage.setItem('user_set_time', 'false'); user.set_time = 'false';
        $('#time_icon').attr('src', 'img/icon_timer_hide.png');
        $('#circles').slideUp(700); $('#stars').slideUp(700);
        stars_counter = 0; time_watcher = 0;

        if (time_watcher < 1) {
            continue_game();
        }

    } else { // hero is hidden, make it visible
        localStorage.setItem('user_set_time', 'true'); user.set_time = 'true';
        $('#time_icon').attr('src', 'img/icon_timer_show.png');

        for (var c = 1; c <= TASK_STEPS; c++) {
            $("#circle_" + c).attr('src', 'img/circle_white.png');
        }

        $("#stars_counter_id").html(stars_counter);
        $('#circles').slideDown(700); $('#stars').slideDown(700);
        timeout_id = setTimeout("continue_game()", 100);
    }
}

/**
 * Re-run existed/selected game after finish or page refresh
 */
function rerun_game() {
    // if game was interrapted -> continue_game();
    if (typeof(Storage) !== "undefined") {
        /*
        var game = {'type': TYPE_MO, // html div id
                    'operations': OPERATION_SUM, // math operations
                    'digit_numbers': '1,1', // digit numbers
                    'argument': 'result', // which field will be hided
                    'timeout': task_max_timeout, // timeout for tasks
                    'mode': 'test', // game mode
                    'amount': 30}; // task amount
        */
        var type = localStorage.getItem("game_type");
        if (type === null) {
            alert("rerun_game(), could not read game type");
            return;
        } else if (type.length < 1) {
            alert("rerun_game(), could not detect game type");
            return;
        }

        var operations = localStorage.getItem("game_operations");
        if (operations === null) {
            alert("rerun_game(), could not read game operations");
            return;
        } else if (operations.length < 1) {
            alert("rerun_game(), could not detect game operations");
            return;
        }

        var digit_numbers = localStorage.getItem("game_digit_numbers");
        if (digit_numbers === null) {
            alert("rerun_game(), could not read game digit_numbers");
            return;
        } else if (digit_numbers.length < 1) {
            alert("rerun_game(), could not detect game digit_numbers");
            return;
        }

        var argument = localStorage.getItem("game_argument");
        if (argument === null) {
            alert("rerun_game(), could not read game argument");
            return;
        } else if (argument.length < 1) {
            alert("rerun_game(), could not detect game argument");
            return;
        }

        var timeout = localStorage.getItem("game_timeout");
        if (timeout === null) {
            alert("rerun_game(), could not read game timeout");
            return;
        } else if (timeout.length < 1) {
            alert("rerun_game(), could not detect game timeout");
            return;
        }

        var mode = localStorage.getItem("game_mode");
        if (mode === null) {
            alert("rerun_game(), could not read game mode");
            return;
        } else if (mode.length < 1) {
            alert("rerun_game(), could not detect game mode");
            return;
        }

        var amount = localStorage.getItem("game_amount");
        if (amount === null) {
            alert("rerun_game(), could not read game amount");
            return;
        } else if (amount.length < 1) {
            alert("rerun_game(), could not detect game amount");
            return;
        }

        // run_game(type, operations, digit_numbers, argument, timeout, mode, amount)
        run_game(type, operations, digit_numbers, argument,
                 parseInt(timeout), mode, parseInt(amount));
    } else {
        // No Web Storage support..
        alert('Простите, ваш браузер не поддерживает сохрение данных');
        return;
    }
}

/**
 * Function run_game() should be common name for all next math games
 * Example of calls:
 * run_game(TYPE_MO, '+-', '4,4', 'result', 20, '#welcome', 30);
 * run_game(TYPE_CO, '<=>', '1,1', 'result', 10, '#welcome', 30);
 *
 * @param {string} type - TYPE_MO ('mo') or TYPE_CO ('co')
 * @param {string} operations - math game operations (+, -, *, =, >, < etc)
    For example: '+-', '+-/*', '<=>'
 * @param {string} digit_numbers - digit numbers, which will be used in game.
    For example, single-digit numbers ('1,1'), which will be used in game:
            (0...9) +/- (0...9) = task result.
        Should be passed as string via comma:
            '1,1' - (0...9) operation (0...9)
            '1,2' - (0...9) operation (10...99)
            '4,4' - (1000...9999) operation (1000...9999)
            '1,1,1' - (0...9) operation (0...9) operation
 * @param {string} argument - which argument will be used as hidden
 * @param {number} timeout - test timeout
 * @param {string} mode - game mode
    game mode types:
        - 'test' for unregistered users, if game started from main page
        - 'game' for authorised users, if game started from user cabinet
 * @param {number} amount - the number of tasks
*/
function run_game(type, operations, digit_numbers, argument, timeout, mode, amount) {
    /*alert("run_game, type " + type + ", operations " + operations
          + ", digit_numbers " + digit_numbers + ", argument " + argument
          + ", timeout " + timeout + ", mode " + mode + ", amount" + amount);*/

    if (type !== undefined) {
        game.type = type;
    }

    if (operations !== undefined) {
        game.operations = operations;
    }

    if (digit_numbers !== undefined) {
        game.digit_numbers = digit_numbers;
    }

    if (argument !== undefined) {
        game.argument = argument;
    }

    if (timeout !== undefined) {
        game.timeout = parseInt(timeout);
    }

    if (mode !== undefined) {
        game.mode = mode;
    }

    if (amount !== undefined) {
        game.amount = parseInt(amount);
    }

    // calculate task timeout and step timeout
    step_timeout = parseInt(game.timeout/TASK_STEPS);

    // save current game parameters in local storage and restore data
    // in case of user pressed page refresh
    if (typeof(Storage) !== "undefined") {
        var game_keys = Object.keys(game);
        for (var key = 0; key < game_keys.length; key++) {
            var key_name = game_keys[key];
            var key_val = game[key_name];
            localStorage.setItem('game_' + key_name, key_val);
        }
    }

    if (game.type === TYPE_MO) {
        // keyboard initialization for touch screens (tablets, cell phones)
        if (user.set_kbrd !== 'false') {
            $('#keyboard_wrapper_id').show();
            $('#kbrd_icon').attr('src', 'img/icon_keyboard_show.png');
        } else {
            $('#keyboard_wrapper_id').hide();
            $('#kbrd_icon').attr('src', 'img/icon_keyboard_hide.png');
        }

        $('#kbrd_icon').show();

        $('#key_0').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('0');});
        $('#key_1').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('1');});
        $('#key_2').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('2');});
        $('#key_3').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('3');});
        $('#key_4').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('4');});
        $('#key_5').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('5');});
        $('#key_6').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('6');});
        $('#key_7').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('7');});
        $('#key_8').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('8');});
        $('#key_9').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault(); user_pressed('9');});

    } else if (game.type === TYPE_CO) {
        $('#kbrd_icon').hide();
        if (game.operations === '<=>') {
            $('#comps_div').show(); $('#signs_div').hide();
            $('#less').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('<');});
            $('#equl').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('=');});
            $('#more').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('>');});
        } else {
            $('#signs_div').show(); $('#comps_div').hide();
            if (game.operations.indexOf('+') !== -1) {
                $('#sign_pls').show(); $('#sign_pls').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('+');});
            }
            if (game.operations.indexOf('-') !== -1) {
                $('#sign_min').show(); $('#sign_min').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('-');});
            }
            if (game.operations.indexOf('*') !== -1) {
                $('#sign_mul').show(); $('#sign_mul').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('*');});
            }
            if (game.operations.indexOf('/') !== -1) {
                $('#sign_div').show(); $('#sign_div').on('touchstart click', function(e) {e.stopPropagation(); e.preventDefault();user_pressed('/');});
            }
        }
    }

    tasks = [];
    if (generate_random_tasks()) {
        // alert('tasks ' + JSON.stringify(tasks));
        // assign current task value
        current_task_number = 0;
        // current_task_number = 29;
        current_task = tasks[current_task_number];

        passed = 0; failed = 0; yellowed = 0;
        pressed_user_result = '';

        stars_counter = 0; game_started = false;

        // task numers and result
        number_1 = $("#" + game.type + "_number_1");
        number_2 = $("#" + game.type + "_number_2");
        operation = $("#mo_operation");
        result = $("#" + game.type + "_result");
        smile_img = $("#" + game.type + "_smile_img_id");
        correct_result = $('#' + game.type + '_correct_result');

        $("#tasks_all").html(tasks.length); $("#tasks_remain").html(tasks.length - current_task_number);
        $("#tasks_passed").html(passed); $("#tasks_failed").html(failed);

        // disable page scrolling and hide main page
        disable_scrolling(); hide_show_main_page('hide');

        // subscribe for keyboard events
        document.addEventListener('keydown', keyboard_events);

        if (user.set_hero !== 'false') {
            $('#hero_img').show();
            $('#hero_icon').attr('src', 'img/icon_hero_show.png');
        } else {
            $('#hero_icon').attr('src', 'img/icon_hero_hide.png');
        }

        $('#' + game.type).show(); $('#' + game.type + '_task_id').hide();
        smile_img.hide(); correct_result.html("");

        // show_game_screen
        document.getElementById('show_game_screen').click();

        if (user.set_time !== 'false') {
            for (var c = 1; c <= TASK_STEPS; c++) {
                $("#circle_" + c).attr('src', 'img/circle_white.png');
            }
            $('#time_icon').attr('src', 'img/icon_timer_show.png');
            $('#circles').show(); $('#stars').show();
            $("#stars_counter_id").html(stars_counter);
            // delay for 2 seconds (and 500ms) before first answer
            time_watcher = -2; timeout_id = setTimeout("continue_game()", 100);
        } else {
            $('#time_icon').attr('src', 'img/icon_timer_hide.png');
            $('#stars').hide(); $('#circles').hide();
            time_watcher = 0; continue_game();
        }

    } else {
        alert("Could not generate tasks for game!");
    }
}

/*
    This function generates random tasks based on mathematical operation type:
    -minus, +addition, *multiplication, /division

    Arguments:
    @type (string), mathematical operation type.
    for example, '+', '+-', '+-*', '+-/*'

    @amount (int), the number of tasks

    @range (), the range of numbers
    @order (string), 
*/
function generate_random_tasks(known_fails) {
    for (var i = 0; i < parseInt(game.amount); i++) {
        // if task operation length is == 1, it will return exact number
        if (game.operations.length > 1) {
            var rnd = Math.floor(Math.random() * game.operations.length);
            var task_operation = game.operations.charAt(rnd);
        } else {
            var task_operation = game.operations;
        }

        var params = generate_rnd_task(task_operation);
        if ((params !== undefined) && (params !== null)) {
            rnd_task = [params[0], task_operation, params[1], params[2], '', 'p'];
            tasks.push(rnd_task);
        } else {
            alert('ERROR: generate_rnd_task() returned nothing');
        }
    }

    if (tasks.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

function get_min_number(digit) {
    // positive values
    if (digit === 1) {
        return 0;
    } else if (digit === 2) {
        return 10;
    } else if (digit === 3) {
        return 100;
    } else if (digit === 4) {
        return 1000;
    } else if (digit === 5) {
        return 10000;
    } else if (digit === 6) {
        return 100000;
    } else if (digit === 7) {
        return 1000000;

    // negative values
    } else if (digit === -1) {
        return -9;
    } else if (digit === -2) {
        return -99;
    } else if (digit === -3) {
        return -999;
    } else if (digit === -4) {
        return -9999;
    } else if (digit === -5) {
        return -99999;
    } else if (digit === -6) {
        return -999999;
    } else if (digit === -7) {
        return -9999999;
    }
}

function get_max_number(digit) {
    // positive values
    if (digit === 1) {
        return 9;
    } else if (digit === 2) {
        return 99;
    } else if (digit === 3) {
        return 999;
    } else if (digit === 4) {
        return 9999;
    } else if (digit === 5) {
        return 99999;
    } else if (digit === 6) {
        return 999999;
    } else if (digit === 7) {
        return 9999999;

    // negative values
    } else if (digit === -1) {
        return -1;
    } else if (digit === -2) {
        return -10;
    } else if (digit === -3) {
        return -100;
    } else if (digit === -4) {
        return -1000;
    } else if (digit === -5) {
        return -10000;
    } else if (digit === -6) {
        return -100000;
    } else if (digit === -7) {
        return -1000000;
    }
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 *
 * [0...9], [10...99], [100...999]
 */
function get_rnd_int(int_min, int_max) {
    return Math.floor(Math.random() * (int_max - int_min + 1)) + int_min;
}

function generate_rnd_task(task_operation) {
      var numbers = game.digit_numbers.split(',');
      var factor1 = 1, factor2 = 1;
      if (numbers.length === 4) {
        factor1 = numbers[2]; factor2 = numbers[3];
      }

      var min_1 = get_min_number(parseInt(numbers[0]));
      var max_1 = get_max_number(parseInt(numbers[0]));

      var min_2 = get_min_number(parseInt(numbers[1]));
      var max_2 = get_max_number(parseInt(numbers[1]));

      var num_1 = 0, num_2 = 0, res = 0;

      switch (task_operation) {
        case OPERATION_SUM:
            num_1 = get_rnd_int(min_1, max_1);
            if (game.type === TYPE_CO) {
                num_2 = get_rnd_int(min_2+1, max_2);
            } else {
                num_2 = get_rnd_int(min_2, max_2);
            }
            num_1 *= factor1; num_2 *= factor2;
            res = num_1 + num_2;
        break;

        case OPERATION_SUB:
            // if task_operation is '-' (minus), the first number should be
            // >= second, i.e. result should not be negative
            if (max_1 > max_2) {
                num_1 = get_rnd_int(min_1, max_1);
                num_2 = get_rnd_int(min_2, max_2);
            } else if (max_2 > max_1) {
                alert("ERROR: MINUS -> used invalid parameters!!!");
                return;
            } else { // max1 === max2
                if (game.type === TYPE_CO) {
                    num_2 = get_rnd_int(min_1+1, max_1-1); // [1...9)
                } else {
                    num_2 = get_rnd_int(min_1, max_1-1); // [10...99-1)
                }
                num_1 = get_rnd_int(num_2, max_1); // [num2..99]
            }
            num_1 *= factor1; num_2 *= factor2;
            res = num_1 - num_2;
        break;

        case OPERATION_MUL:
            num_1 = get_rnd_int(min_1, max_1);
            num_2 = get_rnd_int(min_2, max_2);

            num_1 *= factor1; num_2 *= factor2;
            res = num_1 * num_2;
        break;

        case OPERATION_DIV:
            // !!! нет умножения при делении factor1 !!!
            res = get_rnd_int(min_1, max_1);
            num_2 = get_rnd_int(min_2+1, max_2);
            num_1 = res * num_2;
        break;

        case OPERATION_GREATER: // >
          res = '>';
          num_1 = get_rnd_int(min_1+1, max_1);
          num_2 = get_rnd_int(min_2, num_1-1);
          num_1 *= factor1; num_2 *= factor2;
        break;

        case OPERATION_SMALLER: // <
          res = '<';
          num_1 = get_rnd_int(min_1, max_1-1);
          num_2 = get_rnd_int(num_1+1, max_2);
          num_1 *= factor1; num_2 *= factor2;
        break;

        case OPERATION_EQUALLY: // =
          res = '=';
          num_1 = get_rnd_int(min_1, max_1);
          num_2 = num_1;
          num_1 *= factor1; num_2 *= factor2;
        break;

        default:
          alert("Random task generator: Unknown math task_operation '" + task_operation + "'");
          return;
      }

      return [num_1, num_2, res];
}

function generate_task_for_wrong_answer() {
    // If current amount of tasks exceed MAX_TASK_AMOUNT
    if (tasks.length > MAX_TASK_AMOUNT) {
        return;
    }

    // add the original wrong answer at the end
    var orig = [current_task[0], current_task[1], current_task[2], current_task[3], '', ''];
    tasks.push(orig);
}

function user_pressed(symbol) {
    // alert("user_pressed '" + symbol + "'");
    if ((symbol !== undefined) && (time_watcher >= 0) && (game_started === true)) {
        if (game.type === TYPE_MO) {
            pressed_user_result += symbol;
        } else {
            pressed_user_result = symbol;
        }

        // if game finished, but user still able to press keys (in moment)
        // check task result only when game is in progress
        if (current_task_number < tasks.length) {
            // [number_1, operation, number_2, expected_result, user_result, result_color]
            //  0         1          2         3                4            5
            if (game.argument === 'number_1') {
                check_user_entered_result(current_task[0].toString());

            } else if (game.argument === 'operation') {
                check_user_entered_result(current_task[1].toString());

            } else if (game.argument === 'number_2') {
                check_user_entered_result(current_task[2].toString());

            } else if (game.argument === 'result') {
                if ((game.type === TYPE_CO) && (game.operations == '+-')) {
                    check_user_entered_result(current_task[1].toString());
                } else {
                    check_user_entered_result(current_task[3].toString());
                }
            }
        }
    }
}

function keyboard_events(event) {
    // alert("time_watcher: " + time_watcher + ", event.keyCode " + event.keyCode);

    // if game is just started -> ignore any key presses
    if ((time_watcher < 0) || (game_started === false)) {
        return;
    }

    if (game.argument === 'number_1') {
        var expected = current_task[0].toString();

    } else if (game.argument === 'operation') {
        var expected = current_task[1].toString();

    } else if (game.argument === 'number_2') {
        var expected = current_task[2].toString();

    } else if (game.argument === 'result') {
        var expected = current_task[3].toString();
    }

    // alert('YURA game.argument <' + game.argument + '>    current_task <' + current_task.toString() + '>    expected <' + expected + '>');
    if (expected.length === pressed_user_result.length) {
        // user already entered full length number -> exit
        return;
    }

    if (game.type === TYPE_MO) {
      switch (parseInt(event.keyCode)) {
        case 48: // 0
        case 96: // numpad 0
            pressed_user_result += '0';
            break;
        case 49: // 1
        case 97: // numpad 1
            pressed_user_result += '1';
            break;
        case 50: // 2
        case 98: // numpad 2
            pressed_user_result += '2';
            break;
        case 51: // 3
        case 99: // numpad 3
            pressed_user_result += '3';
            break;
        case 52:  // 4
        case 100: // numpad 4
            pressed_user_result += '4';
            break;
        case 53:  // 5
        case 101: // numpad 5
            pressed_user_result += '5';
            break;
        case 54:  // 6
        case 102: // numpad 6
            pressed_user_result += '6';
            break;
        case 55:  // 7
        case 103: // numpad 7
            pressed_user_result += '7';
            break;
        case 56:  // 8
        case 104: // numpad 8
            pressed_user_result += '8';
            break;
        case 57:  // 9
        case 105: // numpad 9
            pressed_user_result += '9';
            break;
        case 189: // -
        case 109: // numpad -
            pressed_user_result += '-';
            break;

        default:
            // if pressed any other key, just ignore it
            return;
      }

    } else if (game.type === TYPE_CO) {
      switch (parseInt(event.keyCode)) {
        // > MORE
        case 39: // ->
        case 190: // >
        case 102: // numpad 6, ->
            pressed_user_result = '>';
            break;

        // < LESS
        case 37: // <-
        case 188: // <
        case 100: // numpad 4, <-
            pressed_user_result = '<';
            break;
        
        // = EQUAL
        case 38:  // arrow up
        case 40:  // arrow down
        case 98:  // numpad 2, arrow down
        case 101: // numpad 8, arrow up
        case 104: // numpad 5
            pressed_user_result = '=';
            break;

        case 107: // numpad +
        case 187: // +
            pressed_user_result = '+';
            break;

        case 109: // numpad -
        case 189: // -
            pressed_user_result = '-';
            break;

        default:
            // if pressed any other key, just ignore it
            return;
      }
    } else {
        alert("Unexpected game type '" + game.type + "'");
        return;
    }

    check_user_entered_result(expected);
}

/**
 * 
 */
function check_user_entered_result(expected_result) {
    if (expected_result.length === 1) {
        check_task_result(expected_result);

    } else if (expected_result.length === 2) {
        if (pressed_user_result.length === 1) {
            if (pressed_user_result[0] === expected_result[0]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else {
            check_task_result(expected_result);
        }
    } else if (expected_result.length === 3) {
        if (pressed_user_result.length === 1) {
            if (pressed_user_result[0] === expected_result[0]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 2) {
            if (pressed_user_result[1] === expected_result[1]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        }
        else {
            check_task_result(expected_result);
        }
    } else if (expected_result.length === 4) {
        if (pressed_user_result.length === 1) {
            if (pressed_user_result[0] === expected_result[0]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 2) {
            if (pressed_user_result[1] === expected_result[1]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 3) {
            if (pressed_user_result[2] === expected_result[2]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else {
            check_task_result(expected_result);
        }

    } else if (expected_result.length === 5) {
        if (pressed_user_result.length === 1) {
            if (pressed_user_result[0] === expected_result[0]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 2) {
            if (pressed_user_result[1] === expected_result[1]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 3) {
            if (pressed_user_result[2] === expected_result[2]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 4) {
            if (pressed_user_result[3] === expected_result[3]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else {
            check_task_result(expected_result);
        }

    } else if (expected_result.length === 6) {
        if (pressed_user_result.length === 1) {
            if (pressed_user_result[0] === expected_result[0]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 2) {
            if (pressed_user_result[1] === expected_result[1]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 3) {
            if (pressed_user_result[2] === expected_result[2]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 4) {
            if (pressed_user_result[3] === expected_result[3]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else if (pressed_user_result.length === 5) {
            if (pressed_user_result[4] === expected_result[4]) {
                set_expected_results('black', 'none');
            } else {
                check_task_result(expected_result);
            }
        } else {
            check_task_result(expected_result);
        }

    } else {
        alert("check_user_entered_result, Execution STOPPED. Current SW version"
            + " does not support numbers with 7+ octets (suppossed, that max"
            + " number is 999998+1=999999 (999*999=998001), which is 6 octets)."
            + " Expected result " + expected_result + ", octets length "
            + expected_result.length);
        clearTimeout(timeout_id);
    }
}

function check_task_result(expected_result) {
    // alert("check_task_result: pressed_user_result " + pressed_user_result + ", expected_result " + expected_result);
    if (timeout_id !== 0) {
        clearTimeout(timeout_id);
    }

    if (pressed_user_result === expected_result) {
        smile_img.attr("src", "img/smile_passed.jpg");
        smile_img.fadeIn(300); correct_result.html("");

        set_expected_results('green', 'none');

        // this check means that user have already answered incorrectly
        // previously, but he fixed reply when correct answer was shown.
        // We have to record incorrect answer in any case
        // -> keep color & incorrect answer as is
        if (current_task[5] === 'r') {
            var rnd_hero = Math.floor((Math.random() * PASSED_HEROES) + 1);
            var game_hero_picture = 'img/hero_passed_' + rnd_hero + '.png';

        } else if (time_watcher === TASK_STEPS) {
            var rnd_hero = Math.floor((Math.random() * FAILED_HEROES) + 1);
            var game_hero_picture = 'img/hero_failed_' + rnd_hero + '.png';
            current_task[4] = pressed_user_result; current_task[5] = 'r';

        } else if (time_watcher > PASSED_TIME) {
            var rnd_hero = Math.floor((Math.random() * YELLOW_HEROES) + 1);
            var game_hero_picture = 'img/hero_yellow_' + rnd_hero + '.png';
            yellowed++; current_task[4] = pressed_user_result; current_task[5] = 'y';
            $("#tasks_passed").html(passed+yellowed);

        } else {
            var rnd_hero = Math.floor((Math.random() * PASSED_HEROES) + 1);
            var game_hero_picture = 'img/hero_passed_' + rnd_hero + '.png';
            passed++; current_task[4] = pressed_user_result; current_task[5] = 'p';

            $("#tasks_passed").html(passed+yellowed);
            if (user.set_time !== 'false') {
                stars_counter++; $("#stars_counter_id").html(stars_counter);
            }
        }

        if (current_task_number < tasks.length) {
            current_task_number++; current_task = tasks[current_task_number];
        }

        time_watcher = 0; continue_game();

    } else {
        var rnd_hero = Math.floor((Math.random() * FAILED_HEROES) + 1);
        var game_hero_picture = 'img/hero_failed_' + rnd_hero + '.png';

        set_expected_results('#CCCCCC', 'none', expected_result);

        // i.e. user did not answer anything (task reach timeout)
        if (pressed_user_result.length === 0) {
            smile_img.attr("src", "img/smile_clock.png"); smile_img.fadeIn(300);

        } else {
            smile_img.hide();

            if (game.type === TYPE_MO) {
                correct_result.html(pressed_user_result);

            } else if (game.type === TYPE_CO) {
                if (pressed_user_result === '=') {
                    correct_result.html('&ne;');
                } else if (pressed_user_result === '>') {
                    correct_result.html('&#8833;');
                } else if (pressed_user_result === '<') {
                    correct_result.html('&#8832;');
                }
            }
        }

        // if before user has answered incorrectly, we should not
        // count it twice -> results already shown
        if (current_task[5] !== 'r') {
            current_task[4] = pressed_user_result; current_task[5] = 'r';
            if (stars_counter > 0) {
                stars_counter--; $("#stars_counter_id").html(stars_counter);
            }
            // generate additional tasks if answer is incorrect
            generate_task_for_wrong_answer();

            failed++; $("#tasks_failed").html(failed);
            $("#tasks_all").html(tasks.length);
        }
    }

    // change hero image based on result
    $('#hero_img').attr('src', game_hero_picture);

    // cleanup current user result/answer
    pressed_user_result = "";
}

/*
    Set styles (color and text decore) and text for html
    element xxx_result, where xxx is math_operations OR comparisons:
        - math_operations_result
        - comparisons_result

    If defined_result parameter is undefined -> set pressed_user_result
*/
function set_expected_results(color, decor, defined_result) {
    if (defined_result === undefined) {
        defined_result = pressed_user_result;
    }

    if (game.argument === 'number_1') {
        number_1.css('color', color);
        number_1.css('text-decoration', decor);
        number_1.html(defined_result);

    } else if (game.argument === 'operation') {
        result.css('color', color);
        result.css('text-decoration', decor);
        result.html(defined_result);

    } else if (game.argument === 'result') {
        result.css('color', color);
        result.css('text-decoration', decor);
        result.html(defined_result);

    } else if (game.argument === 'number_2') {
        var exp_length = current_task[3].toString().length;
        var cur_length = defined_result.toString().length;
        while (exp_length >= cur_length) {
            defined_result = '&nbsp;' + defined_result;
            cur_length++;
        }

        number_2.css('color', color);
        number_2.css('text-decoration', decor);
        number_2.html(defined_result);
    }
}

/**
 * Continue game
 */
function continue_game() {
    if (current_task_number < tasks.length) {
        // time_watcher can be negative ONLY if game is just started
        // negative value is used as delay at the first step(s)
        if (time_watcher < 0) {
            var timer = Math.abs(time_watcher).toString();
            $("#circle_" + timer).attr('src', 'img/circle_green.png');

        } else if (time_watcher === 0) {
            smile_img.fadeOut(300); correct_result.html("");

            $("#tasks_all").html(tasks.length);
            $("#tasks_remain").html(tasks.length - current_task_number);

            // re-write all progress circles with empty/white color
            if (user.set_time !== 'false') {
                for (var c = 1; c <= TASK_STEPS; c++) {
                    $("#circle_" + c).attr('src', 'img/circle_white.png');
                }
            }

            $('#' + game.type + '_task_id').fadeOut(300, function() {
                set_task_fields();
            }).fadeIn(300);

            game_started = true;

        } else if (time_watcher <= TASK_STEPS) {
            if (time_watcher < PASSED_TIME) {
                $("#circle_" + time_watcher).attr('src', 'img/circle_green.png');
            }
            else if (time_watcher < YELLOW_TIME) {
                $("#circle_" + time_watcher).attr('src', 'img/circle_yellow.png');
            }
            else {
                $("#circle_" + time_watcher).attr('src', 'img/circle_red.png');
            }
        }

        if (time_watcher <= TASK_STEPS) {
            if (timeout_id !== 0) {
                clearTimeout(timeout_id);
            }

            if (user.set_time !== 'false') {
                time_watcher++;
                if (time_watcher < 1) {
                    // if time_watcher less 1 -> start - attantion - go!
                    timeout_id = setTimeout("continue_game()", 1000);
                } else {
                    timeout_id = setTimeout("continue_game()", step_timeout*1000);
                }
            }

        } else {
            // "" is empty result -> user did not press anything, failed by timeout
            // [0- number_1, 1- operation, 2- number_2, 3- expected result]
            if (game.argument === 'number_1') {
                check_task_result(current_task[0]);

            } else if (game.argument === 'operation') {
                check_task_result(current_task[1]);

            } else if (game.argument === 'number_2') {
                check_task_result(current_task[2]);

            } else if (game.argument === 'result') {
                check_task_result(current_task[3]);
            }
        }

    } else {
        // hide previous whiteboard with game
        stop_game_and_show_results();
    }
}

function set_task_fields() {
    if (game.type === TYPE_MO) {
        // SET NUMBER 1
        if (game.argument === 'number_1') {
            set_expected_results('#CCCCCC', 'none', '?');
        } else {
            number_1.css('color', 'black');
            number_1.html(current_task[0]);
        }
        // SET OPERATION
        var operation_type = current_task[1];
        if (operation_type === OPERATION_DIV) {
            operation_type = '&divide;';
        } else if (operation_type === OPERATION_MUL) {
            operation_type = 'x';
        }
        operation.html(operation_type);
        // SET NUMBER 2
        if (game.argument === 'number_2') {
            set_expected_results('#CCCCCC', 'none', '?');
        } else {
            number_2.css('color', 'black');
            number_2.html("&nbsp;" + current_task[2]);
        }
        // SET RESULT
        if (game.argument === 'result') {
            set_expected_results('#CCCCCC', 'none', '?');
        } else {
            result.css('color', 'black');
            result.html(current_task[3]);
        }

    } else if (game.type === TYPE_CO) {
        // [number_1, operation, number_2, result, '', '']
        // [0,        1,         2,        3,      4,  5]
        number_1.css('color', 'black');
        number_1.html(current_task[0]);

        if (game.operations === '<=>') {
            number_2.css('color', 'black');
            number_2.html(current_task[2]);
        } else {
            number_2.css('color', 'black');
            number_2.html(current_task[2]  + " = " + current_task[3]);
        }

        set_expected_results('#CCCCCC', 'none', '?');

    } else {
        alert("Wrong type '" + game.type + "'");
        return;
    }
}

/**
 * game_stop() function is called, when user close window during game
 * 
 */
function game_stop(type) {
    clearTimeout(timeout_id); document.removeEventListener('keydown', keyboard_events);
    if (game.type === TYPE_MO) {
        $('#key_0').off(); $('#key_1').off(); $('#key_2').off(); $('#key_3').off(); $('#key_4').off();
        $('#key_5').off(); $('#key_6').off(); $('#key_7').off(); $('#key_8').off(); $('#key_9').off();
    } else if (game.type === TYPE_CO) {
        if (game.operations === '<=>') {
            $('#less').off(); $('#equl').off(); $('#more').off();
        } else {
            if (game.operations.indexOf('+') !== -1) {$('#sign_pls').hide();$('#sign_pls').off();}
            if (game.operations.indexOf('-') !== -1) {$('#sign_min').hide();$('#sign_min').off();}
            if (game.operations.indexOf('*') !== -1) {$('#sign_mul').hide();$('#sign_mul').off();}
            if (game.operations.indexOf('/') !== -1) {$('#sign_div').hide();$('#sign_div').off();}
        }
    }

    enable_scrolling(); $('#' + game.type).hide();
    document.getElementById('link_close_window').click();

    if (type !== 'rerun') {
        hide_show_main_page('show');
    }
}

function game_help() {
    // TBD
}

/**
 * stop_game_and_show_results() is called when user finished game and will see results table
 */
function stop_game_and_show_results() {
    // alert('failed ' + failed + ', tasks ' + JSON.stringify(tasks));
    document.getElementById('link_close_window').click();
    document.removeEventListener('keydown', keyboard_events);

    if (game.mode === 'test') {
        $("#res_game").hide(); $("#res_msg").show();
        $("#res_msg").html(page_elements[language].non_registered_usr_finish);

    } else {
        $("#res_msg").hide(); $("#res_game").show();

        // save stars_counter in local storage, if supported
        var stars = localStorage.getItem("user_stars");
        // Number.MAX_SAFE_INTEGER // 9007199254740991
        // Math.pow(2, 53) - 1     // 9007199254740991
        var storage_stars = parseInt(stars) + stars_counter;
        localStorage.setItem("user_stars", storage_stars);
        $("#welcome_user_stars_counter_id").html(storage_stars);

        if (failed === 0) {
            if (user.set_time !== 'false') {
                $("#res_div_text").html(page_elements[language].res_congratulation);
                set_next_user_program();

                var img_val = 'img/' + language + '_' + user.program + '.png'
                $('#res_div_image_id').attr('src', img_val);
                $('#res_div_image_id').show();

            } else {
                $("#res_div_text").html(page_elements[language].res_finished);
                $('#res_div_image_id').hide();
            }

            $("#res_div_text").show(); $("#res_div_table").hide();

        } else {
            $("#res_div_text").hide(); $('#res_div_image_id').hide();
            // show table and add data
            var table = document.getElementById('res_div_table');
            table.style.display = '';
            // remove all previous data, if table is not empty
            if (table.rows.length > 1) {
                for (var i = table.rows.length-1; i > 0; i--) {
                    table.deleteRow(i);
                }
            }
            var row_index = 0;
            for (var i = 0; i < tasks.length; i++) {
                // [number_1, operation, number_2, expected result, user result, result color]
                //  0         1          2         3                4            5
                // [1, '+', 2, 3, 5, 'r'] for failed answers
                if (tasks[i][5] === 'r') {
                    var row = table.insertRow(row_index);
                    var cell = row.insertCell(0);
                    if (game.type === TYPE_MO) {
                        cell.innerHTML = tasks[i][0] + ' ' + tasks[i][1] + ' ' + tasks[i][2] + ' = ' + tasks[i][3];
                    } else {
                        cell.innerHTML = tasks[i][0] + ' ' + tasks[i][1] + ' ' + tasks[i][2];
                    }
                    row_index++;
                }
            }
        }

        $("#res_stars").html(page_elements[language].finished_stars  + stars_counter);
        $("#res_tasks").html(page_elements[language].finished_tasks + tasks.length);
        $("#res_passed").html(page_elements[language].finished_passd + (passed + yellowed));
        $("#res_failed").html(page_elements[language].finished_error + failed);

        if (stars_counter > 0) {
            send_user_stars(stars_counter);
        }
    }

    document.getElementById('show_results_id').click();
}
