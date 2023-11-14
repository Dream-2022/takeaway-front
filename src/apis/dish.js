import http from '@/utils/http.js'
//通过shopId获取全部商品信息
export const dishDetailAll=(data)=>{
    return http({
        url: '/api/pre/shop/dishDetailAll',
        method: 'POST',
        data
    })
}