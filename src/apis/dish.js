import http from '@/utils/http.js'
//通过shopId获取全部商品信息
export const dishDetailAll=(data)=>{
    return http({
        url: '/api/pre/dish/dishDetailAll',
        method: 'POST',
        data
    })
}
//通过分类，状态，关键词获取商品列表
export const selectDishByKeyword=(data)=>{
    return http({
        url: '/api/pre/dish/selectDishByKeyword',
        method: 'POST',
        data
    })
}
//获取所有营业类目信息
export const descriptionDetailAll=()=>{
    return http({
        url: '/api/pre/dish/descriptionDetailAll',
        method: 'GET'
    })
}
//商家添加菜品信息
export const insertDish=(data)=>{
    return http({
        url: '/api/pre/dish/insertDish',
        method: 'POST',
        data
    })
}
//通过dish_id查找商品信息
export const selectDishById=(data)=>{
    return http({
        url: '/api/pre/dish/selectDishById',
        method: 'POST',
        data
    })
}
