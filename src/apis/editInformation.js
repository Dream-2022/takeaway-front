import http from '@/utils/http.js'
//修改昵称
export const editNickname=(data)=>{
    return http({
        url: '/api/pre/editInformation/nickname',
        method: 'POST',
        data
    })
}
//修改性别
export const editGender=(data)=>{
    return http({
        url: '/api/pre/editInformation/gender',
        method: 'POST',
        data
    })
}
//修改简介
export const editProfile=(data)=>{
    return http({
        url: '/api/pre/editInformation/profile',
        method: 'POST',
        data
    })
}
//修改生日
export const editBirth=(data)=>{
    return http({
        url: '/api/pre/editInformation/birth',
        method: 'POST',
        data
    })
}
//修改头像
export const uploadImage=(data)=>{
    return http({
        url: '/api/pre/editInformation/upload_image',
        method: 'POST',
        data,
        headers:{
            "Content-Type": "multipart/form-data"
        }

    })
}