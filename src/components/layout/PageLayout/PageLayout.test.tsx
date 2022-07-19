import React from 'react';
import { render } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import { useDisclosure as useDisclosureOrig, useMediaQuery as useMediaQueryOrig } from '@chakra-ui/react';
import PageLayout from './PageLayout';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;
const useDisclosure = useDisclosureOrig as jest.MockedFunction<typeof useDisclosureOrig>;
const useMediaQuery = useMediaQueryOrig as jest.MockedFunction<typeof useMediaQueryOrig>;

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useDisclosure: jest.fn(),
  useMediaQuery: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn().mockReturnValue({ data: { profile: { firstName: 'John' } } }),
  gql: jest.fn(),
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

    const { getByText } = setupPageLayout({ children });

    expect(getByText('Child')).toBeInTheDocument();
  });

  it('should display the app header', () => {
    expect.assertions(1);

    const { getByTestId } = setupPageLayout();

    expect(getByTestId('app-header')).toBeInTheDocument();
  });

  it('should show the app drawer', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    const { getByTestId } = setupPageLayout({}, { disclosure });

    expect(getByTestId('app-drawer')).toBeInTheDocument();
  });

  it('should show the menu button', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    const { getByTestId } = setupPageLayout({}, { disclosure });

    expect(getByTestId('menu-button')).toBeInTheDocument();
  });

  it('should hide the app drawer', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    const mediaQuery = [true];

    const { queryByTestId } = setupPageLayout({}, { disclosure, mediaQuery });

    expect(queryByTestId('app-drawer')).toBeNull();
  });

  it('should hide the menu button', () => {
    expect.assertions(1);

    const disclosure = {
      isOpen: true,
    };

    const mediaQuery = [true];

    const { queryByTestId } = setupPageLayout({}, { disclosure, mediaQuery });

    expect(queryByTestId('menu-button')).toBeNull();
  });

  it('should call the onToggle func', () => {
    expect.assertions(1);

    const { getByTestId } = setupPageLayout();

    getByTestId('menu-button').click();

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should hide the page sidebar', () => {
    expect.assertions(1);

    const { queryByTestId } = setupPageLayout();

    expect(queryByTestId('aoo-sidebar')).toBeNull();
  });

  it('should render the page sidebar', () => {
    expect.assertions(1);

    const mediaQuery = [true];

    const { getByTestId } = setupPageLayout({}, { mediaQuery });

    expect(getByTestId('app-sidebar')).toBeInTheDocument();
  });
});
