import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";
import {selectCategoryAll} from '@/apis/category.js'

export const useCategoryStore = defineStore('category',()=>{
    const categoryList=ref([
        {
            id: 1,
            categoryName: ""
        }
      ]);
    //通过shopId从数据库获取分类列表
    const obtainCategoryList=async(shopId)=>{
        const apiData={
            shopId:shopId
        }
        const res=await selectCategoryAll(apiData)
        console.log(res.data.data)
        if(res.data.code==0){
            console.log(res.data)
            if(res.data.code==0){
                categoryList.value=res.data.data
            }
            else{
                ElMessage.error(res.data.message)
            }
        }
    }
    //获取属性数组
    const getCategoryList=()=>{
        return categoryList.value
    }
    
    return {
        categoryList,
        obtainCategoryList,
        getCategoryList
    }
},{
    persist:true
})