/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n": types.RestoreAccessTokenDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation logoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String) {\n    updateBoard(updateBoardInput: $updateBoardInput, boardId: $boardId, password: $password) {\n      _id\n      writer\n      title\n      contents\n      images\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      boardCommentId: $boardCommentId\n      password: $password\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n": types.DeleteBoardCommentDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  query fetchTravelproducts {\n    fetchTravelproducts {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateTravelproductDocument,
    "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateTravelproductDocument,
    "\n  mutation deleteTravelproduct($travelproductId: ID!) {\n    deleteTravelproduct(travelproductId: $travelproductId)\n  }\n": types.DeleteTravelproductDocument,
    "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation restoreAccessToken {\n    restoreAccessToken {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String) {\n    updateBoard(updateBoardInput: $updateBoardInput, boardId: $boardId, password: $password) {\n      _id\n      writer\n      title\n      contents\n      images\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String) {\n    updateBoard(updateBoardInput: $updateBoardInput, boardId: $boardId, password: $password) {\n      _id\n      writer\n      title\n      contents\n      images\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      boardCommentId: $boardCommentId\n      password: $password\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      boardCommentId: $boardCommentId\n      password: $password\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n"): (typeof documents)["\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts {\n    fetchTravelproducts {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts {\n    fetchTravelproducts {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateTravelproduct(\n    $updateTravelproductInput: UpdateTravelproductInput!\n    $travelproductId: ID!\n  ) {\n    updateTravelproduct(\n      updateTravelproductInput: $updateTravelproductInput\n      travelproductId: $travelproductId\n    ) {\n      _id\n      name\n      remarks\n      contents\n      tags\n      images\n      pickedCount\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTravelproduct($travelproductId: ID!) {\n    deleteTravelproduct(travelproductId: $travelproductId)\n  }\n"): (typeof documents)["\n  mutation deleteTravelproduct($travelproductId: ID!) {\n    deleteTravelproduct(travelproductId: $travelproductId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;