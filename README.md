# Urbano_Infotech

# Authentication API Documentation

## Overview

This project provides a basic authentication system using Express.js and PostgreSQL. It includes the following functionalities:

1. **User Signup with Email Verification**: Allows new users to register with an email, password, name, and mobile number. A verification email is sent to confirm the email address.
2. **User Login**: Authenticates users using email and password after verification.

---

## Endpoints

- **POST /api/auth/signup** - Registers a new user.
- **POST /api/auth/login** - Authenticates an existing user.

---

## API Specifications

### 1. POST /api/auth/signup

#### Description
Registers a new user with the given details. This endpoint checks if the email and mobile number are unique and sends an email verification link.

- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "mobile": "1234567890"
  }
  ```
- **name**: User's full name. Minimum 3 characters.
- **email**: User’s email. Must be unique and follow a valid email format.
- **password**: Minimum 8 characters with at least 2 numbers.
- **mobile**: 10-digit mobile number. Must be unique.
- **Success Response**:
  ```json
  { "message": "Signup successful, please check your email to verify your account" }
  ```
- **Error Responses**:
  - **Validation Errors**:
    ```json
    { "error": "Mobile number is required" }
    ```
  -**Duplicate Email/Mobile**:
    ```json
    { "error": "Email already exists" }
    ```
  -**Email Send Failure**:
    ```json
    { "error": "Could not send verification email" }
    ```
### GET /api/auth/verify/
#### Description
Verifies a user's email address. This link is sent in the verification email after signup.

**URL**: /api/auth/verify/:token

**Method**: GET

**Parameters**:

**token**: JWT token included in the verification URL to verify the user's account.
**Success Response**:
  ```json
  { "message": "Email verified successfully. You can now log in." }
  ```
**Error Response**:
  ```json
  { "error": "Invalid or expired verification token" }
  ```

### 3. POST /api/auth/login
#### Description
Logs in a user with email and password, provided the account is verified.

**URL**: /api/auth/login

**Method**: POST

**Headers**: Content-Type: application/json

**Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
**email**: User’s registered email address.
**password**: User’s password.
**Success Response**:
  ```json
  { "message": "Login successful", "token": "<JWT_TOKEN>" }
  ```
**Error Responses**:
**User Not Found**:
  ```json
  { "error": "User not found" }
  ```
**Incorrect Password**:
  ```json
  { "error": "Incorrect password" }
  ```

**Email Not Verified**:
  ```json
  { "error": "Please verify your email before logging in" }
  ```

### Validation Rules
**Name**:
Required
Minimum 3 characters
**Email**:
Required
Valid email format
Unique
**Password**:
Required
Minimum 8 characters
At least 2 numbers
**Mobile**:
Required
Exactly 10 numeric characters
Unique

### Example Usage
#### Signup
- A POST /api/auth/signup request is sent with name, email, password, and mobile.
- If the data is valid, a verification email is sent.
- The user must click the verification link in the email to activate their account.
#### Login
- A POST /api/auth/login request is sent with email and password.
- If the account is verified and the credentials are correct, a JWT token is issued.
- Unit Testing

**Unit tests are recommended for all routes and functions**:

**Signup Tests**:
- Verify user creation and uniqueness constraints.
- Ensure email verification is required.
- Test invalid inputs and validation rules.
- Login Tests:
- Test for successful login.
- Check response for incorrect password.
- Validate non-verified email response.
- Environment Variables
- 
**Set the following environment variables in .env**:
DATABASE_URL=postgres://<username>:<password>@localhost:5432/auth_project_db
JWT_SECRET=<YourSecretKey>
EMAIL_USER=<YourEtherealEmailAddress>
EMAIL_PASS=<YourEtherealEmailPassword>
### Database Structure (PostgreSQL)
#### Table: Users
Field	Type	Constraints
id	Integer	Primary Key
name	String	Not Null
email	String	Not Null, Unique
password	String	Not Null
mobile	String	Not Null, Unique, 10 chars
isVerified	Boolean	Default false
arduino


This `README.md` structure gives clear, comprehensive documentation on your API’s functionality.
