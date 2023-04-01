import { InputBase, Paper, CircularProgress, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface PlayerSearchFormData {
  searchTerm?: string;
  sort?: string;
}
export interface PlayerSearchFormProps {
  onReset: () => void;
  onSubmit: (data: PlayerSearchFormData) => void | Promise<void>;
  loading?: boolean;
}

const ASC = 'ASC';
const DESC = 'DESC';

const schema = yup.object().shape({
  searchTerm: yup.string(),
});

const defaultValues = {
  searchTerm: '',
  sort: ASC,
};

const Form = styled(Paper)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  gridTemplateColumns: '1fr',
  gridGap: theme.spacing(1),
  gridAutoFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  [theme.breakpoints.up('sm')]: {
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr auto',
  },
}));

export function PlayerSearchForm({ onSubmit = () => {}, onReset = () => {}, loading = false }: PlayerSearchFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting },
    reset,
    setValue,
    getValues,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  register('sort');

  const onFormSubmit = handleSubmit((data: PlayerSearchFormData) => onSubmit(data));

  const onResetClick = () => {
    reset();
    onReset();
  };

  const sortVal = getValues('sort');
  const searchTerm = getValues('searchTerm');

  const sortLabel = sortVal === ASC ? 'Sort Descending' : 'Sort Ascending';

  const onSortClick = () => {
    const newValue = sortVal === ASC ? DESC : ASC;
    setValue('sort', newValue);
    onFormSubmit();
  };

  const disabled = loading || isSubmitting || !isDirty;
  const inputDisabled = loading || isSubmitting;

  return (
    <Form component="form" data-testid="player-search-form" onSubmit={onFormSubmit}>
      <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
        <IconButton type="submit" disabled={disabled} aria-label="Search">
          <SearchIcon />
        </IconButton>
        <Controller
          name="searchTerm"
          control={control}
          render={({ field }) => (
            <InputBase
              id="searchTerm"
              placeholder="Search"
              disabled={inputDisabled}
              {...field}
              sx={{ flex: '0 1 100%', mx: 1 }}
            />
          )}
        />
        {!inputDisabled && searchTerm && (
          <IconButton aria-label="Clear" onClick={onResetClick} disabled={disabled}>
            <ClearIcon />
          </IconButton>
        )}
        <IconButton aria-label={sortLabel} onClick={onSortClick} disabled={disabled} title={sortLabel}>
          <SortByAlphaIcon />
        </IconButton>
        {inputDisabled && <CircularProgress size={20} aria-label="Loading" />}
      </Box>
    </Form>
  );
}

export default PlayerSearchForm;
