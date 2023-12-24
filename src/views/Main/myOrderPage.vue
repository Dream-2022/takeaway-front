<template>
    <div class="orderBigBox">
        <div class="MyOrderBox">
            <div class="orderBoxTitle">我的订单</div>
            <div class="orderNavigation">
                <span class="navigationActive" @click="navigationClick">全部</span>
                <span @click="navigationClick">进行中</span>
                <span @click="navigationClick">待评价</span>
                <span @click="navigationClick">已评价</span>
                <span @click="navigationClick">退款</span>
            </div>
            <div class="orderShops">
                <div class="orderShop" v-for="order in orderStore.orderList" :key="order">
                    <div class="orderTitleBox">
                        <span class="orderTitle" @click="orderShopClick(order)">{{order?.dishList?.shopName}}</span>
                        <span class="orderTitleZi" @click="orderShopClick(order)">进入<i class="angle right icon"></i></span>
                        <span class="orderTitleState">{{ order.state }}</span>
                        <span class="orderTitleNumber">
                            <span>共&nbsp;</span>
                            <span>1</span>
                            <span>&nbsp;件</span>
                        </span>
                    </div>
                    <div class="orderDishes" @click="orderClick(order)">
                        <div class="orderDish" v-for="item in order.dishList.dishIdList" :key="item">
                            <div class="orderDishLeft">
                                <img class="orderDishImg" :src="item.picture">
                            </div>
                            <div class="orderDishMight">
                                <div class="orderDishMightName">{{ item.dishName }}</div>
                                <div>{{ item.flavorListZi }}</div>
                            </div>
                            <div class="orderDishRight">
                                <div class="orderDishRightContent">
                                    <div class="orderDishRightPrice">
                                        <span>￥</span>
                                        <span>{{ item.price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRouter} from "vue-router"
    import { ref, defineProps, onMounted } from 'vue'
    import { ElMessage } from 'element-plus';
    import {selectOrderByUserIdAndState} from '@/apis/dishOrderApi.js'
    import {useOrderStore} from '@/stores/orderStore.js'
    const orderStore = useOrderStore();
    const router = useRouter();

    onMounted(async()=>{
        //获取userId和状态的所有订单
        obtainByUserIdAndState("全部")
    })
    //点击订单（跳转页面）
    function orderClick(order){
        console.log(order)
        //设置订单数组，地址，orderId商家id，商品数组
        localStorage.setItem("orderId",order.id)
        localStorage.setItem("addressValue",order.addressValue)
        localStorage.setItem("orderShopList","["+order.dishValue+"]")
        localStorage.setItem("orderOneList",JSON.stringify([order]))
        router.push(`/paymentPage`);
    }
    //点击导航栏
    function navigationClick(event){
        console.log("点击")
        const orderNavigationChild=document.querySelector('.orderNavigation').childNodes
        for(let i=0;i<orderNavigationChild.length;i++){
            console.log(orderNavigationChild[i])
            orderNavigationChild[i].classList.remove('navigationActive')
        }
        console.log(event.target)
        console.log(event.target.innerHTML)
        event.target.classList.add('navigationActive')
        //触发事件，从数据库获取数据(userId,state)
        obtainByUserIdAndState(event.target.innerHTML)
    }
    //点击商家（跳转页面）
    function orderShopClick(order){
        console.log(order)
        console.log(order.shopId)
        const id=order.shopId
        router.push(`/shopDetailPage/${id}/shopDishPage/ShopDishBox`);
    }
    async function obtainByUserIdAndState(state){
        //获取userId和状态的所有订单
        const apiData={
            userId: localStorage.getItem("id"),
            state
        }
        const res=await selectOrderByUserIdAndState(apiData)
            console.log(res.data.data)
            orderStore.orderList=res.data.data
            console.log(orderStore.orderList)

            for(let i=0;i<orderStore.orderList.length;i++){
                console.log(orderStore.orderList[i])
                console.log(orderStore.orderList[i].dishValue)
                orderStore.orderList[i].dishList=JSON.parse(orderStore.orderList[i].dishValue)
                console.log(orderStore.orderList[i].dishList)
                console.log(orderStore.orderList[i].dishList.shopName)
            }
    }
</script>
<style scoped>
    .orderBigBox{
        width: 100%;
        min-height: 700px;
        background-color: rgb(243, 247, 248);
        padding-top: 110px;
        padding-bottom: 80px;
    }
    .MyOrderBox{
        width: 800px;
        margin: 0 auto;
        background-color: #fff;
    }
    .orderBoxTitle{
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 600;
    }
    .orderNavigation{
        padding-bottom:10px;
        padding-top: 2px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .orderNavigation{
        display: flex;
    }
    .orderNavigation span{
        flex:1;
        text-align: center;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
    }
    .orderNavigation span:hover{
        border-radius: 5px;
        background-color: #f8fcff;
    }
    .navigationActive{
        border-radius: 0;
        border-bottom: 5px solid #c4dcef;
    }
    .orderShops{
        padding: 0 20px 30px 20px;
    }
    .orderShop{
        padding: 10px 5px 10px 5px;
        border-radius: 10px;
    }
    .orderShop:hover{

        background-color: #fcfcfc;
    }
    .orderTitle{
        font-size: 17px;
        margin-left: 10px;
        cursor: pointer;
        display: inline-block;
        margin-bottom: 8px;
    }
    .orderTitleZi{
        margin-left: 30px;
        color: #8c8c8c;
        cursor: pointer;
    }
    .orderTitleState{
        float: right;
        margin-right: 40px;
        background-color: #0292FE;
        color: #fff;
        width: 60px;
        height: 25px;
        line-height: 25px;
        border-radius: 8px;
        text-align: center;
        margin-top: 5px;
    }
    .orderTitleNumber{
        float: right;
        margin-right: 15px;
        margin-top: 7px;
    }
    .orderDish{
        display: flex;
        padding: 10px 10px 10px 10px;
    }
    .orderDishLeft{
        flex: 1;
    }
    .orderDishMight{
        margin-left: 15px;
        flex: 5;
    }
    .orderDishMightName{
        font-size: 15px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .orderDishRight{
        flex:1;
    }
    .orderDishRightContent{
        margin-top: 37px;
    }
    .orderDishRightPrice{
        color: #ffa200;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 2px;
    }
    .orderDishImg{
        width: 100px;
        height: 100px;
        border-radius: 15px;
    }
</style>