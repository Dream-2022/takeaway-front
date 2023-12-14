import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

export const useOrderOneStore = defineStore('orderOne',()=>{
    const orderOne=ref({});
    //设置order的内容
    const setOrderOne=(Order)=>{
        orderOne.value=Order
        console.log(orderOne)
        console.log(orderOne.value)
    }
    return {
        orderOne,
        setOrderOne
    }
},{
    persist:true
})