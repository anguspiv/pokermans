import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter as useRouterOrig } from 'next/router';
import Breadcrumbs from './Breadcrumbs';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

const useRouter = useRouterOrig as jest.MockedFunction<typeof useRouterOrig>;

describe('<Breadcrumbs />', () => {
  const setupBreadcrumbs = (props, { pathname = '/' } = {}) => {
    useRouter.mockReturnValueOnce({ asPath: pathname });
    return render(<Breadcrumbs {...props} />);
  };

  it('should render the home link', () => {
    expect.assertions(1);

    const { getByText } = setupBreadcrumbs();

    const homeLink = getByText('Home');

    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the home link with a custom label', () => {
    expect.assertions(1);

    const { getByText } = setupBreadcrumbs({ homeLabel: 'Pokermans' });

    const homeLink = getByText('Pokermans');

    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the subpage links', () => {
    expect.assertions(3);

    const { getByText } = setupBreadcrumbs({}, { pathname: '/test/page' });

    expect(getByText('Home')).toHaveAttribute('href', '/');
    expect(getByText('Test')).toHaveAttribute('href', '/test');
    expect(getByText('Page')).toBeInTheDocument();
  });

  it('should convert paths kebab case to title case', () => {
    expect.assertions(3);

    const { getByText } = setupBreadcrumbs({}, { pathname: '/test-page/page-thing-title/item' });

    expect(getByText('Test Page')).toHaveAttribute('href', '/test-page');
    expect(getByText('Page Thing Title')).toHaveAttribute('href', '/test-page/page-thing-title');
    expect(getByText('Item')).toBeInTheDocument();
  });

  it('should replace the crumb label', () => {
    expect.assertions(2);

    const labels = {
      '123abc': 'Test Label',
    };

    setupBreadcrumbs({ labels }, { pathname: '/test-page/page-thing-title/123abc' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.queryByText('123abc')).not.toBeInTheDocument();
  });

  it('should replace the multiple crumb labels', () => {
    expect.assertions(2);

    const labels = {
      '123abc': 'Test Label',
      'page-thing-title': 'Cool Page',
    };

    setupBreadcrumbs({ labels }, { pathname: '/test-page/page-thing-title/123abc' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Cool Page')).toHaveAttribute('href', '/test-page/page-thing-title');
  });
});
