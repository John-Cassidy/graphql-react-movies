import Director from '../models/director.js';
import Movie from '../models/movie.js';
import _ from 'lodash';
import graphql from 'graphql';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//#region DEMO DATA AND GraphiQL TEST QUERIES
// // DEMO DATA
// const movies = [
//   { name: 'Joker', genre: 'Drama', id: '1', directorId: '1' },
//   { name: 'Moonrise kingdom', genre: 'Romance', id: '2', directorId: '2' },
//   { name: 'La La Land', genre: 'Musical', id: '3', directorId: '3' },
//   { name: 'Interstellar', genre: 'Sci-Fi', id: '4', directorId: '4' },
//   {
//     name: 'The Grand Budapest Hotel',
//     genre: 'Comedy',
//     id: '5',
//     directorId: '2',
//   },
//   { name: 'Whiplash', genre: 'Drama', id: '6', directorId: '3' },
//   { name: 'First Name', genre: 'Biography', id: '7', directorId: '3' },
// ];
// const directors = [
//   { name: 'Todd Philips', age: 60, id: '1' },
//   { name: 'Wes Anderson', age: 52, id: '2' },
//   { name: 'Damien Chazelle', age: 58, id: '3' },
//   { name: 'Christopher Nolan', age: 51, id: '4' },
// ];

// // URL TO GraphiQL UI: http://localhost:5000/graphql

// // QUERIES FOR MOVIES
// // {
// //   movie(id:3){
// //     name
// //     genre
// //   }
// // }

// // {
// //   movie(id: "2"){
// //     name
// //     genre
// //     director{
// //       name
// //       age
// //     }
// //   }
// // }

// // {
// //   movies{
// //     name
// //     genre
// //     director{
// //       name
// //       age
// //     }
// //   }
// // }

// // QUERIES FOR DIRECTORS
// // {
// //   director(id:3){
// //     name
// //     age
// //   }
// // }

// // {
// //   director(id:2){
// //     name
// //     age
// //     movies{
// //       name
// //       genre
// //     }
// //   }
// // }

// // {
// //   directors{
// //     name
// //     age
// //     movies{
// //       name
// //       genre
// //     }
// //   }
// // }
//#endregion

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // // get data from demo data
        // return _.find(directors, { id: parent.directorId });
        // get data from database
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // // get data from demo data
        // return _.filter(movies, { directorId: parent.id });
        // get data from database
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // // get data from demo data
        // return _.find(movies, { id: args.id });
        // get data from database
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // // get data from demo data
        // return _.find(directors, { id: args.id });
        // get data from database
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // // get data from demo data
        // return movies;
        // get data from database
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // // get data from demo data
        // return directors;
        // get data from database
        return Director.find({});
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
  },
});

const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default graphQLSchema;
