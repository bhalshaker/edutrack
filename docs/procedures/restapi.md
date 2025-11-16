# Schema and RestAPI documentation

## 📄 API Schema Documentation: Student Management

This document details the data structures and validation rules for creating and updating student records. The schemas utilize predefined constants for specific fields.

---

### 1. 🌐 Predefined Constants

These constants define the allowed values for specific fields across the schemas.

| Constant Name       | Possible Values                                                       | Used In         |
| :------------------ | :-------------------------------------------------------------------- | :-------------- |
| **GENDER**          | `Male`, `Female`                                                      | Student Schema  |
| **RELATIONSHIPS**   | `Father`,`Mother`,`Brother`,`Sister`,`Spouse`,                        | Relative Schema |
|                     | `Grandfather`,`Grandmother`,`Guardian`,`Friend`,                      |                 |
|                     | `Cousin`,`Uncle`,`Aunt`,`Other`                                       |                 |
| **STATUS_TYPE**     | `Guardian`, `Contact`                                                 | Relative Schema |
| **EDUCATION_LEVEL** | `Nursery`,`Preschool`,`Primary School`,                               | Student Schema  |
|                     | `Elementary School`,`High School`,`Technical School`,                 |                 |
|                     | `Diploma`,`National Diploma`,`High National Diploma`,                 |                 |
|                     | `Associate Degree`,`Bachelor's Degree`,`Master's Degree`,`Doctorate`, |                 |

---

### 2. 👨‍👩‍👧‍👦 Relative Schema (`relativeJoiSchema`)

Defines the structure for a student's relative.

| Field Name       | Type     | Constraints                         | Required | Description                      |
| :--------------- | :------- | :---------------------------------- | :------- | :------------------------------- |
| **name**         | `string` | Minimum length: 3 characters.       | **Yes**  | The full name of the relative.   |
| **mobile**       | `string` | Must contain only digits (`^\d+$`). | **Yes**  | Contact number for the relative. |
| **relationship** | `string` | Must be one of **RELATIONSHIPS**.   | **Yes**  | e.g., `Father`, `Spouse`.        |
| **status**       | `string` | Must be one of **STATUS_TYPE**.     | **Yes**  | e.g., `Guardian`, `Contact`.     |

---

### 3. 📝 Note Schema (`noteJoiSchema`)

Defines the structure for an administrative note associated with a student.

| Field Name | Type     | Constraints | Required | Description              |
| :--------- | :------- | :---------- | :------- | :----------------------- |
| **text**   | `string` | None        | **Yes**  | The content of the note. |

---

### 4. ➕ Create Student Schema (`createStudentSchema`)

Defines the **required** fields and validation for creating a **new** student record (HTTP POST).

| Field Name           | Type     | Constraints                                | Required | Description                                |
| :------------------- | :------- | :----------------------------------------- | :------- | :----------------------------------------- |
| **firstName**        | `string` | Minimum length: 3 characters.              | **Yes**  | Student's first name.                      |
| **secondName**       | `string` | Minimum length: 3 characters.              | **Yes**  | Student's second/last name.                |
| **dateOfBirth**      | `date`   | Cannot be a future date.                   | **Yes**  | Student's birth date (e.g., `YYYY-MM-DD`). |
| **identityNumber**   | `string` | Alphanumeric, must not contain spaces.     | No       | Unique national or student ID.             |
| **contactNumber**    | `string` | Must contain only digits.                  | **Yes**  | Student's primary contact number.          |
| **gender**           | `string` | Must be one of **GENDER**.                 | **Yes**  | Student's gender.                          |
| **email**            | `string` | Must be a valid email address format.      | **Yes**  | Student's email address.                   |
| **address**          | `string` | None                                       | No       | Student's physical address.                |
| **currentSchool**    | `string` | None                                       | No       | Name of the student's current school.      |
| **currentClass**     | `string` | None                                       | No       | Student's current class/grade.             |
| **workPlace**        | `string` | None                                       | No       | Student's workplace (if applicable).       |
| **educationalLevel** | `string` | Must be one of **EDUCATION_LEVEL**.        | No       | The student's highest educational level.   |
| **relatives**        | `array`  | Items must conform to **Relative Schema**. | No       | List of associated relatives.              |
| **notes**            | `array`  | Items must conform to **Note Schema**.     | No       | List of administrative notes.              |

---

### 5. ✍️ Update Student Schema (`updateStudentSchema`)

Defines the fields and validation for updating an **existing** student record (HTTP PATCH).

- **Constraint:** The request body **must** contain at least one field to be updated.
- All fields are **optional**; only supply the fields you intend to change.
- The validation rules (type, format, enum values) for all fields are the same as in the Create Student Schema.

| Field Name           | Type     | Constraints                                | Required | Description                         |
| :------------------- | :------- | :----------------------------------------- | :------- | :---------------------------------- |
| **firstName**        | `string` | Minimum length: 3.                         | No       | Updates student's first name.       |
| **secondName**       | `string` | Minimum length: 3.                         | No       | Updates student's second/last name. |
| **dateOfBirth**      | `date`   | Cannot be a future date.                   | No       | Updates student's birth date.       |
| **identityNumber**   | `string` | Alphanumeric, no spaces.                   | No       | Updates ID.                         |
| **contactNumber**    | `string` | Digits only.                               | No       | Updates contact number.             |
| **gender**           | `string` | One of **GENDER**.                         | No       | Updates gender.                     |
| **email**            | `string` | Valid email format.                        | No       | Updates email address.              |
| **address**          | `string` | None                                       | No       | Updates physical address.           |
| **currentSchool**    | `string` | None                                       | No       | Updates current school.             |
| **currentClass**     | `string` | None                                       | No       | Updates current class/grade.        |
| **workPlace**        | `string` | None                                       | No       | Updates workplace.                  |
| **educationalLevel** | `string` | One of **EDUCATION_LEVEL**.                | No       | Updates educational level.          |
| **relatives**        | `array`  | Items must conform to **Relative Schema**. | No       | Replaces the list of relatives.     |
| **notes**            | `array`  | Items must conform to **Note Schema**.     | No       | Replaces the list of notes.         |

## 🧑‍🎓 Student API Endpoints

This guide provides `curl` examples for interacting with the Student API. All examples use the base URL `http://localhost:3000/api/students`.

---

### 1\. Retrieve All Students (GET)

Returns a list of all student records.

| HTTP Method | Endpoint        | Description                   |
| :---------- | :-------------- | :---------------------------- |
| **GET**     | `/api/students` | Retrieve all student records. |

```sh
curl --location 'http://localhost:3000/api/students'
```

---

### 2\. Create a New Student (POST)

Adds a new student record to the database. The body must contain the minimum required schema fields.

| HTTP Method | Endpoint        | Content-Type       |
| :---------- | :-------------- | :----------------- |
| **POST**    | `/api/students` | `application/json` |

**Example Request Body (Minimum Fields):**

```json
{
  "firstName": "Salem",
  "secondName": "Ahmed",
  "dateOfBirth": "2008-01-05",
  "contactNumber": "38846577",
  "gender": "Male",
  "email": "saloom@saloom.org"
}
```

**`curl` Command:**

```sh
curl --location 'http://localhost:3000/api/students' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Salem",
    "secondName": "Ahmed",
    "dateOfBirth": "2008-01-05",
    "contactNumber": "38846577",
    "gender": "Male",
    "email": "saloom@saloom.org"
}'
```

---

### 3\. Retrieve Student by ID (GET)

Fetches a single student record using their unique **Student ID**. Replace `:studentId` with the actual student ID (e.g., `1`).

| HTTP Method | Endpoint                   | Parameter              |
| :---------- | :------------------------- | :--------------------- |
| **GET**     | `/api/students/:studentId` | Student ID (e.g., `1`) |

```sh
curl --location 'http://localhost:3000/api/students/1'
```

---

### 4\. Update an Existing Student (PATCH)

Updates one or more fields of an existing student record using their **Student ID**. The request body should contain only the fields you wish to change.

| HTTP Method | Endpoint                   | Content-Type       |
| :---------- | :------------------------- | :----------------- |
| **PATCH**   | `/api/students/:studentId` | `application/json` |

**Example Request Body (Updating only `firstName`):**

```json
{
  "firstName": "Jassim"
}
```

**`curl` Command:**

```sh
curl --location --request PATCH 'http://localhost:3000/api/students/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName":"Jassim"
}'
```

---

### 5\. Delete a Student (DELETE)

Permanently removes a student record using their **Student ID**.

| HTTP Method | Endpoint                   | Parameter              |
| :---------- | :------------------------- | :--------------------- |
| **DELETE**  | `/api/students/:studentId` | Student ID (e.g., `1`) |

```sh
curl --location --request DELETE 'http://localhost:3000/api/students/1'
```
