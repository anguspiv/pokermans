import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Flex,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faSpinner,
  faArrowUpShortWide,
  faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface PlayerSearchFormProps {
  onReset: () => void;
  onSubmit: (data: PlayerSearchFormData) => void | Promise<void>;
  loading?: boolean;
}

const ASC = 'ASC';
const DESC = 'DESC';

export interface PlayerSearchFormData {
  search: string;
  order: 'ASC' | 'DESC';
}

const schema = yup.object().shape({
  search: yup.string(),
});

const defaultValues = {
  search: '',
  order: ASC,
};

export function PlayerSearchForm({ onSubmit = () => {}, onReset = () => {}, loading = false }: PlayerSearchFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  register('order');

  const onFormSubmit = handleSubmit((data: PlayerSearchFormData) => onSubmit(data));

  const onResetClick = () => {
    reset();
    onReset();
  };

  const orderVal = getValues('order');

  const sortIcon = orderVal === DESC ? faArrowDownShortWide : faArrowUpShortWide;
  const sortLabel = orderVal === ASC ? 'Sort Descending' : 'Sort Ascending';

  const onOrderClick = () => {
    const newValue = orderVal === ASC ? DESC : ASC;
    setValue('order', newValue);
    onFormSubmit();
  };

  const disabled = loading || isSubmitting || !isDirty;
  const inputDisabled = loading || isSubmitting;

  return (
    <Flex as="form" data-testid="player-search-form" onSubmit={onFormSubmit}>
      <Box flexGrow={1}>
        <InputGroup maxWidth="400px">
          <InputLeftElement>
            <IconButton
              aria-label="Search"
              icon={<FontAwesomeIcon icon={faSearch} />}
              type="Submit"
              variant="ghost"
              disabled={disabled}
              colorScheme="teal"
            />
          </InputLeftElement>
          <Input placeholder="Search" {...register('search')} focusBorderColor="teal.300" isDisabled={inputDisabled} />
          <InputRightElement>
            {inputDisabled ? (
              <FontAwesomeIcon icon={faSpinner} spin aria-busy="true" aria-label="Loading..." />
            ) : (
              <IconButton
                aria-label="Clear"
                icon={<FontAwesomeIcon icon={faTimes} />}
                variant="ghost"
                onClick={onResetClick}
                disabled={disabled}
                colorScheme="teal"
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      <HStack>
        <Text>Sort:</Text>
        <IconButton
          aria-label={sortLabel}
          onClick={onOrderClick}
          icon={<FontAwesomeIcon icon={sortIcon} />}
          colorScheme="teal"
          variant="ghost"
        />
      </HStack>
    </Flex>
  );
}

export default PlayerSearchForm;
