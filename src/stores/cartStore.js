import { ref } from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";
import {selectCartAll, addCart} from'@/apis/cartApi.js'

//selectCartAll
export const useCartStore = defineStore('cart',()=>{
    const cartList=ref([]);
    //登录之后获取到他的所有购物车
    const initializationCartAll=async()=>{
        const apiData={
            userId: localStorage.getItem("id")
        }
        const res=await selectCartAll(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log("获取成功")
                console.log(res.data.data[0].userId)
                console.log(res.data.data[0].detailJson)
                cartList.value=JSON.parse(res.data.data[0].detailJson)
                console.log(cartList.value)
                for(let i=0;i<cartList.value.length;i++){
                    console.log(cartList.value[i])
                }
            }
    }
    //加入一个购物车
    const addCartOne=async(cartOne)=>{
        console.log(cartOne)
        console.log(cartOne.length)
        //先删除，看是否存在该userId和shopId对应的购物车了
        console.log(cartOne.userId)
        console.log(cartOne.shopId)
        console.log(cartList)
        console.log(cartList.value)
        console.log(cartList.value.length)
        let index=-1
        for(let i=0;i<cartList.value.length;i++){
            console.log(cartOne.userId)
            console.log(cartOne.shopId)
            // console.log(i)
            console.log(cartList.value[i])
           console.log(cartList.value[i].shopId)
           console.log(cartList.value[i].shopId)
            console.log(cartList.userId==cartOne.userId&&cartList.shopId==cartOne.shopId)
            if(cartList.value[i].userId==cartOne.userId&&cartList.value[i].shopId==cartOne.shopId){
                console.log("重复了")
                index = i;  // 记录下它的索引  
                break;  // 然后跳出循环  
            }
        }
        if (index !== -1) {  
            cartList.value.splice(index, 1);  
        }
        //再添加
        console.log(cartOne)
        cartList.value.push(cartOne)
        console.log(cartList)
        console.log(cartList.value)
        console.log(JSON.stringify(cartList.value))


        //加入购物车，如果存在对应的shopId和userId，就先删除再加入
        const apiData={
            shopId: cartOne.shopId,
            userId: localStorage.getItem("id"),
            detailJson:JSON.stringify(cartList.value)
        }
        const res=await addCart(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log("添加成功")
            }
    }
    //删除一个购物车
    const deleteCartOne=()=>{

    }
    //清空
    const cleanCartOne=()=>{
        cartOne.value={}
    }


    return {
        cartList,
        initializationCartAll,
        addCartOne,
        deleteCartOne,
        cleanCartOne
    }
},{
    persist:true
})