<?php
    ini_set("include_path", '/home/z1usen38/php:' . ini_get("include_path"));

        include 'Mail.php';
        include 'Mail/mime.php' ;
        $name = 'Юрий';
        $surname = 'Волокитин';
        $uuid ='586583c5a18f28.51208698';
        $email = 'volokitin@bk.ru';

        $headers["From"] = 'SuperMath <auto@supermath.ru>';
        $headers["To"] = $email; 
        $headers["Subject"] = 'SuperMath Activation code ' . $uuid;
        $headers["Content-Type"] = 'text/html; charset=UTF-8';

        $html = "<html><body>Activation code: ".$uuid."</body></html>";

        /*
        $headers = array('From' => 'SuperMath <auto@supermath.ru>',
                      'To' => $name.' '.$surname.' <'.$email.'>',
                      'Subject' => 'SuperMath Registration',
                      'Content-Type:'  => 'text/html; charset=UTF-8',
                      'Content-Transfer-Encoding:' => '8bit');
        */
        // $mime = new Mail_mime('\n');
        $mime = new Mail_mime(array('eol' => '\n'));
        $mime->setTXTBody("Activation code " . $uuid);
        $mime->setHTMLBody($html);
        $body = $mime->get();
        $headers = $mime->headers($headers);

        $mail =& Mail::factory('mail');
        $mail->send($email, $headers, $body);

        if (PEAR::isError($mail)) {
            $error = $mail->getMessage();
            error_log("send_email, FAILED: $error");
        } else {
            error_log("\nHEADER: $headers \nBODY: $body");
        }
?>
