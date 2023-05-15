# todo-api-express-jwt
# REST API using Node.js

This is a sample REST API project built with Node.js. It provides basic CRUD operations for managing todo items. The API includes authentication using JSON Web Tokens (JWT) and role-based access control for different user roles.

## Features

- User authentication with username and password
- JWT-based token generation and verification
- Role-based access control (Admin and User roles)
- CRUD operations for managing todo items
- In-memory database

## Prerequisites

- Node.js (version 18.16.0)
- npm (version 9.5.1)

## Installation

1. Clone the repository:

```
git clone https://github.com/kakshaytyagi/todo-api-express-jwt.git
```

2. Navigate to the project directory:

```
cd your-repo
```

3. Install the dependencies:

```
npm install
```

4. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=9081
```

5. Start the server:

```
npm start
```

## API Endpoints

### GET /

- Description: Root endpoint
- Response: JSON object with a welcome message

### POST /login

- Description: User login endpoint
- Request Body: JSON object with username and password
- Response:
  - If login successful: JSON object with a JWT token
  - If login fails: JSON object with an error message

### GET /get/:id

- Description: Get a single todo item
- Request Parameters: `id` (todo item ID)
- Response:
  - If todo item found: JSON object with the todo item
  - If todo item not found: JSON object with an error message

### GET /getall

- Description: Get all todo items
- Response: JSON array with all todo items

### PUT /put/:id

- Description: Update a single todo item
- Request Parameters: `id` (todo item ID)
- Request Body: JSON object with updated todo item
- Response:
  - If todo item found and updated: JSON object with a success message
  - If todo item not found: JSON object with an error message

### POST /create/:id

- Description: Create a new todo item
- Request Parameters: `id` (todo item ID)
- Request Body: JSON object with new todo item
- Response: JSON object with a success message

### DELETE /delete/:id

- Description: Delete a todo item
- Request Parameters: `id` (todo item ID)
- Response:
  - If todo item found and deleted: JSON object with a success message
  - If todo item not found: JSON object with an error message

## Authentication and Authorization

The API uses JSON Web Tokens (JWT) for authentication. When a user successfully logs in, a JWT token is generated and returned. This token should be included in the `Authorization` header for protected endpoints.

The API implements role-based access control. There are two roles: Admin and User. Admin users have access to all endpoints, while User role can only access specific endpoints (e.g., `/getall` endpoint).

## Contributing

Contributions to this project are welcome. If you find any issues or want to suggest improvements, feel free to create a pull request.


## Contact

For any inquiries or feedback, please contact Akshay Tyagi at akshaytyagi3102003@gmail.com.

---
