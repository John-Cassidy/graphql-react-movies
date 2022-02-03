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
} = graphql;

// DEMO DATA
const movies = [
  { name: 'Joker', genre: 'Drama', id: '1', directorId: '1' },
  { name: 'Moonrise kingdom', genre: 'Romance', id: '2', directorId: '2' },
  { name: 'La La Land', genre: 'Musical', id: '3', directorId: '3' },
  { name: 'Interstellar', genre: 'Schi-Fi', id: '4', directorId: '4' },
];
const directors = [
  { name: 'Todd Philips', age: 60, id: '1' },
  { name: 'Wes Anderson', age: 52, id: '2' },
  { name: 'Damien Chazelle', age: 58, id: '3' },
  { name: 'Christopher Nolan', age: 51, id: '4' },
];

// URL TO GraphiQL UI: http://localhost:5000/graphql

// QUERIES FOR MOVIE, DIRECTOR
// {
//   movie(id:3){
//     name
//     genre
//   }
// }

// {
//   movie(id: "2"){
//     name
//     genre
//     director{
//       name
//       age
//     }
//   }
// }

// {
//   director(id:3){
//     name
//     age
//   }
// }

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // get data from demo data
        return _.find(directors, { id: parent.directorId });
        // // get data from database
        // return Director.findById(parent.directorId);
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
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data from demo data
        console.log(_.find(movies, { id: args.id }));
        return _.find(movies, { id: args.id });
        // // get data from database
        // return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data from demo data
        return _.find(directors, { id: args.id });
        // // get data from database
        // return Director.findById(args.id);
      },
    },
  }),
});

const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
});

export default graphQLSchema;
