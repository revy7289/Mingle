import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  fromPromise,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { useAccessTokenStore } from "../Stores/tokenStore";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { useLoadStore } from "../Stores/loadStore";
import { RestoreAccessTokenDocument } from "../graphql/graphql";
import { GraphQLClient } from "graphql-request";

const GLOBAL_STATE = new InMemoryCache();

const getAccessToken = async () => {
  try {
    const graphqlClient = new GraphQLClient("https://main-practice.codebootcamp.co.kr/graphql", {
      credentials: "include",
    });
    const result = await graphqlClient.request(RestoreAccessTokenDocument);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    console.log(error);
  }
};

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloSetting(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  useEffect(() => {
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
      })
      .finally(setIsLoaded);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });
  const httpLink = new HttpLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
