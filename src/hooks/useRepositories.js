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

  const queryVariables = { orderBy, searchKeyword, orderDirection, first: 8 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;
