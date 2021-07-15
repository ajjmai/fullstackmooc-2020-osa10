import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrder) => {
  let orderBy = null;
  let orderDirection = null;

  if (selectedOrder !== 'CREATED_AT') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = selectedOrder;
  } else {
    orderBy = selectedOrder;
    orderDirection = 'DESC';
  }

  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderDirection, orderBy },
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;
