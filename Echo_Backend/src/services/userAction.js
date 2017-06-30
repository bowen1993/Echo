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
    })
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
            email:email
        });

        //save new user
        await userDao.create(newUser);
    }
    
    return new Promise(resolve => {
        resolve(!isUserExists);
    })
}

async function updateUserInfo(userId, updatedInfo){
    //get db session
    const session = await model.getSession()
    const userDao = session.getDao(User);

    await userDao.update({
        id:userId
    },{
        $set: updatedInfo
    });
}

module.exports = {
    createNewUser
}