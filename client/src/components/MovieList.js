import { gql, useQuery } from '@apollo/client';

const GET_MOVIES_QUERY = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

function MovieList() {
  const { loading, data, error } = useQuery(GET_MOVIES_QUERY);

  if (loading) return <p>Loading...</p>;
  console.log(data);

  const renderMovies = () => {
    return data.movies.map((movie) => {
      return (
        <li
          className='list-group-item m-2 shadow-sm '
          style={{ cursor: 'pointer', borderRadius: '5px' }}
          key={movie.id}
        >
          {movie.name}
        </li>
      );
    });
  };

  return (
    <div className='row h-100'>
      <div className='col-md-7 p-4'>
        <ul className='list-group list-group-horizontal flex-wrap'>
          {renderMovies()}
        </ul>
      </div>
    </div>
  );
}

export default MovieList;
