<?php
header('Content-Type: application/json');
echo(json_encode(array(
    'verified' => ($_GET["ign"] == "Utarwyn")
)));