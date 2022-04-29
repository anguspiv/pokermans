import { Grid, GridItem, Heading, Avatar } from '@chakra-ui/react';

export interface NavMenuUserProps {
  image?: string;
  firstName: string;
  lastName?: string;
}

function NavMenuUser({ image, firstName, lastName }: NavMenuUserProps) {
  let name = firstName;

  if (lastName) {
    name = `${name} ${lastName[0]}.`;
  }

  return (
    <Grid
      gap={2}
      templateRows="auto"
      templateColumns="repeat(2, auto)"
      alignItems="center"
      justifyContent="start"
      px={2}
      py={1}
    >
      <Avatar src={image} data-testid="avatar" size="xs" name={name} />
      <GridItem area="info">
        <Heading as="p" size="xs">
          {name}
        </Heading>
      </GridItem>
    </Grid>
  );
}

export default NavMenuUser;
