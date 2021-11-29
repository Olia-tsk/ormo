<?php
$name = $_POST['full_name'];
$country = $_POST['country'];
$city = $_POST['town'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$subjects = $_POST['subject'];
$comments = 'Образовательное учреждение: ' . $_POST['education'] . "\n" .
  'Класс: ' . $_POST['grade'] . "\n" .
  'Форма участия: ' . $_POST['participation_form'] . "\n" . 'Предметы: ';

foreach ($subjects as $subject) {
  $comments = $comments . $subject . ', ';
}

$data = [
  'REMOTE_ADDR' => isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['REMOTE_ADDR'] . "/" . $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'],
  'HTTP_REFERER' => isset($_COOKIE['referrer']) ? urldecode($_COOKIE['referrer']) : null,
  'QUERY_STRING' => isset($_COOKIE['query_string']) ? str_replace('?', '', urldecode($_COOKIE['query_string'])) : null,
  'form' => 'olimp',
  'name' => $name,
  'phone' => $tel,
  'email' => $email,
  'country_id' => $country,
  'city' => $city,
  'comments' => $comments
];

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://crm.tusur.ru/index.php?r=api/order',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => $data,
));

$response = curl_exec($curl);
curl_close($curl);
$response = json_decode($response);

if ($response && isset($response->result) && $response->result === 'ok') {
  echo 'Спасибо! Ваша заявка принята!';
}
