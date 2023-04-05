import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PlayerSearchForm, PlayerSearchFormData } from '@components/molecules/PlayerSearchForm';
import { PlayerList } from '@components/organisms/PlayerList';
import { SEARCH_PLAYERS } from '@graphql/queries';

interface SearchPlayersData {
  profiles: Profile[];
}

const Grid = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'auto minmax(300px, 1fr)',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: '"form" "list"',
  height: '100%',
});

const FormWrapper = styled('div')({
  gridArea: 'form',
});

const ListWrapper = styled('div')({
  gridArea: 'list',
});

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
    <Grid>
      <FormWrapper>
        <PlayerSearchForm onSubmit={onSubmit} onReset={onReset} />
      </FormWrapper>
      <ListWrapper>
        <PlayerList players={players} loading={loading} />
      </ListWrapper>
    </Grid>
  );
}

export default PlayerSearch;
