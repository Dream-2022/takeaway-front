import http from '@/utils/http.js'
//获取全部商家信息
export const detailAll=()=>{
    return http({
        url: '/api/pre/shop/detailAll',
        method: 'GET'
    })
}
//通过shopId获取商家信息
export const selectById=(data)=>{
    return http({
        url: '/api/pre/shop/selectById',
        method: 'POST',
        data
    })
}
//根据关键词查找商家
export const selectShopKeywords=(data)=>{
    return http({
        url: '/api/pre/shop/selectShopKeywords',
        method: 'POST',
        data
    })
}
//保存用户新建的商家信息
export const insertShop=(data)=>{
    return http({
        url: '/api/pre/shop/insertShop',
        method: 'POST',
        data
    })
}
//判断用户是否为商家
export const selectShopMerchant=(data)=>{
    return http({
        url: '/api/pre/shop/selectShopMerchant',
        method: 'POST',
        data
    })
}
//根据用户id查找商家信息
export const selectShopByUserId=(data)=>{
    return http({
        url: '/api/pre/shop/selectShopByUserId',
        method: 'POST',
        data
    })
}
//上传图片
export const uploadShopImage=(data)=>{
    return http({
        url: '/api/pre/shop/upload_image',
        method: 'POST',
        data,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}