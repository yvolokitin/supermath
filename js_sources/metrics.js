/*
  <div id="activation" class="window_common_wrapper">
    <div class="whiteboard_container">
      <div class="close_window_div">
        <img src="img/button_close.png" onclick="click_close_window();"/>
        <img src="img/button_question.png" onclick="alert('Activation code');"/>
      </div>

      <div style="height:80%;width:100%;">
        <p class="activation_user_name_text" id="activation_user_name"></p>
        <p class="activation_common_text">Поздравляем! Вы зарегистрировались на
            сайте SuperMath! Для дальнейшей работы, вам необходимо активировать
            ваш аккаунт. На вашу почту <text id="activation_user_email"></text>
            выслано письмо с кодом активации.
        </p>
        <p class="activation_common_text">Пожалуйста, введите полученный код
          активации ниже или перейдите по ссылке в письме для активации вашего
          аккаунта автоматически.</p>
        <input id="activation_code" type="text" size="35"
               class="registration_forms_style activation_form_style"
               placeholder="КОД АКТИВАЦИИ" required autofocus/>
        <br/>
        <button type="button" class="registration_forms_style"
                onclick="activation();">Активировать</button>
        <br/>
        <img id="activation_progress_img" src="img/spinner.gif" style="visibility:hidden;"/>
      </div>
      <div style="height:10%;width:100%;">
        <label>Для того, чтобы зайти под другим пользователем</label>
        <button type="button" class="registration_forms_style" onclick="logout();">Выход</button>
      </div>
    </div>
  </div>


    <!-- Rating@Mail.ru counter -->
    <script>
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({id: "2855661", type: "pageView", start: (new Date()).getTime()});
        (function (d, w, id) {
          if (d.getElementById(id)) return;
          var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
          ts.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//top-fwz1.mail.ru/js/code.js";
          var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
          if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
        })(document, window, "topmailru-code");
    </script>
    <noscript><div style="position:absolute;left:-10000px;"><img src="//top-fwz1.mail.ru/counter?id=2855661;js=na" style="border:0;" height="1" width="1" alt="Рейтинг@Mail.ru" /></div></noscript>
    <!-- Rating@Mail.ru logo -->
    <a href="http://top.mail.ru/jump?from=2855661">
    <img src="//top-fwz1.mail.ru/counter?id=2855661;t=614;l=1" style="border:0;" height="40" width="88" alt="Рейтинг@Mail.ru" /></a>


    LiveInternet и Yandex.Metrika метрики - нужны ли ?

    <!--LiveInternet logo-->
    <!--<script>new Image().src = "//counter.yadro.ru/hit?r"+escape(document.referrer)+((typeof(screen)=="undefined")?"":
        ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();</script>
    <a href="//www.liveinternet.ru/click" target="_blank"><img src="//counter.yadro.ru/logo?52.6" title="LiveInternet: показано число просмотров и посетителей за 24 часа" alt="" border="0" width="88" height="31"/></a>-->

    <!-- Yandex.Metrika informer -->
    <!--<a href="https://metrika.yandex.ru/stat/?id=42333244&amp;from=informer" target="_blank" rel="nofollow">
    <img src="https://informer.yandex.ru/informer/42333244/2_1_B9ECFFFF_99CCFFFF_0_pageviews"
      style="width:80px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры)"/></a>
    <noscript><div> <img src="https://mc.yandex.ru/watch/42333244" style="position:absolute; left:-9999px;" alt=""/></div></noscript>-->
*/

function show_popup(id) {
    if (document.getElementById) {
        obj = document.getElementById(id);
        if (obj.style.display == "none") {
            obj.style.display = "";
        }
    }
}

function hide_popup(id) {
    if (document.getElementById) {
        obj = document.getElementById(id);
        if (obj.style.display == "") {
            obj.style.display = "none";
        }
    }
}

/**
 * Switch window
 * @param {string} hide_id - window to be hidden
 * @param {string} show_id - window to be shown
 */
function switch_popup(hide_id, show_id) {
    // hide previous popup
    hide_popup(hide_id);
    // show new popup
    show_popup(show_id);
}

function activation() {
    // example, 58081f4ecc6b12.12346980
    var code = document.getElementById('activation_code').value;
    if (code.length !== 23) {
        alert("Длина активационного кода должна быть 23 символа");
        return false;
    }

    // POST data
    var post_data = {'operation': 'activation',
                     'user_id': user.id,
                     'user_uuid': code,
                     'user_email': user.email};
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: post_data,
                 success: activation_result});

    document.getElementById('activation_progress_img').style.visibility = "visible";

    activation_timeout = setTimeout("activation_result()", JQUERY_MAX_OPERATION_TIMEOUT);
    activation_result_called = false;
}

function activation_result(result) {
    document.getElementById('activation_progress_img').style.visibility = "hidden";

    if (activation_result_called === false) {
        activation_result_called = true;
        clearTimeout(activation_timeout);

    } else {
        return;
    }

    if (result === undefined) {
        alert("Activation timeout error, please try again later");

    } else if (result.indexOf("PASSED") === -1) {
         alert("Activation Result FAILED " + result);

    } else {
        // PASSED,USER -> [PASSED] [USER]
        var array = result.split(',');
        if (array.length === 2) {
            // use HTML5 Local Storage if browser supports it
            if (typeof(Storage) !== "undefined") {
                // PASSED is array[0] -> ignore it
                var user_usergroup = array[1];
                localStorage.setItem("user_usergroup", user_usergroup);
            } else {
                // TBD: Implements save result data via browser's cookies
                alert("Activation Result, NO HTML5 Local Storage, but cookies are not implemented yet");
                return false;
            }
            login();
        } else {
            alert("Activation Result received wrong data " + result);
        }
    }
}


/**
 * No longer user now
 * http://graph.facebook.com/" + facebookId + "/picture?type=square
 * http://graph.facebook.com/67563683055/picture?type=square
 */
function get_facebook_login_status() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var fb_id = response.authResponse.userID;
            var user_img = 'http://graph.facebook.com/' + fb_id + '/picture?type=square';
            document.getElementById('welcome_user_picture_img_id').src = user_img;

            // temporary assign some values
            user.id = fb_id;
            user.name = '';
            user.surname = '';
            user.email = '';

            show_user_cabinet();
            // alert("connected FBID = " + fb_id);

        } else if (response.status === 'not_authorized') { 
            // show login dialog to enter email & pswd
            document.getElementById('show_login').click();

        } else {
            // show login dialog to enter email & pswd
            document.getElementById('show_login').click();
        }
    });
} 


/**
 * Call all analytics one by one
 */
function call_analytics() {
    call_yandex();
}

/**
 *
 */
/*function call_mail() {
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({id: "2855661", type: "pageView", start: (new Date()).getTime()});
    (function (d, w, id) {
      if (d.getElementById(id)) return;
      var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
      ts.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//top-fwz1.mail.ru/js/code.js";
      var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
      if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
    })(document, window, "topmailru-code");
}
*/
/**
 *
 */
function call_yandex() {
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter42333244 = new Ya.Metrika({
                    id:42333244,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
}
