import http from '@/utils/http.js'
//通过shopId和User_id判断是否收藏商品
export const selectCartAll=(data)=>{
    return http({
        url: '/api/pre/cart/selectCartAll',
        method: 'POST',
        data
    })
}
//shopId和user_id，detailJson加入数据
export const addCart=(data)=>{
    return http({
        url: '/api/pre/cart/addCart',
        method: 'POST',
        data
    })
}