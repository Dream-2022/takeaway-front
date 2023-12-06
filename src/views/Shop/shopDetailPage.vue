<template>
    <div class="shopBackground">

        <router-view></router-view>

        <div class="footerBox">
            <div class="cartBox">
                <div class="cartBoxTop">
                    <span class="cartBoxTopZi">已选商品</span>
                    <span class="cartBoxTopPackZi">打包费&nbsp;&nbsp;</span><span class="cartBoxTopPrice">{{ cartOneStore.cartDishPackSum }}</span><span class="cartBoxTopPackZi2">&nbsp;元</span>
                    <span class="cartBoxTopClean"><i class="trash alternate outline icon"></i>清空</span>
                </div>

                <div class="cartDishBoxes">
                    <div class="cartDishBox" v-for="item in cartOneStore?.cartOne[0]?.dishIdList" :key="item">
                        <div class="cartDishBoxFlex">
                            <div class="cartDishBoxLeft">
                                <img :src="item.picture" class="cartDishImg">
                            </div>
                            <div class="cartDishBoxMight">
                                <div class="cartDishBoxRightName">{{ item.dishName }}</div>
                                <div class="cartDishBoxRightFlavorZi">已选:&nbsp;&nbsp;</div>
                                <div class="cartDishBoxRightFlavor">{{ cartFlavorListValue }}</div><br>
                                <span class="cartDishBoxRightPriceZi">￥</span><span class="cartDishBoxRightPrice">{{ item.price }}</span>
                            </div>
                            <div class="cartDishBoxRight">
                                <span class="cartDishBoxRightMinus" @click="cartDishBoxRightMinusClick(item)"><i class="minus circle icon"></i></span>
                                <span class="cartDishBoxRightNumber">{{ item.quantity }}</span>
                                <span class="cartDishBoxRightPlus" @click="cartDishBoxRightPlusClick(item)"><i class="plus circle icon"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span><i class="shopping cart icon"></i></span>
            <span class="shoppingNumber">{{ cartOneStore?.cartOne[0]?.dishIdList.length }}</span>

            <span>￥</span><span class="shoppingPrice">{{ cartOneStore.cartDishPriceSum }}</span>
            <span class="footerZi">另需配送费约￥</span><span>{{ shopDetail.packing }}</span>
            <button class="footerBottom">结算</button>
        </div>
        <div class="nullBox"></div>

    </div>
    

</template>
<script setup>
    import {ref,onMounted} from 'vue'
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {selectById} from '@/apis/shop.js'
    import {selectCollectByUserIdShopId, insertCollect, deleteCollect} from '@/apis/collect.js'
    import {useDishStore} from'@/stores/dishStore.js'
    import {useCartOneStore} from'@/stores/cartOneStore.js'
    const dishStore=useDishStore()
    const cartOneStore=useCartOneStore()
    let dishes=ref([])
    let shopDetail=ref([])
    
    const route = useRoute();
    onMounted(async() => {
        console.log(route.params.id)
        //获取dish列表
        dishStore.obtainDishList(route.params.id)
        dishes.value=dishStore.getDishList()

        const apiData={
            shopId: route.params.id
        }
        const res1=await selectById(apiData)
        console.log(res1.data.data)
        if(res1.data.code==0){
            console.log('成功发送')
            console.log(res1.data)
            if(res1.data.code==0){
                console.log("获取商家信息成功")
                shopDetail.value=res1.data.data
            }
            else{
                ElMessage.error(res1.data.message)
            }
        }

        //获取是否收藏该店铺了
        const apiData2={
            shopId:shopDetail.value.id,
            userId:localStorage.getItem("id")
        }
        let isCollect=ref()
        const res2=await selectCollectByUserIdShopId(apiData2)
            console.log(res2.data)
            if(res2.data.code==0){
                console.log("获取成功："+selectCollectByUserIdShopId)
                if(res2.data.data=="未收藏"){
                    isCollect.value=false
                }else if(res2.data.data=="收藏"){
                    isCollect.value=true
                }
            }
            else{
                ElMessage.error(res2.data.message)
            }
        //设置购物车的打包费和总价
        cartOneStore.setCartDishPackSum()
	})
    
    //点击减少购物车数量
    function cartDishBoxRightMinusClick(dishOne){
        if(dishOne.quantity==1){
            cartOneStore.deleteDishFromCart(dishOne)
        }
        else{
            cartOneStore.changeQuantityDish(dishOne,-1)
        }
        //设置购物车的打包费和总价
        cartOneStore.setCartDishPackSum()
    }
    //点击增加购物车数量
    function cartDishBoxRightPlusClick(dishOne){
        cartOneStore.changeQuantityDish(dishOne,1)
        //设置购物车的打包费和总价
        cartOneStore.setCartDishPackSum()
    }
</script>
<style scoped>
    .shopBackground{
        background-color: #efefef;
    }
    .footerBox{
        width: 100%;
        background-color: #0084ff;
        margin:0 auto;
        width: 900px;
        position: sticky;
        z-index: 1; 
        bottom: 0;
        padding-bottom: 8px;
        color: white;
    }
    .cartBox{
        background-color: #fff;
        box-shadow:  0px 0px 3px rgb(42, 108, 161);
        color:black;
    }
    .cartBoxTop{
        padding-left: 50px;
        padding-top:10px;
        padding-bottom: 10px;
    }
    .cartBoxTopZi{
        font-size: 15px;
    }
    .cartBoxTopPackZi{
        color: #454545;
        font-size: 13px;
        margin-left: 30px;
    }
    .cartBoxTopClean{
        color: #454545;
        font-size: 13px;
        margin-left: 68%;
        cursor: pointer;
    }
    .cartBoxTopClean i.icon{
        margin:0
    }
    .cartBoxTopPrice{
        color: #ffa200;
        font-weight: 600;
        font-size: 13px;
    }    
    .cartBoxTopPackZi2{
        color: #ffa200;
        font-size: 13px;
    }
    .cartDishBoxFlex{
        display: flex;
    }
    .cartDishBoxLeft{
        flex: 1;
    }
    .cartDishBoxMight{
        flex: 6;
    }
    .cartDishBoxRight{
        line-height: 70px;
        flex: 2;
    }
    .cartDishBoxRightMinus,
    .cartDishBoxRightPlus{
        cursor: pointer;
        padding:3px 10px 3px 12px;
        display: inline-block;
        font-size: 19px;
        color: #0084FF;
       
    }
    .cartDishBoxRightMinusGray{
        color: #b1d0ed;
    }
    .cartDishBoxRightMinus i.icon,
    .cartDishBoxRightPlus i.icon{
        margin: 0;
    }
    .cartDishBoxRightNumber{
        padding: 5px 14px 5px 14px;
        background-color: #f2f2f2;
    }
    .cartDishBoxRightName{
        margin-top: 2px;
        font-weight: 600;
    }
    .cartDishBoxRightPriceZi,
    .cartDishBoxRightPrice{
        color: #ffa200;
        margin-top:10px;
        display: inline-block;
    }
    .cartDishBoxRightPrice{
        font-size: 17px;
        font-weight: 600;
    }
    .cartDishBoxRightFlavor,
    .cartDishBoxRightFlavorZi{
        display: inline-block;
        font-size: 13px;
        color:#767676;
    }
    .cartDishBox{
        padding: 5px 0 5px 50px;
    }
    .cartDishBoxes{
        max-height: 330px;
        white-space: nowrap;
        overflow-x:scroll;
    }
    .cartDishBox:hover{
        background-color: #f6f6f6;
    }
    .cartDishImg{
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
    .shopping{
        font-size: 34px;
        color: white;
        margin-top: 5px;
        margin-left: 20px;
    }
    .shoppingNumber{
        background-color: rgba(255, 29, 29, 0.981);
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 20px;
        position: relative; /* 让元素相对定位 */
        top: -24px;
        left: -13px;
        color: white;
    }
    .shoppingPrice{
        font-size: 19px;
        font-weight: 600;
    }
    .footerZi{
        margin-left: 20px;
        color: #f0f0f0
    }
    .footerBottom{
        border: 1px solid white;
        background-color: #fff;
        color: #0071da;
        padding: 3px 17px 3px 17px;
        border-radius: 30px;
        float: right;
        margin-top: 15px;
        margin-right: 44px;
        font-size: 15px;
    }
    .nullBox{
        height: 200px;
        width: 100%;
    }
    

    /* 弹窗 */
    .zhezhao,
    .zhezhao1{
    position: fixed;
    left: 0px;
    top: 0px;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    }
    .tankuang,
    .tankuang1{
    position: fixed;
    top:40px;
    left:50%;
    transform:translateX(-50%);
    background: #fff;
    border-radius: 5px;
    color: black;
    }
    .tankuang{
    width: 550px;
    }
    .tankuang1{
    width: 500px;
    }
    #header{
    height: 40px;
    border-bottom: 1px solid #ccc;
    }
    #header span
    {
    line-height:40px;
    margin-left:30px;
    font-size:16px;
    color:#000;
    }
    #header-right{
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: rgb(167, 166, 166);
    color: #fff;
    right: 23px;
    top: 16px;
    text-align: center;
    cursor: pointer;
    font-size: 17px;
    }
    .modalContent{
    margin-top: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-right: 10px;
    margin-left: 10px;
    }
</style>