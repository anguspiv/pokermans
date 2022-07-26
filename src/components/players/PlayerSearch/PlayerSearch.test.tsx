import { useQuery as useQueryOrig } from '@apollo/client';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import logger from '@utils/logger';
import { PlayerSearch } from './PlayerSearch';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn().mockReturnValue({
    data: {
      players: [],
    },
    loading: false,
    refetch: jest.fn(),
  }),
  useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

const useQuery = useQueryOrig as jest.MockedFunction<typeof useQueryOrig>;

describe('<PlayerSearch />', () => {
  const setupPlayerSearch = (props, { profiles, ...getQuery } = {}) => {
    useQuery.mockReturnValue({
      data: {
        profiles: profiles || [],
      },
      loading: false,
      ...getQuery,
    });

    return render(<PlayerSearch {...props} />);
  };

  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    logger.wrapAll();
  });

  it('should render the search form', () => {
    expect.assertions(1);

    setupPlayerSearch();

    expect(screen.getByTestId('player-search-form')).toBeInTheDocument();
  });

  it('should make a search player request', async () => {
    expect.hasAssertions();

    const refetch = jest.fn();

    setupPlayerSearch(
      {},
      {
        refetch,
      },
    );

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalledWith({
        searchTerm: 'test',
        sort: 'ASC',
      });
    });
  });

  it('should make a search player request with sort change', async () => {
    expect.hasAssertions();

    const refetch = jest.fn();

    setupPlayerSearch(
      {},
      {
        refetch,
      },
    );

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sort Descending' }));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalledWith({
        searchTerm: 'test',
        sort: 'DESC',
      });
    });
  });

  it('should make a search player request with reset values', async () => {
    expect.hasAssertions();

    const refetch = jest.fn();

    setupPlayerSearch(
      {},
      {
        refetch,
      },
    );

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalledWith({
        searchTerm: '',
        sort: 'ASC',
      });
    });
  });

  it('should display a list of players', () => {
    expect.assertions(1);

    const profiles = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'JD',
        avatar: {
          filename: '51e61fc0-9085-44a8-8b8f-dce46bcaeeb7',
          filepath: 'images/uploads/51e61fc0-9085-44a8-8b8f-dce46bcaeeb7.jpg',
          title: null,
          description: null,
        },
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
        nickname: 'JD',
        avatar: {
          filename: '51e61fc0-9085-44a8-8b8f-dce46bcaeeb7',
          filepath: 'images/uploads/51e61fc0-9085-44a8-8b8f-dce46bcaeeb7.jpg',
          title: null,
          description: null,
        },
      },
    ];

    setupPlayerSearch({}, { profiles });

    expect(screen.getByTestId('player-list')).toBeInTheDocument();
  });

  it('should display a list of players with no results', () => {
    expect.assertions(1);

    const profiles = [];

    setupPlayerSearch({}, { profiles });

    expect(screen.getByText('No players found')).toBeInTheDocument();
  });

  it('should display a list of players loading', () => {
    expect.assertions(1);

    const profiles = [];

    setupPlayerSearch({}, { profiles, loading: true });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
