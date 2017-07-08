import model from '../models'
import Moniker from 'moniker'

const User = model.User

async function isPhoneExists(phoneNum, userDao){
    let user = await userDao.findOne({
        phoneNum: phoneNum
    })
    var isUserExists = (user != null)

    return new Promise(resolve => {
        resolve(isUserExists);
    });
}

async function isUserExists(userId, userDao){
    let user = await userDao.findOne({
        id: userId
    })
    var isUserExists = (user != null)

    return new Promise(resolve => {
        resolve(isUserExists);
    });
}

async function updateUsername(userId, newUsername){
    //get db session
    const session = await model.getSession()
    const userDao = session.getDao(User);

    let isSuccessful = await isUserExists(userId, userDao);
    
    if ( isSuccessful ){
        //update user info
        let updatedInfo = {
            username: newUsername
        }
        await updateUserInfo(userId, updatedInfo, userDao);
    }
    
    return new Promise(resolve => {
        resolve(isSuccessful);
    });
}

async function createNewUser(phoneNum, email, username=null){
    //get db session
    const session = await model.getSession()
    const userDao = session.getDao(User);

    var isUserExists = await isPhoneExists(phoneNum, userDao)
    
    if ( !isUserExists ){
        if( username == null ){
            // generate random username
            username = Moniker.choose();
        }

        //create new user
        let newUser = new User({
            username:username,
            phoneNum:phoneNum,
            email:email,
            createDate:Date.now()
        });

        //save new user
        await userDao.create(newUser);
    }
    
    return new Promise(resolve => {
        resolve(!isUserExists);
    })
}

async function updateUserInfo(userId, updatedInfo, userDao){
    updatedInfo['modifyDate'] = Date.now()
    await userDao.update({
        id:userId
    },{
        $set: updatedInfo
    });
}

module.exports = {
    createNewUser,
    updateUsername
}