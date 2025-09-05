# School Portal API

This is a full-stack application built for a private education business to help administrators manage teachers and their
classes efficiently.
The frontend is built using React.js with MUI, react-hook-form,react-hot-toast and ag-grid, while the backend uses
Node.js, Express,
TypeORM, and PostgreSQL.

---

## Features

* Add teacher
* View all teachers
* Add class
* View all classes
* Validation for teacher and class details
* Toast messages for calls to backend
* Backend tests using Jest
* End-to-end tests using Playwright

---

## Tech Stack

* Node.js
* Express
* PostgreSQL
* TypeORM
* React.js
* Ag-grid
* React-hook-form
* React-hot-toast
* MUI
* Joi (validation)
* Winston (logging)
* Playwright (E2E testing)
* Jest (backend tests)

---

## Setup & Run (Using Docker)

### Prerequisites

- [Docker Desktop](https://docs.docker.com/desktop/)
- Node.js and npm (only required if you want to run Playwright tests locally).

---

### 1. Clone the Repository

```bash
   git clone https://github.com/aaranisk/school-portal.git
   cd school-portal
```

---

### 2. Configure Environment Variables

Create a `.env` file in the **project root** with the following content:

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=your_username_here
DB_PASSWORD=your_password_here
DB_NAME=school_portal
PORT=3000
NODE_ENV=production
```

> You can choose any username and password you like.

---

### 3. Start Docker Containers

Note: Ensure docker desktop is open before executing the following steps

**Production mode**:

```bash
  docker-compose -f docker-compose.yml up --build
```

**Development mode** (with live reload):

Note: Change NODE_ENV in the .env file to development before running the following command

```bash
  docker-compose -f docker-compose.dev.yml up --build
```

---

### 4. Viewing the App

**Frontend:** Open your web browser and go to [http://localhost:5173](http://localhost:5173)

**Backend API:** Accessible at [http://localhost:3000](http://localhost:3000)


---

### 5. Stop Docker Containers

```bash
  docker-compose down
```

---

## Assumptions

1. **One Teacher → One Class**
   Each teacher can only be assigned to a single class.

2. **Unique Email**
   Teacher emails must be unique across the system (case-insensitive).

3. **Unique Contact Number**
   Teacher contact number must be unique across the system.
3. **Email**
    - Only **Gmail addresses** are accepted for user registration/login.
    - The email must be in the format: `username@gmail.com` where `username` can contain **letters or numbers only** (no
      dots, underscores, or special characters).
    - Example of valid email: `teacher123@gmail.com`
    - Examples of invalid email: `teacher.name@gmail.com`,  `teacher@gov.sg`,`student.name@hotmail.com`
4. **Work Contact Number**
    * Must be exactly **8 digits long**
    * Must start with 6
    * Accepted formats: `6xxxxxxx` (8 digits, no spaces)

---

## API Endpoints

**Base URL:** `http://localhost:3000/api`

### Teachers

| Method | Endpoint  | Description           |
|--------|-----------|-----------------------|
| GET    | /teachers | Retrieve all teachers |
| POST   | /teachers | Add a new teacher     |

**Example - Add Teacher:**

Windows:

```bash
      curl -X POST http://localhost:3000/api/teachers -H "Content-Type: application/json" -d "{\"name\":\"Mary\",\"subject\":\"Mathematics\",\"email\":\"teachermary@gmail.com\",\"contactNumber\":\"68129414\"}"
```

Mac/Linux:

```bash
   curl -X POST http://localhost:3000/api/teachers \
   -H "Content-Type: application/json" \
   -d '{
    "name": "Mary",
    "subject": "Mathematics",
    "email": "teachermary@gmail.com",
    "contactNumber": "68129414"
   }'
```

### Classes

| Method | Endpoint | Description          |
|--------|----------|----------------------|
| GET    | /classes | Retrieve all classes |
| POST   | /classes | Add a new class      |

**Example - Add Class:**

Windows:

```bash
   curl -X POST http://localhost:3000/api/classes -H "Content-Type: application/json" -d "{\"level\":\"Primary 1\",\"name\":\"Class 1A\",\"teacherEmail\":\"teachermary@gmail.com\"}"

```

Mac/Linux:

```bash
   curl -X POST http://localhost:3000/api/classes \
   -H "Content-Type: application/json" \
   -d '{
     "level": "Primary 1",
     "name": "Class 1A",
     "teacherEmail": "teachermary@gmail.com"
   }'
```

---

## Backend Validation Rules and Messages

These validations are applied on the server-side to ensure data integrity.

### Teacher Validation

| Field          | Rules / Requirements                                      | Error Message                                                                                                                  |
|----------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Name           | Must be filled in, 1–50 characters long                   | -`"name cannot be empty"` <br/>-`"name must be at least 1 character long"`<br/>- `"name cannot exceed 50 characters"`          |
| Subject        | Must be filled in, 1–50 characters long                   | -`"subject cannot be empty"` <br/>-`"subject must be at least 1 character long"`<br/>- `"subject cannot exceed 50 characters"` |
| Email          | Must be a filled in, valid email address and unique       | -`"email cannot be empty"` <br/>-`"Invalid email address"`<br/>- `"Email already exists"`                                      |
| Contact Number | Must be filled in, exactly 8 digits, no spaces and unique | -`"contact number cannot be empty"` <br/>-`"Invalid contact number"`<br/>- `"Contact number already exists"`                   |

### Class Validation

| Field | Rules / Requirements                              | Error Message                                                                                                             |
|-------|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Level | Must be filled in, 1–50 characters long           | -`"level cannot be empty"` <br/>- `"level must be at least 1 character long"`<br/>- `"level cannot exceed 50 characters"` |
| Name  | Must be filled in, 1–50 characters long           | -`"name cannot be empty"` <br/>- `"name must be at least 1 character"`<br/>- `"name cannot exceed 50 characters"`         |
| Email | Must be filled in, valid email address and unique | -`"email cannot be empty"` <br/>- `"Invalid email address"`<br/>-  `"Selected teacher already has a class"`               |

---

## Frontend Validation Rules and Messages

These validations are applied on the client-side in the React forms to give instant feedback.

### Add Teacher Form

| Field               | Rules / Requirements                   | Validation Message                                                                                                 |
|---------------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Name                | Must be filled in, 1–50 characters     | -`"Name is required."`  <br/>- `"Name must be at least 1 character."`  <br/>-`"Name cannot exceed 50 characters."` |
| Subject             | Must be selected from the dropdown     | -`"Subject is required."`                                                                                          |
| Email Address       | Must be a valid email format           | -`"Email address is required."`  <br/>- `"This email address is invalid."`                                         |
| Work Contact Number | Must be exactly 8 digits, numbers only | -`"Work contact number is required."`  <br/>- `"This work contact number is invalid."`                             |

### Add Class Form

| Field        | Rules / Requirements                     | Validation Message                                                                                                                  |
|--------------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Class Level  | Must be selected from the dropdown       | -`"Class level is required."`                                                                                                       |
| Class Name   | Must be filled in, 1–50 characters       | -`"Class Name is required."` <br/>- `"Class name must be at least 1 character."` <br/>- `"Class name cannot exceed 50 characters."` |
| Form Teacher | Must be selected from available teachers | -`"Form Teacher is required."`                                                                                                      |

## Logging

* Managed using **Winston**
* Log files are stored in `backend/logs/`
* Error and info logs are separated for debugging

---

## Testing

### Backend Tests (Jest)

```bash
   cd backend
   npm run test
```

### E2E Tests (Playwright)

Run all E2E tests:

```bash
   cd e2e
   npm run test:e2e
```

Run E2E tests with interactive GUI:

```bash
   cd e2e
   npm run test:e2e:ui
```

> GUI mode allows step-by-step debugging of tests.

---

## Error Handling

All API endpoints return meaningful error messages with appropriate HTTP status codes.

**Example - Duplicate Email:**

```json
{
  "error": "Email already exists."
}
```

**Example - Invalid Contact Number:**

```json
{
  "error": "Contact number must be 8 digits long."
}
```

---

## Future Improvements

The current version of the School Portal application provides a solid foundation for managing teachers, classes, and
related operations.  
To further enhance its usability, scalability, and maintainability, the following improvements are planned:

- **User Authentication and Authorization**  
  Implement secure login and role-based access control (e.g., admin, teacher, student).  
  This will ensure data security and proper access restrictions across the system.

- **CRUD Enhancements (Edit/Delete Support)**  
  Add edit and delete functionality to complement existing create and view features.  
  This will allow full lifecycle management of records within the portal.

- **Pagination and Data Management**  
  Introduce pagination and lazy loading for data-heavy views (e.g., class lists, teacher records).  
  This will improve performance and provide a smoother user experience, especially with large datasets.

- **Search and Filtering**  
  Provide advanced search and filter options in both backend APIs and frontend UI.  
  Users will be able to quickly locate specific teachers, classes with minimal effort.

- **CI/CD Integration**  
  Set up a continuous integration and continuous deployment (CI/CD) pipeline.  
  This will enable automated testing, linting, and seamless deployments to staging or production environments.

---

## Repository Link

* Repository: https://github.com/aaranisk/school-portal.git

