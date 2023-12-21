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
    let openAddCategoryDown=ref(false)//打开新增分类弹窗
    const setAddCategoryDown=(downValue)=>{
        openAddCategoryDown.value=downValue
    }
    //通过shopId从数据库获取分类列表
    const obtainCategoryList=async(shopId,categoryContent)=>{
        const apiData={
            shopId:shopId,
            categoryContent:categoryContent
        }
        console.log(apiData)
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
        openAddCategoryDown,
        setAddCategoryDown,
        obtainCategoryList,
        getCategoryList
    }
},{
    persist:true
})