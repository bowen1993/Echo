import Moniker from 'moniker';
import model from '../models';

const User = model.User;

async function isPhoneExists(phoneNum, userDao) {
  const user = await userDao.findOne({
    phoneNum,
  });

  return !!user;
}

async function isUserExists(userId, userDao) {
  const user = await userDao.findOne({
    id: userId,
  });

  return new Promise((resolve) => {
    resolve(!!user);
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
    newUser = await findUserByPhone(phoneNum);
  }
  // newUser = await Object.assign({}, newUser, { isUserExists });
  // await console.log('1234', newUser, isUserExists);
  return new Promise((resolve) => {
    let result = null;
    if (newUser) {
      result = newUser.$extract({ recursive: true });
    }
    resolve(result);
  });
}

const findUserById = async (userId) => {
  const session = await model.getSession();
  const userDao = session.getDao(User);

  const user = await userDao.findOne({
    id: userId,
  });

  return new Promise((resolve) => {
    resolve(user.$extract({ recursive: true }));
  });
};

async function updateUserInfo(userId, updatedInfo) {
  const session = await model.getSession();
  const userDao = session.getDao(User);

  updatedInfo.modifyDate = Date.now();
  console.log(updatedInfo, userId);
  await userDao.update({
    id: userId,
  }, {
    $set: updatedInfo,
  }, {
    multi: true,
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


async function getUserObjById(userId) {
    // get db session & user DAO
  const session = await model.getSession();
  const userDao = session.getDao(User);

  const userObj = userDao.findOne({
    id: userId,
  });

  return new Promise((resolve) => {
    resolve(userObj);
  });
}


module.exports = {
  createNewUser,
  updateUsername,
  findUserByPhone,
  updateUserInfo,
  findUserById,
  getUserObjById,
};
