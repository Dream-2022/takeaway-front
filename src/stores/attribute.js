import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";

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
                        flavorName:"默认口味2",
                        price: 2
                    },
                    {
                        flavorName:"默认口味2",
                        price: 2
                    }
                ]
            },
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
          ]
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
    //   //修改一个口味
    //   const editFlavorOne=(att,fla,flavorName,price)=>{
        
    //     att.flavorList.push({
    //         flavorName: flavorName,
    //         price: price
    //     });
    //     att.flavorList = att.flavorList.filter(flavor => {  
    //         return flavor != fla;  
    //     });
    //   }
      //获取属性数组
      const getAttributeList=()=>{
        return attributeList.value
      }
    
    const clearAttribute=()=>{
        attributeList.value={}
    }

    return {
        attributeList,
        initialization,
        deleteAttributeOne,
        modifyAttributeOne,
        addFlavorOne,
        deleteFlavorOne,
        getAttributeList,
        clearAttribute
    }
},{
    persist:true
})