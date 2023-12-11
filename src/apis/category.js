import http from '@/utils/http.js'
//获取全部商品分类信息（渲染下拉框）
export const selectCategoryAll=(data)=>{
    return http({
        url: '/api/pre/category/selectCategoryAll',
        method: 'POST',
        data
    })
}
//根据商家id和搜索的内容查询分类
export const selectCategoryByShopIdAndContent=(data)=>{
    return http({
        url: '/api/pre/category/selectCategoryByShopIdAndContent',
        method: 'POST',
        data
    })
}
//新建分类名，要判断对应的商家有没有存在该分类名
export const insertCategory=(data)=>{
    return http({
        url: '/api/pre/category/insertCategory',
        method: 'POST',
        data
    })
}
//更新分类名，要判断对应的商家有没有存在该分类名
export const updateCategoryName=(data)=>{
    return http({
        url: '/api/pre/category/updateCategoryName',
        method: 'POST',
        data
    })
}