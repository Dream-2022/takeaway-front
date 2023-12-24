
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
//根据用户id和state查找订单
export const selectOrderByUserIdAndState=(data)=>{
    return http({
        url: '/api/pre/dishOrder/selectOrderByUserIdAndState',
        method: 'POST',
        data
    })
}
//管理员根据id，商家id，用户id，起始时间，电话，state查找订单
export const selectOrderByCondition=(data)=>{
    return http({
        url: '/api/pre/dishOrder/selectOrderByCondition',
        method: 'POST',
        data
    })
}
//管理员根据id更改state
export const updateOrderStateById=(data)=>{
    return http({
        url: '/api/pre/dishOrder/updateOrderStateById',
        method: 'POST',
        data
    })
}