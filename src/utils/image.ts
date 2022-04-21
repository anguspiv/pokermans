export const getImageUrl = ({ filepath, filename }: Image) => `${process.env.CDN_URL || ''}${filepath}/${filename}`;

export default {
  getImageUrl,
};
