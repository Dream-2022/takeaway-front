import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";
import { selectById, selectShopById } from '@/apis/shop.js'

export const useOrderOneStore = defineStore('orderOne',()=>{
    const orderOne=ref([]);
    let orderDownValue=ref(false)//商家页面的查看订单弹窗
    let dishesPrice=ref(0)
    let packsPrice=ref(0)
    let deliveryPrice=ref(0)
    let allPrice=ref(0)
    //设置order的内容
    const setOrderOne=(Order)=>{
        console.log(Order)
        orderOne.value.push(Order)
        console.log(orderOne)
        console.log(orderOne.value)
    }
    //打开弹窗
    const openDown=async(order)=>{
        console.log(order)
        orderOne.value=order
        orderDownValue.value=true
        console.log(orderOne.value.dishIdList)
        //找到所有的价格
        for(let i=0;i<orderOne.value.dishIdList.length;i++){
            console.log(orderOne.value.dishIdList[i])
            dishesPrice.value=dishesPrice.value+orderOne.value.dishIdList[i].price
            packsPrice.value=packsPrice.value+orderOne.value.dishIdList[i].pack
            
        }
        console.log(orderOne.value.shopId)
        //通过shopId找到shop，找到delivery
        const apiData={
            id: orderOne.value.shopId
        }
        const res=await selectShopById(apiData)
            console.log(res.data.data)
            deliveryPrice.value=res.data.data.delivery

        dishesPrice.value=dishesPrice.value.toFixed(2)
        packsPrice.value=packsPrice.value.toFixed(2)
        deliveryPrice.value=deliveryPrice.value.toFixed(2)
        allPrice.value=(Number)(dishesPrice.value)+(Number)(packsPrice.value)+(Number)(deliveryPrice.value)
        console.log(dishesPrice.value)
        console.log(packsPrice.value)
        console.log(deliveryPrice.value)
        console.log(allPrice.value)
        //找到正确的时间格式
        const inputDate = new Date(order.updateTime);

        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); //月份从0开始，需要加1，然后补零
        const day = String(inputDate.getDate()).padStart(2, '0');
        const hours = String(inputDate.getHours()).padStart(2, '0');
        const minutes = String(inputDate.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        console.log(formattedDate);
        orderOne.value.time=formattedDate
        console.log(orderOne.value)

    }
    return {
        orderOne,
        orderDownValue,
        dishesPrice,
        packsPrice,
        deliveryPrice,
        allPrice,
        setOrderOne,
        openDown
    }
},{
    persist:true
})