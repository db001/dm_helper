# Dungeon Master Helper

A PERN fullstack web app to help dungeon masters organise their D&D campaign

## Table of contents

-   [Requirements](#requirements)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Credit](#credit)

## Requirements

### Backend

-   [Node.js v14](https://nodejs.org/es/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Express.js middleware v4](https://expressjs.com/)

### Frontend

-   [Node.js v14](https://nodejs.org/es/)

## Setup

-   Clone the repository

#### Backend Setup

-   Download and install [Node](https://nodejs.org/es/)
-   Install [PostgreSQL](https://www.postgresql.org/). See [this youtube video](https://www.youtube.com/watch?v=fZQI7nBu32M) for instructions
-   Using the terminal, navigate to the repository directory
-   Install Nodemon globally `npm i -g nodemon`
-   Navigate to server folder `cd server`
-   Install dependecies `npm install`
-   Rename `sample.dotenv` to `.env` and enter your own details. **NOTE: Do not change the `database` variable**
-   Rename `config.sample.sh` to `config.sh` and change "myPostgresqlPassword" to your own password

Optional

-   Download and install [Postman](https://www.postman.com/downloads/) for testing

#### To run the backend

-   On the first install use `npm run con-dev`. The will create a fresh database and start the server. **WARNING If using this command after the first install, any data in the `dmgoogle` database will be deleted. _USE WITH CARE_**
-   To start the server use `npm run server`
-   The backend server will be running on `http://localhost:5000`

## Frontend Setup

-   In a separate terminal window or tab
-   From the root directory navigate to the client directory `cd client`
-   Install dependecies `npm install`

#### To run the front end

-   In the client directory run `npm run start`
-   When ready the browser should open automatically, but if not navigate to `http://localhost:3000` in your browser

#### Credit

-   Project adapted from [Andrew Bateman's](https://www.andrewbateman.org) PERN stack repository [pern-stack-auth](https://github.com/AndrewJBateman/pern-stack-auth)
