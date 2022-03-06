import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import SideBar from './SideBar';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('<SideBar />', () => {
  const setupSideBar = (props: object = {}) => {
    useSession.mockClear().mockReturnValue({});

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
