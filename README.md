
## Employee Manager | A Full-stack simple application

This repository includes the both frontend & backend source codes for simple employee manager full-stack project. This project handles CRUD operations for employee management, including creating, retrieving, updating, and deleting employee records.

The frontend is built on **NextJs** and backend is build on **NodeJS** with **express** and **mongoDB**.

All the state management done by using Redux and Redux toolkit.  

#### How to setup the backend project

- Navigate to the backend directory by running `cd backend`

- Install the dependencies by running `npm install`

- Create a new database cluster by using mongoDB Atlas & add `database cluster URL`, `username` and `password` into .env file.

- Completing the configurations, To run the server application by running `npm run dev` in developer mode.

- To run unit tests by running `npm run test` in test mode.


#### How to setup the frontend project

- Navigate to the frontend directory by running `cd frontend`

- Install the dependencies by running `npm install`

- Add backend base url into .env

- Completing the configurations, To run the frontend application by running `npm run dev`

### Backend API Endpoints


| Method | Endpoint  | Description |
|--|--| -- |
| GET | /api/v1/ping | Health check endpoint |
|POST|/auth/login| Login endpoint |
|POST|/auth/logout| Logout endpoint |
| GET | /api/v1/user | List all users. |
| POST | /api/v1/user | Add a new user. |
| PUT | /api/v1/user/:id | Update an existing user by user id. |
| DELETE | /api/v1/user/:id | Delete an existing user by user id. |

API Documentation - Please check the **docs** directory