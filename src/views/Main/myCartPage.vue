<template>
    <!-- 购物车页面 -->
    <div class="cartBigBox">
        <div class="cartBox">
            <div class="cartBoxTitle">购物车</div>
            <div class="cartShops">
                <div class="cartShop" v-for="(cart,index) in myCartAllStore.myCartList" :key="index">
                    <div class="cartShopNameBox">
                        <input type="checkbox" class="cartShopNameRadio1">
                        <span class="cartShopName">{{ cart.shopName }}</span>
                    </div>
                    <div class="cartShopDishes">
                        <div class="cartShopDish" v-for="item in cart.dishIdList" :key="item">
                            <div class="cartShopDishTop"><input type="checkbox" class="cartShopNameRadio2"></div>
                            <div class="cartShopDishLeft"><img src="http://localhost:8080/upload/dashu.jpg" class="cartShopDishImg"></div>
                            <div class="cartShopDishMight">
                                <div class="cartShopDishName">{{ item.dishName }}</div>
                                <div class="cartShopDishFlavorZi">大/冰</div>
                                <div class="cartShopDishPriceBox">
                                    <span class="cartShopDishPriceZi">￥</span>
                                    <span class="cartShopDishPrice">{{ item.price }}</span>
                                </div>
                            </div>
                            <div class="cartShopDishRight">
                                <span class="cartShopDishRightMinus cartShopDishRightMinusGray" @click="cartShopDishRightMinusClick"><i class="minus icon"></i></span>
                                <span class="cartShopDishRightNumber">1</span>
                                <span class="cartShopDishRightPlus" @click="cartShopDishRightPlusClick"><i class="plus icon"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {useCartStore} from'@/stores/cartStore.js'
    import {useMyCartAllStore} from'@/stores/myCartAllStore.js'
    import {selectCartAll} from '@/apis/cartApi.js'
    import { ElMessage } from 'element-plus';
    const cartStore=useCartStore()
    const myCartAllStore=useMyCartAllStore()

    onMounted(async()=>{
        //通过userId获取他的全部购物车
        const apiData={
            userId: localStorage.getItem("id")
        }
        const res=await selectCartAll(apiData)
            console.log(res.data.data)
            myCartAllStore.myCartList=res.data.data
            console.log(myCartAllStore.myCartList)
            for(let i=0;i<myCartAllStore.myCartList.length;i++){
                const dishIdListValue=JSON.parse(myCartAllStore.myCartList[i].detailJson)
                console.log(dishIdListValue)
                console.log(dishIdListValue[0].dishIdList)
                myCartAllStore.myCartList[i].dishIdList=dishIdListValue[0].dishIdList
                console.log(myCartAllStore.myCartList)
            }
            console.log(myCartAllStore.myCartList)
            console.log(myCartAllStore.getMyCartList())
            myCartAllStore.myCartList=JSON.parse(JSON.stringify(myCartAllStore.myCartList))
            console.log(myCartAllStore.myCartList)
            // console.log(myCartAllStore.myCartList[1].dishIdList)
            console.log(myCartAllStore.myCartList.length)
    })
</script>
<style scoped>
    .cartBigBox{
        width: 100%;
        background-color: rgb(243, 247, 248);
        padding-top: 110px;
        padding-bottom: 80px;
    }
    .cartBox{
        height: 700px;
        width: 800px;
        margin: 0 auto;
        background-color: #fff;
    }
    .cartBoxTitle{
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1.5px solid #ccc;
    }
    .cartShops{
        padding: 20px 45px 10px 45px;
    }
    .cartShop{
        border-bottom: 1px solid #ccc;
        margin-bottom: 19px;
    }
    .cartShopNameRadio1,
    .cartShopNameRadio2{
        margin-left: 5px;
        margin-right: 5px;
    }
    .cartShopDish{
        padding-top: 10px;
        display: flex;
    }
    .cartShopDishTop{
        line-height: 100px;
        margin-right: 5px;
    }
    .cartShopDishLeft{
        flex: 1;
    }
    .cartShopDishMight{
        flex: 4;
    }
    .cartShopDishRight{
        flex: 1;
        line-height: 100px;
    }
    .cartShopDishImg{
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }
    .cartShopDishName{
        font-size: 16px;
        margin-top: 5px;
        margin-block: 3px;
    }
    .cartShopDishPriceZi{
        font-size: 15px;
        color: #ffa200;
    }
    .cartShopDishFlavorZi{
        margin-bottom: 10px;
    }
    .cartShopDishPrice{
        font-size: 18px;
        font-weight: 600;
        color: #ffa200;
    }
    .cartShopDishRightMinus,
    .cartShopDishRightPlus{
        cursor: pointer;
        padding:3px 10px 3px 12px;
        display: inline-block;
        font-size: 14px;
    }
    .cartShopDishRightMinusGray{
        color: #ccc;
    }
    .cartShopDishRightMinus i.icon,
    .cartShopDishRightPlus i.icon{
        margin: 0;
    }
    .cartShopDishRightNumber{
        padding: 5px 14px 5px 14px;
        background-color: #f2f2f2;
    }
</style>