
export const FETH_USER_LOGIN = 'FETH_USER_LOGIN';

export const userLogin = (data) => {
    return {
        type: FETH_USER_LOGIN,
        payload:  data
    }
}