
import http from '@/utils/http.js'
//插入一个订单
export const addDishOrderOne=(data)=>{
    return http({
        url: '/api/pre/dishOrder/addDishOrderOne',
        method: 'POST',
        data
    })
}
//查询一个订单根据orderId
export const selectDishOrderById=(data)=>{
    return http({
        url: '/api/pre/dishOrder/selectDishOrderById',
        method: 'POST',
        data
    })
}
//根据商家id取消订单，支付成功
export const updateDishOrderCancel=(data)=>{
    return http({
        url: '/api/pre/dishOrder/updateDishOrderCancel',
        method: 'POST',
        data
    })
}
//根据商家id和pageNum查找订单
export const selectDishOrderByShpIdAndPageNum=(data)=>{
    return http({
        url: '/api/pre/dishOrder/selectDishOrderByShpIdAndPageNum',
        method: 'POST',
        data
    })
}