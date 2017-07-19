<?php
    ini_set("include_path", '/home/z1usen38/php:' . ini_get("include_path"));

    session_set_cookie_params(30 * 24 * 3600);
    session_start();

    header('Content-Type: application/json');

    $operation = $_POST['operation'];
    if (empty($operation)) {
        error_log("WARNING: received bad request from " . get_client_ip_address());
        return;
    }

    if ($operation === 'login') {
        $email = $_POST['email']; $pswd = $_POST['pswd'];
        if (!empty($email) && !empty($pswd)) {
            login($email, $pswd);
        }

    } else if ($operation === 'registration') {
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $pswd = $_POST['pswd'];
        $language = $_POST['language'];
        $recaptcha = $_POST['g-recaptcha-response'];
        if (!empty($name) && !empty($surname) && !empty($email) &&
            !empty($pswd) && !empty($recaptcha)) {
            registration($name, $surname, $email, $pswd, $language, $recaptcha);
        }

    } else if ($operation === 'registration_timeout_error') {
        $email = $_POST['email'];
        if (!empty($email)) {
            registration_timeout_error($email);
        } else {
            error_log("ERROR: registration_timeout_error called with empty email");
        }

    } else if ($operation === 'activation') {
        $user_id = $_POST['user_id']; $user_uuid = $_POST['user_uuid'];
        $user_email = $_POST['user_email'];
        if (!empty($user_id) && !empty($user_uuid) && !empty($user_email)) {
            activation($user_id, $user_uuid, $user_email);
        }

    } else if ($operation === 'add_user_stars') {
        $user_id = $_POST['user_id']; $stars = $_POST['stars'];
        $program = $_POST['program']; $belt = $_POST['belt'];
        $solved = $_POST['solved'];
        if (!empty($user_id) && !empty($program) && !empty($belt)) {
            add_user_stars($user_id, $stars, $program, $belt, $solved);
        }

    } else if ($operation === 'remind_pswd') {
        $user_email = $_POST['user_email'];
        if (!empty($user_email)) {
            remind_pswd($user_email);
        }

    } else if ($operation === 'add_fake_stars') {
        add_fake_stars();

    } else if ($operation === 'get_top_users') {
        $number = $_POST['number'];
        if (!empty($number)) {
            get_top_users($number);
        }

    } else if ($operation === 'get_all_programs') {
        $user_usergroup = $_POST['user_usergroup'];
        if (!empty($user_usergroup)) {
            get_all_programs($user_usergroup);
        }

    } else if ($operation === 'add_program_for_user') {
        $user_id = $_POST['user_id'];
        $user_email = $_POST['user_email'];
        $program_id = $_POST['program_id'];
        if (!empty($user_id) && !empty($user_email) && !empty($program_id)) {
            add_program_for_user($user_id, $user_email, $program_id);
        }

    } else {
        error_log("WARNING: Unknown " . $operation . " operation from " . get_client_ip_address());
    }

    /**
     
     */
    function login($email, $pswd) {
        $errors = "";
        # connect to mysql db
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            mysqli_set_charset($db_link, "utf8");
            # check that user already existed with such name
            $email = mysqli_real_escape_string($db_link, $email);
            /*
            `ID` bigint(20) NOT NULL auto_increment,
            `NAME` varchar(64) COLLATE `utf8_general_ci` NOT NULL,
            `SURNAME` varchar(64) COLLATE `utf8_general_ci` NOT NULL,
            `EMAIL` varchar(255) COLLATE `utf8_general_ci` NOT NULL,
            `PASSWORD` varchar(35) COLLATE `utf8_general_ci` NOT NULL,
            `PSWD_HASH` varchar(32) NOT NULL,
            `USERGROUP` enum('GUEST', 'USER', 'PAID', 'ADMIN', 'FAKE') NOT NULL DEFAULT 'GUEST',
            `UUID` varchar(32) COLLATE `utf8_general_ci` NOT NULL,
            `IP` varchar(32) COLLATE `utf8_general_ci` NOT NULL,
            `CREATION_DATE` datetime NOT NULL,
            `PROGRAM` varchar(128) COLLATE `utf8_general_ci` DEFAULT '',
            `BELT` varchar(128) COLLATE `utf8_general_ci` DEFAULT '',
            `STARS` bigint(20) NOT NULL,
            `SOLVED` varchar(1024) COLLATE `utf8_general_ci` DEFAULT '',
            */
            $select = "SELECT ID, NAME, SURNAME, PASSWORD, USERGROUP, PROGRAM, BELT, STARS, SOLVED, AVATAR, SET_HERO, SET_KBRD, SET_TIME, SET_LNGD FROM users WHERE EMAIL='$email'";
            if ($result = mysqli_query($db_link, $select)) {
                // Fetch all data
                $data = mysqli_fetch_assoc($result);
                if (is_array($data)) {
                    if ($data['PASSWORD'] === $pswd) {
                        $user_data = array('success' => TRUE,
                                           'id' => $data['ID'],
                                           'name' => $data['NAME'],
                                           'surname' => $data['SURNAME'],
                                           'email' => $email,
                                           'usergroup' => $data['USERGROUP'],
                                           'program' => $data['PROGRAM'],
                                           'belt' => $data['BELT'],
                                           'stars' => $data['STARS'],
                                           'solved' => $data['SOLVED'],
                                           'avatar' => $data['AVATAR'],
                                           'set_hero' => $data['SET_HERO'],
                                           'set_kbrd' => $data['SET_KBRD'],
                                           'set_time' => $data['SET_TIME'],
                                           'set_lngd' => $data['SET_LNGD']);
                    } else {
                        $errors = "ERR_WRONG_NAME_PSWD";
                        error_log("Wrong password, '$pswd' does not match expected '".$data['PASSWORD']."'");
                    }
                } else {
                    $errors = "ERR_NO_USER";
                    error_log("No user found with $name email in DB, data $data");
                }
                mysqli_free_result($result);
            } else {
                $errors = "ERR_MYSQL_SELECT";
                error_log("(login) Mysql Select Error: " . mysqli_error($db_link));
            }
            mysqli_close($db_link);
        } else {
            $errors = "ERR_MYSQL_CONNECT";
            error_log("(login) Mysql Connection Error: " . mysqli_error($db_link));
        }

        if (strlen($errors) == 0) {
            echo json_encode($user_data);
        } else {
            $error_response = array('success' => FALSE,
                                    'error' => $errors);
            echo json_encode($error_response);
        }
    }

    /**
     * Registration a new user

       var recaptcha = JSON.parse(recaptcha_result);
       The response is a JSON object:
        {
          "success": true|false,
          "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
          "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
          "error-codes": [...]        // optional
        }

       Error code reference/description:
        missing-input-secret    The secret parameter is missing.
        invalid-input-secret    The secret parameter is invalid or malformed.
        missing-input-response  The response parameter is missing.
        invalid-input-response  The response parameter is invalid or malformed.
     */
    function registration($name, $surname, $email, $pswd, $language, $recaptcha) {
        $errors = "";

        // Get resource
        $curl = curl_init();
        // Configure options, incl. post-variables to send.
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => array(
                'secret' => '6LcbgQ8UAAAAACw_e-F2v3_VwBzXI64QWhBfavMX',
                'response' => $recaptcha,
                'remoteip' => get_client_ip_address())
        ));
        // Send request, due to CURLOPT_RETURNTRANSFER it will return reply as string
        $recaptcha_response = curl_exec($curl);
        // Free resources.
        curl_close($curl);

        // Validate response, strpos returns FALSE if string is absent
        if (strpos($recaptcha_response, '"success": true') !== FALSE) {
            // connect to mysql db
            if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
                // bool mysqli_set_charset (mysqli $link , string $charset)
                if (!mysqli_set_charset($db_link, "utf8")) {
                    error_log("Error: could not load utf8 charset");
                }
                // check if this user name already existed
                $email = mysqli_real_escape_string($db_link, $email);
                $select = "SELECT EMAIL FROM users WHERE EMAIL='$email'";
                if ($result = mysqli_query($db_link, $select)) {
                    // Fetch all
                    $users = mysqli_num_rows($result);
                    mysqli_free_result($result);
                    if ($users == 0) {
                        $pswd_escapted = mysqli_real_escape_string($db_link, $pswd);
                        $hash = md5(md5($pswd_escapted)); # add double hashing
                        $uuid = uniqid('', true);
                        $ip_address = get_client_ip_address();
                        $creation = date("Y-m-d H:i:s");
                        $insert = "INSERT INTO users SET NAME='".$name."', SURNAME='".$surname
                                 ."', EMAIL='".$email."', PASSWORD='".$pswd_escapted
                                 ."', PSWD_HASH='".$hash."', UUID='".$uuid
                                 ."', IP='".$ip_address."', CREATION_DATE='".$creation
                                 ."', STARS=0, BELT='white', SET_LNGD='".$language."'";
                        // performs a query against the database
                        if ($result = mysqli_query($db_link, $insert)) {
                            // Возвращает FALSE в случае неудачи. В случае успешного
                            // выполнения запросов SELECT, SHOW, DESCRIBE или EXPLAIN
                            // mysqli_query() вернет объект mysqli_result. Для остальных
                            // успешных запросов mysqli_query() вернет TRUE.
                            // -> не нужно вызывать mysqli_free_result($result); здесь
                            $select = "SELECT ID, USERGROUP, AVATAR FROM users WHERE EMAIL='$email'";
                            if ($result = mysqli_query($db_link, $select)) {
                                // Fetch all data
                                $data = mysqli_fetch_assoc($result);
                                if (is_array($data)) {
                                    // create JSON array to send it back
                                    $user_data = array('success' => TRUE,
                                                       'id' => $data['ID'],
                                                       'name' => $name,
                                                       'surname' => $surname,
                                                       'email' => $email,
                                                       'usergroup' => $data['USERGROUP'],
                                                       'program' => '',
                                                       'belt' => 'white',
                                                       'stars' => '0',
                                                       'solved' => '',
                                                       'avatar' => $data['AVATAR'],
                                                       'set_hero' => 'true',
                                                       'set_kbrd' => 'true',
                                                       'set_time' => 'true',
                                                       'set_lngd' => $language);
                                } else {
                                    $errors = "ERR_NO_USER";
                                    error_log("(registration) No user found with $name email in DB");
                                }
                                mysqli_free_result($result);
                            } else {
                                $errors = "ERR_MYSQL_SELECT";
                                error_log("(registration) Mysql Select Error: " . mysqli_error($db_link));
                            }
                        } else {
                            $errors = "ERR_MYSQL_INSERT";
                            error_log("(registration) Mysql Insert Error: " . $insert);
                        }
                    } else {
                        $errors = "ERR_USER_EMAIL_EXISTED";
                        error_log("(registration) Пользователь с email'ом ($email) уже зарегистрирован");
                    }
                } else {
                    $errors = "ERR_MYSQL_SELECT";
                    error_log("(registration) Mysql Select Error: " . mysqli_error($db_link));
                }
                mysqli_close($db_link);
            } else {
                $errors = "ERR_MYSQL_CONNECT";
                error_log("(registration) Mysql Connection Error: " . mysqli_error($db_link));
            }
        } else {
            $errors = "ERR_RECAPTCHA_FAIL";
            error_log("Registration error, success: false. Please, try again later.");
        }

        if (strlen($errors) == 0) {
            send_email('registration', $email, $uuid);
            echo json_encode($user_data);
        } else {
            $error_response = array('success' => FALSE,
                                    'error' => $errors);
            echo json_encode($error_response);
        }
    }

    /**
     * Remind user password from user email
     */
    function remind_pswd($user_email) {
        $errors = "";
        # connect to mysql db
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            # check that user already existed with such name
            $select = "SELECT PASSWORD FROM users WHERE EMAIL='$user_email'";
            if ($result = mysqli_query($db_link, $select)) {
                // Fetch all data
                $data = mysqli_fetch_assoc($result);
                if (is_array($data)) {
                    if (!empty($data['PASSWORD'])) {
                        // create JSON array to send it back
                        $user_data = array('success' => TRUE,
                                           'email' => $user_email);
                        $user_password = $data['PASSWORD'];
                    } else {
                        $errors = "Простите, пользователь с $user_email не зарегистрирован";
                        error_log("(remind_pswd) $errors");
                    }
                } else {
                    $errors = "Пользователь с $user_email не зарегистрирован";
                    error_log("(remind_pswd) No user with '$user_email' found");
                }
                mysqli_free_result($result);
            } else {
                $errors = "(remind_pswd) Mysql Select Error: " . mysqli_error($db_link);
                error_log($errors);
            }
            mysqli_close($db_link);
        } else {
            $errors = "(remind_pswd) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }

        if (strlen($errors) == 0) {
            send_email('remind_pswd', $user_email, $user_password);
            echo json_encode($user_data);
        } else {
            $error_response = array('success' => FALSE,
                                    'error' => $errors);
            echo json_encode($error_response);
        }
    }

    /**
     
     */
    function activation($user_id, $user_uuid, $user_email) {
        $errors = "";
        # connect to mysql db
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            # check that user already existed with such name
            $select = "SELECT UUID FROM users WHERE ID=$user_id";
            if ($result = mysqli_query($db_link, $select)) {
                // Fetch all data
                $data = mysqli_fetch_assoc($result);
                if (is_array($data)) {
                    if ($data['UUID'] === $user_uuid) {
                        $update = "UPDATE users SET USERGROUP='USER' WHERE ID=$user_id";
                        if ($result = mysqli_query($db_link, $update)) {
                            $user_data = 'USER';
                        }
                        else {
                            $errors = "Контрольная сумма введена неверно";
                            error_log("Wrong UUID data, expected '".$data['UUID']
                                      ."', received '$user_uuid'");
                        }
                    }
                    else {
                        $errors = "Контрольная сумма введена неверно";
                        error_log("Wrong UUID data, expected '".$data['UUID']
                                  ."', received '$user_uuid'");
                    }
                } else {
                    $errors = "Пользователь $user_email не существует";
                    error_log("(activation) No user found with $user_id, $user_email in DB, returned $data");
                }
                mysqli_free_result($result);
            }
            else {
                $errors = "(activation) Mysql Select Error: " . mysqli_error($db_link);
                error_log($errors);
            }
            mysqli_close($db_link);
        }
        else {
            $errors = "(activation) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }

        if (strlen($errors) === 0) {
            // PASSED,USER
            echo json_encode("PASSED,$user_data");
        }
        else {
            echo json_encode("$errors");
        }
    }

    function send_email($type, $email, $data) {
        include 'Mail.php';
        include 'Mail/mime.php';

        if ($type === 'registration') {
            $html = '<html><body>Activation code: '.$data.'</body></html>';
            $headers = array('From' => 'SuperMath <auto@supermath.ru>',
                             'To' => $email,
                             'Subject' => 'SuperMath Registration confirmation',
                             'Content-Type'  => 'text/html; charset=UTF-8');

        } else if ($type === 'remind_pswd') {
            $html = '<html><body>Password: '.$data.'</body></html>';
            $headers = array('From' => 'SuperMath <auto@supermath.ru>',
                             'To' => $email,
                             'Subject' => 'SuperMath Password',
                             'Content-Type'  => 'text/html; charset=UTF-8');

        } else {
            error_log("send_email, UNKNOWN TYPE '$type'");
            return;
        }

        // $mime = new Mail_mime('\n');
        $mime = new Mail_mime(array('eol' => '\n'));
        $mime->setHTMLBody($html);
        $body = $mime->get();
        $headers = $mime->headers($headers);
        $mail =& Mail::factory('mail');
        $mail->send($email, $headers, $body);
        if (PEAR::isError($mail)) {
            $error = $mail->getMessage();
            error_log("send_email, FAILED: $error");
        } else {
            error_log("send_email, PASSED: $email");
        }
    }

    function registration_timeout_error($email) {
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            mysqli_set_charset($db_link, "utf8");
            // check if this user name already existed
            $email = mysqli_real_escape_string($db_link, $email);
            $insert = "INSERT INTO registration_failed SET EMAIL='".$name."'";
            // performs a query against the database
            if ($result = mysqli_query($db_link, $insert)) {
                // nothing
            } else {
                $errors = "(registration_timeout_error) Mysql Insert Error: " . $insert;
                error_log($errors);
            }
            mysqli_close($db_link);
        } else {
            $errors = "(registration_timeout_error) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }
    }

    /**
     * user_id, stars, program, belt, solved
     * stars - how many stars to add
     * program - currently selected user program
     * belt - currently assigned user belt
     * solved - add program in solved list if not empty
     */
    function add_user_stars($user_id, $stars, $program, $belt, $solved) {
        $errors = "";
        # connect to mysql db
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            # check that user already existed with such name
            $select = "SELECT STARS FROM users WHERE ID=$user_id";
            if ($result = mysqli_query($db_link, $select)) {
                // Fetch all data
                $data = mysqli_fetch_assoc($result);
                if (is_array($data)) {
                    $total_stars = $data['STARS'] + $stars;
                    $update = "UPDATE users SET PROGRAM='$program', BELT='$belt', STARS=$total_stars";
                    if (!empty($solved)) {
                        $update .= ", SOLVED='$solved'";
                    }
                    $update .= " WHERE ID=$user_id";
                    if ($result = mysqli_query($db_link, $update)) {
                        $user_data = array('success' => TRUE,
                                           'user_id' => $user_id,
                                           'stars' => $total_stars);
                    } else {
                        $errors = "Ошибка при обновлении пользовательских звезд";
                        error_log("(add_user_stars) Could not update user stars and current program");
                    }
                } else {
                    $errors = "Пользователь $user_id не существует";
                    error_log("(add_user_stars) No user found with $user_id in DB, returned $data");
                }
                mysqli_free_result($result);
            } else {
                $errors = "(add_user_stars) Mysql Select Error: " . mysqli_error($db_link);
                error_log($errors);
            }
            mysqli_close($db_link);

        } else {
            $errors = "(add_user_stars) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }

        if (strlen($errors) == 0) {
            echo json_encode($user_data);
        } else {
            $error_response = array('success' => FALSE,
                                    'error' => $errors);
            echo json_encode($error_response);
        }
    }

    function get_top_users($number) {
        $errors = "";
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            if (!mysqli_set_charset($db_link, "utf8")) {
                $errors = "Could not load utf8 charset for DB";
                error_log("ERROR: (add_fake_stars) $errors");
            }
            // select top 3 users with max stars
            $select = "SELECT NAME, SURNAME, STARS, AVATAR FROM users ORDER BY STARS DESC LIMIT ".$number."";
            if ($result = mysqli_query($db_link, $select)) {
                $row_cnt = mysqli_num_rows($result);
                $data[] = array('success' => TRUE, 'number'=> $number);
                if ($row_cnt > 0) {
                    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                        $data[] = $row;
                    }
                }
                echo json_encode($data);
                mysqli_free_result($result);
            } else {
                $errors = "Could not select top 3 users"; error_log("ERROR: (add_fake_stars) $errors");
            }
            mysqli_close($db_link);
        } else {
            $errors = "NO connection to DB"; error_log("ERROR: (add_fake_stars) $errors");
        }

        if (strlen($errors) > 0) {
            $error_response = array('success' => FALSE, 'error' => $errors);
            echo json_encode($error_response);
        }

    }

    /**
     * Add stars for fake users
     */
    function add_fake_stars() {
        $errors = "";
        // connect to mysql db
        if ($db_link = mysqli_connect("localhost", "supermath", "KiaForte2015!", "supermath_db")) {
            if (!mysqli_set_charset($db_link, "utf8")) {
                $errors = "Could not load utf8 charset for DB";
                error_log("ERROR: (add_fake_stars) $errors");
            }

            $select = "SELECT ID, STARS FROM users WHERE USERGROUP='FAKE' ORDER BY STARS ASC LIMIT 1";
            if ($result = mysqli_query($db_link, $select)) {
                $user = mysqli_fetch_assoc($result);
                if (is_array($user)) {
                    $stars = intval($user['STARS']) + rand(1,20); $user_id = $user['ID'];
                    $update = "UPDATE users SET STARS=$stars WHERE ID=$user_id";
                    if ($result = mysqli_query($db_link, $update)) {
                        error_log("(add_fake_stars) user $user_id added stars, total $stars");
                    } else {
                        error_log("(add_fake_stars) Could not update user stars and current program");
                    }
                } else {
                    error_log("ERROR: (add_fake_stars) no fake users found");
                }
                mysqli_free_result($result);
            } else {
                error_log("ERROR: (add_fake_stars) could not perform select from DB");
            }

            // select top 3 users with max stars
            $select = "SELECT NAME, SURNAME, STARS FROM users ORDER BY STARS DESC LIMIT 3";
            if ($result = mysqli_query($db_link, $select)) {
                $row_cnt = mysqli_num_rows($result);
                $data[] = array('success' => TRUE);
                if ($row_cnt > 0) {
                    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                        $data[] = $row;
                    }
                }
                echo json_encode($data); mysqli_free_result($result);
            } else {
                $errors = "Could not select top 3 users"; error_log("ERROR: (add_fake_stars) $errors");
            }
            mysqli_close($db_link);
        } else {
            $errors = "NO connection to DB"; error_log("ERROR: (add_fake_stars) $errors");
        }
        if (strlen($errors) > 0) {
            $error_response = array('success' => FALSE, 'error' => $errors);
            echo json_encode($error_response);
        }
    }

    /**
     * Add a new gamer for existed user
     * NO THIS FUNCTIONALITY IS NOT APPLICABLE. 1 user = 1 gamer.
     */
    function add_new_gamer($user_id, $user_email, $gamer_name, $program_id) {
        $errors = "";

        // ID1,NAME1;ID2,NAME2 ...
        // $user_data = "1,Roma;2,Aaron;3,Eric;13,Dasha";

        // connect to mysql db
        if ($db_link = mysqli_connect("localhost", "root", "linux99", "yura_db")) {
            $select = "SELECT ID FROM users WHERE ID=$user_id";
            if ($result = mysqli_query($db_link, $select)) {
                // Fetch all
                $users = mysqli_num_rows($result);
                mysqli_free_result($result);
                if ($users === 1) {
                    $select = "SELECT ID, NAME FROM gamers WHERE USER_ID=$user_id AND NAME='$gamer_name'";
                    if ($result = mysqli_query($db_link, $select)) {
                        // $gamers = mysqli_num_rows($result);
                        // mysqli_free_result($result);
                        if (mysqli_num_rows($result) > 0) {

                        }

                        if ($gamers === 0) {
                            $insert = "INSERT INTO gamers SET USER_ID=".$user_id
                                .", NAME='$gamer_name', BIRTHDAY='', PROGRAM_ID=$program_id";
                            if ($result = mysqli_query($db_link, $insert)) {
                                // select ALL gamers for particular user
                                $select = "SELECT ID, NAME, PROGRAM_ID ".
                                          "FROM gamers WHERE USER_ID=$user_id ";
                                if ($result = mysqli_query($db_link, $select)) {
                                    if (mysqli_num_rows($result) > 0) {
                                        $user_data = "";
                                        while($row = mysqli_fetch_assoc($result)) {
                                            $user_data += $row["ID"].",".$row["NAME"]."".$row["PROGRAM_ID"].";";
                                        }
                                    }
                                    else {
                                        $errors = "(add_new_gamer) Пользователя $gamer_name не существует";
                                        error_log($errors);
                                    }
                                }
                                else {
                                    $errors = "(add_new_gamer) Mysql Select after Insert Error: " . mysqli_error($db_link);
                                    error_log($errors);
                                }
                            }
                            else {
                                $errors = "(add_new_gamer) Mysql Insert Error: " . mysqli_error($db_link);
                                error_log($errors);
                            }
                        }
                        else {
                            $errors = "(add_new_gamer) Нельзя создавать пользователя с именем, которое уже существует";
                            error_log($errors);
                        }
                    }
                    else {
                        $errors = "(add_new_gamer) Could not select from gamers, Error: " . mysqli_error($db_link);
                        error_log($errors);
                    }
                }
                else {
                    $errors = "Пользователя с $user_id и $user_email не существует в системе";
                    error_log($errors);
                }
            }
            else {
                $errors = "(add_new_gamer) Mysql Select from users Error: " . mysqli_error($db_link);
                error_log($errors);
            }
            mysqli_close($db_link);
        }
        else {
            $errors = "(add_new_gamer) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }

        if (strlen($errors) == 0) {
            echo json_encode("PASSED;$user_data");
        } else {
            echo json_encode("$errors");
        }
    }

    /**
     * Get All available progams in DB
     */
    function get_all_programs($user_usergroup) {
        $errors = "";
        if ($db_link = mysqli_connect("localhost", "root", "linux99", "yura_db")) {
            mysqli_set_charset($db_link, "utf8");
            $select = "SELECT ID, NAME, DESCRIPTION, WHITEBOARD_ID_NAME FROM programs ORDER BY ID";
            if ($result = mysqli_query($db_link, $select)) {
                if (mysqli_num_rows($result) > 0) {
                    $user_data = "";
                    while ($row = mysqli_fetch_assoc($result)) {
                        $data = $row["ID"].",".$row["NAME"].",".$row["DESCRIPTION"].",".$row["WHITEBOARD_ID_NAME"];
                        $user_data = $user_data . ";" . $data;
                    }
                }
                else {
                    $errors = "(get_all_programs) Доступных программ для пользователя нет";
                    error_log($errors);
                }
                mysqli_free_result($result);
            }
            else {
                $errors = "(get_all_programs) Mysql Select Error: " . mysqli_error($db_link);
                error_log($errors);
            }
            mysqli_close($db_link);
        }
        else {
            $errors = "(get_all_programs) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }

        # if NO errors, establish mysql connection and check for unique id/login
        if (strlen($errors) == 0) {
            echo json_encode("PASSED$user_data");
        }
        else {
            echo json_encode("$errors");
        }
    }

    /**
     * Assign progam for user
     */
    function add_program_for_user($user_id, $user_email, $program_id) {
        $errors = "";
        # connect to mysql db
        if ($db_link = mysqli_connect("localhost", "root", "linux99", "yura_db")) {
            mysqli_set_charset($db_link, "utf8");
            # check that user already existed with such name
            $select = "SELECT ID, PROGRAMS_ID FROM users WHERE ID=$user_id";
            if ($result = mysqli_query($db_link, $select)) {
                // Fetch all data
                $data = mysqli_fetch_assoc($result);
                if (is_array($data)) {
                    // commented out code is about assign many programs
                    // now, only exact one program can be assigned
                    /*
                    if (strlen($data['PROGRAMS_ID']) === 0) {
                        $programs = $program_id;
                    }
                    else {
                        $programs = $data['PROGRAMS_ID'] . "-" . $program_id;
                    }
                    */
                    $programs = $program_id;
                    $update = "UPDATE users SET PROGRAMS_ID='$programs' WHERE ID=$user_id";
                    if ($result = mysqli_query($db_link, $update)) {
                        $user_data = $programs;
                    }
                    else {
                        $errors = "Невозможно добавить $program_id для $user_email";
                        error_log("(add_program_for_user) Could not add a new program for $user_email");
                    }
                }
                else {
                    $errors = "Пользователь с $user_email не зарегистрирован";
                    error_log("(add_program_for_user) No user found with $user_email in DB, data $data");
                }
                mysqli_free_result($result);
            }
            else {
                $errors = "(add_program_for_user) Mysql Select Error: " . mysqli_error($db_link);
                error_log($errors);
            }
            mysqli_close($db_link);
        }
        else {
            $errors = "(add_program_for_user) Mysql Connection Error: " . mysqli_error($db_link);
            error_log($errors);
        }

        # if NO errors, establish mysql connection and check for unique id/login
        if (strlen($errors) == 0) {
            echo json_encode("PASSED,$user_data");
        }
        else {
            echo json_encode("$errors");
        }
    }

    /**
      * Retrieves the best guess of the client's actual IP address.
      * Takes into account numerous HTTP proxy headers due to variations
      * in how different ISPs handle IP addresses in headers between hops.
      */
    function get_client_ip_address() {
        // Check for shared internet/ISP IP
        if (!empty($_SERVER['HTTP_CLIENT_IP']) && $this->validate_ip($_SERVER['HTTP_CLIENT_IP'])) {
          return $_SERVER['HTTP_CLIENT_IP'];
        }

        // Check for IPs passing through proxies
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // Check if multiple IP addresses exist in var
            $iplist = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($iplist as $ip) {
                if ($this->validate_ip($ip))
                    return $ip;
            }
        }

        if (!empty($_SERVER['HTTP_X_FORWARDED']) && $this->validate_ip($_SERVER['HTTP_X_FORWARDED']))
            return $_SERVER['HTTP_X_FORWARDED'];
        if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && $this->validate_ip($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
           return $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
        if (!empty($_SERVER['HTTP_FORWARDED_FOR']) && $this->validate_ip($_SERVER['HTTP_FORWARDED_FOR']))
           return $_SERVER['HTTP_FORWARDED_FOR'];
        if (!empty($_SERVER['HTTP_FORWARDED']) && $this->validate_ip($_SERVER['HTTP_FORWARDED']))
           return $_SERVER['HTTP_FORWARDED'];

        // Return unreliable IP address since all else failed
        return $_SERVER['REMOTE_ADDR'];
    }

    /**
      * Ensures an IP address is both a valid IP address and does not fall within
      * a private network range.
      *
      * @access public
      * @param string $ip
      */
    function validate_ip($ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP, 
                            FILTER_FLAG_IPV4 | 
                            FILTER_FLAG_IPV6 |
                            FILTER_FLAG_NO_PRIV_RANGE | 
                            FILTER_FLAG_NO_RES_RANGE) === false) {
            return false;
        }
        self::$ip = $ip;
        return true;
    }
?>
