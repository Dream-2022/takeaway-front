import http from '@/utils/http.js'
//通过dishId和User_id判断是否收藏商品
export const selectCollectDishByIdAndDishId=(data)=>{
    return http({
        url: '/api/pre/collectDish/selectCollectDishByIdAndDishId',
        method: 'POST',
        data
    })
}
//通过dishId和User_id收藏商品
export const addDishCollect=(data)=>{
    return http({
        url: '/api/pre/collectDish/addDishCollect',
        method: 'POST',
        data
    })
}
//通过dishId和User_id取消收藏商品
export const deleteDishCollect=(data)=>{
    return http({
        url: '/api/pre/collectDish/deleteDishCollect',
        method: 'POST',
        data
    })
}