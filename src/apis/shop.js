import http from '@/utils/http.js'
//通过shopId获取商家信息
export const selectById=(data)=>{
    return http({
        url: '/api/shop/selectById',
        method: 'POST',
        data
    })
}