<?php
$name = $_POST['full_name'];
$country = $_POST['country'];
$town = $_POST['town'];
$education = $_POST['education'];
$grade = $_POST['grade'];
$form = $_POST['participation_form'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$subjects = $_POST['subject'];

var_dump($_POST);
echo "<br>";
echo "<br>";
// echo "\nМассив предметов" . ($subjects);
// var_dump($subjects);

//var_dump($subjects);
// echo "<br>";
// echo "<br>";
foreach ($subjects as $key => $subject) echo $subject . "<br>";
