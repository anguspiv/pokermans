import Head from 'next/head';
import PageHeader from '@components/organisms/PageHeader';
import { Box } from '@mui/material';
import { PlayerSearch } from '@components/templates/PlayerSearch';

const PlayersListPage = () => {
  return (
    <>
      <Head>
        <title>Players</title>
      </Head>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ flex: '0 0 auto' }}>
          <PageHeader title="Players" />
        </Box>
        <Box sx={{ flex: '1 0 100%' }}>
          <PlayerSearch />
        </Box>
      </Box>
    </>
  );
};

export default PlayersListPage;
