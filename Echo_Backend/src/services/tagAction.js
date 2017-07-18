import model from '../models';

const Tag = model.Tag;

export const getAllTags = async () => {
  const session = await model.getSession();
  const tagDao = session.getDao(Tag);

  const tags = tagDao.find();
  return new Promise((resolve) => {
    return tags && Tag.$extractArray(tags, { recursive: true });
  });
};
