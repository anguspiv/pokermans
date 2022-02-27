import type { NextPage } from 'next';
import Head from 'next/head';
import PageHeader from '@components/layout/PageHeader';
import EditProfile from '@components/account/EditProfile';

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>User Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader title="User Account" />
      <EditProfile />
    </>
  );
};

export default Account;
