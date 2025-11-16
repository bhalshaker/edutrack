# 🎓 EduTrack

## 📘 Overview

**EduTrack** is a platform designed to streamline student data tracking and academic record management. It provides a robust API and schema-driven backend to manage student records efficiently.

---

## 🚀 Getting Started

### 🗂️ Student Document Schema

![Student Document Schema](docs/diagrams/student_management.svg)

---

### 📡 API Endpoints

| **Method** | **Endpoint**          | **Description**                            |
| ---------- | --------------------- | ------------------------------------------ |
| `GET`      | `/student/`           | Retrieve all registered student records    |
| `POST`     | `/student`            | Create a new student record                |
| `GET`      | `/student/:studentId` | Fetch details of a specific student by ID  |
| `PATCH`    | `/student/:studentId` | Update selected fields of a student record |
| `DELETE`   | `/student/:studentId` | Delete a specific student record           |

---

## 🛠️ Technologies Used

### 🏗️ Production Runtime

| **Tool/Library**      | **Purpose**                                                       |
| --------------------- | ----------------------------------------------------------------- |
| **express**           | Web framework for building server-side applications               |
| **joi**               | Schema-based validator for request payloads                       |
| **dotenv**            | Loads environment variables from a `.env` file into `process.env` |
| **mongoose**          | ODM for MongoDB to define and interact with data schemas          |
| **mongoose-sequence** | Mongoose plugin for auto-incrementing fields like student IDs     |

### 🧪 Test Runtime

| **Tool/Library**          | **Purpose**                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| **jest**                  | JavaScript testing framework for unit and integration testing        |
| **supertest**             | HTTP assertions and endpoint testing for Node.js applications        |
| **nodemon**               | Automatically restarts the server on file changes during development |
| **mongodb-memory-server** | Run in memory database instance of MongoDB                           |

---

## 📜 How to Use

- [Setup and start the application](docs/procedures/setup_and_start_app.md)
- [Create and Run a MongoDB Container on Podman](docs/procedures/setup_container_db.md)
- [Create and Update Schemas Definitions with How to guide on how to use application RestAPIs](docs/procedures/restapi.md)

## 🙌 Attributions

None at this time.
