import React from 'react';
import { render } from '@testing-library/react';
import PageHeader, { PageHeaderProps } from './PageHeader';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: '/',
  })),
}));

describe('<PageHeader />', () => {
  const setupPageHeader = (props: PageHeaderProps = { title: 'test' }) => {
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
    expect.assertions(1);

    const { getByTestId } = setupPageHeader({}, { pathname: '/test/page' });

    const actual = getByTestId('breadcrumbs');

    expect(actual).toBeInTheDocument();
  });
});
