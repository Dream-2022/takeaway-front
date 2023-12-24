<template>
    <div class="orderBigBox">
        <span>
            <span>订单号：</span>
            <input v-model="orderIdInputValue">
        </span>
        <span>
            <span>商家ID：</span>
            <input v-model="orderShopIdValue">
        </span>
        <span>
            <span>用户ID：</span>
            <input v-model="orderUserIdValue">
        </span>
        <span>
            <span>联系电话：</span>
            <input v-model="orderPhoneValue">
        </span>

        <span>
            <span>订单状态：</span>
            <select v-model="selectStateValue">
                <option value="0">全部</option>
                <option value="提交订单">提交订单</option>
                <option value="已付款">已付款</option>
                <option value="已完成">已完成</option>
                <option value="已评价">已评价</option>
                <option value="已取消">已取消</option>
                <option value="申请退款">申请退款</option>
                <option value="同意退款">同意退款</option>
                <option value="拒绝退款">拒绝退款</option>
            </select>
        </span>
        <span>
            <span>下单：</span>
            <input class="orderHandBoxSearchTimeStartInput" type="datetime-local" v-model="SearchTimeStartInput" v-on:change = "TimeStartInputChange()">
        </span>
        <span>
            <span>至：</span>
            <input class="orderHandBoxSearchTimeEndInput" type="datetime-local" v-model="SearchTimeEndInput" v-on:change = "TimeEndInputChange()">
        </span>
        <span class="orderButtonBox">
            <span class="orderButton" @click="orderClick">查询</span>
        </span>
    </div>
    <div class="orderTitle">
        <span class="orderId ">订单号</span>
            <span class="orderRealName">用户名</span>
            <span class="orderShopName">商家名</span>
            <span class="orderPhone">商家号码</span>
            <span class="orderPhone">用户号码</span>
            <span class="orderPrice">订单价格</span>
            <span class="orderState">已完成</span>
            <span class="orderOperate">操作</span>
    </div>
    <div class="orderBoxes">
        <div class="orderBox" v-for="item in orderList" :key="item">
            <span class="orderId ">{{ item.id }}</span>
            <span class="orderRealName">{{ item?.address?.myName }}</span>
            <span class="orderShopName">{{ item?.shopName }}</span>
            <span class="orderPhone">{{ item.phone }}</span>
            <span class="orderPhone">{{ item.contactCall }}</span>
            <span class="orderPrice">￥{{ item.priceAll }}</span>
            <span class="orderState">{{ item.state }}</span>
            <span class="orderOperateBox">
                <span class="orderRefund" v-if="item.state=='申请退款'" @click="orderRefundClick(item)">同意退款</span>
                <span class="orderView" @click="orderViewClick(item)">查看</span>
            </span>
        </div>
    </div>
    <span v-if="orderList.length!=0">
        <div class="pagination">
            <span class="pageUp"  @click="pageUpClick">上一页</span>
            <span :class="index==0?'pageActive':''" class="pagination-link" v-for="(page,index) in orderList[0].pageNum" :key="page" @click="pageNumClick">
                {{index+1}}
            </span>
            <span class="pageDown" @click="pageDownClick">下一页</span>
        </div>
    </span>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import { ElMessage } from 'element-plus';
    import { useBackendPopStore } from '@/stores/backendPopStore.js'
    import { selectOrderByCondition, updateOrderStateById } from '@/apis/dishOrderApi.js'
    import { selectShopById } from '@/apis/shop.js'

    const backendPopStore=useBackendPopStore()
    let orderIdInputValue=ref("")
    let orderShopIdValue=ref("")
    let orderUserIdValue=ref("")
    let orderPhoneValue=ref("")
    let selectStateValue=ref("全部")
    let SearchTimeStartInput=ref("")
    let SearchTimeEndInput=ref("")
    let orderList=ref([])
    let orderPriceAll=ref(0)
    let orderDeliveryAll=ref(0)
    let orderPackAll=ref(0)
    onMounted(async()=>{
        getDishListByPageNum(1)
    })
    //点击查询
    function orderClick(){
        getDishListByPageNum(1)
    }
    //同意退款
    async function orderRefundClick(order){
        const result=confirm("确认要通过退款吗")
        if(result){
            const apiData={
                id: order.id,
                state: "同意退款"
            }
            const res=await updateOrderStateById(apiData)
                console.log(res.data.data)
                ElMessage.success("通过退款申请")
        }
        getDishListByPageNum(1)
    }
    //点击上一页
    function pageUpClick(){
        //样式
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        let pageCurrent=pageJudgment().innerHTML
        if(pageCurrent==1){
            ElMessage.warning("当前是第一页")
            return
        }
        let pageNew=Number(pageCurrent)-1
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].innerHTML==pageNew){
                paginationLinkList[i].classList.add('pageActive')
            }
            if(paginationLinkList[i].innerHTML==pageCurrent){
                paginationLinkList[i].classList.remove('pageActive')
            }
        }
        if(pageNew==1){
            document.querySelector('.pageUp').classList.add('pageGray')
        }
        document.querySelector('.pageDown').classList.remove('pageGray')
        //根据页数获取页面的菜品
        getDishListByPageNum(pageNew)

    }
    //点击下一页
    function pageDownClick(){
        //样式
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        let pageCurrent=pageJudgment().innerHTML
        console.log(pageCurrent)
        console.log(orderList.value[0])
        console.log(orderList.value[0].pageNum)
        if(pageCurrent==orderList.value[0].pageNum){
            ElMessage.warning("当前是最后一页")
            return
        }
        let pageNew=Number(pageCurrent)+1
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].innerHTML==pageNew){
                paginationLinkList[i].classList.add('pageActive')
            }
            if(paginationLinkList[i].innerHTML==pageCurrent){
                paginationLinkList[i].classList.remove('pageActive')
            }
            
        }
        if(pageNew==orderList.value[0].pageNum){
            document.querySelector('.pageDown').classList.add('pageGray')
        }
        document.querySelector('.pageUp').classList.remove('pageGray')
        //根据页数获取页面的菜品
        getDishListByPageNum(pageNew)
    }
    //点击页数
    function pageNumClick(event){
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].classList.contains('pageActive')){
                paginationLinkList[i].classList.remove('pageActive')
            }
        }
        event.target.classList.add('pageActive')
        //根据页数获取页面的菜品
        let pageNew=(Number)(event.target.innerHTML)
        getDishListByPageNum(pageNew)
        if(pageNew==orderList.value[0].pageNum){
            document.querySelector('.pageDown').classList.add('pageGray')
        }else{
            document.querySelector('.pageDown').classList.remove('pageGray')
        }
        if(pageNew==1){
            document.querySelector('.pageUp').classList.add('pageGray')
        }else{
            document.querySelector('.pageUp').classList.remove('pageGray')
        }
    }
    //根据页数获取页面的菜品
    async function getDishListByPageNum(pageNum){
        const apiData={
            idValue: orderIdInputValue.value,
            shopIdValue: orderShopIdValue.value,
            userIdValue: orderUserIdValue.value,
            phone: orderPhoneValue.value,
            state: selectStateValue.value,
            startTime: SearchTimeStartInput.value,
            endTime: SearchTimeEndInput.value,
            pageNum
        }
        console.log(apiData)
        const res=await selectOrderByCondition(apiData)
            console.log(res.data.data)
            orderList.value=res.data.data
            for(let i=0;i<orderList.value.length;i++){
                console.log(orderList.value[i])
                orderList.value[i].address=JSON.parse(orderList.value[i].addressValue)
                orderList.value[i].dishList=JSON.parse(orderList.value[i].dishValue).dishIdList
                const inputDate = new Date(orderList.value[i].updateTime);
                const year = inputDate.getFullYear();
                const month = String(inputDate.getMonth() + 1).padStart(2, '0'); //月份从0开始，需要加1，然后补零
                const day = String(inputDate.getDate()).padStart(2, '0');
                const hours = String(inputDate.getHours()).padStart(2, '0');
                const minutes = String(inputDate.getMinutes()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                console.log(formattedDate);
                orderList.value[i].time=formattedDate
                console.log(orderList.value[i].dishList)
                orderPackAll.value=0
                orderDeliveryAll.value=0
                orderPriceAll.value=0
                for(let j=0;j<orderList.value[i].dishList.length;j++){
                    const dish=orderList.value[i].dishList[j]
                    console.log(dish)
                    orderPackAll.value=orderPackAll.value+dish.pack
                    orderPriceAll.value=orderPriceAll.value+dish.price
                }
                //搜索商家（获取商家名，商家电话，商家配送费）
                const apiData={
                    id: orderList.value[i].shopId
                }
                console.log(apiData)
                const res=await selectShopById(apiData)
                    console.log(res.data.data)
                    orderList.value[i].shopName=res.data.data.name
                    orderList.value[i].contactCall=res.data.data.takeawayCall
                    console.log(orderPackAll.value)
                    console.log(orderPriceAll.value)
                orderPackAll.value=(orderPackAll.value).toFixed(2)
                console.log(orderPackAll.value)
                orderPriceAll.value=(orderPriceAll.value+(Number)(orderDeliveryAll.value)+(Number)(orderPackAll.value)).toFixed(2)
                
                orderList.value[i].priceAll=orderPriceAll.value
                orderList.value[i].packAll=orderPackAll.value
                orderList.value[i].deliveryAll=orderDeliveryAll.value
                
            }
            console.log(orderList.value)
    }
</script>
<style scoped>
    .orderBigBox{
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .orderBigBox span{
        flex: 1;
    }
    .orderBigBox input,
    .orderBigBox select{
        width: 50%;
        height: 25px;
    }
    .orderBigBox .orderButtonBox{
        flex: 0.5;
    }
    .orderButton{
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 28px;
        line-height: 28px;
        border-radius: 10px;
        cursor: pointer;
        background-color: #01B6FD;
        color: #fff;
    }
    .orderTitle{
        font-weight: 600;
        padding-top: 5px;
        padding-bottom: 10px;
    }
    .orderBox,
    .orderTitle{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .orderBox{
        margin-top: 8px;
        padding-top: 18px;
        box-shadow: 2px 0px 5px 2px rgb(242, 242, 242);
        padding-bottom: 18px;
    }
    .orderId,
    .orderShopName,
    .orderRealName,
    .orderPrice,
    .orderState{
        flex:1;
    }
    .orderBox .orderState{
        flex:1;
        color: rgb(217, 196, 61);
        font-weight: 600;
    }
    .orderPhone{
        flex: 1.5;
    }
    .orderOperate{
        flex: 2;
    }
    .orderOperateBox{
        flex: 2;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items: center;
    }
    .orderBox .orderPrice{
        font-weight: 600;
    }
    .orderRefund,
    .orderView{
        cursor: pointer;
        background-color: #c1c0c0;
        height: 25px;
        line-height: 25px;
        border-radius: 9px;
        width: 80px;
        margin-right: 10px;
        color: #fff
    }
    .orderRefund{
        background-color: rgb(85, 181, 219);
    }
    /*分页元素*/
    .pagination-link{
        background-color: #cccccc;
        border-radius: 10px;
        width: 20px;
    }
    .pageUp, .pageDown{
        cursor: pointer;
        margin-bottom: 50px;
    }
    .pageGray{
        color: #ccc !important;;
    }
    .pageUp:hover, .pageDown:hover{
        background-color: #f5f4f4;
        color: #424242;
        border-radius: 5px;
    }
    .pagination .pageActive{
        background-color: #ececec;
        box-shadow: 2px 2px 2px rgb(99, 99, 99);
    }
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        text-align: center;
    }
    .pagination span {
        height: 20px;
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
        color: #333;
        text-decoration: none;
    }
</style>