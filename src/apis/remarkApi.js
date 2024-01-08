import http from '@/utils/http.js'
//通过user和orderId找评论
export const selectRemarkByOrderIdAndUserId=(data)=>{
    return http({
        url: '/api/pre/remark/selectRemarkByOrderIdAndUserId',
        method: 'POST',
        data
    })
}
//插入一条评论
export const insertRemark=(data)=>{
    return http({
        url: '/api/pre/remark/insertRemark',
        method: 'POST',
        data
    })
}
//根据条件搜索用户的评论
export const selectRemarkByUserId=(data)=>{
    return http({
        url: '/api/pre/remark/selectRemarkByUserId',
        method: 'POST',
        data
    })
}
//根据条件查询商家的全部评论
export const selectRemarkAll=(data)=>{
    return http({
        url: '/api/pre/remark/selectRemarkAll',
        method: 'POST',
        data
    })
}
//上传图片
export const uploadRemarkImage=(data)=>{
    return http({
        url: '/api/pre/remark/upload_image',
        method: 'POST',
        data,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}