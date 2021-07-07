import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthUser = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, { fetchPolicy: 'cache-and-network' });

  return { authorizedUser: data ? data.authorizedUser : undefined, loading };
};

export default useAuthUser;
