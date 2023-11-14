import http from '@/utils/http.js'
//通过shopId获取全部商品信息
export const addressById=(data)=>{
    return http({
        url: '/api/pre/address/addressById',
        method: 'POST',
        data
    })
}
//用户插入地址信息
export const addressInsert=(data)=>{
    return http({
        url: '/api/pre/address/addressInsert',
        method: 'POST',
        data
    })
}
//用户删除地址信息
export const addressDelete=(data)=>{
    return http({
        url: '/api/pre/address/addressDelete',
        method: 'POST',
        data
    })
}
//用户设置默认地址信息
export const addressDefault=(data)=>{
    return http({
        url: '/api/pre/address/addressDefault',
        method: 'POST',
        data
    })
}

//用户修改地址信息
export const addressUpdate=(data)=>{
    return http({
        url: '/api/pre/address/addressUpdate',
        method: 'POST',
        data
    })
}
//查找所有省份
export const reDistrictProvinceAll=()=>{
    return http({
        url: '/api/pre/address/reDistrictProvinceAll',
        method: 'GET'
    })
}
//根据上一级districtId查找子一级的地区
export const reDistrictCity=(data)=>{
    return http({
        url: '/api/pre/address/reDistrictCity',
        method: 'POST',
        data
    })
}


