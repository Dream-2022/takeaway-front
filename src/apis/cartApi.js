import http from '@/utils/http.js'
//通过userId查找他的全部购物车
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
//通过shopId和user_id删除购物车
export const deleteCart=(data)=>{
    return http({
        url: '/api/pre/cart/deleteCart',
        method: 'POST',
        data
    })
}
//通过userId删除他的全部购物车
export const deleteAllCartByUserId=(data)=>{
    return http({
        url: '/api/pre/cart/deleteAllCartByUserId',
        method: 'POST',
        data
    })
}