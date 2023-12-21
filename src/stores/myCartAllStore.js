import {ref} from 'vue'
import {defineStore} from "pinia";
import { addCart, deleteCart } from'@/apis/cartApi.js'

export const useMyCartAllStore = defineStore('myCartAll',()=>{
    const myCartList=ref([])
    //通过userId获取全部的cart
    const getMyCartList=()=>{
        return myCartList.value
    }
    const addCartOne=async(cartIndex,index,cartX,minsNum)=>{//--------还有减到0的时候
        //加入购物车，如果存在对应的shopId和userId，就先删除再加入
        //找到myCartList中的对应商家，只要修改那一个商家的信息
        console.log(myCartList.value[cartIndex])
        console.log(myCartList.value[cartIndex].dishIdList)
        console.log(myCartList.value[cartIndex].dishIdList[index])
        if(myCartList.value[cartIndex].dishIdList.length==0){
            //移除这个cart
            myCartList.value.splice(cartIndex,1)
            const apiData1={
                shopId: cartX.shopId,
                userId: localStorage.getItem("id")
            }
            const res=await deleteCart(apiData1)
            console.log(res.data.data)
            return
        }
        console.log(myCartList.value[cartIndex].dishIdList[index].quantity)
        myCartList.value[cartIndex].dishIdList[index].quantity=myCartList.value[cartIndex].dishIdList[index].quantity+minsNum
        console.log(myCartList.value[cartIndex].dishIdList)
        const cartApi={
            userId: localStorage.getItem("id"),
            shopId: cartX.shopId,
            dishIdList: myCartList.value[cartIndex].dishIdList
        }
        console.log(cartApi)
        const apiData={
            shopId: cartX.shopId,
            userId: localStorage.getItem("id"),
            detailJson:JSON.stringify([cartApi])
        }
        console.log(apiData)
        const res=await addCart(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log("添加成功")
            }
    }
    //计算购物车总价，打包费总价，配送费
    return {
        myCartList,
        getMyCartList,
        addCartOne
    }
},{
    persist:true
})