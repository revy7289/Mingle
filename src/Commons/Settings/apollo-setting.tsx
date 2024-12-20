import { ApolloClient, ApolloLink, InMemoryCache, fromPromise, ApolloProvider, HttpLink } from "@apollo/client";
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
  const { setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 3. 프리렌더링 무시 - useEffect 방법
  useEffect(() => {
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
      })
      .finally(setIsLoaded);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급 받은 accessToken을 저장하고, 방금 실패한 쿼리의 정보 수정하고 재시도하기
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization: Bearer 만료된토큰
                  Authorization: `Bearer ${newAccessToken}`, // 3-2. 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-3. 바꿔치기된 API 재전송하기
        }
      }
    }
  });
  const httpLink = new HttpLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),

    // cache: new InMemoryCache(), // => accessToken이 변경돼서 리렌더될 때 새로만들어짐
    cache: GLOBAL_STATE, // => 컴포넌트는 새로 만들어져도, globalState는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
