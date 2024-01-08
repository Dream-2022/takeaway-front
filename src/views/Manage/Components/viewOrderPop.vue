<template>
    <!--  v-if="categoryStore.openAddCategoryDown" -->
    <div class="zhezhao1" id='zhezhao1' v-if="orderOneStore.orderDownValue"></div>
        <div class="tankuang1" v-if="orderOneStore.orderDownValue">
            <div id="header1">
                <div class="headTitle">查看订单</div>
                <div id="header-right1" @click="hidder1">x</div>
            </div>
            <div class="modalContent">
                <div>
                    <span class="orderZi">订单号：</span>
                    <span class="orderId">{{ orderOneStore.orderOne.id }}</span>
                    <span class="orderState">{{ orderOneStore.orderOne.state }}</span>
                    <span class="orderTime">{{ orderOneStore.orderOne.time }}</span>
                </div>
                <div class="orderPadding">
                    <span class="orderZi">用户名：</span>
                    <span>{{ orderOneStore?.orderOne?.addressValue?.myName }}</span>
                </div>
                <div class="orderPadding">
                    <span class="orderZi">手机号：</span>
                    <span>{{ orderOneStore.orderOne.phone }}</span>
                </div>
                <div class="orderBorder">
                    <span class="orderZi">地址：</span>
                    <span>{{ orderOneStore.orderOne.addressValue.addressDetail }}</span>
                </div>
                <div class="orderPadding">
                    <div class="orderDishBox">菜品</div>
                    <div class="orderDishes">
                        <div class="orderDish" v-for="item in orderOneStore.orderOne.dishIdList" :key="item">
                            <span class="orderDishName">{{ item.dishName }}</span>
                            <span class="orderDishFlavorListZi">{{ item.flavorListZi }}</span>
                            <span class="orderDishPrice">
                                <span>￥</span>
                                <span>{{ item.price }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="orderBorder" >
                        <span class="orderXi">菜品小计：</span>
                        <span class="orderPriceZi1">￥</span>
                        <span class="orderPriceZi2">{{ orderOneStore.dishesPrice }}</span>
                    </div>
                </div>
                <div>
                    <div class="orderDishBox">费用</div>
                    <div class="orderPadding">
                        <span>菜品小计：</span>
                        <span>￥</span>
                        <span>{{ orderOneStore.dishesPrice }}</span>
                    </div>
                    <div class="orderPadding">
                        <span>打包费：</span>
                        <span>￥</span>
                        <span>{{ orderOneStore.packsPrice }}</span>
                    </div>
                    <div class="orderPadding">
                        <span>配送费：</span>
                        <span>￥</span>
                        <span>{{ orderOneStore.deliveryPrice }}</span>
                    </div>
                    <div class="orderPadding">
                        <span class="orderAllPrice">合计：</span>
                        <span class="orderAllPriceZi1">￥</span>
                        <span class="orderAllPriceZi2">{{ orderOneStore.allPrice }}</span>
                    </div>
                </div>
            </div>
            
            <div class="buttonBox">
                <button class="TanConfirmButton" @click="hidder1">关闭</button>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {useRouter} from "vue-router"
    import { useOrderOneStore } from '@/stores/orderOneStore.js'
    import { selectById, selectShopById } from '@/apis/shop.js'

    
    const orderOneStore=useOrderOneStore()
    let addressValue=ref([])//该订单地址信息
    let dishValue=ref([])//该订单菜品信息
    onMounted(async()=>{
        console.log(orderOneStore.orderDownValue)
        console.log(orderOneStore.orderOne)
        console.log(orderOneStore.orderOne.dishValue)
        console.log(orderOneStore.orderOne.addressValue)

        
    })
    function hidder1(){
        orderOneStore.orderDownValue=false
    }
</script>
<style scoped>
    .orderZi{
        color: #898989;
    }
    .orderState{
        display: inline-block;
        width: 70px;
        text-align: center;
        background-color: #0094FE;
        color: #fff;
        padding-top: 2px;
        padding-bottom: 2px;
        border-radius: 10px;
        margin-left: 20px;
    }
    .orderTime{
        float: right;
        margin-right: 30px;
        margin-top: 3px;
    }
    .orderBorder{
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }
    .orderPadding{
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .orderDishBox{
        margin-top: 20px;
        font-size: 16px;
        padding-left: 10px;
    }
    .orderDishes{
        padding: 5px;
    }
    .orderDish{
        display: flex;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    .orderDishName{
        flex: 1;
    }
    .orderDishFlavorListZi{
        flex: 1;
    }
    .orderDishPrice{
        flex: 0.5;
    }
    .orderXi{
        margin-top: 3px;
        display: inline-block;
        padding: 5px;
        font-size: 15px;
        
    }
    .orderPriceZi1{
        font-weight: 600;
        color: #ffa200;
    }
    .orderPriceZi2{
        font-size: 16px;
        font-weight: 600;
        color: #ffa200;
    }
    .orderAllPrice{
        font-size: 16px;
    }
    .orderAllPriceZi1{
        font-size: 16px;
        font-weight: 600;
        color: #ffa200;
    }
    .orderAllPriceZi2{
        font-size: 17px;
        font-weight: 600;
        color: #ffa200;
    }
    /* 添加分类弹窗 */
    #header1{
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
    }
    .headTitle{
        color: rgb(73, 73, 73);
        margin-top: 16px;
        margin-left: 20px;
        font-size: 17px;
    }
    .zhezhao1{
        position: fixed;
        left: 0px;
        top: 0px;
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    .tankuang1{
        position: fixed;
        top:40px;
        left:50%;
        transform:translateX(-50%);
        background: #fff;
        border-radius: 5px;
        color: black;
    }
    .tankuang1{
        width: 500px;
    }
    #header-right1{
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
        margin-top: 30px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-right: 10px;
        margin-left: 10px;
        max-height: 500px;
        white-space: nowrap;
        overflow-y:scroll;
    }

    .buttonBox{
        float: right;
        margin-right: 50px;
        margin-bottom: 18px;
    }
    .TanConfirmButton{
        width:80px;
        height:35px;
        margin-top:15px;
        outline:none;
        border:0px;
        border-radius:10px;
        background:#ccc;
        color:#fff;
        margin-left:30px;
    }
    .TanConfirmButton{
        width:80px;
        height:35px;
        background:#9d9d9d;
        color:#000;
        border:1px solid #3b3b3b;
        color: #fff;
        border-radius:10px;
        margin-left: 40px;
    }
</style>