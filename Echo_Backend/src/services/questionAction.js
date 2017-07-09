import model from '../models';
import userAction from './userAction';

const Question = model.Question;

async function createQuestion(content, userId){
    // get db session & DAO
    const session = await model.getSession();
    const questionDao = session.getDao(Question);

    let userObj = await userAction.getUserObjById(userId);

    let isSuccessful = false;

    if ( userObj ){
        let newQuestion = new Question({
            content: content,
            author: userObj,
            createTime: Date.now()
        });
        await questionDao.create(newQuestion);
    }

    return new Promise( resolve => {
        resolve(isSuccessful);
    });
}

module.exports = {
    createQuestion
}