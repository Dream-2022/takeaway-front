import {ref} from 'vue'
import {defineStore} from "pinia";
import { ElMessage } from 'element-plus';
import {dishDetailAll,selectDishById} from '@/apis/dish.js'

export const useDishStore = defineStore('dish',()=>{
    const dishList=ref([
        {
            id:1,
            dishName:"",
            category_id:"",
            picture:"",
            price:"",
            number:"",
            saleStale:"",
            sale:"",
            detail:"",
            pack:"",
            weight:"",
            material:""
        }
      ]);
    let openSelectDishDown=ref(false)
    //修改openSelectDishDown值
    const modifySelectDishDown=(value)=>{
        openSelectDishDown.value=value
    }
    //获取openSelectDishDown值
    const getSelectDishDown=()=>{
        return openSelectDishDown.value
    }
    //获取属性数组
    const getDishList=()=>{
        return dishList.value
    }
    //从数据库得到数据
    const obtainDishList=async(shopId)=>{
        const apiData={
            shopId: shopId
        }
        const res=await dishDetailAll(apiData)
        console.log(res.data.data)
        if(res.data.code==0){
            console.log(res.data)
            if(res.data.code==0){
                dishList.value=res.data.data
            }
            else{
                ElMessage.error(res.data.message)
            }
        }
    }
    const getDishOne=(dishId)=>{
        for(let i=0;i<dishList.value.length;i++){
            if(dishList.value[i].id==dishId){
                return dishList.value[i]
            }
        }
        return dishOne.value
    }
    //清空
    const clearAttribute=()=>{
        dishList.value={}
    }

    return {
        dishList,
        openSelectDishDown,
        modifySelectDishDown,
        getSelectDishDown,
        getDishList,
        getDishOne,
        obtainDishList,
        clearAttribute
    }
},{
    persist:true
})