import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: Array<Post>;
  getSinglePost?: Maybe<Post>;
  users: Array<User>;
  getLoggedInUser?: Maybe<User>;
  getUser?: Maybe<User>;
};


export type QueryGetSinglePostArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost: Post;
  deletePost: Scalars['Boolean'];
  createUser: UserResponse;
  loginUser: UserResponse;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'createdAt' | 'updatedAt' | 'username'>
    )> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'createdAt' | 'updatedAt' | 'username'>
    )> }
  ) }
);

export type GetLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedInUserQuery = (
  { __typename?: 'Query' }
  & { getLoggedInUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'createdAt' | 'updatedAt' | 'username'>
  )> }
);


export const LoginUserDocument = gql`
    mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      username
    }
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      username
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const GetLoggedInUserDocument = gql`
    query GetLoggedInUser {
  getLoggedInUser {
    id
    createdAt
    updatedAt
    username
  }
}
    `;

export function useGetLoggedInUserQuery(options: Omit<Urql.UseQueryArgs<GetLoggedInUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetLoggedInUserQuery>({ query: GetLoggedInUserDocument, ...options });
};