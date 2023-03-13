import React from 'react';
import { screen, render } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import { useDisclosure as useDisclosureOrig, useMediaQuery as useMediaQueryOrig } from '@chakra-ui/react';
import PageLayout from './PageLayout';

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  ...jest.requireActual<typeof import('next-auth/react')>('next-auth/react'),
  useSession: jest.fn(),
}));

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;
const useDisclosure = useDisclosureOrig as jest.MockedFunction<typeof useDisclosureOrig>;
const useMediaQuery = useMediaQueryOrig as jest.MockedFunction<typeof useMediaQueryOrig>;

jest.mock<typeof import('@chakra-ui/react')>('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useDisclosure: jest.fn(),
  useMediaQuery: jest.fn(),
}));

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
  const onToggle = jest.fn();

  const setupPageLayout = (props: object = {}, context: object = {}) => {
    const { session, disclosure, mediaQuery } = {
      mediaQuery: [],
      ...context,
    };

    useSession.mockClear().mockReturnValue({ ...session });

    onOpen.mockClear();
    onClose.mockClear();

    useDisclosure.mockClear().mockReturnValue({
      isOpen: true,
      onOpen,
      onClose,
      onToggle,
      ...disclosure,
    });

    useMediaQuery.mockClear().mockReturnValue([...mediaQuery]);

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

  it('should show the app drawer', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    setupPageLayout({}, { disclosure });

    expect(screen.getByTestId('app-drawer')).toBeInTheDocument();
  });

  it('should show the menu button', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    setupPageLayout({}, { disclosure });

    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  it('should hide the app drawer', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    const mediaQuery = [true];

    setupPageLayout({}, { disclosure, mediaQuery });

    expect(screen.queryByTestId('app-drawer')).toBeNull();
  });

  it('should hide the menu button', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    const mediaQuery = [true];

    setupPageLayout({}, { disclosure, mediaQuery });

    expect(screen.queryByTestId('menu-button')).toBeNull();
  });

  it('should call the onToggle func', () => {
    expect.assertions(1);

    setupPageLayout();

    screen.getByTestId('menu-button').click();

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should hide the page sidebar', () => {
    expect.assertions(1);

    setupPageLayout();

    expect(screen.queryByTestId('aoo-sidebar')).toBeNull();
  });

  it('should render the page sidebar', () => {
    expect.assertions(1);

    const mediaQuery = [true];

    setupPageLayout({}, { mediaQuery });

    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
  });
});
