import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import useMediaQueryOrig from '@mui/material/useMediaQuery';
import PageLayout from './PageLayout';

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  ...jest.requireActual<typeof import('next-auth/react')>('next-auth/react'),
  useSession: jest.fn(),
}));

jest.mock<typeof import('@mui/material/useMediaQuery')>('@mui/material/useMediaQuery', () => jest.fn());

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;
const useMediaQuery = useMediaQueryOrig as jest.MockedFunction<typeof useMediaQueryOrig>;

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  ...jest.requireActual<typeof import('@apollo/client')>('@apollo/client'),
  useQuery: jest.fn().mockReturnValue({ data: { profile: { firstName: 'John' } } }),
  gql: jest.fn(),
}));

jest.mock<typeof import('next/router')>('next/router', () => ({
  ...jest.requireActual('next/router'),
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

describe('<PageLayout />', () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();

  const setupPageLayout = (props: object = {}, context: object = {}) => {
    const { session, mediaQuery } = {
      mediaQuery: false,
      ...context,
    };

    useSession.mockClear().mockReturnValue({ ...session });

    onOpen.mockClear();
    onClose.mockClear();

    useMediaQuery.mockClear().mockReturnValue(mediaQuery);

    return render(<PageLayout {...props} />);
  };

  it('renders the child components', () => {
    expect.assertions(1);

    const children = <div>Child</div>;

    setupPageLayout({ children });

    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('should display the app header', () => {
    expect.assertions(1);

    setupPageLayout();

    expect(screen.getByTestId('app-header')).toBeInTheDocument();
  });

  it('should show the menu button', () => {
    expect.assertions(1);

    setupPageLayout({});

    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  it('should hide the page sidebar', () => {
    expect.assertions(1);

    setupPageLayout();

    expect(screen.queryByTestId('aoo-sidebar')).toBeNull();
  });

  it('should show the sidebar', () => {
    expect.assertions(1);

    setupPageLayout({});

    fireEvent.click(screen.getByRole('button', { name: /menu/i }));

    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
  });

  it('should close the sidebar', async () => {
    expect.hasAssertions();

    setupPageLayout({}, { mediaQuery: false });

    fireEvent.click(screen.getByRole('button', { name: /menu/i }));

    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('sidebar-close-button'));

    await waitFor(() => expect(screen.queryByTestId('app-sidebar')).toBeNull());
  });
});
