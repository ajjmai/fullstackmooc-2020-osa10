import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthUser = (includeReviews = false) => {
  const { data, loading } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { authorizedUser: data?.authorizedUser, loading };
};

export default useAuthUser;
