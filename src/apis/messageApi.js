import http from '@/utils/http.js'
//从数据库获取是否有userId的聊天记录
export const selectMessageByUserId=(data)=>{
    return http({
        url: '/api/pre/message/selectMessageByUserId',
        method: 'POST',
        data
    })
}
//从数据库获取是否有两个user的聊天记录
export const selectMessageByTwoUserId=(data)=>{
    return http({
        url: '/api/pre/message/selectMessageByTwoUserId',
        method: 'POST',
        data
    })
}
// export const selectRemarkByOrderIdAndUserId=(data,userId)=>{
//     return http({
//         url: `/api/pre/websocket/${userId}`,
//         method: 'POST',
//         data
//     })
// }