import Moniker from 'moniker';
import model from '../models';

const User = model.User;

async function isPhoneExists(phoneNum, userDao) {
  const user = await userDao.findOne({
    phoneNum,
  });
  const isUserExists = !!user;

  return new Promise((resolve) => {
    resolve(isUserExists);
  });
}

async function isUserExists(userId, userDao) {
  const user = await userDao.findOne({
    id: userId,
  });
  const isUserExists = !!user;

  return new Promise((resolve) => {
    resolve(isUserExists);
  });
}

async function updateUsername(userId, newUsername) {
    // get db session
  const session = await model.getSession();
  const userDao = session.getDao(User);

  const isSuccessful = await isUserExists(userId, userDao);

  if (isSuccessful) {
        // update user info
    const updatedInfo = {
      username: newUsername,
    };
    await updateUserInfo(userId, updatedInfo, userDao);
  }

  return new Promise((resolve) => {
    resolve(isSuccessful);
  });
}

async function createNewUser(phoneNum, email, username = null) {
    // get db session
  const session = await model.getSession();
  const userDao = session.getDao(User);

  const isUserExists = await isPhoneExists(phoneNum, userDao);
  console.log(phoneNum, email, username);
  let newUser = null;
  if (!isUserExists) {
    if (username == null) {
            // generate random username
      username = Moniker.choose();
    }

        // create new user
    newUser = new User({
      username,
      phoneNum,
      email,
      createDate: Date.now(),
    });
    // save new user
    await userDao.create(newUser);
  } else {
    await findUserByPhone(phoneNum).then(user => newUser = user);
  }
  console.log('kkkk', newUser);
  return new Promise((resolve) => {
    resolve(!isUserExists, newUser);
  });
}

async function updateUserInfo(userId, updatedInfo, userDao) {
  updatedInfo.modifyDate = Date.now();
  await userDao.update({
    id: userId,
  }, {
    $set: updatedInfo,
  });
}

const findUserByPhone = async (phoneNum) => {
  const session = await model.getSession();
  const userDao = session.getDao(User);
  const user = await userDao.findOne({
    phoneNum,
  });
  return new Promise((resolve) => {
    resolve(user);
  });
};

module.exports = {
  createNewUser,
  updateUsername,
  findUserByPhone,
};