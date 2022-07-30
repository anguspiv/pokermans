export const getFullName = (profile: Profile): string => {
  const { firstName, lastName, nickname } = profile;

  return `${firstName} ${nickname ? `"${nickname}" ` : ''}${lastName}`.trim();
};

export const getShortName = (profile: Profile): string => {
  const { firstName, lastName } = profile;

  return `${firstName} ${lastName ? `${lastName[0]}.` : ''}`.trim();
};

export const getInitials = (profile: Profile): string => {
  const { firstName, lastName } = profile;

  return `${firstName?.[0]}${lastName ? lastName[0] : ''}`.trim();
};

export const getName = (profile: Profile): string => {
  const { firstName, lastName } = profile;

  return `${firstName} ${lastName}`.trim();
};

export default {
  getFullName,
  getInitials,
  getName,
  getShortName,
};
