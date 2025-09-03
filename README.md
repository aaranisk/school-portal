# School Portal API

This project manages teachers and classes using Node.js, Express, TypeORM, and PostgreSQL.

## Features

- Manage teachers and their classes
- Validation for teacher details (name, subject, email, contact number)
- API endpoints tested with Postman

## Assumptions

1. **One Teacher → One Class**  
   Each teacher can only be assigned to a single class.

2. **Unique Email**  
   Teacher emails must be unique across the system.

3. **Work Contact Number**
    - Must start with the digit `6`
    - Must be exactly **8 digits long**
    - Accepted formats:
        - `6xxxxxxx` (8 digits, no spaces)
        - `6xxx xxxx` (4 digits + space + 4 digits)

## Tech Stack

- Node.js
- Express
- PostgreSQL
- TypeORM
- Joi (validation)
- Winston (logging)

## Getting Started

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### Setup & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-portal.git
   cd school-portal
   ```
2. Start docker containers
    ```
   docker-compose up --build
   ```


