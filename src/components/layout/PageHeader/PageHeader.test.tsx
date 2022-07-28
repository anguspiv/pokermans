import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter as userRouterOrig } from 'next/router';
import PageHeader, { PageHeaderProps } from './PageHeader';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: '/',
  })),
}));

const useRouter = userRouterOrig as jest.Mock<typeof userRouterOrig>;

describe('<PageHeader />', () => {
  const setupPageHeader = (props: PageHeaderProps = { title: 'test' }, router = {}) => {
    useRouter.mockReturnValue({
      asPath: '/',
      ...router,
    });

    return render(<PageHeader {...props} />);
  };

  it('should render the title', () => {
    expect.assertions(1);

    const title = 'Test Title';

    const { getByText } = setupPageHeader({ title });

    const actual = getByText(title);

    expect(actual).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    expect.assertions(1);

    const title = 'Test title';

    const subtitle = 'Test Subtitle';

    const { getByText } = setupPageHeader({ title, subtitle });

    const actual = getByText(subtitle);

    expect(actual).toBeInTheDocument();
  });

  it('should render the breadcrumbs', () => {
    expect.assertions(2);

    const { getByTestId } = setupPageHeader({}, { asPath: '/test/page' });

    const actual = getByTestId('breadcrumbs');

    expect(actual).toBeInTheDocument();
    expect(screen.getByText('Test')).toHaveAttribute('href', '/test');
  });

  it('should render the breadcrumb labels', () => {
    expect.assertions(1);

    const breadcrumbLabels = {
      test: 'Hello',
    };

    setupPageHeader({ breadcrumbLabels }, { asPath: '/test/page' });

    const actual = screen.getByText('Hello');

    expect(actual).toHaveAttribute('href', '/test');
  });
});
