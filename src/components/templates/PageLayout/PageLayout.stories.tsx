import { SessionProvider } from 'next-auth/react';
import { Box } from '@mui/material';
import { red } from '@mui/material/colors';
import PageLayout from './PageLayout';

export default {
  title: 'Templates/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () => (
  <SessionProvider session={{ expires: '' }}>
    <PageLayout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          justify: 'center',
          alignContent: 'center',
          background: red[100],
          display: 'flex',
        }}
      >
        Content that should be centered in the page, and hopefully overflow the page instead of wrapping early.
      </Box>
    </PageLayout>
  </SessionProvider>
);

export const Default = Template.bind({});
