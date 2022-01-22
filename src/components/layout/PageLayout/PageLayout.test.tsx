import React from 'react';
import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@chakra-ui/react';
import PageLayout from './PageLayout';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useDisclosure: jest.fn(),
}));

describe('<PageLayout />', () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();

  const setupPageLayout = (props: object = {}, context: object = {}) => {
    const { session, disclosure } = context;

    useSession.mockClear().mockReturnValue({ ...session });

    onOpen.mockClear();
    onClose.mockClear();

    useDisclosure.mockClear().mockReturnValue({
      isOpen: true,
      onOpen,
      onClose,
      ...disclosure,
    });

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
});
