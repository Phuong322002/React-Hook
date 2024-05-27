import { FETH_USER_LOGIN } from "../action/userLogin";
import { User_Log_Out } from "../action/userLogout";

const INITIAL_STATE = {
    account : {
        access_token: '',
        refresh_token:'',
        email:'',
        image: '',
        role:'',
        username:''
    },
    isAuthecated: false
}

const userReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case FETH_USER_LOGIN:
            console.log('>> check action user', action)
            state = {
                ...state,
                account:{
                    access_token: action.payload.DT.access_token,
                    refresh_token: action.payload.DT.refresh_token,
                    email: action.payload.DT.email,
                    image: action.payload.DT.image,
                    role: action.payload.DT.role,
                    username: action.payload.DT.username
                },
                isAuthecated: true
            }
            console.log('check state: ',state)
            return state;
        
            case User_Log_Out:
                console.log('check action logout', action)
                state = {
                    ...state,
                    account : {
                        access_token: '',
                        refresh_token:'',
                        email:'',
                        image: '',
                        role:'',
                        username:''
                    },
                    isAuthecated: false
                }
                return state
        default: return state
    }
}

export default userReducer;