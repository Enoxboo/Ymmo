# Ymmo – Plateforme immobilière

Ymmo est une application web de gestion et de consultation de biens immobiliers.  
Elle propose un espace public pour les visiteurs, un espace d’administration pour gérer les biens, les agences et les utilisateurs, ainsi qu’un système de rôles avec un super admin protégé.

## Stack technique

- **Frontend**
    - React + Vite
    - React Router
    - Tailwind CSS
- **Backend**
    - Node.js / Express
    - Prisma
    - JWT pour l’authentification
- **Base de données**
    - PostgreSQL

## Fonctionnalités principales

- Consultation des biens :
    - Page d’accueil avec les derniers biens publiés
    - Liste de tous les biens
    - Page de détail d’un bien avec photos, caractéristiques et informations d’agence
- Administration :
    - Dashboard admin
    - Gestion des utilisateurs (rôles USER / ADMIN / SUPER_ADMIN)
    - Gestion des biens : création, édition, suppression
    - Gestion des agences
- Upload de photos :
    - Upload d’images côté backend
    - Stockage dans un dossier `/uploads` et utilisation de `VITE_FILE_URL` côté front
- Sécurité / rôles :
    - Authentification par JWT (`/api/auth/login`, `/api/auth/register`)
    - Rôles : `USER`, `ADMIN`, `SUPER_ADMIN`
    - `SUPER_ADMIN` a tous les droits (bypass `requireRole`)
    - Les super admins ne peuvent pas être supprimés ni voir leur rôle modifié par un simple admin
- Header global :
    - Logo qui renvoie vers `/`
    - Bouton “À propos”
    - Bouton “Admin” visible pour ADMIN + SUPER_ADMIN
    - Connexion / Déconnexion en fonction de l’état

## Structure du projet

```txt
ymmo/
  backend/
    prisma/
      schema.prisma
    Routes/
      auth.js
      admin.js
      properties.js
      users.js
      agencies.js
      upload.js
    Middlewares/
      auth.js
    uploads/
      ... (images uploadées)
    initSuperAdmin.js
    index.js (ou server.js)
    package.json

  frontend/
    src/
      components/
        Header.jsx
        ProtectedRoute.jsx
      pages/
        homepage.jsx
        bien-all.jsx
        bien.jsx
        about.jsx
        admin.jsx
        admin-users.jsx
        admin-properties.jsx
        login.jsx
        register.jsx
      services/
        auth.js
        properties.js
        users.js
        upload.js
      App.jsx
      main.jsx
    package.json

  README.md
```

## ⚙Configuration

### Variables d’environnement – Backend

Dans `backend/.env` :

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=...
JWT_SECRET=
SEED_ADMIN_EMAIL=admin@ymmo.fr
SEED_ADMIN_PASSWORD=
SEED_USER_EMAIL=client@ymmo.fr
SEED_USER_PASSWORD=
```

### Variables d’environnement – Frontend

Dans `frontend/.env` :

```env
VITE_API_URL=http://localhost:4000/api
VITE_FILE_URL=http://localhost:4000
```

> `VITE_FILE_URL` est utilisé pour construire les URL des images du dossier `/uploads`.

## Installation & lancement

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Au démarrage :

- `initSuperAdmin.js` vérifie/crée :
    - un super admin avec `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
    - un utilisateur simple avec `SEED_USER_EMAIL` / `SEED_USER_PASSWORD`

L’API est exposée sur `http://localhost:4000/api`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

L’application est accessible sur `http://localhost:5173`.

## Authentification & rôles

- Inscription / connexion via `/api/auth/register` et `/api/auth/login`
- Le front stocke le JWT (par exemple en localStorage) et l’envoie dans le header `Authorization: Bearer <token>`.
- Middleware `requireAuth` :
    - vérifie le token
    - charge l’utilisateur depuis la base
    - attache `req.user` (id, email, role, etc.)
- Middleware `requireRole(...roles)` :
    - bloque l’accès si l’utilisateur n’a pas le rôle requis
    - **exception** : si `req.user.role === 'SUPER_ADMIN'`, l’accès est toujours autorisé


## Super admin & protections

### Seed au démarrage

`backend/initSuperAdmin.js` :

- lit `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
- crée un utilisateur `SUPER_ADMIN` si inexistant
- force son rôle à `SUPER_ADMIN` s’il existe déjà
- fait la même chose pour un utilisateur `USER` de test

### Routes protégées

Dans `Routes/users.js` :

- `PUT /api/users/:id/role` :
    - ne permet de passer que `USER` ou `ADMIN`
    - refuse la modification si l’utilisateur cible est `SUPER_ADMIN`
- `DELETE /api/users/:id` :
    - refuse la suppression si l’utilisateur cible est `SUPER_ADMIN`

Côté front (`AdminUsersPage.jsx`) :

- les SUPER_ADMIN apparaissent, mais :
    - leur rôle n’est pas modifiable (pas de `<select>`)
    - aucun bouton “Supprimer” n’est affiché

## Gestion des biens & photos

- Les biens sont gérés via Prisma (`Property`, `Photo`, `Agency`, etc.).
- Lors de la création d’un bien :
    - une référence automatique est générée (`REF-xxxxxx`)
    - les photos sont créées avec un champ `position`
- Côté backend, les fichiers sont uploadés dans `backend/uploads`, exposés via :

```js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
```

- Côté frontend, les URL des images sont construites avec `VITE_FILE_URL` :

```js
function buildImageUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${FILE_URL}${url}`
}
```

## Navigation & UI

- `Header.jsx` :
    - logo cliquable → `/`
    - “À propos” → `/about`
    - “Admin” (visible pour ADMIN et SUPER_ADMIN) → `/admin`
    - “Se connecter” / “Déconnexion (email)” selon l’état de l’utilisateur
- `ProtectedRoute.jsx` :
    - redirige vers `/login` si non connecté
    - laisse passer tous les SUPER_ADMIN
    - vérifie `requiredRole` pour les autres

## Scripts utiles

Backend :

- `npm run dev` – lancer le serveur en développement (nodemon)
- `npx prisma studio` – ouvrir Prisma Studio pour gérer les données

Frontend :

- `npm run dev` – lancer le front en développement
- `npm run build` – build de production
- `npm run preview` – preview du build

--- 

Made By Laurine.