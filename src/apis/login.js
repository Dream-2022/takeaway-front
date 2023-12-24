import http from '@/utils/http.js'
//登录
export const changeUserInfo=(data)=>{
    return http({
        url: '/api/login',
        method: 'POST',
        data
    })
}
//获取验证码
export const obtainCodeInfo=(data)=>{
    return http({
        url: '/api/obtainCode',
        method: 'POST',
        data
    })
}
//找回密码
export const modifyPassword=(data)=>{
    return http({
        url: '/api/modifyPassword',
        method: 'PUT',
        data
    })
}
//注册
export const registerUser=(data)=>{
    return http({
        url: '/api/register',
        method: 'POST',
        data
    })
}