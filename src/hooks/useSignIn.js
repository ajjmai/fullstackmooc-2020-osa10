import { useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';

import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE);
  const history = useHistory();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });

    if (data && data.authorize) {
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    }

    history.push('/');

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
