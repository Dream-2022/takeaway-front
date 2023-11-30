import http from '@/utils/http.js'
//通过shopId和User_id判断是否收藏商品
export const selectCollectByUserIdShopId=(data)=>{
    return http({
        url: '/api/pre/collect/selectCollectByUserIdShopId',
        method: 'POST',
        data
    })
}
//收藏
export const insertCollect=(data)=>{
    return http({
        url: '/api/pre/collect/insertCollect',
        method: 'POST',
        data
    })
}
export const deleteCollect=(data)=>{
    return http({
        url: '/api/pre/collect/deleteCollect',
        method: 'POST',
        data
    })
}