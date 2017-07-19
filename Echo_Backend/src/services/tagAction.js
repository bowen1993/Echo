import model from '../models';
import _ from 'lodash';

const Tag = model.Tag;

export const getAllTags = async () => {
  const session = await model.getSession();
  const tagDao = session.getDao(Tag);

  const tags = tagDao.find();
  return new Promise((resolve) => {
    return resolve(tags && Tag.$extractArray(tags, { recursive: true }));
  });
};

export const createTag = async (tag) => {
  const session = await model.getSession();
  const tagDao = session.getDao(Tag);

  await tagDao.create(tag);
  return tag;
};

export const findTag = async (tag) => {
  const session = await model.getSession();
  const tagDao = session.getDao(Tag);

  const tagGetten = await tagDao.findOne({
    name: tag,
  });

  return tagGetten.$extract({ recursive: true });
};

export const findCreateTags = async (tags) => {
  const session = await model.getSession();
  const tagDao = session.getDao(Tag);

  let tagDocs = await tagDao.find({
    $or: tags,
  });
  tagDocs = _.map(tagDocs, tag => tag.name);

  const newTagList = [];
  _.forEach(tags, ({ name }) => {
    if (!_.includes(tagDocs, name)) {
      newTagList.push(new Tag({ name }));
    }
  });

  if (newTagList.length > 0) await tagDao.insertMany(newTagList);
  tagDocs = await tagDao.find({
    $or: tags,
  });
  tagDocs = await Tag.$extractArray(tagDocs, { includes: { id: true } });
  return _.map(tagDocs, it => it.id);
};