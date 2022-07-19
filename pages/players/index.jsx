import Head from 'next/head';
import PageHeader from '@components/layout/PageHeader';
import { Grid, GridItem } from '@chakra-ui/react';
import { PlayerSearch } from '@components/players/PlayerSearch';

const PlayersListPage = () => {
  return (
    <>
      <Head>
        <title>Players</title>
      </Head>

      <Grid
        display="grid"
        templateRows="auto 1fr"
        templateColumns="1fr"
        templateAreas={'"header" "content"'}
        height="100%"
      >
        <GridItem area="header">
          <PageHeader title="Players" />
        </GridItem>
        <GridItem area="content">
          <PlayerSearch />
        </GridItem>
      </Grid>
    </>
  );
};

export default PlayersListPage;
