import {ref} from 'vue'
import {defineStore} from "pinia";

export const useMyCartAllStore = defineStore('myCartAll',()=>{
    const myCartList=ref([])
    //通过userId获取全部的cart
    const getMyCartList=()=>{
        return myCartList.value
    }

    return {
        myCartList,
        getMyCartList
        
    }
},{
    persist:true
})