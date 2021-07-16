import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  const queryVariables = { id, first: 4 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

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

  return { reviews: data?.repository.reviews, fetchMore: handleFetchMore, loading, ...result };
};

export default useReviews;
