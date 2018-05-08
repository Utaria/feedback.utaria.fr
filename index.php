<?php
session_start();

$config = require("config.php");

function getNotif(){
	if(!isset($_SESSION['notification'])||empty($_SESSION['notification'])) return false;
	echo '<div class="notif notif-'.$_SESSION['notification']['type'].'"><div class="icon"></div><div class="message">'.$_SESSION['notification']['message'].'</div><div class="close"><i class="fa fa-times"></i></div></div>';
	unset($_SESSION['notification']);
}

?><!DOCTYPE html>
<html>
<head>
	<meta name="description" content="test">
	<meta name="keywords" content="minecraft,serveur minecraft,serveur,survie unique,unique,original,nouveau,survival">
	<meta name="author" content="Utaria">
	<meta name="dcterms.rightsHolder" content="utaria">
	<meta name="Revisit-After" content="2 days">
	<meta name="Rating" content="general">
	<meta name="language" content="fr-FR" />
	<meta name="robots" content="all" />
	<meta charset="UTF-8">

	<title>Feedback Utaria | Envoyez-nous vos retours !</title>

	<meta name="viewport" content="width=device-width, initial-scale = 1, user-scalable = no">

    <meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="@Utaria_FR">
	<meta name="twitter:title" content="Utaria, les serveurs de demain !">
	<meta name="twitter:description" content="Utaria, un serveur Minecraft innovant.">
	<meta property="og:title" content="Utaria">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://utaria.fr/">

	<link rel="icon" type="image/png" href="//utaria.fr/img/favicon.png" />

	<link href="https://fonts.googleapis.com/css?family=Lato:400,900|Open+Sans:400,700" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="./css/awesome.min.css">
	<link rel="stylesheet" type="text/css" href="./css/style.css">
</head>
<body>

	<header>
		<div class="top-bar">
			<div class="row-container">
				<div class="left">
					<span class="players-count">
						<i class="fa fa-users"></i> <?= file_get_contents('https://serveurs-minecraft.com/api?Classement=Utaria&Joueurs_En_Ligne') ?> / <?= file_get_contents('https://serveurs-minecraft.com/api?Classement=Utaria&Slots') ?> joueurs
					</span>
				</div>
				<div class="right">
					<span class="server-ip">
						<i class="fa fa-signal"></i> mc.utaria.fr
					</span>
				</div>
			</div>
		</div>
		<div class="main-bar">
			<div class="row-container">
				<div class="left">
					<a href="https://feedback.utaria.fr/" title="Utaria, les serveurs de demain !"><div id="logo"></div></a>
				</div>
			</div>
		</div>
		

		<div class="clear"></div>
	</header>


	<section id="main">

		<input type="hidden" id="checkignurl" value="<?= $config['authcheckurl'] ?>">

		<div class="feedback-form-container row-container">
			<div class="steps-tracker left">
				<div class="step-trace">
					<div class="progress-trace" id="progress-trace"></div>
				</div>

				<div class="step active">1</div>
				<div class="step" style="top:138px">2</div>
				<div class="step" style="top:275px">3</div>
				<div class="step" style="top:475px">4</div>
			</div>

			<div class="feedback-form right">
				<h1 class="form-title">
					Envoyez un retour à l'équipe <br>
					<!-- <span style="display:block;color:#A1A1A1;font-size:0.4em">Prototype en développement</span> -->
				</h1>
				
				<div class="form-step form-step-1">
					<form id="step-1">
						<div class="input">
							<input type="text" data-need-verif="true" name="username" id="username" autocomplete="off" autofocus tabindex="-1">
							<label for="username">Votre pseudo sur Utaria</label>
						</div>
					</form>
				</div>
				<div class="form-step form-step-2">
					<form id="step-2">
						<div class="input">
							<input type="text" name="feedback_service" id="feedback_service" autocomplete="off" tabindex="-1">
							<label for="feedback_service">Service concerné</label>
						</div>
					</form>
				</div>
				<div class="form-step form-step-3">
					<form id="step-3">
						<div class="input textarea">
							<label for="feedback_description">Description</label>
							<textarea name="feedback_description" id="feedback_description" tabindex="-1"></textarea>
						</div>
					</form>
				</div>
				<div class="form-step form-step-4">
					<form id="step-4">
						<div class="input" style="top:25px">
							<input type="text" data-need-verif="true" name="feedback_priority" id="feedback_priority" data-default-value="0" value="0" autocomplete="off" tabindex="-1">
							<label for="feedback_priority">Priorité (entre 0 et 5)</label>
						</div>
					</form>
				</div>

				<div class="form-submit">
					<form id="form-submit-form" method="POST" action="process.php">
						<button type="submit" class="submit-feedback" tabindex="-1">Envoyer mon retour</button>
					</form>
				</div>
			</div>
		</div>
		
	</section>


	<?php getNotif(); ?>


	<script type="text/javascript" src="./js/util.js"></script>
	<script type="text/javascript" src="./js/app.js"></script>
	<!-- <script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-87706617-1', 'auto');
	  ga('send', 'pageview');

	</script> -->

</body>
</html>