import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

export const useOrderOneStore = defineStore('orderOne',()=>{
    const orderOne=ref([]);
    let orderDownValue=ref(false)//商家页面的查看订单弹窗
    //设置order的内容
    const setOrderOne=(Order)=>{
        console.log(Order)
        orderOne.value.push(Order)
        console.log(orderOne)
        console.log(orderOne.value)
    }
    return {
        orderOne,
        orderDownValue,
        setOrderOne
    }
},{
    persist:true
})