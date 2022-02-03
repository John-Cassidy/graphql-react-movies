import Director from '../models/director.js';
import Movie from '../models/movie.js';
import _ from 'lodash';
import graphql from 'graphql';

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// DEMO DATA
const movies = [
  { name: 'Joker', genre: 'Drama', id: '1' },
  { name: 'Moonrise kingdom', genre: 'Romance', id: '2' },
  { name: 'La La Land', genre: 'Musical', id: ' 3' },
  { name: 'Interstellar', genre: 'Schi-Fi', id: '4' },
];

// movie(id: '5'){
//     name
//     genre
// }

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //get data from demo data
        // console.log(_.find(movies, { id: args.id }));
        return _.find(movies, { id: args.id });
        // // get data from database
        // return Movie.findById(args.id);
      },
    },
  }),
});

const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
});

export default graphQLSchema;
