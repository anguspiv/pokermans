import type { NextPage } from 'next';
import Head from 'next/head';
import PageHeader from '../../src/components/layout/PageHeader';

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>User Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader title="User Account" />
    </>
  );
};

export default Account;
