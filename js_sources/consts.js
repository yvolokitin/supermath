/** @const {number} */
var MIN_NAME_LENGTH = 2;
/** @const {number} */
var MAX_NAME_LENGTH = 64;

/** @const {number} */
var MIN_PSWD_LENGTH = 6;
/** @const {number} */
var MAX_PSWD_LENGTH = 32;

/** @const {string} */
var EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
/** @const {string} */
var PSWD_PATTERN = /[a-zA-Z0-9!@#$%^&*.,]{6,32}$/;
/** @const {string} */
var NAME_PATTERN = /[a-zA-Z0-9а-яА-Я]{1,64}$/;

/** @const {string[]} */
var locale = {
    'ru': {
        'sm_topic_4_description_id': 'Используйте SuperMath как математические витамины! Предлагайте ребенку регулярно решать примеры в SuperMath всего ОДИН раз в день, в течение пяти минут, и вы заметите, насколько быстрее и точнее он станет оперировать цифрами. Скорость и правильность вычислений - это те кирпичики, которыми выкладывается фундамент математического образования вашего ребенка.',
        'sm_topic_5_text_id': 'Задачи для детей от 3 до 6 лет на сложение и вычитание однозначных чисел (от 0 до 9). Результатом сложения может быть однозначное или двузначное число, результатом вычитания - ноль или однозначное число.',
        'sm_topic_6_text_id': 'Задачи для детей от 5 до 8 лет на сложение и вычитание двузначных чисел (от 10 до 99). Результатом сложения может быть двузначное или трехзначное число. Результатом вычитания может быть ноль, однозначное или двузначное число.',
        'sm_topic_7_text_id': 'Задачи для детей от 6 до 9 лет на умножение однозначных чисел (от 0 до 9), в которых известны оба множители и нужно найти результат произведения этих чисел.',
        'sm_topic_8_text_id': 'Задачи для детей от 8 до 11 лет на сложение и вычитание целых чисел (однозначных и двузначных) с разными знаками. Результатом может быть 0, положительное или отрицательное число.',
        'sm_topic_1_text_id': 'Задачи для детей от 3 до 6 лет на сравнение двух однозначных чисел (от 0 до 9), используя знаки больше (>), меньше (<) или равно (=).',
        'footer_contacts_id': 'Контакты',
        'footer_aboutus_id': 'О нас',
        'footer_advertisement_id': 'Реклама',
        'footer_language_id': 'SuperMath.ru in English'
    },
    'en': {
        'sm_topic_4_description_id': 'Use SuperMath as mathematical vitamins! Offer the child to regularly solve the examples in SuperMath only once a day, for five minutes, and you will notice how much faster and more accurately he will operate on the numbers. The speed and accuracy of the calculations - these are the bricks that lay the foundation of your child\'s mathematical education',
        'sm_topic_5_text_id': 'Tasks for 3 - 6 years kids for addition and subtraction of one-digit numbers. The result of addition can be an one or two digit number, the result of subtraction is zero or a one-digit number.',
        'sm_topic_6_text_id': 'Tasks for 5 - 8 years kids for addition and subtraction of two-digit numbers (from 10 to 99). The result of addition can be a two-digit or three-digit number. The result of the subtraction can be zero, one-digit or two-digit number.',
        'sm_topic_7_text_id': 'Tasks for 6 - 9 years kids for the multiplication of one-valued numbers (from 0 to 9).',
        'sm_topic_8_text_id': 'Tasks for 8 - 11 years kids for the addition and subtraction of integers (one-digit and two-digit numbers) with different signs. The result can be 0, a positive or negative number.',
        'sm_topic_1_text_id': 'Tasks for 3 - 6 years kids for comparision of one-digit numbers (from 0 to 9). You can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task.',
        'footer_contacts_id': 'Contacts',
        'footer_aboutus_id': 'About us',
        'footer_advertisement_id': 'Advertisement',
        'footer_language_id': 'SuperMath.ru на русском'
    }
};

/** @const {string[]} */
var page_elements = {
    'ru': {
        'header_logo_ttl': 'SuperMath - Математика, обучение',
        'header_about_us_img': 'img/ru_sm_about_us.png',
        'header_about_us_alt': 'О нас',
        'header_about_us_ttl': 'SuperMath - О программе!',
        'header_help_img': 'img/ru_sm_help.png',
        'header_help_alt': 'Помощь',
        'header_help_ttl': 'SuperMath - Помощь?',
        'header_login_img': 'img/ru_sm_enter.png',
        'header_login_alt': 'Войти',
        'header_login_ttl': 'SuperMath - Войти',
        'header_logout_img': 'img/ru_sm_exit.png',
        'header_logout_alt': 'Выйти',
        'header_logout_ttl': 'SuperMath - Выйти',
        'banner_1_img': 'img/ru_banner_1.png',
        'banner_2_img': 'img/ru_banner_2.png',
        'banner_3_img': 'img/ru_banner_3.png',
        'banner_4_img': 'img/ru_banner_4.png',
        'banner_5_img': 'img/ru_banner_5.png',
        'register_img': 'img/ru_sm_registration.png',
        'register_alt': 'SuperMath Регистрация',
        'registration_img_text': 'img/ru_sm_new_user.png',
        'select_word_img': 'img/ru_sm_select_pgrm.png',
        'user_name': 'ИМЯ',
        'user_surname': 'ФАМИЛИЯ',
        'user_email': 'EMAIL',
        'user_password': 'ПАРОЛЬ',
        'user_password_confirm': 'ПОДТВЕРДИТЕ ПАРОЛЬ',
        'registration_button_id': 'ЗАРЕГИСТРИРОВАТЬСЯ',
        'reg_pswds_not_match': 'Пароли не совпадают!',
        'reg_wrong_code': 'Неверный код проверки! Поставьте галочку в поле \'Я не робот\' и нажмите на кнопку \'Зарегистрироваться\'',
        'reg_wrong_name_len': 'Имя должно состоять минимум из ' + MIN_NAME_LENGTH + ', но не более ' + MAX_NAME_LENGTH + ' символов',
        'reg_wrong_name_chr': 'Имя должно состоять только из символов русского и латинского алфавитов',
        'reg_wrong_pswd_len': 'Пароль должен состоять минимум из ' + MIN_PSWD_LENGTH + ', но не более ' + MAX_PSWD_LENGTH + ' символов латинского алфавита',
        'reg_wrong_pswd_chr': 'Пароль должен состоять только из символов латинского алфавита, цифр и сцециальных символов (!@#$%^&*)',
        'reg_wrong_email_short': 'Email слишком короткий',
        'reg_wrong_email_len': 'Email слишком длинный, максимальная разрешенная длина 129 символов',
        'reg_wrong_email_ptrn': 'Email должен содерджать mailbox@hostname.domain',
        'reg_wrong_email_at': 'Email должен содерджать mailbox@hostname.domain',
        'registration_help_message': 'Для регистрации, вам необходимо указать Имя, Фамилию, Email и пароль (пароль нужно ввести дважды для подтверждения). Поставьте галочку в поле \'Я не робот\' и нажмите на кнопку \'Зарегистрироваться\'',
        'remind_pswd_message': 'Пароль выслан на вашу электронную почту (письмо должно прийти в течении 10 минут)',
        'login_help_message': 'Для входа в ваш аккаунт, необходимо ввести email и пароль, который вы указали при регистрации.<br>Если вы забыли пароль нажмите на кнопку \'Забыли пароль?\', введите email и нажмите \'Отправить\' - в течении 10 минут вы получите письмо, в котором будет содержаться пароль.<br>Если вы незарегистрированы на сайте, нажмите на кнопку \'Регистрация\' и следуйте дальнейшим инструкциям',
        'login_waiting': 'Пожалуйста, подождите несколько секунд ...',
        'login_entr_img': 'img/ru_sm_login_enter.png',
        'login_pswd_img': 'img/ru_sm_login_pswd.png',
        'login_send_img': 'img/ru_sm_send.png',
        'login_back_img': 'img/ru_sm_back.png',
        'no_program_selected': 'Пожалуйста, выберите программу из списка ниже',
        'play_button_img': 'img/ru_sm_play.png',
        'tooltip_txt_white': 'Задачи для детей от 3 до 6 лет',
        'tooltip_txt_orange': 'Задачи для детей от 4 до 7 лет',
        'tooltip_txt_blue': 'Задачи для детей от 5 до 8 лет',
        'tooltip_txt_yellow': 'Задачи для детей от 6 до 9 лет',
        'tooltip_txt_green': 'Задачи для детей от 7 до 10 лет',
        'tooltip_txt_brown': 'Задачи для детей от 8 до 11 лет',
        'tooltip_txt_black': 'Задачи для детей от 11 лет и взрослых',
        'tooltip_belts_details': 'Показать описание',
        'welcome_user_picture_text_id': 'Редактировать<br>пользовательские<br>данные',
        'non_registered_usr_finish': 'Вам нужно зарегистрироваться на сайте SuperMath для просмотра результатов и бесплатного доступа к более чем 50 различным математическим программам.<br><br><br>Вы можете зарегистрироваться в программе <a href="#registration" onclick="game_stop();show_registration()">по сылке</a>.<br><br><br>Для <a href="#login" onclick="game_stop();login()">входа</a> в систему вам нужно указать email и пароль, который вы использовали при регистрации.',
        'res_congratulation': 'Поздравляем, вы перешли на новый уровень!',
        'res_finished': 'Поздравляем, вы не допустили ни одной ошибки!',
        'finished_stars': 'Заработано звезд +',
        'finished_tasks': 'Всего решенных задач ',
        'finished_passd': 'Правильных ответов ',
        'finished_error': 'Ошибок '
    },
    'en': {
        'header_logo_ttl': 'SuperMath - Mathematics, education',
        'header_about_us_img': 'img/en_sm_about_us.png',
        'header_about_us_alt': 'About us',
        'header_about_us_ttl': 'SuperMath - About us!',
        'header_help_img': 'img/en_sm_help.png',
        'header_help_alt': 'Help',
        'header_help_ttl': 'SuperMath - Need help?',
        'header_login_img': 'img/en_sm_enter.png',
        'header_login_alt': 'Enter',
        'header_login_ttl': 'SuperMath - Enter',
        'header_logout_img': 'img/en_sm_exit.png',
        'header_logout_alt': 'Exit',
        'header_logout_ttl': 'SuperMath - Exit',
        'banner_1_img': 'img/en_banner_1.png',
        'banner_2_img': 'img/en_banner_2.png',
        'banner_3_img': 'img/en_banner_3.png',
        'banner_4_img': 'img/en_banner_4.png',
        'banner_5_img': 'img/en_banner_5.png',
        'register_img': 'img/en_sm_registration.png',
        'register_alt': 'SuperMath Registration',
        'registration_img_text': 'img/en_sm_new_user.png',
        'select_word_img': 'img/en_sm_select_pgrm.png',
        'user_name': 'NAME',
        'user_surname': 'SURNAME',
        'user_email': 'EMAIL',
        'user_password': 'PASSWORD',
        'user_password_confirm': 'CONFIRM PASSWORD',
        'registration_button_id': 'REGISTER',
        'reg_pswds_not_match': 'Passwords do not match!',
        'reg_wrong_code': 'Wrong security code check! Please, enter valid response for Google\'s recaptcha',
        'reg_wrong_email_short': 'Email is too short',
        'reg_wrong_name_len': 'Name should contain min ' + MIN_NAME_LENGTH + ', but not more than ' + MAX_NAME_LENGTH + ' symbols',
        'reg_wrong_name_chr': 'Name should consist from English alphabet characters only',
        'reg_wrong_pswd_len': 'Password should contain min ' + MIN_PSWD_LENGTH + ', but not more than ' + MAX_PSWD_LENGTH + ' symbols',
        'reg_wrong_pswd_chr': 'Password should consist from English alphabet characters, numbers (0..9) or special symbols (!@#$%^&*)',
        'reg_wrong_email_len': 'Email is too long, the maximum allowed length is 129 characters',
        'reg_wrong_email_ptrn': 'Email should contain mailbox@hostname.domain',
        'reg_wrong_email_at': 'Email should contain mailbox@hostname.domain',
        'registration_help_message': 'You have to enter First (NAME) and Last (SURNAME) names, Email and Password (enter password twice for confirmation).<br>Add a tick in \'I\'m not a robot\' field and press \'REGISTER\' button.<br>Email address should be unique. You can\'t have a couple accounts with the same email.<br><br>If you have already had account with SuperMath, please use login/sign up link.',
        'remind_pswd_message': 'The password has been sent in Email address, you should receive it within 10 minutes',
        'login_help_message': 'You have to enter email address and password that you used, when registered.<br>If you forgot your password, click by \'Forgot password?\' button, enter your Email address and press \'Send\', within 10 minutes you will receive email with password.<br><br>If you do not have SuperMath account, click by \'REGISTRATION\' button and follow the futher instructions',
        'login_waiting': 'Please, wait a few seconds ...',
        'login_entr_img': 'img/en_sm_login_enter.png',
        'login_pswd_img': 'img/en_sm_login_pswd.png',
        'login_send_img': 'img/en_sm_send.png',
        'login_back_img': 'img/en_sm_back.png',
        'no_program_selected': 'Please, choose a program from the list below',
        'play_button_img': 'img/en_sm_play.png',
        'tooltip_txt_white': 'Tasks for 3 - 6 years kids',
        'tooltip_txt_orange': 'Tasks for 4 - 7 years kids',
        'tooltip_txt_blue': 'Tasks for 5 - 8 years kids',
        'tooltip_txt_yellow': 'Tasks for 6 - 9 years kids',
        'tooltip_txt_green': 'Tasks for 7 - 10 years kids',
        'tooltip_txt_brown': 'Tasks for 8 - 11 years kids',
        'tooltip_txt_black': 'Tasks for 11+ year kids and adults',
        'tooltip_belts_details': 'Show Belt\'s description',
        'welcome_user_picture_text_id': 'Edit user<br>information',
        'non_registered_usr_finish': 'You have to have SuperMath account to view your results and to get FREE access to more than 50 different math programs.<br><br><br>You can create SuperMath account <a href="#registration" onclick="game_stop();show_registration()">here</a>.<br><br><br><a href="#login" onclick="game_stop();login()">For login</a> you have to use email and password.',
        'res_congratulation': 'Congratulations, you have moved to a new level!',
        'res_finished': 'Congratulations, you have NO mistakes!',
        'finished_stars': 'Added stars +',
        'finished_tasks': 'Solved tasks ',
        'finished_passd': 'Right answers ',
        'finished_error': 'Mistakes '
    }
};

/** @const {number} */
var PASSED_HEROES = 9;
/** @const {number} */
var FAILED_HEROES = 15;
/** @const {number} */
var YELLOW_HEROES = 5;

/** @const {string}, math operations */
var TYPE_MO = 'mo';
/** @const {string} */
var TYPE_CO = 'co';

/** @const {object} */
var pgrms_args = {
    'white_1': [TYPE_CO, '<=>', '1,1', 'result', 10, 'game'],
    'white_2': [TYPE_CO, '+-', '1,1', 'operation', 10, 'game'],
    'white_3': [TYPE_MO, '+', '1,1', 'result', 10, 'game'],
    'white_4': [TYPE_MO, '+', '1,1', 'number_2', 10, 'game'],
    'white_5': [TYPE_MO, '+', '1,1', 'number_1', 10, 'game'],
    'white_6': [TYPE_MO, '-', '1,1', 'result', 10, 'game'],
    'white_7': [TYPE_MO, '-', '1,1', 'number_2', 10, 'game'],
    'white_8': [TYPE_MO, '-', '1,1', 'number_1', 10, 'game'],
    'white_9': [TYPE_MO, '+-', '1,1', 'result', 10, 'game'],

    'orange_1': [TYPE_CO, '<=>', '2,2', 'result', 10, 'game'],
    'orange_2': [TYPE_MO, '+-', '1,1,10,10', 'result', 10, 'game'],
    'orange_3': [TYPE_MO, '+-', '1,1,10,1', 'result', 20, 'game'],
    'orange_4': [TYPE_MO, '+', '2,1', 'result', 20, 'game'],
    'orange_5': [TYPE_MO, '+', '2,1', 'number_2', 20, 'game'],
    'orange_6': [TYPE_MO, '+', '2,1', 'number_1', 20, 'game'],
    'orange_7': [TYPE_MO, '-', '2,1', 'result', 20, 'game'],
    'orange_8': [TYPE_MO, '-', '2,1', 'number_2', 20, 'game'],
    'orange_9': [TYPE_MO, '-', '2,1', 'number_1', 20, 'game'],
    'orange_10': [TYPE_MO, '+', '1,2', 'result', 20, 'game'],
    'orange_11': [TYPE_MO, '+', '1,2', 'number_2', 20, 'game'],
    'orange_12': [TYPE_MO, '+', '1,2', 'number_1', 20, 'game'],
    'orange_13': [TYPE_MO, '+-', '2,1', 'result', 20, 'game'],

    'blue_1': [TYPE_CO, '<=>', '3,3', 'result', 10, 'game'],
    'blue_2': [TYPE_MO, '+-', '1,1,100,100', 'result', 20, 'game'],
    'blue_3': [TYPE_MO, '+-', '1,1,100,10', 'result', 20, 'game'],
    'blue_4': [TYPE_MO, '+', '3,1', 'result', 20, 'game'],
    'blue_5': [TYPE_MO, '-', '3,1', 'result', 20, 'game'],
    'blue_6': [TYPE_MO, '+', '1,3', 'result', 20, 'game'],
    'blue_7': [TYPE_MO, '+', '2,2', 'result', 40, 'game'],
    'blue_8': [TYPE_MO, '+', '2,2', 'number_2', 40, 'game'],
    'blue_9': [TYPE_MO, '+', '2,2', 'number_1', 40, 'game'],
    'blue_10': [TYPE_MO, '-', '2,2', 'result', 40, 'game'],
    'blue_11': [TYPE_MO, '-', '2,2', 'number_2', 40, 'game'],
    'blue_12': [TYPE_MO, '-', '2,2', 'number_1', 40, 'game'],
    'blue_13': [TYPE_MO, '+-', '2,2', 'result', 40, 'game'],
    // 'blue_14': [TYPE_MO, '+', '3,2', 'result', 60, 'game'],
    // 'blue_15': [TYPE_MO, '+', '2,3', 'result', 60, 'game'],
    // 'blue_16': [TYPE_MO, '-', '3,2', 'result', 60, 'game'],

    'yellow_1': [TYPE_MO, '*', '1,1', 'result', 10, 'game'],
    'yellow_2': [TYPE_MO, '*', '1,1', 'number_1', 10, 'game'],
    'yellow_3': [TYPE_MO, '*', '1,1', 'number_2', 10, 'game'],
    'yellow_4': [TYPE_MO, '/', '1,1', 'result', 10, 'game'],
    'yellow_5': [TYPE_MO, '/', '1,1', 'number_2', 10, 'game'],
    'yellow_6': [TYPE_MO, '/', '1,1', 'number_1', 10, 'game'],
    'yellow_7': [TYPE_MO, '/', '1,1', 'number_1', 10, 'game'],
    'yellow_8': [TYPE_MO, '/', '1,1', 'number_1', 10, 'game'],
    'yellow_9': [TYPE_MO, '/', '1,1', 'number_1', 10, 'game'],
    'yellow_10': [TYPE_CO, '+-*/', '1,1', 'operation', 10, 'game'],
    'yellow_11': [TYPE_MO, '+-*/', '1,1', 'result', 10, 'game'],

    'green_1': [TYPE_MO, '*', '2,1', 'result', 40, 'game'],
    'green_2': [TYPE_MO, '*', '2,1', 'number_1', 40, 'game'],
    'green_3': [TYPE_MO, '*', '2,1', 'number_2', 40, 'game'],
    'green_4': [TYPE_MO, '*', '2,2', 'result', 60, 'game'],
    'green_5': [TYPE_MO, '*', '2,2', 'number_1', 60, 'game'],
    'green_6': [TYPE_MO, '*', '2,2', 'number_2', 60, 'game'],

    'brown_1': [TYPE_MO, '+', '-2,2', 'result', 20, 'game'],
    'brown_2': [TYPE_MO, '-', '-2,2', 'result', 20, 'game'],
    'brown_3': [TYPE_MO, '+-', '-2,2', 'result', 20, 'game'],
    'brown_4': [TYPE_MO, '*', '-1,1', 'result', 20, 'game'],
    'brown_5': [TYPE_MO, '/', '-1,1', 'result', 20, 'game'],
    'brown_6': [TYPE_MO, '*/', '-1,1', 'result', 20, 'game'],

    'black_1': [TYPE_MO, '+-', '3,3', 'result', 30, 'game'],
    'black_2': [TYPE_MO, '+-', '4,4', 'result', 40, 'game'],
    'black_3': [TYPE_MO, '*', '3,1', 'result', 60, 'game'],
    'black_4': [TYPE_MO, '*', '3,2', 'result', 90, 'game'],
    'black_5': [TYPE_MO, '*', '3,3', 'result', 120, 'game']
};


/** @const {object} */
var belt_pgrms_ru = {
    'white': {
        'white_1': 'Задачи на сравнение двух однозначных целых чисел (от 0 до 9), используя знаки больше (>), меньше (<) или равно (=). На решение каждой задачи дается 10 секунд',
        'white_2': 'Задачи на определение одного из двух арифметических действий: сложение или вычитание. Известны оба аргумента и результат операции. На решение каждой задачи дается 10 секунд',
        'white_3': 'Задачи на сложение (операции со знаком +) целых однозначных чисел (от 0 до 9). Результатом сложения может быть однозначное или двузначное число. На решение каждой задачи дается 10 секунд',
        'white_4': 'Задачи на сложение (операции со знаком +) целых однозначных чисел (от 0 до 9), в которых известна сумма (результат операции) и первое слагаемое (число). Необходимо вычислить второе слагаемое. На решение каждой задачи дается 10 секунд',
        'white_5': 'Задачи на сложение (операции со знаком +) целых однозначных чисел (от 0 до 9), в которых известна сумма (результат операции) и второе слагаемое (число). Необходимо вычислить первое слагаемое. На решение каждой задачи дается 10 секунд',
        'white_6': 'Задачи на вычитание (операции со знаком -) целых однозначных чисел (от 0 до 9). Результатом вычитания (разностью) может быть однозначное положительное число или ноль. На решение каждой задачи дается 10 секунд',
        'white_7': 'Задачи на вычитание (операции со знаком -) целых однозначных чисел (от 0 до 9), в которых известна разность (результат вычитания) и вычитаемое число (второй аргумент). Необходимо найти уменьшаемое число (первый аргумент). На решение каждой задачи дается 10 секунд',
        'white_8': 'Задачи на вычитание (операции со знаком -) целых однозначных чисел (от 0 до 9), в которых известна разность (результат вычитания) и уменьшаемое число (первый аргумент). Необходимо найти вычитаемое число (второй аргумент). На решение каждой задачи дается 10 секунд',
        'white_9': 'Задачи на сложение и вычитание целых однозначных чисел (от 0 до 9). Результатом сложения может быть целое однозначное или двузначное число, результатом вычитания положительное однозначное число или ноль. На решение каждой задачи дается 10 секунд'
        },
    'orange': {
        'orange_1': 'Задачи на сравнение целых двузначных чисел (от 10 до 99), используя знаки больше (>), меньше (<) или равно (=). На решение каждой задачи дается 10 секунд',
        'orange_2': 'Задачи на сложение и вычитание круглых чисел от 10 до 100 (числа 10, 20, 30 ... 100). На решение каждой задачи дается 10 секунд',
        'orange_3': 'Задачи на сложение и вычитание целых однозначных чисел (от 0 до 9) с круглыми числами от 10 до 100 (числа 10, 20, 30 ... 100). На решение каждой задачи дается 20 секунд',
        'orange_4': 'Задачи на сложение целых двузначных чисел (от 10 до 99) с однозначными (от 0 до 9). Результатом сложения может быть двузначное или трехзначное число. На решение каждой задачи дается 20 секунд',
        'orange_5': 'Задачи на сложение целых двузначных чисел (от 10 до 99) с однозначными (от 0 до 9), в которых известна сумма и значение первого числа (слагаемого). Необходимо вычислить второе число. На решение каждой задачи дается 20 секунд',
        'orange_6': 'Задачи на сложение целых двузначных чисел (от 10 до 99) с однозначными (от 0 до 9), в которых известна сумма и значение второго числа (слагаемого). Необходимо вычислить первое число. На решение каждой задачи дается 20 секунд',
        'orange_7': 'Задачи на вычитание целых однозначных чисел (от 0 до 9) из двузначных (от 10 до 99), в которых известны уменьшаемое (первый аргумент) и вычитаемое (второй аргумент) числа. Необходимо найти разницу этих чисел. На решение каждой задачи дается 20 секунд',
        'orange_8': 'Задачи на вычитание целых однозначных чисел (от 0 до 9) из двузначных (от 10 до 99), в которых известна разница и первый аргумент (уменьшаемое). Необходимо найти вычитаемое число (второй аргумент). На решение каждой задачи дается 20 секунд',
        'orange_9': 'Задачи на вычитание целых однозначных чисел (от 0 до 9) из двузначных (от 10 до 99), в которых известна разница и второй аргумент (вычитаемое число). Необходимо найти уменьшаемое (первый аргумент). На решение каждой задачи дается 20 секунд',
        'orange_10': 'Задачи на сложение целых однозначных чисел (от 0 до 9) с двузначными (от 10 до 99). Результатом сложения может быть двузначное или трехзначное число. На решение каждой задачи дается 20 секунд',
        'orange_11': 'Задачи на сложение целых однозначных чисел (от 10 до 99) с двузначными (от 0 до 9), в которых известна сумма и первое слагаемое (однозначное число). Необходимо вычислить второе число (двузначное). На решение каждой задачи дается 20 секунд',
        'orange_12': 'Задачи на сложение целых однозначных чисел (от 0 до 9) с двузначными (от 10 до 99), в которых известна сумма и второе слагаемое (двузначное число). Необходимо вычислить первое число (однозначное). На решение каждой задачи дается 20 секунд',
        'orange_13': 'Задачи на сложение и вычитание однозначных (от 0 до 9) и двузначных (от 10 до 99) чисел, в которых известны оба аргумента. Необходимо найти результат операции (сложения или вычитания). На решение каждой задачи дается 20 секунд'
        },
    'blue': {
        'blue_1': 'Задачи на сравнение трехзначных чисел (от 100 до 999), используя знаки больше (>), меньше (<) или равно (=). На решение каждой задачи дается 10 секунд',
        'blue_2': 'Задачи на сложение и вычитание сотен от 100 до 1000 (числа 100, 200 ... 1000). На решение каждой задачи дается 20 секунд',
        'blue_3': 'Задачи на сложение и вычитание сотен (числа от 100 до 1000: 100, 200, 300 ... 1000) и десятков (от 10 до 100: 10, 20, 30 ... 100). На решение каждой задачи дается 20 секунд',
        'blue_4': 'Задачи на сложение целых трехзначных чисел (от 100 до 999) с однозначными (от 0 до 9). Результатом сложения (суммой) может быть трехзначное или четырехзначное число. На решение каждой задачи дается 20 секунд',
        'blue_5': 'Задачи на вычитание целых однозначных (от 0 до 9) чисел из трехзначных (от 100 до 999). Результатом вычитания (разность) может быть двузначное или трехзначное число. На решение каждой задачи дается 20 секунд',
        'blue_6': 'Задачи на сложение целых однозначных чисел (от 0 до 9) с трехзначными (от 100 до 999). Результатом сложения (суммой) может быть трехзначное или четырехзначное число. На решение каждой задачи дается 20 секунд',
        'blue_7': 'Задачи на сложение целых двузначных чисел (от 10 до 99). Результатом сложения (суммой) может быть двузначное или трехзначное число. На решение каждой задачи дается 40 секунд',
        'blue_8': 'Задачи на сложение целых двузначных чисел (от 10 до 99), в которых известна сумма и значение первого числа (слагаемого). Необходимо вычислить второе число. На решение каждой задачи дается 40 секунд',
        'blue_9': 'Задачи на сложение целых двузначных чисел (от 10 до 99), в которых известна сумма и значение второго числа (слагаемого). Необходимо вычислить первое число. На решение каждой задачи дается 40 секунд',
        'blue_10': 'Задачи на вычитание целых двузначных чисел (от 10 до 99). Результатом вычитания (разницей) может быть ноль, однозначное или двузначное число. На решение каждой задачи дается 40 секунд',
        'blue_11': 'Задачи на вычитание целых двузначных чисел (от 10 до 99), в которых известен результат (разница) и первый аргумент (уменьшаемое число). Необходимо вычислить вычитаемое число (второй аргумент). На решение каждой задачи дается 40 секунд',
        'blue_12': 'Задачи на вычитание целых двузначных чисел (от 10 до 99), в которых известен результат (разница) и второй аргумент (вычитаемое число). Необходимо вычислить первый аргумент (уменьшаемое число). На решение каждой задачи дается 40 секунд',
        'blue_13': 'Задачи на сложение и вычитание целых двузначных чисел (от 10 до 99). Результатом сложения может быть двузначное или трехзначное число. Результатом вычитания может быть ноль, однозначное или двузначное число. На решение каждой задачи дается 40 секунд'
        // 'blue_14': 'Задачи на сложение трехзначных (от 100 до 999) и двузначных чисел (от 10 до 99). Результатом сложения может быть трехзначное или четырехзначное число. На решение каждой задачи дается 60 секунд',
        // 'blue_15': 'Задачи на сложение двузначных чисел (от 10 до 99) и трехзначных (от 100 до 999). Результатом сложения может быть трехзначное или четырехзначное число. На решение каждой задачи дается 60 секунд',
        // 'blue_16': 'Задачи на вычитание двузначных чисел (от 10 до 99) из трехзначных (от 100 до 999). На решение каждой задачи дается 60 секунд'
    },
    'yellow': {
        'yellow_1': 'Задачи на умножение однозначных чисел от 0 до 5, в которых известны оба множителя (числа). Нужно вычислить произведение этих чисел.На решение каждой задачи дается 10 секунд.',
        'yellow_2': 'Задачи на умножение чисел от 0 до 10, в которых известны оба множителя (числа). Нужно вычислить произведение этих чисел. На решение каждой задачи дается 10 секунд.',
        'yellow_3': 'Задачи на умножение чисел от 0 до 10, в которых известен первый множитель и произведение (результат). Необходимо найти второй множитель. На решение каждой задачи дается 10 секунд.',
        'yellow_4': 'Задачи на умножение чисел от 0 до 10, в которых известен второй множитель и произведение (результат). Необходимо найти первый множитель. На решение каждой задачи дается 10 секунд.',
        'yellow_5': 'Задачи на деление без остатка однозначных целых чисел (от 0 до 9). На решение каждой задачи дается 10 секунд.',
        'yellow_6': 'Задачи на деление без остатака двузначных целых чисел (от 10 до 100) на однозначные (от 0 до 9), в которых известны делимое и делитель. Необходимо найти результат деления. На решение каждой задачи дается 10 секунд.',
        'yellow_7': 'Задачи на деление без остатака двузначных целых чисел (от 10 до 100) на однозначные (от 0 до 9), в которых известны делимое и результат деления. Необходимо найти делитель (второе число). На решение каждой задачи дается 10 секунд.',
        'yellow_8': 'Задачи на деление без остатака двузначных целых чисел (от 10 до 100) на однозначные (от 0 до 9), в которых известны делитель и результат деления. Необходимо найти делимое (первое число). На решение каждой задачи дается 10 секунд.',
        'yellow_9': 'Задачи на умножение и деление целых чисел, в которых известны оба числа. Необходимо найти результат операции (умножения или деления). На решение каждой задачи дается 10 секунд',
        'yellow_10': 'Задачи на определение одного из четырех арифметических действий: сложение, вычитание, умножение или деление. Известны все аргументы и результат операции. На решение каждой задачи дается 10 секунд',
        'yellow_11': 'Задачи на сложение, вычитание, умножение и деление целых однозначных чисел. Необходимо найти результат операции. На решение каждой задачи дается 10 секунд.'
    },
    'green': {
        'green_1': 'Задачи на умножение двузначных чисел (от 10 до 99) на однозначные (от 0 до 9), в которых известны оба множители и нужно найти результат произведения этих чисел. На решение каждой задачи дается 40 секунд',
        'green_2': 'Задачи на умножение двузначных чисел (от 10 до 99) на однозначные (от 0 до 9), в которых известны первый множитель (число) и результат произведения двух чисел. Нужно вычислить чему равен второй множитель. На решение каждой задачи дается 40 секунд',
        'green_3': 'Задачи на умножение двузначных чисел (от 10 до 99) на однозначные (от 0 до 9), в которых известен второй множитель и результат произведения двух чисел. Нужно вычислить чему равен первый множитель. На решение каждой задачи дается 40 секунд',
        'green_4': 'Задачи на умножение двузначных чисел (от 10 до 99), в которых известны оба множители и нужно найти результат произведения этих чисел. На решение каждой задачи дается 60 секунд',
        'green_5': 'Задачи на умножение двузначных чисел (от 10 до 99), в которых известны первый множитель (число) и результат произведения двух чисел. Нужно вычислить чему равен второй множитель. На решение каждой задачи дается 60 секунд',
        'green_6': 'Задачи на умножение двузначных чисел (от 10 до 99), в которых известен второй множитель и результат произведения двух чисел. Нужно вычислить чему равен первый множитель. На решение каждой задачи дается 60 секунд'
    },
    'brown': {
        'brown_1': 'Задачи на сложение положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_2': 'Задачи на вычитание положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_3': 'Задачи на сложение и вычитание положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_4': 'Задачи на умножение положительных и отрицательных целых однозначных чисел. Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_5': 'Задачи на деление положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 40 секунд',
        'brown_6': 'Задачи на умножение и деление положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 40 секунд',
    },
    'black': {
        'black_1': 'Задачи на сложение и вычитание целых трехзначных чисел (от 100 до 999). Результатом операции (сложения или вычитания) может быть только целое положительное число. На решение каждой задачи дается 20 секундю',
        'black_2': 'Задачи на сложение и вычитание целых четырехзначных чисел (от 1000 до 9999). Результатом операции (сложения или вычитания) может быть только целое положительное число. На решение каждой задачи дается 30 секунд',
        'black_3': 'Задачи на умножение трехзначных чисел (от 100 до 999) на однозначные (от 0 до 9). На решение каждой задачи дается 40 секунд.',
        'black_4': 'Задачи на умножение трехзначных чисел (от 100 до 999) на двузначные (от 10 до 99). На решение каждой задачи дается 90 секунд.',
        'black_5': 'Задачи на умножение трехзначных чисел (от 100 до 999). На решение каждой задачи дается 120 секунд.'
    },
};

/** @const {object} */
var belt_pgrms_en = {
    'white': {
        'white_1': 'Tasks for comparision of one-digit numbers (from 0 to 9), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task',
        'white_2': 'Tasks for understanding of one of two mathematical operation: addition or subtraction. You will know both arguments (numbers), the result of an operation and have 10 seconds timeout to solve each task',
        'white_3': 'Tasks for addition (operations with plus, +) of one-digit numbers (from 0 to 9). The result of addition can be an one- or two-digit number and you have 10 seconds timeout to solve each task',
        'white_4': 'Tasks for addition (operations with plus, +) of one-digit numbers (from 0 to 9), where you know the sum (result of addition) and the first number. You have to find the second number and have 10 seconds timeout to solve each task',
        'white_5': 'Tasks for addition (operations with plus, +) of one-digit numbers (from 0 to 9), where you know the sum (result of addition) and the second number. You have to find the first number and have 10 seconds timeout to solve each task',
        'white_6': 'Tasks for subtraction (operations with minus, -) of one-digit numbers (from 0 to 9). The result of subtraction (difference) can be a one-digit positive number or zero. You have 10 seconds timeout to solve each task',
        'white_7': 'Tasks for subtraction (operations with minus, -) of one-digit numbers (from 0 to 9), where you know the result of subtraction (difference) and the subtracted number (second number). You have to find a first (decrementable) number and have 10 seconds timeout to solve each task',
        'white_8': 'Tasks for subtraction (operations with minus, -) of one-digit numbers (from 0 to 9), where you know the result of subtraction (difference) and the decremented number (first number). You have to find a second (subtracted) number and have 10 seconds timeout to solve each task',
        'white_9': 'Tasks for addition and subtraction of one digit numbers (from 0 to 9). The result of addition can be an one- or two-digit number, the result of subtraction is a positive one-digit number or zero. You have 10 seconds timeout to solve each task'
        },
    'orange': {
        'orange_1': 'Tasks for comparision of two-digit numbers (from 10 to 99), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task',
        'orange_2': 'Tasks for addition and subtraction of round numbers from 10 to 100 (numbers 10, 20, 30 ... 100). You have 10 seconds timeout to solve each task',
        'orange_3': 'Tasks for addition and subtraction of one-digit numbers (from 0 to 9) from round numbers (from 10 till 100). You have 20 seconds timeout to solve each task',
        'orange_4': 'Tasks for addition of two-digit number (from 10 to 99) with one-digit number (from 0 to 9). The result of addition can be a two- or three-digit number. You have 20 seconds timeout to solve each task',
        'orange_5': 'Tasks for addition of two-digit number (from 10 to 99) with one-digit number (from 0 to 9), where you know the result of addition and the first number (summand). You have to find the second number and have 20 seconds timeout to solve each task',
        'orange_6': 'Tasks for addition of two-digit number (from 10 to 99) with one-digit number (from 0 to 9), where you know the results and value if the second number. You have to find the first number and have 20 seconds timeout to solve each task',
        'orange_7': 'Tasks for subtraction of one-digit number (from 0 to 9) from two-digit number (from 10 to 99), where you know both arguments (decrementable and subtracted numbers). You have to find the difference and have 20 seconds timeout to solve each task',
        'orange_8': 'Tasks for subtraction of one-digit number (from 0 to 9) from two-digit number (from 10 to 99), where you know the first argument (decremented number) and difference (the result of subtraction). You have to find a second (subtracted) number and have 20 seconds timeout to solve each task',
        'orange_9': 'Tasks for subtraction of one-digit number (from 0 to 9) from two-digit number (from 10 to 99), where you know the second argument (subtracted number) and difference (the result of subtraction). You have to find a first (subtracted) number and have 20 seconds timeout to solve each task',
        'orange_10': 'Tasks for addition of one-digit number (from 0 to 9) with two-digit number (from 10 to 99). The result of addition can be a two- or three-digit number. You have 20 seconds timeout to solve each task',
        'orange_11': 'Tasks for addition of one-digit number (from 0 to 9) with two-digit number (from 10 to 99), where you know the first number (summand) and result of addition. You have to find a second number and have 20 seconds timeout to solve each task',
        'orange_12': 'Tasks for addition of one-digit number (from 0 to 9) with two-digit number (from 10 to 99), where you know the second number (summand) and result of addition. You have to find a first number and have 20 seconds timeout to solve each task',
        'orange_13': 'Tasks for addition and subtraction of one-digit numbers (from 0 to 9) and two-digit (from 10 to 99) numbers, where you know both arguments and have to find a result of operation (addition or subtraction). You have 20 seconds timeout to solve each task'
        },
    'blue': {
        'blue_1': 'Tasks for comparison of three-digit numbers (from 100 to 999), where you can to use only more (>), less (<) and equal (=) labels and have 10 seconds timeout to solve each task',
        'blue_2': 'Tasks for addition and subtraction of hundreds from 100 to 1000 (for example, 100, 200 ... 1000). You have 20 seconds timeout to solve each task',
        'blue_3': 'Tasks for addition and subtraction of hundreds (numbers from 100 to 1000: 100, 200, 300 ... 1000) and tens (from 10 to 100: 10, 20, 30 ... 100). You have 20 seconds timeout to solve each task',
        'blue_4': 'Tasks for addition of three-digit number (from 100 to 999) with one-digit number (from 0 to 9). The result of addition can be a three- or four-digit number. You have 20 seconds timeout to solve each task',
        'blue_5': 'Tasks for subtraction of one-digit number (from 0 to 9) from three-digit number (from 100 to 999). The result of subtraction (difference) can be a two- or three-digit number. You have 20 seconds timeout to solve each task',
        'blue_6': 'Tasks for addition of one-digit numbers (from 0 to 9) with three-digit numbers (from 100 to 999). The result of addition can be a three- or four-digit number. You have 20 seconds timeout to solve each task',
        'blue_7': 'Tasks for addition of two two-digit numbers (from 10 to 99). The result of addition can be a two- or three-digit number. You have 40 seconds timeout to solve each task',
        'blue_8': 'Tasks for addition of two two-digit numbers (from 10 to 99), where you know the first (summand) number and the result of addition. You have to find a second number and have 40 seconds timeout to solve each task',
        'blue_9': 'Tasks for addition of two two-digit numbers (from 10 to 99), where you know the second (summand) number and the result of addition. You have to find a first number and have 40 seconds timeout to solve each task',
        'blue_10': 'Tasks for subtraction of two two-digit numbers (from 10 to 99). The result of subtraction (difference) can be zero, one- or two-digit number. You have 40 seconds timeout to solve each task',
        'blue_11': 'Tasks for subtraction of two two-digit numbers (from 10 to 99), where you know the first (decremented) number and the result of subtraction (difference). You have to find a second (subtracted) number and have 40 seconds timeout to solve each task',
        'blue_12': 'Tasks for subtraction of two two-digit numbers (from 10 to 99), where you know the second (subtracted) number and the result of subtraction (difference). You have to find a first (decremented) number and have 40 seconds timeout to solve each task',
        'blue_13': 'Tasks for addition and subtraction of two two-digit numbers (from 10 to 99), where you know both arguments and have to find a result of operation (addition or subtraction). You have 40 seconds timeout to solve each task',
        // 'blue_14': 'Задачи на сложение трехзначных (от 100 до 999) и двузначных чисел (от 10 до 99). Результатом сложения может быть трехзначное или четырехзначное число. На решение каждой задачи дается 60 секунд',
        // 'blue_15': 'Задачи на сложение двузначных чисел (от 10 до 99) и трехзначных (от 100 до 999). Результатом сложения может быть трехзначное или четырехзначное число. На решение каждой задачи дается 60 секунд',
        // 'blue_16': 'Задачи на вычитание двузначных чисел (от 10 до 99) из трехзначных (от 100 до 999). На решение каждой задачи дается 60 секунд'
    },
    'yellow': {
        'yellow_1': 'Tasks for multiplication of one-digit numbes from 0 to 5, where you know both numbers and have to find result multiplication. You have 10 seconds timeout to solve each task',
        'yellow_2': 'Tasks for multiplication of one-digit numbes from 0 to 9, where you know both numbers and have to find result multiplication. You have 10 seconds timeout to solve each task',

        'yellow_3': 'Задачи на умножение чисел от 0 до 10, в которых известен первый множитель и произведение (результат). Необходимо найти второй множитель. На решение каждой задачи дается 10 секунд.',
        'yellow_4': 'Задачи на умножение чисел от 0 до 10, в которых известен второй множитель и произведение (результат). Необходимо найти первый множитель. На решение каждой задачи дается 10 секунд.',
        'yellow_5': 'Задачи на деление без остатка однозначных целых чисел (от 0 до 9). На решение каждой задачи дается 10 секунд.',
        'yellow_6': 'Задачи на деление без остатака двузначных целых чисел (от 10 до 100) на однозначные (от 0 до 9), в которых известны делимое и делитель. Необходимо найти результат деления. На решение каждой задачи дается 10 секунд.',
        'yellow_7': 'Задачи на деление без остатака двузначных целых чисел (от 10 до 100) на однозначные (от 0 до 9), в которых известны делимое и результат деления. Необходимо найти делитель (второе число). На решение каждой задачи дается 10 секунд.',
        'yellow_8': 'Задачи на деление без остатака двузначных целых чисел (от 10 до 100) на однозначные (от 0 до 9), в которых известны делитель и результат деления. Необходимо найти делимое (первое число). На решение каждой задачи дается 10 секунд.',
        'yellow_9': 'Задачи на умножение и деление целых чисел, в которых известны оба числа. Необходимо найти результат операции (умножения или деления). На решение каждой задачи дается 10 секунд',
        'yellow_10': 'Задачи на определение одного из четырех арифметических действий: сложение, вычитание, умножение или деление. Известны все аргументы и результат операции. На решение каждой задачи дается 10 секунд',
        'yellow_11': 'Задачи на сложение, вычитание, умножение и деление целых однозначных чисел. Необходимо найти результат операции. На решение каждой задачи дается 10 секунд'
    },
    'green': {
        'green_1': 'Задачи на умножение двузначных чисел (от 10 до 99) на однозначные (от 0 до 9), в которых известны оба множители и нужно найти результат произведения этих чисел. На решение каждой задачи дается 40 секунд',
        'green_2': 'Задачи на умножение двузначных чисел (от 10 до 99) на однозначные (от 0 до 9), в которых известны первый множитель (число) и результат произведения двух чисел. Нужно вычислить чему равен второй множитель. На решение каждой задачи дается 40 секунд',
        'green_3': 'Задачи на умножение двузначных чисел (от 10 до 99) на однозначные (от 0 до 9), в которых известен второй множитель и результат произведения двух чисел. Нужно вычислить чему равен первый множитель. На решение каждой задачи дается 40 секунд',
        'green_4': 'Задачи на умножение двузначных чисел (от 10 до 99), в которых известны оба множители и нужно найти результат произведения этих чисел. На решение каждой задачи дается 60 секунд',
        'green_5': 'Задачи на умножение двузначных чисел (от 10 до 99), в которых известны первый множитель (число) и результат произведения двух чисел. Нужно вычислить чему равен второй множитель. На решение каждой задачи дается 60 секунд',
        'green_6': 'Задачи на умножение двузначных чисел (от 10 до 99), в которых известен второй множитель и результат произведения двух чисел. Нужно вычислить чему равен первый множитель. На решение каждой задачи дается 60 секунд'
    },
    'brown': {
        'brown_1': 'EN Задачи на сложение положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_2': 'EN Задачи на вычитание положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_3': 'EN Задачи на сложение и вычитание положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_4': 'EN Задачи на умножение положительных и отрицательных целых однозначных чисел. Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 20 секунд',
        'brown_5': 'EN Задачи на деление положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 40 секунд',
        'brown_6': 'EN Задачи на умножение и деление положительных и отрицательных целых чисел (однозначных и двузначных). Числа могут быть с одинаковыми и разными знаками. На решение каждой задачи дается 40 секунд',
    },
    'black': {
        'black_1': 'Tasks for addition and subtraction of three-digit numbers (from 100 to 999). You have to find the result of an operation (addition or subtraction), which can only be a positive integer number. You have 30 seconds timeout to solve each task',
        'black_2': 'Tasks for addition and subtraction of four-digit numbers (from 1000 to 9999). The result of an operation (addition or subtraction) can only be a positive integer. You have 40 seconds timeout to solve each task',
        'black_3': 'Tasks for multiplication of three digit numbers (from 100 to 999) and one digit numbers (from 0 to 9). You have 60 seconds timeout to solve each task',
        'black_4': 'Tasks for multiplication of three digit numbers (from 100 to 999) and two digit numbers (from 10 to 99). You have 90 seconds timeout to solve each task',
        'black_5': 'Tasks for multiplication of three digit numbers (from 100 to 999). You have 120 seconds timeout to solve each task'
    }
};

/** @const {string[]} */
var about_us_pages = {
    'ru': {
        'about_us_part_1': 'SuperMath это бесплатный сайт разработанный для развития и улучшения математических способностей у детей и взрослых. Сайт состоит из набора программ и упражнений. Все программы разбиты на семь уровней сложности и имеют определенный цвет (цветовой пояс). Для тех, кто только начинает овладевать азами математики, предусмотрен уровень белого пояса, который меняет цвет с ростом накопленных знаний и мастерства.',
        'about_us_part_2': 'Каждая программа включает в себя 30 задач на различные арифметические действия или операции сравнения. В зависимости от уровня сложности и типа задачи, решающему даётся от 10 до 40 секунд на решение каждой задачи.',
        'about_us_part_3': 'Все доходы от рекламы на сайте идут только на оплату расходов по его содержанию (оплата услуг хостинг провайдера, доменного имени и т.д.) и его дальнейшее развитие (увеличение количества доступных программ для детей, добавление новой функциональности на сайт). Реклама на сайте не имеет возрастных ограничений и полность соотвествует тематике сайта (дети, школа, обучение, наука, искусство). Мы стараемся минимизировать количество рекламы на сайте.',
        'about_us_part_4': 'Мы ценим ваши отзывы, комментарии и предложения. При возникновении у вас любых вопросов о программе SuperMath, отправьте нам сообщение по электронной почте <a href="mailto:yuri.volokitin@gmail.com?Subject=SuperMath" target="_top">yuri.volokitin@gmail.com</a>. Наши возможности ограничены, поэтому взаимодействие со службой поддержки возможно только по электронной почте.',
        'about_us_part_5': 'Математика имеет ограмное значение как в нашей повседневной жизни, так и в других науках. Благодаря математике человек получил возможность успешно осваивать космос, опускаться в глубины океана и покорять неизведанные тайны природы. Математика помогает углублять наши познания в социологии и языковедении, психологии и искусстве, медицине и образовании.'
    },
    'en': {
        'about_us_part_1': 'SuperMath is fully free web site, which is designed to improve and develop math skills for kids and adults. Web site includes special programs and tasks. All programs are divided in seven levels (based on complexity) and have special color (color belt). Beginners start from the white belt, which changes color with the growth of knowledge and skills.',
        'about_us_part_2': 'Each program contaons 30 tasks for various arithmetic operations or comparison operations. Depending on the level of complexity and type of task, the decider is given from 10 to 40 seconds to solve each task.',
        'about_us_part_3': 'Any benefits from advertising on this web site goes only to pay for maintenance (hosting, domain name, etc.) and further development (increase the number of available programs for kids, add new functionality to the site). Advertising on the site has no age restrictions and is completely meet to the subject of SuperMath (kids education, school and art). We try to minimize the amount of advertising on SuperMath web site.',
        'about_us_part_4': 'We appreciate for your feedback, comments or suggestions. If you have any questions, please send us a message by e-mail <a href="mailto:yuri.volokitin@gmail.com?Subject=SuperMath" target="_top">yuri.volokitin@gmail.com</a>. We get a lot of email, so thank you in advance for your patience!',
        'about_us_part_5': 'Mathematics has great importante in our daily life and all sciences. These days, mathematics is used to get out the difficult calculations concerned with space travel, it helps to came in the depths of the ocean and conquer the mysteries of nature. Mathematics helps to advance in knowledge of medicine and education, sociology and linguistics, psychology and art.'
    }
};

/** @const {string[]} */
var belts_descs = {
    'ru': {
        'belts_descriptions_title_id': 'Цветовые пояса соотвествуют определённым уровням сложности заданий. Для тех, кто только начинает овладевать азами математики, предусмотрен белый пояс, который темнеет с ростом мастерства. Черный пояс говорит о том, что ученик достиг определенного мастерства в решении математических задач в уме.',
        'white_belt_description': 'Белый пояс соотвествует уровню задач для детей от 3 до 6 лет: сравнение, сложение и вычитание целых однозначных чисел (от 0 до 9).',
        'orange_belt_description': 'Оранжевый пояс соотвествует задачкам для детей от 4 до 7 лет: сравнение двузначных чисел (от 10 до 99), сложение десятками, сложение и вычитание двузначных с однозначными числами.',
        'blue_belt_description': 'Голубой пояс соотвествует задачкам для детей от 5 до 8 лет: сложение и вычитание трехзначных (от 100 до 999) с однозначными и двузначными числами.',
        'yellow_belt_description': 'Желтый пояс соотвествует задачкам для детей от 6 до 9 лет: умножение и деление однозначных чисел',
        'green_belt_description': 'Зеленый пояс соотвествует задачкам для детей от 7 до 10 лет',
        'brown_belt_description': 'Коричневый пояс соотвествует задачкам для детей от 8 до 11 лет',
        'black_belt_description': 'Черный пояс для тех, кто любит и готов выполнять любые математические действия с числами любой разрядности! Решая задачи уровня черного пояса - нельзя останавливаться, нужно ежедневно тренировать память, стараясь улучшать скорость математических операций в уме'
    },
    'en': {
        'belts_descriptions_title_id': 'The Color belts are correspond to certain levels of tasks complexity. For begginers, the white belt is provided, which darkens with the growth of skills. The black belt shows that a student has reached a certain skill level in solving of mathematical problems in mind',
        'white_belt_description': 'The White belt corresponds the level of 3 - 6 years kids: comparision, addition and subtracktion of one digit numerbs from 0 to 9.',
        'orange_belt_description': 'The Orange belt corresponds the level of 4 - 7 years kids.',
        'blue_belt_description': 'The Blue belt corresponds the level of 5 - 8 years kids.',
        'yellow_belt_description': 'The Yellow belt corresponds the level of 6 - 9 years kids.',
        'green_belt_description': 'The Green belt corresponds the level of 7 - 10 years kids.',
        'brown_belt_description': 'The Brown belt corresponds the level of 8 - 11 years kids.',
        'black_belt_description': 'The Black belt is for those, who is really love and ready to solve math tasks with a any kind of numbers. You should not stop when you reach the black belt level, you have to continue to train your memory and improve your speed in solving of math operations.'
    }
};

/** @const {string[]} */
var error_codes = {
    'ru': {
        'ERR_WRONG_NAME_PSWD': 'Имя пользователя или пароль введены неверно',
        'ERR_NO_USER': 'Пользователь с таким email адресом не зарегистрирован',
        'ERR_USER_EMAIL_EXISTED': 'Пользователь с таким email адресом уже зарегистрирован',
        'ERR_RECAPTCHA_FAIL': 'Ошибка верификации Google\'s Recaptcha. Пожалуйста, повторите операцию позже',
        'ERR_MYSQL_INSERT': 'Ошибка базы данных (Mysql Insert Error). Пожалуйста, повторите операцию позже',
        'ERR_MYSQL_SELECT': 'Ошибка базы данных (Mysql Select Error). Пожалуйста, повторите операцию позже',
        'ERR_MYSQL_CONNECT': 'Ошибка соединения с Базой Данных. Пожалуста, повторите операцию позже',
    },
    'en': {
        'ERR_WRONG_NAME_PSWD': 'User name or password are incorrect.',
        'ERR_NO_USER': 'No user found with such email in DB',
        'ERR_USER_EMAIL_EXISTED': 'Some user already used this email address. Please, use \'Forget password\' to restore your password',
        'ERR_RECAPTCHA_FAIL': 'Google\'s Recaptcha registration error. Please, try again later',
        'ERR_MYSQL_INSERT': 'I\'m sorrry DataBase Error (Mysql Insert Error). Please, try again later',
        'ERR_MYSQL_SELECT': 'I\'m sorrry DataBase Error (Mysql Select Error). Please, try again later',
        'ERR_MYSQL_CONNECT': 'Could not connect to DataBase (Mysql Connection Error). Please, try again later',
    }
};
