import { ref,toRaw } from 'vue'
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";
import {useCartStore} from'@/stores/cartStore.js'
export const useCartOneStore = defineStore('cartOne',()=>{
    const cartOne=ref(
        [{
            userId:0,
            shopId:0,
            dishIdList:[]
        }]
    );
    const cartStore=useCartStore()
    let cartDishPriceSum=ref(0)//购物车总价
    let cartDishPackSum=ref(0)//打包费总价
    //设置总价和打包费
    const setCartDishPackSum=()=>{
        cartDishPriceSum.value=0
        cartDishPackSum.value=0
        console.log(cartOne.value)
        console.log(cartOne.value[0])
        console.log(cartOne?.value[0]?.dishIdList)
        if(cartOne?.value[0]?.dishIdList){
            for (let i = 0; i < cartOne.value[0].dishIdList.length; i++) {  
                cartDishPackSum.value=cartDishPackSum.value+(cartOne.value[0].dishIdList[i].quantity)*(cartOne.value[0].dishIdList[i].pack)
                cartDishPriceSum.value=cartDishPriceSum.value+(cartOne.value[0].dishIdList[i].quantity)*(cartOne.value[0].dishIdList[i].price)
            }
        }
        cartDishPackSum.value=(cartDishPackSum.value).toFixed(2)
        cartDishPriceSum.value=cartDishPriceSum.value+(Number)(cartDishPackSum.value)
        cartDishPriceSum.value=(cartDishPriceSum.value).toFixed(2)
    }
    //点击弹窗时，初始化属性数组
    const initialization=(userId,shopId)=>{
        if(shopId==undefined){
            return
        }
        console.log(cartOne.value)
        // console.log(cartStore.cartList.value)
        
        if(cartOne.value.userId!=userId||cartOne.value.shopId!=shopId){
            cartOne.value=[{
                userId:0,
                shopId:0,
                dishIdList:[]
            }]
        }
        
    }
    //写入本地
    const addDishToCart=(dish,dishPrice,shopId)=>{
        //首先判断是否跟之前加入的是一样的
        console.log(cartOne)
        // if(cartOne.userId!=localStorage.getItem("id")||cartOne.shopId!=localStorage.getItem("shopId")){
        //     cartOne=[]
        // }
        console.log(cartOne)
        
        
        console.log(cartOne.value)
        console.log(cartOne.value[0])
        // console.log(cartOne.dishIdList)

        console.log(dish)
        const dishJson= JSON.parse(JSON.stringify(dish))
        dishJson.price=JSON.parse(JSON.stringify(dishPrice))
        console.log(dishJson)
        console.log(JSON.stringify(dishJson))
        console.log(cartOne.value)
        console.log(cartOne.value.length)
        if(cartOne.value.length==0){
            const cartX={
                userId:localStorage.getItem("id"),
                shopId: localStorage.getItem("shopId"),
                dishIdList:[dishJson]
            }
            console.log(cartX)
            cartOne.value.push(cartX)
        }else{
            console.log(cartOne.value)
            console.log(cartOne.value[0].dishIdList)
            cartOne.value[0].dishIdList.push(dishJson)
        }
        
        // console.log(cartOne.value[0].dishIdList)
        // if(cartOne.value[0].dishIdList==undefined){
        //     console.log("是空的")
        //     cartOne.value[0].dishIdList=[]
        // }
        // cartOne.value[0].userId=
        // cartOne.value[0].shopId=
        // cartOne.value[0].dishIdList.push(dishJson)
        console.log(cartOne)
        console.log(cartOne.value)
        console.log(cartOne.dishIdList)
        //   console.log(cartOne.value)
        //   cartOne.value=JSON.parse(JSON.stringify(cartOne.value))
        // console.log(cartOne.value.dishIdList.length)
        // cartOne.value.dishIdList.push(newDish)
        // cartOne.value.dishIdList.push(newDish)
        //然后发送给总的购物车，将这个购物车信息加入，然后传到后端
        // console.log(cartOne.value[0])
        cartStore.addCartOne(cartOne)
    }
    //从购物车中删除一个商品
    const deleteDishFromCart=(dish)=>{
        let index = -1;  // 我们将找到目标元素的索引  
        for (let i = 0; i < cartOne.value[0].dishIdList.length; i++) {  
            let currentDish = JSON.stringify(cartOne.value[0].dishIdList[i]);  // 将元素再次序列化为字符串，以便进行比较  
            if (currentDish === JSON.stringify(dish)) {  // 如果找到了目标元素  
                index = i;  // 记录下它的索引  
                break;  // 然后跳出循环  
            }  
        }  
        if (index !== -1) {  
            cartOne.value[0].dishIdList.splice(index, 1);  
        }
    }
    //改变购物车中商品的数量
    const changeQuantityDish=(dish,changeNum)=>{
        console.log(changeNum)
        for (let i = 0; i < cartOne.value[0].dishIdList.length; i++) {  
            let currentDish = JSON.stringify(cartOne.value[0].dishIdList[i]);  // 将元素再次序列化为字符串，以便进行比较  
            if (currentDish === JSON.stringify(dish)) {  
                console.log('改变购物车中商品的数量,如果找到了目标元素') 
                cartOne.value[0].dishIdList[i].quantity=(Number)(cartOne.value[0].dishIdList[i].quantity)+changeNum
                console.log(cartOne.value[0].dishIdList[i].quantity)
            }  
        }  
    }
    //清空
    const cleanCartOne=()=>{
        cartOne.value={}
    }


    return {
        cartOne,
        cartDishPriceSum,
        cartDishPackSum,
        setCartDishPackSum,
        initialization,
        addDishToCart,
        deleteDishFromCart,
        changeQuantityDish,
        cleanCartOne
    }
},{
    persist:true
})