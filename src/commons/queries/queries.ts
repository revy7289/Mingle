import { gql } from "@apollo/client";

export const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const FETCH_USER = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $boardId: ID!, $password: String) {
    updateBoard(updateBoardInput: $updateBoardInput, boardId: $boardId, password: $password) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      images
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
      _id
      writer
      contents
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      boardCommentId: $boardCommentId
      password: $password
    ) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)
  }
`;

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const LIKE_COUNT = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_TRAVEL_PRODUCTS = gql`
  query fetchTravelproducts {
    fetchTravelproducts {
      _id
      name
      remarks
      contents
      tags
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      tags
      images
      pickedCount
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_TRAVEL_PRODUCT = gql`
  mutation updateTravelproduct(
    $updateTravelproductInput: UpdateTravelproductInput!
    $travelproductId: ID!
  ) {
    updateTravelproduct(
      updateTravelproductInput: $updateTravelproductInput
      travelproductId: $travelproductId
    ) {
      _id
      name
      remarks
      contents
      tags
      images
      pickedCount
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_TRAVEL_PRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;

export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
