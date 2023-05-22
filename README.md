# API_rest_TS

API de justification de texte.
Le texte est justifié tous les 80 caractères.
Une limite de 80 000 mots par jours est imposée.

L'identification se fait par token unique via son adresse mail.

## A propos
### Auteurs
Pierre JEZEQUEL

### Versions utilisées
Name: "api_rest_ts",
Version: "1.0.0",

Typescript      v 5.0.4
Node.js         v 18.13.0

### Dépendences
cors            v 2.8.5
express         v 4.18.2
jest            v 29.5.1
jsonwebtoken    v 9.0.0
dotenv          v 16.0.3

## Création d'un nouveau Token d'authentification.

### POST /api/token

requète : POST
url: http://localhost:3000/api/token
JSON Body : {"email": "foo@bar.com"}

### Réponse

Status: 200 OK
{"token":"token_unique_d'authentification_ici"}

Status: 401 Unauthorized
{"message": "invalid access}


## Justificaiton du texte

### POST /api/justify

requète : POST
url: http://localhost:3000/api/justify
Header / Authorization : token_unique_d'authentification_ici
TEXT Body : "Ici le texte à justifier......"

### Réponse

Status: 200 OK
"Ici le texte est justifié tous les 80 caractères....."

Status: 402 Payment Required
{"message": "Payment Required}
