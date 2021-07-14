import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({ variables: { ownerName, repositoryName, rating: parseInt(rating), text } });

    if (data.createReview.repositoryId) {
      history.push(`/${data.createReview.repositoryId}`);
    } else {
      history.push('/');
    }

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
