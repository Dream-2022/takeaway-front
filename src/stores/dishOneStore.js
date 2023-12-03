import {ref} from 'vue'
import {defineStore} from "pinia";
import { ElMessage } from 'element-plus';
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
        setDishOne,
        getSelectDishOne
        
    }
},{
    persist:true
})