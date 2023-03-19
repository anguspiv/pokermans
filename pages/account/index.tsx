import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import PageHeader from '@components/organisms/PageHeader';
import EditProfile from '@components/account/EditProfile';

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>User Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader title="User Account" />
      <Flex
        direction="column"
        alignItems={{
          base: 'center',
          lg: 'flex-start',
        }}
      >
        <EditProfile />
      </Flex>
    </>
  );
};

export default Account;
