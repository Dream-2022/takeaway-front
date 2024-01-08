import http from '@/utils/http.js'
//通过user和orderId找举报信息
export const selectReportByOrderIdAndUserId=(data)=>{
    return http({
        url: '/api/pre/remark/selectRemarkByOrderIdAndUserId',
        method: 'POST',
        data
    })
}
//插入一条举报信息
export const insertReport=(data)=>{
    return http({
        url: '/api/pre/remark/insertReport',
        method: 'POST',
        data
    })
}
//从数据库获取对应状态的举报
export const selectReportByState=(data)=>{
    return http({
        url: '/api/pre/remark/selectReportByState',
        method: 'POST',
        data
    })
}
//点击通过举报，商家状态改为5（管理员停售），举报状态改为审核成功（state
export const updateByState=(data)=>{
    return http({
        url: '/api/pre/remark/updateByState',
        method: 'POST',
        data
    })
}