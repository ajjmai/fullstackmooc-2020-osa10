import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REPOSITORY, { variables: { id }, fetchPolicy: 'cache-and-network' });

  return { repository: data ? data.repository : undefined, loading };
};

export default useRepository;
