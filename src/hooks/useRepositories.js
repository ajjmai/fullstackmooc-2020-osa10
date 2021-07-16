import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrder, keyword) => {
  let orderBy = undefined;
  let orderDirection = undefined;
  let searchKeyword = undefined;

  if (selectedOrder !== 'CREATED_AT') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = selectedOrder;
  } else {
    orderBy = selectedOrder;
    orderDirection = 'DESC';
  }

  if (keyword && keyword.length > 0) {
    searchKeyword = keyword;
  }

  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderDirection, orderBy, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;
