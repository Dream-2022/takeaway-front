import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

export const useOrderStore = defineStore('order',()=>{
    const orderList=ref([]);
    
    return {
        orderList
    }
},{
    persist:true
})