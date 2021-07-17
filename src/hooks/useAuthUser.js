import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthUser = (includeReviews = false) => {
  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { authorizedUser: data?.authorizedUser, loading, refetch };
};

export default useAuthUser;
