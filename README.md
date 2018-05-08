# UTARIA : Site de retours de bugs ! (V1)

[![Suivez-nous](https://img.shields.io/twitter/follow/Utaria_FR.svg?style=social&label=Suivez-nous%20sur%20Twitter)](https://twitter.com/Utaria_FR)
[![Discord](https://img.shields.io/discord/220472433344380928.svg)](https://discord.gg/UNgPrPk) \
![Licence](https://img.shields.io/github/license/utaria/feedback.utaria.fr.svg)
![Dernier commit](https://img.shields.io/github/last-commit/utaria/feedback.utaria.fr.svg)

Ce site internet a été réalisé dans le cadre du lancement du serveur Minecraft "Survie UTARIA" en décembre 2016 pour sa première version (V1). *(Démarrée le 16 décembre 2016 et arrêtée le 31 juillet 2017)* \
Développé par [Utarwyn](https://github.com/utarwyn). 


### En quoi consiste cet outil ?

Ce site internet interactif a été conçu dans le but de fournir un outil aux joueurs du Survie de UTARIA pour leur permettre de **soumettre des bugs trouvés** (ou des idées) à l'équipe d'administration. Il a pour objectif d'être **simple** et **intuitif** afin de **simplifier la tâche des joueurs**.
> Toutefois, il ne fournit pas d'interface de visualisation/administration des retours. Compte-tenu du planning qui était à respecter, nous n'avions pas pu la développer. Il faut donc accéder directement à la base de données pour y avoir accès (via HeidiSQL par exemple - ou en ligne de commandes -). **Un autre outil verra le jour plus tard pour y avoir accès via une interface simple.**

### Quelques images du site internet ?

![Première étape de retour d'un bug](https://i.imgur.com/p5MWZfZ.png)

![Retour d'un bug #2](https://i.imgur.com/326VzEE.png)

### Quelles technologies utilise-t-il ?

Le site internet utilise du **PHP 5.6+** ainsi qu'une base de données **MySQL** afin de stocker les retours. Il se connecte à une **API externe** pour ainsi savoir si un joueur s'est déjà connecté à Utaria avant de poster un retour. \
La partie intégration/animation est développée en **HTML/CSS/JS natif**, sans aucune librairie externe, si ce n'est *FontAwesome*, un pack composé de nombreuses icônes.

> __Disclaimer:__ Le site internet a été réalisé **fin 2016** et ne reflète plus les technologies utilisées aujourd'hui par l'équipe de UTARIA ni même le développeur de ce site.


On remercie tous les participants du jeu et les joueurs de notre V1, sans qui nous ne serions pas là aujourd'hui. :fire: :heart_eyes: 