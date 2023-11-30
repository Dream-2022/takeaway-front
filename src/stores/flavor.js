import {ref} from 'vue'
import {loginAPI,getUserInfoAPI} from "@/apis/login.js";
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

export const flavorStore = defineStore('flavor',()=>{
    const flavor=ref({});

    //除了
    const getUser=async (id,password)=>{
        const res = await loginAPI(id,password)

        if(res.data.code===1)
        {
            flavor.value=res.data.data
            return {success:1}
        }
        else
        {
            return {success:0,message:res.data.msg}
        }
    }

    const getUserById=async (id)=>{
        const res=await getUserInfoAPI(id);

        if(res.data.code===1)
        {
            flavor.value=res.data.data;
            return {success:1}
        }
        else
        {
            return {success:0,message:res.data.msg}
        }
    }

    const clearFlavor=()=>{
        flavor.value={}
    }

    return {
        flavor,
        getUser,
        getUserById,
        clearFlavor
    }
},{
    persist:true
})