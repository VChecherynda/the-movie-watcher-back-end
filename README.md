# the-movie-watcher-back-end

# Libs:

- ORM sequalize ( for simple work with DB )
- livr.js for validating data
- nodemon ( helps us when we into dev mode )

# DB:

- postgres

# Install:

- install postgres DB and create database ( CREATE DATABASE name; ), further you nedd pass db.name into .env file
- node v10.13.0 ( plz don't use node version > 12, because sequalize would not work )
- set .env with variables NODE_ENV, PORT, DB_USER, DB_NAME, DB_PASSWORD, DB_HOST, DB_DIALECT
- npm i && npm start

# Structure: 

- config ( different configuration, now only for .env and sequlize )
- controllers ( here we get data from req and send to the proper service )
- middleware ( here we use different middleware, now for auth )
- models ( we describe model representation into DB )
- routes ( for routing )
- seeders ( for prepopulate with default data for simple testing )
- services ( here we validate and do business logic )
- utils ( different helpers, connection to the db etc. )

app.js ( entry point for whole app )
