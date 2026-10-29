# Déployer Amonarc avec l’envoi des emails

Le site contient maintenant une API `/api/contact`. Elle envoie un email en texte brut à `jeanpkokora@gmail.com` et `konanalain94@gmail.com`, avec l’adresse du visiteur dans Reply-To. Les destinataires sont fixés côté serveur. FormSubmit n’est plus utilisé.

## Développement

Node.js 22 est recommandé. Exécuter `npm ci`, copier `.env.example` vers `.env`, renseigner la configuration SMTP puis lancer `npm run dev`. Vite sert aussi l’API en développement. Redémarrer après toute modification de `.env`.

Le fichier `.env` est ignoré par Git et doit être exclu de toute archive de livraison. Ne jamais utiliser de variable `VITE_` pour un mot de passe ou un secret SMTP.

## Configuration SMTP

Configurer `SMTP_HOST`, `SMTP_PORT` (465 ou 587), `SMTP_USER`, `SMTP_PASS` et éventuellement `SMTP_FROM`. Le serveur utilise TLS avec validation des certificats. L’expéditeur doit être autorisé par le fournisseur SMTP ; le visiteur n’est jamais utilisé comme expéditeur.

Pour Gmail, le modèle propose `smtp.gmail.com`, port 465 et votre adresse Gmail. Si cette méthode est retenue, créer soi-même un mot de passe d’application dans son compte Google et le renseigner directement dans `.env` ou dans les variables d’environnement de l’hébergement. Ne pas utiliser le mot de passe normal du compte et ne pas transmettre le secret dans le chat.

Google demande la validation en deux étapes et certains comptes ne proposent pas les mots de passe d’application. Un autre compte SMTP professionnel peut être utilisé avec le même code.

Documentation : https://support.google.com/accounts/answer/185833?hl=fr

## Hébergement

### Serveur Node derrière Caddy

Exécuter `npm run build`, puis `npm start`. Le serveur sert `dist/` et l’API sur `127.0.0.1:8787` par défaut. Configurer le superviseur de processus et Caddy pour relayer le domaine vers ce port. Le fichier `.env` ne fait pas partie du répertoire servi. Les requêtes statiques bénéficient de la compression et des fonctionnalités HTTP du proxy.

### Vercel

L’entrée `api/contact.js` utilise le même gestionnaire. Configurer les variables SMTP dans le projet Vercel et vérifier `CONTACT_ALLOWED_ORIGINS` pour l’origine réellement utilisée. Pour un aperçu Vercel, ajouter son origine exacte à cette liste. Ne pas ouvrir la liste à toutes les origines.

Un hébergement purement statique, notamment GitHub Pages, ne suffit plus à lui seul pour l’envoi automatique. Le script historique `npm run deploy` ne déploie pas l’API.

## Vérifications

`npm run test:contact` vérifie la validation des entrées, les destinataires fixes, le refus des origines externes, les erreurs de configuration, le refus partiel de destinataire, la limitation par adresse et la déduplication. Les tests simulent le transport SMTP et n’envoient rien.

Après configuration réelle : envoyer un message de test, vérifier sa réception aux deux adresses et répondre à ce message pour vérifier Reply-To. Une acceptation SMTP n’est pas une preuve d’arrivée dans la boîte de réception.

Les protections de débit et de déduplication sont en mémoire, par processus. Pour un trafic important ou plusieurs instances, prévoir un stockage partagé et une protection antispam complémentaire.
