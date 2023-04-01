import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, GridItem } from '@chakra-ui/react';
import { PlayerSearchForm, PlayerSearchFormData } from '@components/molecules/PlayerSearchForm';
import { PlayerList } from '@components/organisms/PlayerList';
import { SEARCH_PLAYERS } from '@graphql/queries';

interface SearchPlayersData {
  profiles: Profile[];
}

export function PlayerSearch() {
  const { data, loading, refetch } = useQuery<SearchPlayersData, PlayerSearchFormData>(SEARCH_PLAYERS, {
    variables: {
      searchTerm: '',
      sort: 'ASC',
    },
  });
  const [players, setPlayers] = useState(data?.profiles || []);

  useEffect(() => {
    setPlayers(data?.profiles || []);
  }, [data]);

  const onSubmit = (values: PlayerSearchFormData) => {
    refetch(values);
  };

  const onReset = () => {
    refetch({ searchTerm: '', sort: 'ASC' });
  };

  return (
    <Grid
      gap={4}
      display="grid"
      templateRows="auto minmax(300px, 1fr)"
      templateColumns="1fr"
      templateAreas={'"form" "list"'}
      height="100%"
    >
      <GridItem area="form">
        <PlayerSearchForm onSubmit={onSubmit} onReset={onReset} />
      </GridItem>
      <GridItem area="list" px={2}>
        <PlayerList players={players} loading={loading} />
      </GridItem>
    </Grid>
  );
}

export default PlayerSearch;
