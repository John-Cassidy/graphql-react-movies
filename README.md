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

## client

create react app
use apollo for graphql requests

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

### MongoDB UI Client

use graphiQL by adding it into app.use statement in index.js

app.use('/graphql', graphqlHTTP({
schema,
graphiql: true
}));

#### URL TO GraphiQL UI: http://localhost:5000/graphql

#### QUERIES FOR MOVIES

```json
{
    movie(id:3){
        name
        genre
    }
}
{
    movie(id: "2"){
        name
        genre
        director{
            name
            age
        }
    }
}
{
    movies{
        name
        genre
        director{
            name
            age
        }
    }
}
{
    movies{
        name
        genre
        director{
            name
            age
            movies{
                name
            }
        }
    }
}
```

#### QUERIES FOR DIRECTORS

```json
{
    director(id:3){
        name
        age
    }
}
{
    director(id:2){
        name
        age
        movies{
            name
            genre
        }
    }
}
{
    directors{
        name
        age
        movies{
            name
            genre
        }
    }
}
```

#### MUTATIONS FOR DIRECTORS

```json
mutation{
    addDirector(name:"Christopher Nolan", age: 51){
        name
        age
        id
    }
}
```

#### MUTATIONS FOR MOVIES

```json
mutation{
    addMovie(name:"Joker", genre: "Drama", directorId: 1){
        name
        genre
        directorId
    }
}
```
