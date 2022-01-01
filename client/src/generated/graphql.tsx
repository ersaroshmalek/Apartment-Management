import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddMaintenance = {
  amountPaid: Scalars['Float'];
  date: Scalars['String'];
  email: Scalars['String'];
  flatNo: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Members = {
  __typename?: 'Members';
  _id: Scalars['String'];
  amountDue: Scalars['Float'];
  contact: Scalars['Float'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  flatNo: Scalars['Float'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  updateAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMaintenance: Output;
  login: UserResponse;
  register: UserResponse;
  registerMember: Members;
};


export type MutationAddMaintenanceArgs = {
  options: AddMaintenance;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userNameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  option: NewUser;
};


export type MutationRegisterMemberArgs = {
  options: NewMember;
};

export type NewMember = {
  amountDue: Scalars['Float'];
  contact: Scalars['Float'];
  email: Scalars['String'];
  flatNo: Scalars['Float'];
  fullName: Scalars['String'];
};

export type NewUser = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type Output = {
  __typename?: 'Output';
  amount: Scalars['Float'];
  due: Scalars['Float'];
  flatNo: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getAllMembers: Array<Members>;
  getMembers: Array<Members>;
  getPendingMembers: Array<Members>;
  hello: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  updatedAt: Scalars['String'];
  userName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginMutMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', email: string, userName: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type PendingMaintenanceQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingMaintenanceQuery = { __typename?: 'Query', getPendingMembers: Array<{ __typename?: 'Members', id: string, flatNo: number, fullName: string, email: string, contact: number, amountDue: number }> };


export const LoginMutDocument = gql`
    mutation LoginMut($username: String!, $password: String!) {
  login(userNameOrEmail: $username, password: $password) {
    user {
      email
      userName
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutMutation() {
  return Urql.useMutation<LoginMutMutation, LoginMutMutationVariables>(LoginMutDocument);
};
export const PendingMaintenanceDocument = gql`
    query pendingMaintenance {
  getPendingMembers {
    id
    flatNo
    fullName
    email
    contact
    amountDue
  }
}
    `;

export function usePendingMaintenanceQuery(options: Omit<Urql.UseQueryArgs<PendingMaintenanceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PendingMaintenanceQuery>({ query: PendingMaintenanceDocument, ...options });
};