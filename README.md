# Project Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview and Objectives](#project-overview-and-objectives)
3. [Prerequisites](#prerequisites)
4. [Setting Up the Development Environment](#setting-up-the-development-environment)
   - [1. Clone the Repository](#1-clone-the-repository)
   - [2. Configure Environment Variables](#2-configure-environment-variables)
   - [3. Build and Run with Docker Compose](#3-build-and-run-with-docker-compose)
5. [Running the Application Locally](#running-the-application-locally)
6. [Project Structure](#project-structure)
   - [Controllers](#controllers)
     - [Admin Controller](#admin-controller)
     - [User Controller](#user-controller)
     - [Product Controller](#product-controller)
     - [Auth Controller](#auth-controller)
7. [API Endpoints](#api-endpoints)
   - [Admin Endpoints](#admin-endpoints)
   - [User Endpoints](#user-endpoints)
   - [Product Endpoints](#product-endpoints)
   - [Auth Endpoints](#auth-endpoints)
8. [Conclusion](#conclusion)
9. [References](#references)

---

## Introduction

Welcome to the **Tech Store** documentation! This comprehensive guide will walk you through the project's purpose, setup procedures, and usage instructions. Whether you're a developer looking to contribute or a user eager to explore the application, this documentation will provide all the necessary information to get you started. Thank you!!!

---

## Project Overview and Objectives

### Overview

**Tech Store Api** is backend api built using [NestJS](https://docs.nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications. The project leverages Docker for containerization, ensuring a consistent and reproducible development environment across different systems, and Postgres as the Database.

### Objectives

The primary objectives of **Tech Store API** are:

- **Modularity**: Implement a clean and maintainable codebase by following best practices and leveraging NestJS's modular architecture.
- **Scalability**: Ensure the application can handle increasing loads by utilizing efficient coding patterns and scalable infrastructure.
- **Security**: Incorporate robust authentication and authorization mechanisms to protect sensitive data and functionalities.
- **Ease of Deployment**: Utilize Docker and Docker Compose for simplified and streamlined deployment processes.
- **Comprehensive API**: Provide a well-documented and comprehensive RESTful API for various functionalities such as user management, product handling, and administrative operations.

---

## Prerequisites

Before setting up the development environment, ensure that you have the following software installed on your system:

- **Git**: Version control system for cloning and managing the repository.
  - Download and install from [Git Official Website](https://git-scm.com/downloads).
- **Docker**: Containerization platform for building and running containers.
  - Download and install from [Docker Official Website](https://www.docker.com/get-started).
- **Docker Compose**: Tool for defining and running multi-container Docker applications.
  - Docker Desktop includes Docker Compose by default.
- **NestJS** is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming)..
  - Download and install from [NestJS Official Website](https://docs.nestjs.com/).

---

## Setting Up the Development Environment

Follow the steps below to set up your development environment and run the application locally.

### 1. Clone the Repository

Open your terminal and execute the following command to clone the repository:

```bash
git clone https://github.com/demola07/basic-ecommerce-system
```


Navigate into the project directory:

```bash
cd basic-ecommerce-system
```

### 2. Configure Environment Variables

The application requires certain environment variables to function correctly. These variables are stored in the `.env` files located in the `env` directory.

#### Create Environment Files

Create the following files inside the `env` directory:

- **.env**
- **env/core.env**
- **env/db.env**

#### Configure Variables

Populate the environment files with the necessary variables.

**Example:**

```dotenv
# .env
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_DB=
DATABASE_DEBUG=
DATABASE_HOST=
DATABASE_PORT=
# POSTGRES_PASSWORD=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

```dotenv
# env/core.env
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
```

```dotenv
# env/db.env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

**Note:** Ensure that the credentials in `core.env` and `db.env` match accordingly.

### 3. Build and Run with Docker Compose

Docker Compose simplifies the process of building and running multi-container Docker applications.

#### Build Services

Execute the following command to build the Docker services defined in the `docker-compose.yml` file:

```bash
docker-compose build
```

#### Run Services

After successfully building the services, run the following command to start the containers:

```bash
docker-compose up
```

This command will start both the **core** and **db** services as defined in your `docker-compose.yml` file.

#### Run Services in Detached Mode

To run the containers in detached mode (in the background), use the `-d` flag:

```bash
docker-compose up -d
```

---

## Running the Application Locally

Once the Docker containers are up and running, you can access the application and its APIs.

### Accessing the Application

- **API Base URL**: `http://localhost:4000`

### Stopping the Application

To stop the running containers, execute:

```bash
docker-compose down
```

This command will stop and remove the containers, networks, and volumes created by `docker-compose up`.

---

## Project Structure

The project follows a modular structure using NestJS, organizing code into cohesive modules for better maintainability and scalability.
```
  basic-ecommerce-system/
  ├── dist/                     # Compiled output files
  ├── env/                      # Environment configuration files
  ├── migrations/               # Database migration files
  ├── node_modules/             # Installed Node.js dependencies
  ├── src/                      # Source code directory
  │   ├── application/          # Application-level logic
  │   ├── domain/               # Domain models and business logic
  │   ├── infrastructure/       # Infrastructure-related code (e.g., database, third-party services)
  │   ├── interfaces/           # Interface definitions for various layers
  │   ├── scripts/              # Utility scripts for various tasks
  │   ├── shared/               # Shared utilities and services used across modules
  │   ├── types/                # Type definitions for TypeScript
  │   ├── utils/                # Utility functions and helpers
  │   ├── app.controller.spec.ts # Unit tests for the AppController
  │   ├── app.controller.ts     # Main application controller
  │   ├── app.module.ts         # Root module of the application
  │   ├── app.service.ts        # Main application service
  │   └── main.ts               # Entry point of the application
  ├── test/                     # Unit and integration tests
  ├── .env                      # Environment variables for development
  ├── .env_test                 # Environment variables for testing
  ├── .eslintrc.js              # ESLint configuration file
  ├── .gitignore                # Git ignore file
  ├── .prettierrc               # Prettier configuration file
  └── docker-compose.yml        # Docker Compose configuration file
```

### Controllers

Controllers handle incoming HTTP requests and delegate tasks to the appropriate services.

#### Admin Controller

Handles administrative functionalities such as creating admin users, managing regular users, and approving products.

**Key Endpoints:**
- `POST /admin/create`: Create a new admin user.
- `GET /admin/users`: Retrieve all non-admin users.
- `GET /admin/users/:id`: Retrieve a specific user by ID.
- `GET /admin/products`: Retrieve all products.
- `PATCH /admin/product/:id/user/:userId/approve`: Approve a product.
- `PATCH /admin/user/:id/ban`: Ban or unban a user.

#### User Controller

Manages user-related operations such as creating new users.

**Key Endpoints:**
- `POST /users/create`: Create a new user account.

#### Product Controller

Handles product-related operations including creation, retrieval, updating, and deletion of products.

**Key Endpoints:**
- `GET /products/approved`: Retrieve all approved products for unauthenticated users.
- `GET /products`: Retrieve all products belonging to the authenticated user.
- `GET /products/:id`: Retrieve a specific product by ID.
- `POST /products`: Create a new product.
- `PATCH /products/:id`: Update an existing product.
- `DELETE /products/:id`: Delete a product by ID.

#### Auth Controller

Manages authentication processes such as user login.

**Key Endpoints:**
- `POST /auth/login`: Authenticate a user and retrieve an access token.

---

## API Endpoints

Below is a detailed description of the available API endpoints, their purposes, and expected request/response structures.

### Admin Endpoints

A well-documented breakdown of the techstore api endpoints can be found in the swagger docs. 

  ```
  http://localhost:4000/api-docs#/
  ```

---

## Conclusion

This documentation provides a comprehensive guide to setting up, running, and understanding the **TechStore** application. By following the instructions and references provided, developers and users can effectively interact with and contribute to the project. For further assistance or contribution guidelines, please refer to the [GitHub repository](https://github.com/demola07/basic-ecommerce-system) 

---

## References

- [NestJS Official Documentation](https://docs.nestjs.com/)
- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Official Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [TypeORM Official Documentation](https://typeorm.io/#/)

---

Happy Coding!