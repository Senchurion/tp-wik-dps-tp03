# Application Node.js avec Docker

Ce projet configure une application Node.js pour s'exécuter dans un conteneur Docker avec un reverse proxy NGINX.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre système :
- Docker
- Docker Compose

## Structure du projet

- `multi-stage.dockerfile` : Dockerfile pour construire l'image de l'application Node.js.
- `nginx.conf` : Configuration pour le serveur NGINX servant de reverse proxy.
- `docker-compose.yml` : Configuration Docker Compose pour déployer l'application et le reverse proxy.
- `/src` : Contient le code source de l'application Node.js.

## Fonctionnalités

L'application Node.js a été configurée pour logger l'hostname du conteneur qui traite la requête. Cela permet d'identifier facilement quel réplica a répondu à une requête donnée, facilitant ainsi le débogage et le suivi des requêtes dans les environnements distribués.

## Configuration

Le service `nodeapp` est configuré pour s'exécuter avec 4 réplicas, écoutant sur le port défini par la variable d'environnement `PING_LISTEN_PORT`.

Le service `nginx` sert de reverse proxy et est configuré pour écouter sur le port 8080 de l'hôte.

## Démarrage

Pour démarrer l'application, exécutez la commande suivante depuis le répertoire contenant le fichier `docker-compose.yml` :

```bash
docker-compose up --scale nodeapp=4 -d
```

Cette commande va démarrer l'application Node.js avec 4 instances et le serveur NGINX comme reverse proxy.

## Accès à l'application

Une fois les conteneurs démarrés, vous pouvez accéder à l'application via l'URL suivante :

```
http://localhost:8080/ping
```

## Arrêt de l'application

Pour arrêter et supprimer tous les services associés à l'application :

```bash
docker-compose down
```
