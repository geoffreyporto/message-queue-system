<?php
$config = include 'config.php';

try {//OAUTH_SIG_METHOD_HMACSHA1
	$oauth = new OAuth($config['consumerKey'], $config['consumerSecret'], 'PLAINTEXT', OAUTH_AUTH_TYPE_URI);
	$oauth->enableDebug();

	session_start();
	$oauth->setToken($_SESSION['request']['oauth_token'], $_SESSION['request']['oauth_token_secret']);
	$access_token_info = $oauth->getAccessToken($config['base'] . $config['accessTokenURL']
			, 0
			, $_GET['oauth_verifier']
	);
	?>
	<script>
	    if(typeof(Storage)!=="undefined")
        {
		localStorage.oauth = JSON.stringify({
			'base': '<?= $config['base'] ?>',
			'key': '<?= $config['consumerKey'] ?>',
			'secret': '<?= $config['consumerSecret'] ?>',
			'token': '<?= $access_token_info['oauth_token'] ?>',
			'token_secret': '<?= $access_token_info['oauth_token_secret'] ?>'
		});
		} else
            {
                // Perdon! No puedo soportar Web Storage..
                alert('Perdon! Este browser no soporta Web Storage..')
            }
		window.location.replace("/demo/main.html");
	</script>
	<?php
} catch (Exception $e) {
	echo $e->getMessage();
}
