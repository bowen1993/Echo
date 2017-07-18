import model from '../models';
import userAction from './userAction';

const Question = model.Question;
const Answer = model.Answer;

async function createQuestion(content, userId, detail=None){
    // get db session & DAO
    const session = await model.getSession();
    const questionDao = session.getDao(Question);

    let userObj = await userAction.getUserObjById(userId);

    let isSuccessful = false;

    if ( userObj ){
        let newQuestion = new Question({
            content: content,
            detail:detail,
            author: userObj,
            createTime: Date.now()
        });
        await questionDao.create(newQuestion);
    }

    return new Promise( resolve => {
        resolve(isSuccessful);
    });
}

async function getQuestionObjectbyId(questionId){
    const session = model.getSession();
    const questionDao = session.getDao(Question);

    let questionObject = questionDao.findOne({
        id:questionId
    });

    return new Promise( resolve => {
        resolve(questionObject);
    });
}

async function getQuestionInfo(questionId){
    let questionObject = await getQuestionObjectbyId(questionId)

    let questionInfo = null;

    if ( questionObject ){
        questionInfo = await questionObject.$extract({recursive:true});
    }

    return new Promise( questionInfo => {
        resolve(questionInfo)
    });
}


module.exports = {
    createQuestion,
    getQuestionObjectbyId,
    getQuestionInfo
}