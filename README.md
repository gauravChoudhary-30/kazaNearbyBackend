# User Profile Management API

A robust Node.js API for user authentication and profile management with secure endpoints and comprehensive validation.

## Features

- User Authentication (Signup/Signin)
- Profile Management (Create/Update)
- JWT-based Authorization
- Input Validation
- Secure Password Hashing
- Error Handling with Appropriate Status Codes

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=9000
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### 1. User Signup
- **Endpoint:** `POST /auth/sign-up`
- **Description:** Create a new user account
- **Validation:**
  - Required fields: username, email, password
  - Unique username and email
  - Valid email format
- **Status Codes:**
  - 201: User created successfully
  - 400: Missing required fields
  - 409: Username/email already exists
  - 500: Server error

```bash
curl --location 'http://localhost:9000/auth/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "kindEugene8",
    "email": "kindeugene8@gmail.com",
    "password" :"EugeneKind@8"
}'
```

### 2. User Signin
- **Endpoint:** `POST /auth/sign-in`
- **Description:** Authenticate user and get JWT token
- **Validation:**
  - Required fields: username, password
  - Password verification
- **Status Codes:**
  - 200: Login successful
  - 400: Missing fields
  - 401: Invalid credentials
  - 500: Server error

```bash
curl --location 'http://localhost:9000/auth/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "kindEugene8",
    "password": "EugeneKind@8"
}'
```

### 3. Add Profile
- **Endpoint:** `POST /profile/add-profile`
- **Description:** Create user profile (requires authentication)
- **Validation:**
  - JWT token verification
  - Required fields validation
  - Phone number format
- **Status Codes:**
  - 201: Profile created successfully
  - 400: Invalid input data
  - 401: Unauthorized
  - 500: Server error

```bash
curl --location 'http://localhost:9000/profile/add-profile' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
    "id":2,
    "FirstName" : "Eugene",
    "MiddleName": "",
    "LastName": "Kind",
    "PhoneNumber": "8987896845",
    "Address": "House No.-2105, Sector-11/D, Bokaro Steel City, Jharkhand. Pin-827009",
    "Occupation": "Software Engineer",
    "WorkExperience": "2yrs"
}'
```

### 4. Update Profile
- **Endpoint:** `PUT /profile/update-profile`
- **Description:** Update existing profile (requires authentication)
- **Validation:**
  - JWT token verification
  - Valid profile ID
  - Field-specific validations
- **Status Codes:**
  - 200: Profile updated successfully
  - 400: Invalid input data
  - 401: Unauthorized
  - 404: Profile not found
  - 500: Server error

```bash
curl --location 'http://localhost:9000/profile/update-profile' \
--header 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
--data '{
    "id": 2,
    "PhoneNumber": "9876543210",
    "Address": "New Delhi",
    "WorkExperience": "1 years"
}'
```

## Security Features

1. **Password Security:**
   - Passwords are hashed using bcrypt
   - Salt rounds: 10

2. **Authentication:**
   - JWT-based authentication
   - Token expiration: 24 hours
   - Bearer token required for protected routes

3. **Input Validation:**
   - Request body validation
   - Data type checking
   - Required field validation
   - Format validation (email, phone)

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Resource Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

Each error response includes:
- Status code
- Error message
- Additional details (when applicable)

## Environment Variables

```
PORT=9000                    # Server port
DB_HOST=localhost           # Database host
DB_USER=root               # Database user
DB_PASSWORD=****           # Database password
DB_NAME=profile_db        # Database name
JWT_SECRET=****           # JWT secret key
```