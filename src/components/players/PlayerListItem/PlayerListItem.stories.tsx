import { Story } from '@storybook/react';
import { PlayerListItem, PlayerListItemProps } from './PlayerListItem';

export default {
  title: 'components/players/PlayerListItem',
  component: PlayerListItem,
};

const Template: Story<PlayerListItemProps> = (args) => <PlayerListItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  nickname: 'River Boat Captain',
  image: 'https://picsum.photos/id/237/200/300',
};
