<?php

$config = include 'config.php';

try {
	$oauth = new OAuth($config['consumerKey'], $config['consumerSecret'], OAUTH_SIG_METHOD_HMACSHA1, OAUTH_AUTH_TYPE_URI);
  $oauth->enableDebug();
  //$_SERVER['HTTP_HOST'] = '10.5.5.79';
	$request_token_info = $oauth->getRequestToken($config['base'] . $config['requestTokenURL']
	, 'http://127.0.0.1/demo/cb.php'
);
	session_start();
	$_SESSION['request'] = $request_token_info;
  //print_r($_SESSION);
  //exit;
	//echo "<a href='".$config['base']. 'login.php?oauthv1a&oauth_token=' . $request_token_info['oauth_token']."'>Entrar</a>";
	header('Location: ' . $config['base'] . 'login.php?oauthv1a&oauth_token=' . $request_token_info['oauth_token']);
} catch (Exception $e) {
	echo $e;
}
