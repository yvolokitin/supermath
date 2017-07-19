/////////////////// global constants definition
/** @const {string} */
var JQUERY_URL = 'http://supermath.ru/php/functions.php';
/** @const {number} */
var JQUERY_MAX_OPERATION_TIMEOUT = 20000;

/////////////////// global variables definition
/** @type {number}, used by login and registration to show processing image */
var current_time = 0;

var belt_pgrms;

/** @type {object} */
var user = {'id': '',
            'name': '',
            'surname': '',
            'email': '',
            'usergroup': '',
            'belt': '',
            'program': '',
            'stars': '',
            'solved': '',
            'avatar': '',
            'set_hero': 'true',
            'set_kbrd': 'true',
            'set_time': 'true',
            'set_lngd': 'ru'};

/////////////////// functions
function refresh_data() {
    // alert("screen.height " + screen.height + ", screen.width " + screen.width);
    if (window.location.href.indexOf('#game') !== -1) {
        // call rerun_game from scripts.js
        rerun_game();
    }

    var post_data = {'operation': 'add_fake_stars'};
    // increase starts per each request for fake users
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: post_data,
                 success: best_records});
}

function show_slide(n) {
    // return array of slideshow_slide dib elements
    var slides = document.getElementsByClassName("slideshow_slide");
    if (n > slides.length) {
        current_slide = 1;
    }
    if (n < 1) {
        current_slide = slides.length
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[current_slide-1].style.display = "block";  
}

function next_slide(n) {
    show_slide(current_slide += n);
}

/**
 * Show three best players score
 * @param {string} result
 */
function best_records(data) {
    // alert('best_records, data ' + JSON.stringify(data));
    if ((data !== null) && (data !== undefined)) {
        if (data.length === 4) {
            // hide rotating numbers and show top 3 places
            document.getElementById('sm_topic_numbers_div_id').style.display = 'none';
            document.getElementById('sm_topic_numbers_top3_id').style.display = '';

            document.getElementById('place_number_1_stars').innerHTML = '<b>' + data[1].STARS + '</b>';
            document.getElementById('place_number_1_name').innerHTML = data[1].NAME + '<br>' + data[1].SURNAME;

            document.getElementById('place_number_2_stars').innerHTML = data[2].STARS;
            document.getElementById('place_number_2_name').innerHTML = data[2].NAME + '<br>' + data[2].SURNAME;

            document.getElementById('place_number_3_stars').innerHTML = data[3].STARS;
            document.getElementById('place_number_3_name').innerHTML = data[3].NAME + '<br>' + data[3].SURNAME;
        }
    } else {

    }
}

/**
 * Validate email according to pattern
 * @param {string} email - email field
 * @return {boolean} True if email matched pattern
 */
function validate_email(email) {
    // x@y.zz is the shortest email length (6 chars)
    if (email.length < 6) {
        return page_elements[language].reg_wrong_email_short;

    // According to RFC 821 it should be 129 chars, 64 + @ + 64 = 129
    // user - The maximum total length of a user name is 64 characters
    // domain - The maximum total length of a domain name or number is 64 characters
    } else if (email.length > 129) {
        return page_elements[language].reg_wrong_email_len;

    } else if (!EMAIL_PATTERN.test(email)) {
        return page_elements[language].reg_wrong_email_ptrn;

    } else {
        // EMAIL_PATTERN does not catch twice @ occurance
        // for example qqwerty@qwerty@qwe.com
        var array = email.split('@');
        if (array.length !== 2) {
            return page_elements[language].reg_wrong_email_at;
        }
    }

    return 'true';
}

/**
 * Validate password according to pattern
 * @param {string} pswd - password field
 * @return {boolean} True if email matched pattern
 */
function validate_pswd(pswd) {
    if ((pswd.length < MIN_PSWD_LENGTH) ||
        (pswd.length > MAX_PSWD_LENGTH)) {
        return page_elements[language].reg_wrong_pswd_len;

    } else if (!PSWD_PATTERN.test(pswd)) {
        return page_elements[language].reg_wrong_pswd_chr;
    }

    return 'true';
}

/**
 * Validate NAME according to pattern
 * @param {string} name - name field
 * @return {boolean} True if email matched pattern
 */
function validate_name(name) {
    if ((name.length < MIN_NAME_LENGTH) ||
        (name.length > MAX_NAME_LENGTH)) {
        return page_elements[language].reg_wrong_name_len;
    } else if (!NAME_PATTERN.test(name)) {
        return page_elements[language].reg_wrong_name_chr;
    }
    
    return 'true';
}

/**
 * Read user information from localstorage
 *
 * @return {boolean} True if information existed
 */
function get_local_user_info() {
    // use HTML5 Local Storage if browser supports it
    var keys = Object.keys(user);
    for (var i = 0; i < keys.length; i++) {
        // use HTML5 Local Storage if browser supports it
        if (typeof(Storage) !== "undefined") {
            var storage_key = 'user_' + keys[i];
            user[keys[i]] = localStorage.getItem(storage_key);
            if (user[keys[i]] === null) {
                // alert('key ' + keys[i]);
                // if some parameter missed, user has to login from scratch
                logout(); return false;
            }
        } else {
            // TBD: implement cookies version later
            return false;
        }
    }

    // sheck if user logouted
    if ((user.id === '') || (user.email === '') || (user.usergroup === '')) {
        return false;
    }

    if (language === 'ru') {
        belt_pgrms = belt_pgrms_ru;
    } else {
        belt_pgrms = belt_pgrms_en;
    }

    return true;
}

function click_window(window_id) {
    if ((window_id !== undefined) &&
        (window_id !== 'undefined') &&
        (window_id !== null) &&
        (window_id.length > 1)) {

        // click by hided link to open about us block
        var element = document.getElementById(window_id);
        // returns null if no elements with the specified ID exists
        if (element !== null) {
            hide_show_main_page('hide');
            element.click();
        }
    }
}

function click_close_window() {
    // click by hided link to close window
    document.getElementById('link_close_window').click();
    hide_show_main_page('show');
}

function login() {
    $("#login_user_password").attr("placeholder", page_elements[language].user_password);

    $("#login_enter_button_img").attr("src", page_elements[language].login_entr_img);
    $("#login_remind_pswd_button_img").attr("src", page_elements[language].login_pswd_img);
    $("#remind_password_btn_id").attr("src", page_elements[language].login_send_img);
    $("#back_password_btn_id").attr("src", page_elements[language].login_back_img);
    $("#login_registration_button_id").attr("src", page_elements[language].register_img);

    // show login dialog to enter email & pswd
    document.getElementById('show_login').click();
}

function hide_show_main_page(visibility) {
    // If get_local_user_info passed -> user authorized
    if (get_local_user_info()) {
        var screen = $('#welcome');
    } else {
        var screen = $('#main_page');
    }

    if (visibility === 'hide') {
        screen.hide(800);
    } else {
        screen.show(800);
    }
}

/**
 * Perform login via server pages
 */
function login_via_server() {
    var user_email = document.getElementById('login_user_email').value;
    var result = validate_email(user_email);
    if (result !== 'true') {
        login_help_message(result);
        return;
    }

    var user_pswd = document.getElementById('login_user_password').value;
    result = validate_pswd(user_pswd);
    if (result !== 'true') {
        login_help_message(result);
        return;
    }

    // POST data
    var post_data = {'operation': 'login',
                     'email': user_email,
                     'pswd': user_pswd};
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: post_data,
                 success: login_result,
                 error: login_result_error,
                 timeout: JQUERY_MAX_OPERATION_TIMEOUT});

    // change login picture to rotate numbers
    var login_image = document.getElementById('login_img_id');
    login_image.src = 'img/numbers.png';
    login_image.style.WebkitAnimation = 'login_numbers 4s linear infinite'; // for Safari 4.0 - 8.0
    login_image.style.animation = 'login_numbers 4s linear infinite'; // Standard animation syntax

    // disable all text fields
    document.getElementById('login_user_email').disabled = true;
    document.getElementById('login_user_password').disabled = true;

    login_help_message(page_elements[language].login_waiting);

    // disable close, question, login, remind pswd and registration buttons
    document.getElementById('login_close_button').onclick = "";
    document.getElementById('login_question_button').onclick = "";
    document.getElementById('login_enter_button_img').onclick = "";
    document.getElementById('login_remind_pswd_button_img').onclick = "";
    document.getElementById('login_registration_button_id').onclick = "";
    document.getElementById('remind_password_btn_id').onclick = "";
    document.getElementById('back_password_btn_id').onclick = "";

    // get the number of milliseconds since midnight, January 1, 1970
    current_time = (new Date()).getTime() + 2000;
}

function login_result_error(xhr, textStatus, errorThrown) {
    login_help_message("Login timeout error (" + textStatus + ", " + errorThrown + "), please try one more time later");
    login_enable_fields();
}

function login_result(result) {
    // alert('login_result ' + JSON.stringify(result));
    var response_time = (new Date()).getTime();
    var milliseconds = 0;
    if (response_time < current_time) {
        milliseconds = current_time - response_time;
    }

    if (result.success === false) {
        setTimeout(function() {
            var err = result.error;
            if (error_codes[language][err] !== undefined) {
                err = error_codes[language][err];
            }
            login_help_message(err);
            login_enable_fields();
        }, milliseconds);

    } else {
        setTimeout(function() {
            login_help_message("");
            successful_login(result);}, milliseconds);
        setTimeout("login_enable_fields()", milliseconds);
    }
}

/**
 * Enable all test fields/elements
*/
function login_enable_fields() {
    document.getElementById('login_user_email').disabled = false;
    document.getElementById('login_user_password').disabled = false;
    document.getElementById('login_remind_pswd_email').disabled = false;

    var login_image = document.getElementById('login_img_id')
    login_image.src = 'img/registration_mir.png';
    login_image.style.WebkitAnimation = 'none'; // for Safari 4.0 - 8.0
    login_image.style.animation = 'none'; // Standard animation syntax

    var btn = document.getElementById('login_close_button');
    btn.onclick = function () {login_close_window();};

    btn = document.getElementById('login_question_button');
    btn.onclick = function () {login_help_message();};

    btn = document.getElementById('login_enter_button_img');
    btn.onclick = function () {login_via_server();};

    btn = document.getElementById('login_remind_pswd_button_img');
    btn.onclick = function () {remind_password();};

    btn = document.getElementById('login_registration_button_id');
    btn.onclick = function () {click_window('link_registration');};

    btn = document.getElementById('remind_password_btn_id');
    btn.onclick = function () {send_password();};

    btn = document.getElementById('back_password_btn_id');
    btn.onclick = function () {back_to_login();};
}

function login_close_window() {
    // cleanup help
    login_help_message("");
    // make main page visible
    click_close_window();
    // enable all fields/elements till the registration results from server
    login_enable_fields();
    back_to_login();
}

/**
 * Show login help information
 */
function login_help_message(message) {
    $("#login_div_messages_help_id").fadeOut(300, function() {
        if (message === undefined) {
            $("#login_div_messages_help_id").html(page_elements[language].login_help_message);
            $("#login_div_messages_help_id").css('color', 'black');
        } else {
            $("#login_div_messages_help_id").html(message);
            $("#login_div_messages_help_id").css('color', 'red');
        }
    }).fadeIn(300);
}

/**
 * Function logout
 * Change main page DIV element to 'main_page'
 * Hide user cabinet and 
 */
function logout() {
    // set all main page elements
    set_main_page_elements();

    $("#settings").hide(0);
    $("#welcome").hide(800);

    $("#header_login_id").attr("src", page_elements[language].header_login_img);
    $("#header_login_id").attr("alt", page_elements[language].header_login_alt);
    $("#header_login_id").attr("title", page_elements[language].header_login_ttl);
    $("#header_login_id").attr("onclick", 'login()');

    // user = null; // caused login troubles after
    var keys = Object.keys(user);
    for (var i = 0; i < keys.length; i++) {
        user[keys[i]] = '';
        // use HTML5 Local Storage if browser supports it
        if (typeof(Storage) !== "undefined") {
            var storage_key = 'user_' + keys[i];
            localStorage.setItem(storage_key, '');
        } else {
            // TBD: implement cookies version later
        }
    }

    $("#main_page").show(800);
}

function remind_password() {
    $("#login_id").hide(600);
    var email_value = document.getElementById('login_user_email').value;
    document.getElementById('login_remind_pswd_email').value = email_value;
    $("#remind_id").show(600);
}

function back_to_login() {
    $("#login_id").show(600);
    $("#remind_id").hide(600);
}

function send_password() {
    var user_email = document.getElementById('login_remind_pswd_email');
    var result = validate_email(user_email.value);
    if (result !== 'true') {
        login_help_message(result);
        return;
    }

    // POST data
    var post_data = {'operation': 'remind_pswd',
                     'user_email': user_email.value};
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: post_data,
                 success: send_password_result,
                 error: send_password_error,
                 timeout: JQUERY_MAX_OPERATION_TIMEOUT});

    // change image to rotate numbers
    var login_image = document.getElementById('login_img_id');
    login_image.src = 'img/numbers.png';
    login_image.style.WebkitAnimation = 'login_numbers 4s linear infinite'; // for Safari 4.0 - 8.0
    login_image.style.animation = 'login_numbers 4s linear infinite'; // Standard animation syntax

    login_help_message(page_elements[language].login_waiting);

    document.getElementById('login_remind_pswd_email').disabled = true;

    // disable close, question, login, remind pswd and registration buttons
    document.getElementById('login_close_button').onclick = "";
    document.getElementById('login_question_button').onclick = "";
    document.getElementById('login_enter_button_img').onclick = "";
    document.getElementById('login_remind_pswd_button_img').onclick = "";
    document.getElementById('login_registration_button_id').onclick = "";
    document.getElementById('remind_password_btn_id').onclick = "";
    document.getElementById('back_password_btn_id').onclick = "";

    // get the number of milliseconds since midnight, January 1, 1970
    current_time = (new Date()).getTime() + 2000;
}

function send_password_error(xhr, textStatus, errorThrown) {
    login_help_message("Remind password timeout error (" + textStatus + ", " + errorThrown + "), please try one more time later");
    login_enable_fields();
}

function send_password_result(result) {
    var response_time = (new Date()).getTime();
    var milliseconds = 0;
    if (response_time < current_time) {
        milliseconds = current_time - response_time;
    }

    if (result.success === true) {
        // show alert message after n milliseconds
        setTimeout(function() {
            login_help_message(page_elements[language].remind_pswd_message);
            login_enable_fields();
            document.getElementById('login_user_email').value = result.email;
            document.getElementById('login_user_password').value = '';
            back_to_login();
        }, milliseconds);

    } else {
        // show alert message after n milliseconds
        setTimeout(function() {
            login_help_message('Error: ' + result.error);
            login_enable_fields();
        }, milliseconds);
    }
}

function show_registration() {
    $("#registration_img_text_id").attr("src", page_elements[language].registration_img_text);

    $("#new_user_name").attr("placeholder", page_elements[language].user_name);
    $("#new_user_surname").attr("placeholder", page_elements[language].user_surname);
    $("#new_user_email").attr("placeholder", page_elements[language].user_email);
    $("#new_user_password").attr("placeholder", page_elements[language].user_password);
    $("#new_user_password_confirm").attr("placeholder", page_elements[language].user_password_confirm);

    $("#registration_button_id").html(page_elements[language].registration_button_id);

    click_window('link_registration');

    var script = document.createElement("script");
    script.id = 'google_recaptcha_script_id';
    script.type = 'text/javascript';
    script.src = 'https://www.google.com/recaptcha/api.js?hl=' + language;
    document.body.appendChild(script);
}

function registration() {
    var name_value = document.getElementById('new_user_name').value;
    var result = validate_name(name_value);
    if (result !== 'true') {
        registration_help_message(result);
        return;
    }

    var surname_value = document.getElementById('new_user_surname').value;
    result = validate_name(surname_value);
    if (result !== 'true') {
        registration_help_message(result);
        return;
    }

    var email_value = document.getElementById('new_user_email').value;
    result = validate_email(email_value);
    if (result !== 'true') {
        registration_help_message(result);
        return;
    }

    var user_pswd = document.getElementById('new_user_password').value;
    result = validate_pswd(user_pswd);
    if (result !== 'true') {
        registration_help_message(result);
        return;
    }

    var pswd_conf = document.getElementById('new_user_password_confirm').value;
    result = validate_pswd(pswd_conf);
    if (result !== 'true') {
        registration_help_message(result);
        return;
    }

    if (user_pswd !== pswd_conf) {
        registration_help_message(page_elements[language].reg_pswds_not_match);
        return;
    }

    var recaptcha = grecaptcha.getResponse();
    if ((recaptcha === undefined) ||
        (recaptcha === null) ||
        (recaptcha === '')) {
        registration_help_message(page_elements[language].reg_wrong_code);
        return;
    }

    // POST data
    var post_data = {'operation': 'registration',
                     'name': name_value,
                     'surname': surname_value,
                     'email': email_value,
                     'pswd': user_pswd,
                     'language': language,
                     'g-recaptcha-response': recaptcha};
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: post_data,
                 success: registration_result,
                 error: registration_result_error,
                 timeout: JQUERY_MAX_OPERATION_TIMEOUT});

    // change registration picture to rotate numbers
    var reg_img = document.getElementById('registration_image');
    reg_img.src = 'img/numbers.png';
    reg_img.style.WebkitAnimation = 'login_numbers 4s linear infinite';
    reg_img.style.animation = 'login_numbers 4s linear infinite';

    // if image was hide because of some messages, show it again
    if ($('#registration_image').css('display') === 'none') {
        $("#registration_text").fadeOut(600);
        $("#registration_image").fadeIn(600);
    }

    // disable close, question, login, remind pswd and registration buttons
    document.getElementById('registration_close_button').onclick = "";
    document.getElementById('registration_question_button').onclick = "";
    document.getElementById('registration_button_id').onclick = "";

    // disable all fields/elements till the registration results from server
    document.getElementById('new_user_name').disabled = true;
    document.getElementById('new_user_surname').disabled = true;
    document.getElementById('new_user_email').disabled = true;
    document.getElementById('new_user_password').disabled = true;
    document.getElementById('new_user_password_confirm').disabled = true;

    // get the number of milliseconds since midnight, January 1, 1970
    current_time = (new Date()).getTime() + 2000;
}

function registration_result_error(xhr, textStatus, errorThrown) {
    // call registration_result with NO result data
    registration_help_message("Registration timeout error (" + textStatus + ", " + errorThrown + "), please try one more time");
    registration_enable_fields();
}

function registration_result(result) {
    var milliseconds = 0;
    var response_time = (new Date()).getTime();
    if (response_time < current_time) {
        milliseconds = current_time - response_time;
    }

    if (result.success === false) {
        setTimeout(function() {
            var err = result.error;
            if (error_codes[language][err] !== undefined) {
                err = error_codes[language][err];
            }
            registration_help_message(err);
            registration_enable_fields();
        }, milliseconds);

    } else {
        setTimeout(function() {
            successful_login(result);
            registration_enable_fields();
        }, milliseconds);
    }
}

function registration_enable_fields() {
    // show and enable all elements till the registration results from server
    var reg_img = document.getElementById('registration_image');
    reg_img.src = 'img/registration.png';
    reg_img.style.WebkitAnimation = 'none';
    reg_img.style.animation = 'none';

    // enable close, question, login, remind pswd and registration buttons
    var btn = document.getElementById('registration_close_button');
    btn.onclick = function () {registration_close();};

    btn = document.getElementById('registration_question_button');
    btn.onclick = function () {registration_help_message();};

    btn = document.getElementById('registration_button_id');
    btn.onclick = function () {registration();};

    // enable text fields
    document.getElementById('new_user_name').disabled = false;
    document.getElementById('new_user_surname').disabled = false;
    document.getElementById('new_user_email').disabled = false;
    document.getElementById('new_user_password').disabled = false;
    document.getElementById('new_user_password_confirm').disabled = false;
    document.getElementById('registration_button_id').disabled = false;
}

/*
 * Close button from registration screen should re-enable all buttons/inputs
 */
function registration_close() {
    $("#registration_image").show();
    $("#registration_text").hide();
    // make main page visible
    click_close_window();
    // enable all registration fields
    registration_enable_fields();
}

/**
 * Show login help information
 */
function registration_help_message(message) {
    $("#registration_image").hide();
    $("#registration_text").fadeOut(600, function() {
        if (message === undefined) {
            $("#registration_text").html(page_elements[language].registration_help_message);
            $("#registration_text").css('color', 'black');
        } else {
            $("#registration_text").html(message);
            $("#registration_text").css('color', 'red');
        }
    }).fadeIn(900);
}

/*
    Common function for successful login and registration.
    For login and registration server returns the same set of parameters.

    Usual login/registration server response:
    PASSED,ID,NAME,SURNAME,EMAIL,USERGROUP,STARS,BELT,PRGM
*/
function successful_login(data) {
    // use HTML5 Local Storage if browser supports it
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_name", data.name);
        localStorage.setItem("user_surname", data.surname);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("user_usergroup", data.usergroup);
        localStorage.setItem("user_belt", data.belt);
        localStorage.setItem("user_program", data.program);
        localStorage.setItem("user_stars", data.stars);
        localStorage.setItem("user_solved", data.solved);
        localStorage.setItem("user_avatar", data.avatar);
        localStorage.setItem("user_set_hero", data.set_kbrd);
        localStorage.setItem("user_set_kbrd", data.set_kbrd);
        localStorage.setItem("user_set_time", data.set_time);
        localStorage.setItem("user_set_lngd", data.set_lngd);

        $("#header_login_id").attr("src", page_elements[language].header_logout_img);
        $("#header_login_id").attr("alt", page_elements[language].header_logout_alt);
        $("#header_login_id").attr("title", page_elements[language].header_logout_ttl);
        $("#header_login_id").attr("onclick", 'logout()');

        $("#main_page").hide(800);
        get_local_user_info(); show_user_cabinet(); click_close_window();
        $("#welcome").show(800);

    } else {
        // TBD: Implements save result data via browser's cookies
        alert("NO HTML5 Local Storage, cookies are not implemented yet");
        return;
    }
}

/**
 * show_user_cabinet does not really show aything
 * This function just updates user information fileds, like stars, program, belt etc.
 */
function show_user_cabinet() {
    // alert('user ' + JSON.stringify(user));

    $("#welcome_user_name_id").html(user.name + ' ' + user.surname);
    $("#welcome_user_stars_counter_id").html(user.stars);
    $("#welcome_user_belt_id").attr("src", "img/" + user.belt + ".png");
    $("#welcome_user_picture_img_id").attr("src", user.avatar);

    // RU || EN play button image
    $("#welcome_play_button_id").attr("src", page_elements[language].play_button_img);
    // RU || EN select program image
    $("#select_program_word_img").attr("src", page_elements[language].select_word_img);
    // RU || EN edit user settings
    $("#welcome_user_picture_text_id").html(page_elements[language].welcome_user_picture_text_id);

    if (user.program.indexOf(user.belt) === -1) {
        $("#welcome_current_program_img").attr("src", "img/pgrm_no.png");
        $("#welcome_current_program_img").attr("onclick", "alert(\"" + page_elements[language].no_program_selected + "\")");
        $("#welcome_program_desc_id").html(page_elements[language]['no_program_selected']);
        $("#welcome_program_desc_id").css('text-align', 'center');
        $("#welcome_play_button_id").hide();

    } else {
        $("#welcome_current_program_img").attr("src", "img/" + language + "_" + user.program + ".png");
        $("#welcome_current_program_img").attr("onclick", 'run_user_game()');
        $("#welcome_program_desc_id").html(belt_pgrms[user.belt][user.program]);
        $("#welcome_program_desc_id").css('text-align', 'justify');
        $("#welcome_play_button_id").show();
    }

    var table = document.getElementById('welcome_programs_table_id');
    $("#welcome_programs_table_id").fadeOut(400, function() {
        // remove all previous rows/data from table
        if (table.rows.length > 1) {
            for (var i = table.rows.length-1; i >= 0; i--) {
                table.deleteRow(i);
            }
        }
        var belts = Object.keys(belt_pgrms[user.belt]);
        var row, cell, row_index = 0, cell_index = 0;
        for (var i = 0; i < belts.length; i++) {
            if (cell_index === 0) {
                row = table.insertRow(row_index); row_index++;
                cell = row.insertCell(0); cell_index++;
            } else if (cell_index < 4) {
                    cell = row.insertCell(cell_index); cell_index++;
            } else {
                row = table.insertRow(row_index); row_index++;
                cell = row.insertCell(0); cell_index = 1;
            }
            cell.className = 'welcome_programs_selector_table';
            if (user.solved.indexOf(belts[i]) === -1) {
                if (belts[i] === user.program) {
                    cell.innerHTML = "<img id='pgrm_" + belts[i] + "_id' src='img/" + language + "_" + belts[i] + ".png' onclick='assign_pgrm(\"" + belts[i] + "\")' style='border-color:red;'/>";
                } else {
                    cell.innerHTML = "<img id='pgrm_" + belts[i] + "_id' src='img/" + language + "_" + belts[i] + ".png' onclick='assign_pgrm(\"" + belts[i] + "\")'/>";
                }
            } else {
                cell.innerHTML += "<img src='img/" + language + "_" + belts[i] + ".png' style='cursor:no-drop;'/>";
                cell.style.opacity = "0.5";
            }
        }
    }).fadeIn(600);
}

function show_hide_belt_selector() {
    $("#tooltip_txt_white").html(page_elements[language].tooltip_txt_white);
    $("#tooltip_txt_orange").html(page_elements[language].tooltip_txt_orange);
    $("#tooltip_txt_blue").html(page_elements[language].tooltip_txt_blue);
    $("#tooltip_txt_yellow").html(page_elements[language].tooltip_txt_yellow);
    $("#tooltip_txt_green").html(page_elements[language].tooltip_txt_green);
    $("#tooltip_txt_brown").html(page_elements[language].tooltip_txt_brown);
    $("#tooltip_txt_black").html(page_elements[language].tooltip_txt_black);
    $("#tooltip_belts_details").html(page_elements[language].tooltip_belts_details);

    if ($('#welcome_belt_tooltiptext_id').css('display') === 'none') {
        // $('#welcome_belt_tooltiptext_id').css("top", );
        $('#welcome_belt_tooltiptext_id').offset({top: -170});
        $("#welcome_belt_tooltiptext_id").fadeIn(600);
    } else {
        $("#welcome_belt_tooltiptext_id").fadeOut(600);
    }
}

function select_user_belt(color) {
    $("#welcome_belt_tooltiptext_id").fadeOut(600);

    user.belt = color;
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('user_belt', color);
    } else {
        // TBD: implement cookies version later
    }

    // show user cabinet with updated belt
    show_user_cabinet();
}

function assign_pgrm(program_id) {
    // alert("user.program " + user.solved + ", program_id " + program_id);
    if ((user.solved.indexOf(program_id) === -1) &&
        (user.program.indexOf(program_id) === -1)) {
        // return black border for previous program: 'pgrm_" + belts[i] + "_id'        
        var elem = document.getElementById('pgrm_' + user.program + '_id');
        if (elem !== null) {
            elem.style.borderColor = 'black';
        }
        // set red border for selected program
        elem = document.getElementById('pgrm_' + program_id + '_id');
        elem.style.borderColor = 'red';

        // hide and show new icon for selected user program
        $("#welcome_current_program_img").fadeOut(400, function() {
            $("#welcome_current_program_img").attr("src", "img/" + language + "_" + program_id + ".png");
            $("#welcome_current_program_img").attr("onclick", 'run_user_game()');
        }).fadeIn(400);

        // hide and show program description
        $("#welcome_program_desc_id").fadeOut(400, function() {
            $("#welcome_program_desc_id").html(belt_pgrms[user.belt][program_id]);
            $("#welcome_program_desc_id").css('text-align', 'justify');
            $("#welcome_play_button_id").show();
        }).fadeIn(400);

        user.program = program_id; localStorage.setItem("user_program", program_id);
    }
}

function run_user_game() {
    // alert('pgrms_args ' + JSON.stringify(pgrms_args));
    if (user !== undefined) {
        if (user.program.length > 0) {
            var function_args = pgrms_args[user.program];
            if (function_args !== null) {
                run_game.apply(this, function_args);
            } else {
                alert("User program is undefined OR has troubles with arguments");
            }

        } else {
            alert("User program was not selected user.program.length " + user.program.length);
        }
    } else {
        alert("User is undefined, you have to LOGIN");
    }
}

function sync_user_stars_and_show_top_10() {
    document.getElementById('link_top10_id').click();
    get_top_10(); disable_scrolling(); send_user_stars(0);
}

function send_user_stars(stars_counter) {
    if ((user === undefined) ||
        (user.id.length < 1)) {
        return;
    }

    var data = {'operation': 'add_user_stars',
                'user_id': user.id,
                'program': user.program,
                'belt': user.belt,
                'stars': stars_counter,
                'solved': user.solved};
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: data,
                 success: send_user_stars_result});
}

function send_user_stars_result(result) {
    // if user logout -> nothing to update locally
    if ((user === undefined) ||
        (user.id.length < 1)) {
        return;
    }

    if (result === undefined) {
        alert("Update user stars timeout error");

    } else if (result.success === true) {
        if (user.id === result.user_id) {
            user.stars = result.stars;
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("user_stars", result.stars);

            } else {
                // users does not match
            }
            document.getElementById('welcome_user_stars_counter_id').innerHTML = result.stars;

        } else {
            // TBD: save in cookies
        }

    } else {
        alert(result.error);
    }
}

/**
 * Open an URL in new browser's tab
 */
function open_url_in_new_tab(type) {
    if (type === 'chrome') {
        var url = 'https://chrome.google.com/webstore/detail/mpceafdmcbkmegjfcfnkkpbogpgbpfdh/';
    } else if (type === 'samsung') {
        var url = 'http://www.samsung.com/us/mobile/tablets/all-other-tablets/samsung-kids-tab-e-lite-7-0-8gb-wi-fi-white-with-bumper-case-sm-t113ndwaccc/';
    } else {
        return;
    }
    var win = window.open(url, '_blank');
    win.focus();
}

// click_close_window();
function get_top_10() {
    var post_data = {'operation': 'get_top_users',
                     'number': 10};
    jQuery.ajax({type: "POST",
                 url: JQUERY_URL,
                 dataType: 'json',
                 data: post_data,
                 error: get_top_10_error,
                 success: get_top_10_results,
                 timeout: 10000});
}

function get_top_10_error(xhr, textStatus, errorThrown) {
    alert('get_top_10_error, xhr.status ' + xhr.status + ', textStatus '
          + textStatus + ', errorThrown ' + errorThrown);
}

function get_top_10_results(data) {
    // alert('get_top_10_results ' + JSON.stringify(data));
    var table = document.getElementById('top10_table_id');
    // remove all previous rows/data from table
    if (table.rows.length > 0) {
        for (var i = table.rows.length-1; i >= 0; i--) {
            table.deleteRow(i);
        }
    }

    if ((data !== null) && (data !== undefined)) {
        if (data[0].success === true) {
            if (data.length > 1) {
                for (var i = 1; i < data.length; i++) {
                    var row = table.insertRow(i-1);
                    var cell0 = row.insertCell(0);
                    cell0.innerHTML = i;

                    var cell1 = row.insertCell(1);
                    cell1.innerHTML = data[i]['NAME'] + ' ' + data[i]['SURNAME'];

                    var cell2 = row.insertCell(2);
                    cell2.innerHTML = data[i]['STARS'];
                }
            } else {
                var row = table.insertRow(0);
                var cell = row.insertCell(0);
                cell.innerHTML = 'No data';
            }
        }
    }
}

/**
 * Set next user program:
 * 1. Find next available program after user.program in pgrms_order array
 * 2. If program matches a new belt -> change user belt
 * 3. Add curr_user_pgrm in user.solved list
 */
function set_next_user_program() {
    var curr_user_pgrm = user.program;
    if (curr_user_pgrm.length > 0) {
        var pgrms_order = Object.keys(pgrms_args);
        var index = -1;
        for (var i = 0; i < pgrms_order.length; i++) {
            if (curr_user_pgrm === pgrms_order[i]) {
                if (i < pgrms_order.length-1) {
                    // take next index
                    index = i + 1;
                    break;
                }
            }
        }

        // if did not find any program -> exit
        if (index === -1) {
            alert('No more programs available');
            return;
        }

        while (index < pgrms_order.length) {
            if (user.solved.indexOf(pgrms_order[index]) === -1) {
                var new_pgrm = pgrms_order[index];

                // add curr_user_pgrm in solved list and exclude
                user.solved += curr_user_pgrm + ",";
                localStorage.setItem('user_solved', user.solved);

                localStorage.setItem("user_program", new_pgrm);
                user.program = new_pgrm;

                // check that current belt == program color belt
                var belt_color = user.belt;
                if (new_pgrm.indexOf(user.belt) === -1) {
                    var under = new_pgrm.indexOf('_');
                    belt_color = new_pgrm.substring(0, under);
                }

                // select_user_belt() calls -> show_user_cabinet();
                select_user_belt(belt_color);
                return;
            }
            // increment and try one more time
            index++;
        }

        alert('All programs solved');
    }
}

function disable_scrolling() {
    // simply adding 'stop-scrolling' class to the body
    $('body').addClass('disable_page_scrolling');

    // for mobile devices, need to handle the touchmove event:
    $('body').bind('touchmove', function(e){e.preventDefault();})
}

function enable_scrolling() {
    // remove 'stop-scrolling' class from the body
    $('body').removeClass('disable_page_scrolling');

    // for mobile devices, unbind to re-enable scrolling. Tested in iOS6 and Android 2.3.3
    $('body').unbind('touchmove');
}

/**
 * Show belt's descriptions/explanation per language
 */
function show_belts_description() {
    hide_show_main_page('hide');
    var belt_keys = Object.keys(belts_descs[language]);
    for (var i = 0; i < belt_keys.length; i++) {
        var div_id = belt_keys[i];
        var value = belts_descs[language][div_id];
        document.getElementById(div_id).innerHTML = value;
    }
}

/**
 * Show about us section per language
 */
function show_about_us() {
    var about_keys = Object.keys(about_us_pages[language]);
    for (var i = 0; i < about_keys.length; i++) {
        var div_id = about_keys[i];
        var value = about_us_pages[language][div_id];
        document.getElementById(div_id).innerHTML = value;
    }

    click_window('link_about_us');
}

/**
 * Change web site language
 */
function change_language() {
    if (typeof(Storage) !== "undefined") {
        language = localStorage.getItem('user_language');
    }

    if (language === 'ru') {language = 'en';} else {language = 'ru';}
    localStorage.setItem('user_language', language);

    var div_keys = Object.keys(locale[language]);
    // language and div_keys defined in index.html header section
    for (var i = 0; i < div_keys.length; i++) {
        var div_id = div_keys[i];
        var value = locale[language][div_id];
        document.getElementById(div_id).innerHTML = value;
    }

    page_header_images();
    set_main_page_elements();

    $("#select_program_word_img").attr("src", page_elements[language].select_word_img);
    $("#welcome_play_button_id").attr("src", page_elements[language].play_button_img);
}

function set_main_page_elements() {
    var div_keys = Object.keys(locale[language]);
    // language and div_keys defined in index.html header section
    for (var i = 0; i < div_keys.length; i++) {
        var div_id = div_keys[i];
        var value = locale[language][div_id];
        document.getElementById(div_id).innerHTML = value;
    }

    $("#sm_topic_registration_id").attr("src", page_elements[language].register_img);
    $("#sm_topic_registration_id").attr("alt", page_elements[language].register_alt);
    $("#sm_topic_registration_id").attr("title", page_elements[language].register_alt);

    $("#sm_topic_registration_pictire_id").attr("alt", page_elements[language].register_alt);
    $("#sm_topic_registration_pictire_id").attr("title", page_elements[language].register_alt);

    $("#banner_1_img").attr("src", page_elements[language].banner_1_img);
    $("#banner_2_img").attr("src", page_elements[language].banner_2_img);
    $("#banner_3_img").attr("src", page_elements[language].banner_3_img);
    $("#banner_4_img").attr("src", page_elements[language].banner_4_img);
    $("#banner_5_img").attr("src", page_elements[language].banner_5_img);
}

/**
 * Change main page header images
 * All other page elements (div's, images etc.) may be not loaded yes (or in progress)
 */
function page_header_images() {
    $("#header_logo_id").attr("title", page_elements[language].header_logo_ttl);

    $("#header_aboutus_id").attr("src", page_elements[language].header_about_us_img);
    $("#header_aboutus_id").attr("alt", page_elements[language].header_about_us_alt);
    $("#header_aboutus_id").attr("title", page_elements[language].header_about_us_ttl);

    $("#header_help_id").attr("src", page_elements[language].header_help_img);
    $("#header_help_id").attr("alt", page_elements[language].header_help_alt);
    $("#header_help_id").attr("title", page_elements[language].header_help_ttl);

    if (get_local_user_info()) {
        $("#header_login_id").attr("src", page_elements[language].header_logout_img);
        $("#header_login_id").attr("alt", page_elements[language].header_logout_alt);
        $("#header_login_id").attr("title", page_elements[language].header_logout_ttl);
        $("#header_login_id").attr("onclick", 'logout()');

    } else {
        $("#header_login_id").attr("src", page_elements[language].header_login_img);
        $("#header_login_id").attr("alt", page_elements[language].header_login_alt);
        $("#header_login_id").attr("title", page_elements[language].header_login_ttl);
        $("#header_login_id").attr("onclick", 'login()');
    }
}

function file_upload() {
    var preview = document.getElementById('settings_element_avatar_img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    $('#settings_element_avatar_img').change(function() {
        var frm = new FormData();
        frm.append('settings_element_avatar_type', document.querySelector('input[type=file]').files[0]);
        $.ajax({
            method: 'POST',
            address: 'http://supermath.ru/test/avatars/test_img.png',
            data: frm,
            contentType: false,
            processData: false,
            cache: false
        });
    });

    if (file) {
        reader.readAsDataURL(file);
    }
}

function show_user_settings() {
    $("#welcome").hide(800);

    $("#settings_element_avatar_img").attr("src", user.avatar);

    $("#settings_name").attr("value", user.name);
    $("#settings_surname").attr("value", user.surname);
    $("#settings_email").attr("value", user.email);

    $("#settings").show(800);
}
