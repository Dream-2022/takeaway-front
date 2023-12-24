import http from '@/utils/http.js'

//通过条件（ID，nickname，gender）分页查询所有用户
export const selectByIdAndGenderAndNickname=(data)=>{
    return http({
        url: '/api/pre/use/selectByIdAndGenderAndNickname',
        method: 'POST',
        data
    })
}
//通过条件（ID）删除用户
export const deleteUserById=(data)=>{
    return http({
        url: '/api/pre/use/deleteUserById',
        method: 'POST',
        data
    })
}