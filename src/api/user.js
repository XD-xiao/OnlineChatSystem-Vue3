import request from "@/utils/request.js";


export const userRegisterService = ({email,username,gender,VerificationCode,}) =>
    request.post('/api/user/register', {
        email,
        username,
        gender,
        VerificationCode,
    })

export const getVerificationCodeService = (email) =>
    request.post('/api/user/getVerificationCode', {
        email,
    })

export const userLoginService = ({email,VerificationCode}) =>
    request.post('/api/user/login', {
        email,
        VerificationCode,
    })


