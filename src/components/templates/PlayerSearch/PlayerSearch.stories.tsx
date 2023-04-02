import { Story } from '@storybook/react';
import { SEARCH_PLAYERS } from '@graphql/queries';
import { PlayerSearch } from './PlayerSearch';

export default {
  title: 'Templates/PlayerSearch',
  component: PlayerSearch,
};

const Template: Story = (args) => <PlayerSearch {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: SEARCH_PLAYERS,
        },
        result: {
          data: {
            profiles: [
              {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                nickname: 'River Boat Captain',
                image: 'https://picsum.photos/id/237/200/300',
              },
              {
                id: '2',
                firstName: 'Jane',
                lastName: 'Doe',
                nickname: 'Snake',
                image: 'https://picsum.photos/id/244/200/300',
              },
              {
                id: '3',
                firstName: 'Foo',
                lastName: 'Bar',
                nickname: 'Turle',
                image: 'https://picsum.photos/id/345/200/300',
              },
            ],
          },
        },
      },
    ],
  },
};
