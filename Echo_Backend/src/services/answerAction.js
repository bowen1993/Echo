import model from '../models';
import userAction from './userAction';
import questionAction from './questionAction'

const Question = model.Question;
const Answer = model.Answer;

async function addAnswer2Question(content, questionId, userId){
    const session = await model.getSession();
    const answerDao = session.getDao(Answer);

    // get user and question object
    let userObj = await userAction.getUserObjById(userId);
    let questionObj = await questionAction.getQuestionObjectbyId(questionId);

    let isSuccessful = false;

    if ( userObj && questionObj ){

        // create new answer
        let newAnswer = new Answer({
            content: content,
            author: userObj,
            createTime: Date.now(),
            lastModifyTime: Date.now()
        });
        await answerDao.create(newAnswer);

        //add answer to question
        questionDao.update({
            id: questionId
        },{
            $push: {
                answers: newAnswer
            }
        });

        isSuccessful = true;
    }

    return new Promise( resolve => {
        resolve(isSuccessful);
    });
}

async function getAnswerObjectById(answerId){
    const session = await model.getSession();
    const answerDao = session.getDao();

    let answerObject = answerDao.findOne({
        id: answerId
    });

    return new Promise(resolve => {
        resolve(answerObject);
    });
}

async function getAnswerInfo(answerId){
    let answerObj = await getAnswerObjectById(answerId);
    let answerInfo = null;
    if ( answerObj ){
        answerInfo = await answerObj.$extract({recursive:true});
    }

    return new Promise(resolve => {
        resolve(answerInfo);
    });
}

module.exports = {
    addAnswer2Question,
    getAnswerObjectById,
    getAnswerInfo
}