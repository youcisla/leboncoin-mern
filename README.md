# Le Bon Coin MERN Application

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/youcisla/leboncoin-mern.git
   ```

2. Navigate to the project directory:
   ```bash
   cd leboncoin-mern/LeBonCoin
   ```

3. Install dependencies for both backend and frontend:
   ```bash
   make install
   ```

4. Start the backend and frontend servers:
   ```bash
   make start
   ```

## Technologies Utilisées

- **Frontend**:
  - React.js
  - Bootstrap (pour le design)

- **Backend**:
  - Node.js
  - Express.js

- **Base de données**:
  - MongoDB

- **Autres**:
  - JWT (JSON Web Token) pour l'authentification
  - Bcrypt pour le hachage des mots de passe

## Fonctionnalités Implémentées

1. **Système d'authentification sécurisé**:
   - Inscription et connexion des utilisateurs avec JWT et bcrypt.

2. **Gestion des annonces (CRUD)**:
   - Création, lecture, mise à jour et suppression des annonces.
   - Les annonces sont associées à l'utilisateur authentifié.

3. **Téléchargement de fichiers**:
   - Validation des fichiers pour les images et vidéos lors de la création d'annonces.

4. **Interface utilisateur**:
   - Design cohérent avec un thème vert et noir.
   - Utilisation de Bootstrap pour un design réactif et aligné.

5. **Automatisation**:
   - Utilisation d'un `Makefile` pour simplifier les tâches comme l'installation, le nettoyage et le démarrage des serveurs.

6. **Documentation**:
   - Instructions détaillées pour l'installation et l'utilisation du projet.

