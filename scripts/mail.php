<html>
<body>

<?php

$to = "tylerjbrown192@gmail.com";
$subject = //todo ;
$email = $_REQUEST['email'];
$message = $_REQUEST['message'];
$headers = "From: $email";
$sent = mail($to, $subject, $message, $headers);

if ($sent) {
    print 'Thanks for your email! I\'ll be in contact with you shortly'; // replacement text after sender presses 'send'
} else {
    print 'An error occurred. Please try again!';
}

?>

</body>
</html>
