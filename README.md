# Movies Graphql React Project

Example of React frontend making graphql requests to Express NodeJS backend with MongoDB

[Course Files Repository](https://github.com/OakAcademy/graphql)

## server

create express app
setup graphql server

### setup

npm i express
npm i nodemon
npm i dotenv
npm i mongoose
npm i cors
npm i graphql express-graphql
npm i lodash

## database

setup MongoDB in docker container. [Official docker image](https://hub.docker.com/_/mongo)

docker pull mongo

create a local container based on mongo image:

docker run -d -p 27017:27017 --name graphql-react-movies mongo

### update mongodb connection in .env file

NODE_ENV=development
PORT=5000
DATABASE=[PATH TO CLOUD ACCESSIBLE DATABASE]
DATABASE_LOCAL=mongodb://localhost:27017/graphql-react-movies
DATABASE_USERNAME=[username]
DATABASE_PASSWORD=[password]

## client

create react app
use apollo for graphql requests

### dummy frontend

use graphiQL
