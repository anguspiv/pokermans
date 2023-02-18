import { render } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import SideBar from './SideBar';

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  useQuery: jest.fn().mockReturnValue({ data: { profile: { firstName: 'John' } } }),
  gql: jest.fn(),
}));

jest.mock<typeof import('next/router')>('next/router', () => ({
  useRouter() {
    return {
      route: '/test',
      pathname: '',
      query: '',
      asPath: '/test',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;

describe('<SideBar />', () => {
  const setupSideBar = (props: object = {}) => {
    useSession.mockClear().mockReturnValue({ data: null, loading: false });

    return render(<SideBar {...props} />);
  };

  it('renders the sidebar', () => {
    expect.assertions(1);

    const { getByTestId } = setupSideBar();

    expect(getByTestId('app-sidebar')).toBeInTheDocument();
  });

  it('renders the app-menu', () => {
    expect.assertions(1);

    const { getByTestId } = setupSideBar();

    expect(getByTestId('app-menu')).toBeInTheDocument();
  });
});
