import model from '../models';
import userAction from './userAction';

const Question = model.Question;
const Answer = model.Answer;

async function createQuestion(content, userId, detail=null){
    // get db session & DAO
    const session = await model.getSession();
    const questionDao = session.getDao(Question);
    const userObj = await userAction.getUserObjById(userId);
    var isSuccessful = false;
    if ( userObj ){
        console.log('create question', content, userObj.id)
        let newQuestion = new Question({
            content: content,
            author: userObj.id,
            createTime: Date.now()
        });
        if ( detail ){
            newQuestion.detail = detail;
        }
        console.log('save')
        await questionDao.create(newQuestion);
        isSuccessful = true;
    }

    return new Promise( resolve => {
        resolve(isSuccessful);
    });
}

async function getQuestionObjectbyId(questionId){
    const session = await model.getSession();
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