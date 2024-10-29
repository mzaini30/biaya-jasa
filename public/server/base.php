<?php
header('Access-Control-Allow-Origin: *');
include './vendor/rb-sqlite.php';
R::setup('sqlite:./database.sqlite');