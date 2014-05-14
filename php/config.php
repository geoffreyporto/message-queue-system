<?php

$server = true;
//$server = false;

if ($server)
	/*return array
		(
		"base" => "http://192.237.215.233:85/",
		"requestTokenURL" => "oauthv1/request_token.php",
		"accessTokenURL" => "oauthv1/access_token.php",
		"requestTokenMethod" => "POST",
		"signatureMethod" => "HMAC-SHA1",
		"consumerKey" => "1e7d90742c9e5139d4e3426044d16d",
		"consumerSecret" => "76c6fdcfc0"
	);*/
	return array
    		(
    		"base" => "http://192.237.215.233:85/",
    		"requestTokenURL" => "oauthv1/request_token.php",
    		"accessTokenURL" => "oauthv1/access_token.php",
    		"requestTokenMethod" => "POST",
    		"signatureMethod" => "HMAC-SHA1",
    		"consumerKey" => "f0a1488499bb9d01c475a0d5c8d17d",
    		"consumerSecret" => "cd84bb61a8"
    	);
else
	/*return array
		(
		"base" => "http://localhost:83/",
		"requestTokenURL" => "oauthv1/request_token.php",
		"accessTokenURL" => "oauthv1/access_token.php",
		"requestTokenMethod" => "POST",
		"signatureMethod" => "HMAC-SHA1",
		"consumerKey" => "f71746a55cf9472ba75dcf2ce36756",
		"consumerSecret" => "733299e64e"
	);*/
    return array
		(
		"base" => "http://localhost:83/",
		"requestTokenURL" => "oauthv1/request_token.php",
		"accessTokenURL" => "oauthv1/access_token.php",
		"requestTokenMethod" => "POST",
		"signatureMethod" => "HMAC-SHA1",
		"consumerKey" => "f0a1488499bb9d01c475a0d5c8d17d",
		"consumerSecret" => "cd84bb61a8"
	);