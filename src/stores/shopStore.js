import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

export const useShopStore = defineStore('shop',()=>{
    let feedbackPopValue=ref(false)//举报的弹窗
    
    return {
        feedbackPopValue
    }
},{
    persist:true
})