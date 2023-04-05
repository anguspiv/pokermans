export const getImageUrl = ({ filepath }: Image = {}) => `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${filepath}`;

export default {
  getImageUrl,
};
