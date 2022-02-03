import { AUTHORIZE_USER } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { username: username, password: password },
    });

    if (result.data.authorize) {
      authStorage.setAccessToken(result.data.authorize.accessToken);
      apolloClient.resetStore();
    }

    return result;
  };

  return [signIn, result];
};

export default useSignIn;
