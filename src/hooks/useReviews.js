import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REVIEWS, { variables: { id }, fetchPolicy: 'cache-and-network' });

  return { reviews: data ? data.repository.reviews : undefined, loading };
};

export default useReviews;
