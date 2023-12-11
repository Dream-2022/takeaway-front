import http from '@/utils/http.js'
//通过shopId获取全部商品信息
export const selectDishAttributeByDishId=(data)=>{
    return http({
        url: '/api/pre/dishAttribute/selectDishAttributeByDishId',
        method: 'POST',
        data
    })
}
//添加一个属性
export const insertAttributeOne=(data)=>{
    return http({
        url: '/api/pre/dishAttribute/insertAttributeOne',
        method: 'POST',
        data
    })
}