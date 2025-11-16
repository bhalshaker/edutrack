## 🚀 Getting Started Guide: EduTrack Application

This guide outlines the steps needed to set up, install dependencies, and run the **EduTrack** application.

---

### 1\. ⚙️ Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: It is recommeded to use v22 or newer.
- **npm** It is is recommended to use 10.9 or newer.

---

### 2\. 📥 Project Setup and Dependency Installation

1.  **Clone the Repository**:

    ```sh
    git clone https://github.com/bhalshaker/edutrack.git
    cd edutrack
    ```

2.  **Install Dependencies**:
    Run the following command.

    ```sh
    npm install
    ```

---

### 3\. 🔑 Environment Configuration

1.  Create a file named **`.env`** in the root directory of the project.

2.  Add necessary configuration variables inside this file (e.g., your MongoDB connection string).

    **Example `.env` file content:**

    ```
    PORT=3000
    MONGO_URI="mongodb://localhost:27017/edutrackdb"
    ```

    Refer to example.env

---

### 4\. ▶️ Running the Application

#### **To Run in Production Mode:**

.

```sh
npm start
```

#### **To Run in Development Mode:**

```sh
npm run dev
```

---

### 5\. 🧪 Running Tests

The application includes testing scripts defined using **Jest** and **Supertest**.

#### **To Run All Tests:**

```sh
npm test
```

#### **To Run Tests and Check Coverage:**

```sh
npm run test:coverage
```
