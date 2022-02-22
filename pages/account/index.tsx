import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import PageHeader from '../../src/components/layout/PageHeader';

const QUERY = gql`
  query User {
    user {
      id
      name
      email
      image
      profile {
        id
        firstName
        lastName
        nickname
        bio
      }
    }
  }
`;

const Account: NextPage = () => {
  const { data, loading, error } = useQuery(QUERY);

  return (
    <>
      <Head>
        <title>User Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader title="User Account" />
      {loading && <p>Loading...</p>}
      {error && <p>Error :( {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
};

export default Account;
