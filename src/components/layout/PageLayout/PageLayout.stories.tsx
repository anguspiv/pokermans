import { SessionProvider } from 'next-auth/react';
import { Flex } from '@chakra-ui/react';
import PageLayout from './PageLayout';

export default {
  title: 'components/layout/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () => (
  <SessionProvider session={{ expires: '' }}>
    <PageLayout>
      <Flex width="100%" height="100%" justify="center" alignContent="center" background="red.100">
        Content
      </Flex>
    </PageLayout>
  </SessionProvider>
);

export const Default = Template.bind({});
