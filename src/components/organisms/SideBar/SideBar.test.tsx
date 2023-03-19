import { render, screen, fireEvent } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import SideBar from './SideBar';

jest.mock<typeof import('next/router')>('next/router', () => ({
  ...jest.requireActual<typeof import('next/router')>('next/router'),
  useRouter: () =>
    ({
      asPath: '/',
    } as NextRouter),
}));

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  useQuery: jest.fn().mockReturnValue({
    data: { profile: { firstName: 'John', lastName: 'Doe', avatar: { filepath: 'test.jpg' } } },
  }),
  gql: jest.fn(),
}));

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;

describe('<SideBar />', () => {
  const setupSideBar = (props: object = {}) => {
    useSession.mockClear().mockReturnValue({ data: null, loading: false });

    return render(<SideBar {...props} />);
  };

  it('renders the sidebar', () => {
    expect.assertions(1);

    setupSideBar();

    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
  });

  it('renders the app-menu', () => {
    expect.assertions(1);

    setupSideBar();

    expect(screen.getByTestId('app-menu')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    expect.assertions(1);

    const onClose = jest.fn();

    setupSideBar({ onClose });

    fireEvent.click(screen.getByTestId('sidebar-close-button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
