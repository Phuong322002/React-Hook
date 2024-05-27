export const User_Log_Out = 'User_Log_out'

export const actionUserLogOut = (data) => {
    return {
        type: User_Log_Out,
        payload: data
    }
}