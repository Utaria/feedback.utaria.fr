<?php
session_start();
require_once 'database.php';

function setNotif($message, $type = 'success'){
	$_SESSION['notification'] = array('message' => $message, 'type' => $type);
}



// Connect to the BDD
$db = new Database();
$conf = require('config.php');

$db->connect($conf['database']['host'], $conf['database']['user'], $conf['database']['password'], $conf['database']['name']);

// Send the feedback
$db->save(array(
	"table"  => $conf['database']['table'],
	"fields" => array(
		"playername"  => $_POST["username"],
		"service"     => $_POST["feedback_service"],
		"description" => $_POST["feedback_description"],
		"priority"    => $_POST["feedback_priority"]
	)
));

setNotif("Vous avez envoyé votre retour avec succès !");
@header("Location: /");
?>