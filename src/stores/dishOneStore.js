import {ref} from 'vue'
import {defineStore} from "pinia";
import { ElMessage } from 'element-plus';
import {selectDishById} from '@/apis/dish.js'

export const useDishOneStore = defineStore('dishOne',()=>{
    const dish=ref(
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
    )
    const obtainDishOne=async(dishId)=>{
        console.log(dishId)
        const apiData={
            dishId:dishId
        }
        const res=await selectDishById(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log(res.data)
                dish.value=res.data.data
            }
    }
    const setDishOne=(dishOne)=>{
        console.log(dishOne)
        dish.value=dishOne
        console.log(dish)
    }
    //获取单独的dish
    const getSelectDishOne=()=>{
        console.log(dish)
        console.log(dish.value)
        return dish.value
    }
    
    return {
        dish,
        obtainDishOne,
        setDishOne,
        getSelectDishOne
        
    }
},{
    persist:true
})