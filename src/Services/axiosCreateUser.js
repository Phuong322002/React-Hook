import instance from "../utils/AxiosCustomize";

const AxiosCreateUser = (email, password, username, role, avatar) => {
    //truyền nhũng trường data xuất hiện bên phía server
    // Khi viết file để gọi API trong thư mục services thì ta sẽ gọi method ở phía và ta truyền những data xuất hiện ở phía server vào biến data để truyền lên server
    // đây là những data để chuẩn bị cho API
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', avatar);
    
    // return ra cục data và phía FE sẽ nhận được cục data này thông qua await hàm này
    // method post này dùng form data thì chuyền dữ liệu kiểu này
    return instance.post('api/v1/participant', data);
}

//gọi API
const getUser = () => {
    return instance.get('api/v1/participant/all')
}

const PutUpdateUser = (id, username, role, avatar) => {
    //truyền nhũng trường data xuất hiện bên phía server
    // Khi viết file để gọi API trong thư mục services thì ta sẽ gọi method ở phía và ta truyền những data xuất hiện ở phía server vào biến data để truyền lên server
    // đây là những data để chuẩn bị cho API
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', avatar);
    
    // return ra cục data và phía FE sẽ nhận được cục data này thông qua await hàm này
    return instance.put('api/v1/participant', data);
}

const DeleteUser = (userId) => {
    //delete không có paramater
    return instance.delete('api/v1/participant', {data : {id : userId}})
}

const PaginateTable = (page, limit) => {
    return instance.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const Login  = (userEmail, userPassword,delay) => {
    // method post này dùng kiểu x-www-form-urlencoded
    return instance.post('api/v1/login', {email: userEmail, password: userPassword, delay:500})
}

const Register = (email, username, password) => {
    return instance.post('api/v1/register', {email, username, password})
}

const getListQuiz = () => {
    return instance.get('api/v1/quiz-by-participant')
}

const getDetailQuiz = (quizId) => {

    return instance.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}

const SubmitAnswer = (data) => {
    return instance.post('api/v1/quiz-submit', {...data})
}

const CreateQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return instance.post('api/v1/quiz', data)
}

const getDataQuiz = () => {
    return instance.get('api/v1/quiz/all')
}

const deleteQuiz = (idQuiz) => {
    return instance.delete(`api/v1/quiz/${idQuiz}`)
}

const updateQuiz = (idQuizUpdate, descriptionQuizUpdate,  nameUpdate, difficultyUpdate, quizImageUpdate) => {

    const data = new FormData();
    data.append('id', idQuizUpdate);
    data.append('description', descriptionQuizUpdate);
    data.append('name', nameUpdate);
    data.append('difficulty', difficultyUpdate);
    data.append('quizImage', quizImageUpdate)

    return instance.put('api/v1/quiz', data)
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {

    const data = new FormData();
    data.append('quiz_id',quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return instance.post('api/v1/question', data);
}


const postCreateNewAnswerForQuiz = (description, correct_answer, question_id) => {

    return instance.post('api/v1/answer', {
        description: description,
        correct_answer: correct_answer,
        question_id: question_id
    })

}

const postAssignQuizToUser = (quizId, userId) => {
    return instance.post('api/v1/quiz-assign-to-user', {quizId, userId})
}

const getQuestionAnswer = (quizId) => {

    return instance.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQuizWithQA = (data) => {
    //data raw chứa mảng và obj trong 1 obj lớn thì truyền theo kiểu này
    return instance.post('api/v1/quiz-upsert-qa', {...data})
}

const LogoutUser = (email, refresh_token ) => {
    return instance.post('api/v1/logout', {email, refresh_token} )
}

const getOverview = () => {
    return instance.get('api/v1/overview')
}

export {
    AxiosCreateUser,
    getUser,
    PutUpdateUser,
    DeleteUser,
    PaginateTable,
    Login,
    Register,
    getListQuiz,
    getDetailQuiz,
    SubmitAnswer,
    CreateQuiz,
    getDataQuiz,
    deleteQuiz,
    updateQuiz,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuiz,
    postAssignQuizToUser,
    getQuestionAnswer,
    postUpsertQuizWithQA,
    LogoutUser,
    getOverview
}