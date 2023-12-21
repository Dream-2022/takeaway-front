import {ref} from 'vue'
import {defineStore} from "pinia";
import { selectById } from '@/apis/shop.js'

export const useMySelectCartStore = defineStore('mySelectCartStore',()=>{
    const mySelectCart=ref([])
    
    //计算购物车总价，打包费总价，配送费
    let mySelectPack=ref(0)
    let mySelectPrice=ref(0)
    let mySelectDelivery=ref(0)

    const getMyCartAllPrice=async()=>{
        console.log(mySelectCart)
        console.log(mySelectCart.value)
        console.log(mySelectCart.value[0].dishIdList.length)

        //将价格全部清零
        mySelectPack.value=0
        mySelectPrice.value=0
        mySelectDelivery.value=0
        for(let i=0;i<mySelectCart.value.length;i++){
            console.log(mySelectCart.value[i].shopId)
            //通过shopId找到对应的shop信息，获取他的delivery值
            const apiData={
                shopId: mySelectCart.value[i].shopId
            }
            const res=await selectById(apiData)
                console.log(res.data.data)
                console.log(res.data.data.delivery)
                mySelectCart.value[i].delivery=res.data.data.delivery
                mySelectDelivery.value=mySelectDelivery.value+res.data.data.delivery
            for(let j=0;j<mySelectCart.value[i].dishIdList.length;j++){
                const dish=mySelectCart.value[i].dishIdList[j]
                console.log(dish)
                mySelectPack.value=mySelectPack.value+dish.pack*(dish.quantity)
                mySelectPrice.value=mySelectPrice.value+(dish.price)*(dish.quantity)
            }
        }
        mySelectPack.value=(Number)((mySelectPack.value).toFixed(2))
        mySelectDelivery.value=(Number)((mySelectDelivery.value).toFixed(2))
        mySelectPrice.value=(Number)((mySelectPrice.value+(mySelectPack.value)).toFixed(2))
        console.log(mySelectPack.value)
        console.log(mySelectPrice.value)
        console.log(mySelectDelivery.value)
    }

    return {
        mySelectCart,
        mySelectPack,
        mySelectPrice,
        mySelectDelivery,
        getMyCartAllPrice
    }
},{
    persist:true
})