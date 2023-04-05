import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';
import PageHeader from '@components/organisms/PageHeader';
import EditProfile from '@components/organisms/EditProfile';

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>User Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader title="User Account" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <EditProfile />
      </Box>
    </>
  );
};

export default Account;
