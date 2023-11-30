import http from '@/utils/http.js'
//获取全部商品分类信息（渲染下拉框）
export const selectCategoryAll=(data)=>{
    return http({
        url: '/api/pre/category/selectCategoryAll',
        method: 'POST',
        data
    })
}