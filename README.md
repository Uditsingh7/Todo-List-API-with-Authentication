# 📝 Todo List Sorcery with Authentications: Enchanting CI/CD Pipeline with GitHub Actions & Heroku Magic

Welcome to the realm of Todo List Management, fortified with powerful JWT-based authentication! Our enchanted API is crafted with Node.js and Express.js, dockerized for swift deployments, and empowered with user authentication to allow users to create, read, update, and delete their personal todo tasks securely as if by magic.

## 🌟 Mystical Features

- **CRUD Conjurations for Todos**: Create, Read, Update, and Delete user-specific todo enchantments.
- **JWT Sorcery**: Secure JWT-based authentication spells for user sign-up, login, and todo management.
- **Express.js Spellbook**: A fast and minimalist spellbook for Node.js rituals.
- **MongoDB Atlas Kingdom**: Cloud-hosted citadel for storing user scrolls and todo tasks.
- **Jest Incantations**: Comprehensive test scrolls for API spells and authentication flows.
- **Swagger Grimoire**: Interactive spellbook documentation for easy spellcasting.
- **Zod Wardings**: Input validation wardings for enhanced spell security.
- **Docker Concoctions**: Containerized cauldron for consistent spell environments.
- **GitHub Actions Sorcery**: Automated CI/CD spells for testing and deployment.

## 🌌 Sorcery-Enabled CI/CD Pipeline

The power of CI/CD sorcery is harnessed through GitHub Actions and Heroku incantations. With every push to the `main` realm, the sorcery unfolds, running spells and deploying the enchanted API to the Heroku realm.

## 📜 The Spellbook

### Prerequisites

Before diving into the arcane world, ensure you possess the following artifacts:

- Node.js
- Docker
- Git

### 🌀 Spellcasting Instructions

1. **Summon the Repository**:

    ```bash
    git clone https://github.com/Uditsingh7/Todo-List-API-with-Authentication.git
    ```

2. **Enter the Enchanted Realm**:

    ```bash
    cd Todo-List-API-with-Authentication
    ```

3. **Gather the Ingredients**:

    ```bash
    npm install
    ```

### 🧪 Setting up Environment Variables

**Prepare the .env Configuration**:

Copy the `.env.example` file to create a `.env` file. Update the MongoDB URI and JWT secret in the `.env` file with your respective values.

```bash
cp .env.example .env
```

Open the `.env` file and replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB Atlas connection string and JWT secret:

```makefile
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 🌌 Casting the Spell

#### 🌍 Local Sorcery

```bash
npm run start
```

The enchanted API will awaken at `http://localhost:3001`.

#### 🐳 Docker Spellcasting

```bash
docker build -t todo-list-api .
docker run -p 3001:3001 todo-list-api
```

### 🧪 Testing the Incantations

Invoke the tests:

```bash
npm test
```

### 📖 The Swagger Grimoire documentation

Access the interactive spellbook at `http://localhost:3001/api-docs`.

## 🚀 The Celestial Deployment

The live enchantment is deployed on Heroku and can be accessed at [Heroku Enchantment](https://todo-wand-api-fbe7cc6946ca.herokuapp.com/).

## 🧙‍♂️ Conjurers' Circle

We welcome fellow conjurers to contribute!
