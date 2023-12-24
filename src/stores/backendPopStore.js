import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

export const useBackendPopStore = defineStore('backendPop',()=>{
    let userPopValue=ref(false)//查看用户弹窗
    let shopPopValue=ref(false)//查看商家弹窗
    let dishPopValue=ref(false)//查看菜品弹窗
    let orderPopValue=ref(false)//查看订单弹窗
    let reportPopValue=ref(false)//查看举报弹窗
    const objectValue=ref([])
    return {
        userPopValue,
        shopPopValue,
        dishPopValue,
        orderPopValue,
        reportPopValue,
        objectValue
    }
},{
    persist:true
})