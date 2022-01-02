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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Maintenance = {
  __typename?: 'Maintenance';
  _id: Scalars['String'];
  amountPaid: Scalars['Float'];
  createdAt: Scalars['String'];
  date: Scalars['String'];
  email: Scalars['String'];
  flatNo: Scalars['Float'];
  id: Scalars['String'];
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
  amountPaid: Scalars['Float'];
  date: Scalars['String'];
  email: Scalars['String'];
  flatNo: Scalars['Float'];
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
  getHistory: Array<Maintenance>;
  getMembers: Array<Members>;
  getPendingMembers: Array<Members>;
  hello: Scalars['String'];
};


export type QueryGetHistoryArgs = {
  apartmentId: Scalars['Float'];
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

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', getMembers: Array<{ __typename?: 'Members', flatNo: number }> };

export type LoginMutMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', email: string, userName: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type PendingMaintenanceQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingMaintenanceQuery = { __typename?: 'Query', getPendingMembers: Array<{ __typename?: 'Members', id: string, flatNo: number, fullName: string, email: string, contact: number, amountDue: number }> };

export type HistoryQueryVariables = Exact<{
  apartmentId: Scalars['Float'];
}>;


export type HistoryQuery = { __typename?: 'Query', getHistory: Array<{ __typename?: 'Maintenance', id: string, flatNo: number, amountPaid: number, email: string, date: string, createdAt: string }> };

export type PaymentMutationVariables = Exact<{
  flatNo: Scalars['Float'];
  date: Scalars['String'];
  amountPaid: Scalars['Float'];
  email: Scalars['String'];
}>;


export type PaymentMutation = { __typename?: 'Mutation', addMaintenance: { __typename?: 'Output', flatNo: number, due: number, amount: number } };


export const GetMembersDocument = gql`
    query getMembers {
  getMembers {
    flatNo
  }
}
    `;

export function useGetMembersQuery(options: Omit<Urql.UseQueryArgs<GetMembersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMembersQuery>({ query: GetMembersDocument, ...options });
};
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
export const HistoryDocument = gql`
    query History($apartmentId: Float!) {
  getHistory(apartmentId: $apartmentId) {
    id
    flatNo
    amountPaid
    email
    date
    createdAt
  }
}
    `;

export function useHistoryQuery(options: Omit<Urql.UseQueryArgs<HistoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HistoryQuery>({ query: HistoryDocument, ...options });
};
export const PaymentDocument = gql`
    mutation Payment($flatNo: Float!, $date: String!, $amountPaid: Float!, $email: String!) {
  addMaintenance(
    flatNo: $flatNo
    date: $date
    amountPaid: $amountPaid
    email: $email
  ) {
    flatNo
    due
    amount
  }
}
    `;

export function usePaymentMutation() {
  return Urql.useMutation<PaymentMutation, PaymentMutationVariables>(PaymentDocument);
};