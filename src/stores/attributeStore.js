import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";
import {selectDishAttributeByDishId} from '@/apis/attributeApi.js'

export const useAttributeStore = defineStore('attribute',()=>{
    const attributeList=ref([
        {
            attributeName: "默认属性",
            checked: 0,
            flavorList:[
                {
                    flavorName:"默认口味1",
                    price: 2
                }
            ]
        }
      ]);
      //点击弹窗时，初始化属性数组
      const initialization=()=>{
        attributeList.value=[{
                attributeName: "默认属性",
                checked: 0,
                flavorList:[
                    {
                        flavorName:"默认口味1",
                        price: 2
                    },
                    {
                        flavorName:"默认口味2",
                        price: 2
                    }
                ]
            }
          ]
      }
      //添加一个属性
      const addAttributeOne=(FlavorContent,radioCheckboxValue)=>{
        const attributeOne=({
            attributeName: FlavorContent,
            checked: radioCheckboxValue,
            flavorList:[
                {
                    flavorName:"默认口味",
                    price: 2
                }
            ]
        })
        console.log(attributeList.value)
        
        attributeList.value.push(attributeOne)
      }
      //删除一个属性
      const deleteAttributeOne=(att)=>{
        const newAttribute = attributeList.value.filter(item => item !== att);  
        attributeList.value = newAttribute;  
      }
      //修改一个属性
      const modifyAttributeOne=(att,attributeName,checked)=>{
        att.attributeName=attributeName
        att.checked=checked
      }
      //添加一个口味
      const addFlavorOne=(att,flavorName,flavorPrice)=>{
        att.flavorList.push({
            flavorName: flavorName,
            price: flavorPrice
        });
      }
      //删除一个口味
      const deleteFlavorOne=(att,fla)=>{
        console.log(att)
        att.flavorList = att.flavorList.filter(flavor => {  
            return flavor !== fla;  
        });
      }
      //根据dishId从数据库找到对应的口味
      const obtainAttributeList=async(dishId)=>{
        const apiData={
            dishId: dishId
        }
        const res=await selectDishAttributeByDishId(apiData)
        console.log(res.data.data)
        if(res.data.code==0){
            console.log(res.data)
            if(res.data.code==0){
                attributeList.value=res.data.data
                console.log(attributeList)
                console.log(attributeList.value)
            }                                                                         
            else{
                ElMessage.error(res.data.message)
            }
        }
      }
      //获取属性数组
      const getAttributeList=()=>{
        return attributeList
      }
    
    const clearAttribute=()=>{
        attributeList.value={}
    }

    return {
        attributeList,
        initialization,
        addAttributeOne,
        deleteAttributeOne,
        modifyAttributeOne,
        addFlavorOne,
        deleteFlavorOne,
        getAttributeList,
        obtainAttributeList,
        clearAttribute
    }
},{
    persist:true
})