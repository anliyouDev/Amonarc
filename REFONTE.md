# Refonte Amonarc

Site institutionnel et page investisseurs pour l’application Amonarc en développement.

- Accueil : « Vos ambitions. Notre expertise. Donnons-leur vie. »
- Animations ponctuelles, préférence de réduction des mouvements respectée.
- Référence MT Business Group conservée ; captures de projets et ancienne plaquette exclues de la publication.
- Historique 2025 reformulé en contribution aux travaux sur la transformation numérique industrielle.
- Rendu du fil d’actualité issu des widgets réels du prototype Flutter, en mode démonstration.
- Pitch investisseurs sur /#/investisseurs, chargé séparément de l’accueil.
- Formulaires reliés à une API SMTP serveur, sans FormSubmit. Identifiants fournis uniquement par l’environnement du serveur.

## Lancer

Avec Node.js 22 : npm ci, copier .env.example en .env, configurer SMTP puis npm run dev. Compiler avec npm run build ; servir avec npm start.

Voir DEPLOIEMENT.md pour la configuration, les tests et les hébergements compatibles.

## Validation

Compilation Vite et tests de l’API SMTP réussis. L’envoi réel doit être validé après configuration du compte SMTP.
