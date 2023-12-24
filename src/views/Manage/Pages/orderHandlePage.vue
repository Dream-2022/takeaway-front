<template>
    <div class="rightTopBox">
        <span class="topBoxActive topBoxMin" @click="topBoxMinClick">全部订单</span>
        <span class="topBoxMin" @click="topBoxMinClick">待接单</span>
        <span class="topBoxMin" @click="topBoxMinClick">申请退款</span>
        <span class="topBoxMin" @click="topBoxMinClick">已完成</span>
        <span class="topBoxMin" @click="topBoxMinClick">未支付</span>
        <span class="topBoxMin" @click="topBoxMinClick">已取消</span>
        <span class="topBoxMin" @click="topBoxMinClick">已退款</span>
    </div>
    <div class="orderHandBox">
        <div class="orderHandBoxTop">
            <div class="orderHandBoxSearchOrderId">
                <span>订单号：</span>
                <input class="orderHandBoxSearchOrderIdInput" type="Number" v-model="SearchOrderIdValue" placeholder="请输入订单号">
            </div>
            <div class="orderHandBoxSearchPhone">
                <span>手机号：</span>
                <input class="orderHandBoxSearchPhoneInput" v-model="SearchOrderPhoneValue" placeholder="请输入手机号">
            </div>
            <div class="orderHandBoxSearchTimeStart">
                <span>下单日期：</span>
                <input class="orderHandBoxSearchTimeStartInput" type="datetime-local" v-model="SearchTimeStartInput" v-on:change = "TimeStartInputChange()">
            </div>
            <div class="orderHandBoxSearchTimeEnd">
                <span>至：</span>
                <input class="orderHandBoxSearchTimeEndInput" type="datetime-local" v-model="SearchTimeEndInput" v-on:change = "TimeEndInputChange()">
            </div>
            <div class="orderHandBoxSearchButtonBox">
                <div class="orderHandBoxSearchButton" @click="orderHandBoxSearchClick">查询</div>
            </div>
        </div>
        <div class="orderHandBoxBottom">
            <div class="orderHandBoxOrderTop">
                <div class="orderHandBoxOrderTopOrderIdZi">订单号</div>
                <div class="orderHandBoxOrderTopDishesZi">订单菜品</div>
                <div class="orderHandBoxOrderTopAddressZi">地址</div>
                <div class="orderHandBoxOrderTopNotesZi">备注</div>
                <div class="orderHandBoxOrderTopPriceZi">价格</div>
                <div class="orderHandBoxOrderTopStateZi">状态</div>
                <div class="orderHandBoxOrderTopOperateZi">操作</div>
            </div>
            <div class="orderHandBoxOrders">
                <div class="orderHandBoxOrder" v-for="order in orderList" :key="order">
                    <div class="orderHandBoxOrderTopOrderId">{{ order.id }}</div>
                    <div class="orderHandBoxOrderTopDishes">
                        <div class="orderHandBoxOrderTopDish"  v-for="item in order.dishIdList" :key="item">
                            <span>{{ item.dishName }}</span>
                            <span>&nbsp;&nbsp;x&nbsp;</span>
                            <span>{{ item.quantity }}</span>
                        </div>
                    </div>
                    <div class="orderHandBoxOrderTopAddress">{{ order.addressValue.addressDetail }}</div>
                    <div class="orderHandBoxOrderTopNotes">{{ (order.notes=="")?"无":order.notes }}</div>
                    <div class="orderHandBoxOrderTopPrice">
                        <span class="orderHandBoxOrderTopPriceContent1">￥</span>
                        <span class="orderHandBoxOrderTopPriceContent2">{{ order.priceAll }}</span>
                    </div>
                    <div class="orderHandBoxOrderTopState">{{ order.state }}</div>
                    <div class="orderHandBoxOrderTopOperate">
                        <span class="OrderTopOperateRefund" v-if="order.state=='已付款'">退单</span>
                        <span class="OrderTopOperateSendGood" @click="OrderTopOperateSendGoodClick(order)" v-if="order.state=='已付款'">发货</span>
                        <span class="OrderTopOperateView" @click="OrderTopOperateViewClick(order)">查看</span>
                        <span class="OrderTopOperateAccess" @click="OrderTopOperateAccessClick(order)" v-if="order.state=='申请退款'">同意退款</span>
                        <span class="OrderTopOperateRefuse" @click="OrderTopOperateRefuseClick(order)" v-if="order.state=='申请退款'">拒绝退款</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 分页 -->
    <div>
        <span v-if="orderList.length!=0">
            <div class="pagination">
                <span class="pageUp pageGray"  @click="pageUpClick">上一页</span>
                <span :class="index==0?'pageActive':''" class="pagination-link" v-for="(page,index) in orderList[0].pageNum" :key="page" @click="pageNumClick">
                    {{index+1}}
                </span>
                <span class="pageDown" @click="pageDownClick">下一页</span>
            </div>
        </span>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import { ElMessage } from 'element-plus';
    import {selectDishOrderByShpIdAndPageNum} from '@/apis/dishOrderApi.js'
    import { useOrderOneStore } from '@/stores/orderOneStore.js'
    import { updateDishOrderCancel } from '@/apis/dishOrderApi.js'

    const orderOneStore=useOrderOneStore()
    let orderList=ref([])
    let SearchOrderIdValue=ref()
    let SearchOrderPhoneValue=ref("")
    let SearchTimeStartInput=ref("")
    let SearchTimeEndInput=ref("")
    onMounted(async()=>{
        //获取第1页的订单数据
        obtainByPageNum(1)
    })
    //选择同意退款
    async function OrderTopOperateAccessClick(order){
        console.log(order.id)
        handleOrderState(order.id,"同意退款")
        ElMessage.success("已成功通过退款申请")
        
    }
    
    //选择拒绝退款
    async function OrderTopOperateRefuseClick(order){
        handleOrderState(order.id,"拒绝退款")
        ElMessage.success("已成功拒绝退款申请")
    }
    //点击发货
    async function OrderTopOperateSendGoodClick(order){
        handleOrderState(order.id,"已完成")
        ElMessage.success("已成功发货")
    }
    //查看订单详细，打开弹窗
    function OrderTopOperateViewClick(order){
        console.log(order)
        console.log(orderOneStore.orderOne)
        orderOneStore.openDown(order)
    }
    //处理订单的状态变化
    async function handleOrderState(id,state){
        const apiData={
            id,
            state
        }
        const res=await updateDishOrderCancel(apiData)
            console.log(res.data.data)
        
        const rightTopBoxChild=document.querySelector('.rightTopBox').childNodes    
        for(let i=0;i<rightTopBoxChild.length;i++){
            if(rightTopBoxChild[i].classList.contains('topBoxActive')){
                rightTopBoxChild[i].click()
            }
        }
    }
    let TimeStartInput=ref()
    let TimeEndInput=ref()
    //选择了时间输入框
    function TimeStartInputChange() {
        var currentDate = new Date();
        // 获取输入框中选择的日期
        var selectedStartDate = new Date(TimeStartInput.value);
        console.log(selectedStartDate)
        console.log(selectedEndDate)
        var selectedEndDate = new Date(TimeEndInput.value);
        // 比较日期
        if (selectedStartDate > currentDate ) {
            ElMessage.warning("选择的日期不能超过当前日期，请重新选择");
            // 将输入框的值重置为当前日期
            var formattedCurrentDate = currentDate.toISOString().split('T')[0];
            TimeStartInput.value = formattedCurrentDate;
        }
        else if(selectedEndDate!=undefined&&selectedStartDate >selectedEndDate){
            ElMessage.warning("选择的日期不能超过截止时间，请重新选择");
            var formattedCurrentDate = currentDate.toISOString().split('T')[0];
            if(selectedEndDate!=undefined){
                TimeStartInput.value = selectedEndDate
            }else{
                TimeStartInput.value = formattedCurrentDate;
            }
        }
    }
    function TimeEndInputChange() {
        var currentDate = new Date();
        var selectedStartDate = new Date(TimeStartInput.value);
        var selectedEndDate = new Date(TimeEndInput.value);
        if (selectedEndDate > currentDate) {
            ElMessage.warning("选择的日期不能超过当前日期，请重新选择");
            // 将输入框的值重置为当前日期
            var formattedCurrentDate = currentDate.toISOString().split('T')[0];
            TimeEndInput.value = formattedCurrentDate;
        }
        //如果选中的时间比起始时间早重置时间
        if(selectedEndDate < selectedStartDate){
            ElMessage.warning("选择的日期不能早于起始日期，请重新选择");
            TimeEndInput.value = formattedCurrentDate;
        }
    }
    //点击上面的分类栏
    function topBoxMinClick(event){
        const topBoxMinList=document.querySelectorAll('.topBoxMin')
        for(let i=0;i<topBoxMinList.length;i++){
            if(topBoxMinList[i].classList.contains('topBoxActive')){
                topBoxMinList[i].classList.remove('topBoxActive')
            }
        }
        event.target.classList.add('topBoxActive')
        //获取第1页的查询订单数据
        obtainByPageNum(1)
    }
    //点击查询
    function orderHandBoxSearchClick(){
        console.log("点击查询")
        //获取第1页的查询数据
        obtainByPageNum(1)
    }
    //点击分页的第几页
    function pageNumClick(event){
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].classList.contains('pageActive')){
                paginationLinkList[i].classList.remove('pageActive')
            }
        }
        event.target.classList.add('pageActive')
        //根据页数获取页面的菜品
        let pageNum=(Number)(event.target.innerHTML)
        obtainByPageNum(pageNum)
        if(pageNum==orderList.value[0].pageNum){
            document.querySelector('.pageDown').classList.add('pageGray')
        }else{
            document.querySelector('.pageDown').classList.remove('pageGray')
        }
        if(pageNum==1){
            document.querySelector('.pageUp').classList.add('pageGray')
        }else{
            document.querySelector('.pageUp').classList.remove('pageGray')
        }

    }
    //点击上一页
    function pageUpClick(){
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
        obtainByPageNum(pageNew)
    }
    //点击下一页
    function pageDownClick(){
        //样式
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        let pageCurrent=pageJudgment().innerHTML
        console.log(pageCurrent)
        console.log(dishStore.dishList[0])
        console.log(dishStore.dishList[0].pageNum)
        if(pageCurrent==dishStore.dishList[0].pageNum){
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
        if(pageNew==dishStore.dishList[0].pageNum){
            document.querySelector('.pageDown').classList.add('pageGray')
        }
        document.querySelector('.pageUp').classList.remove('pageGray')
        //根据页数获取页面的菜品
        getDishListByPageNum(pageNew)
    }
    //判断是否是最后一页或者是第一页
    function pageJudgment(){
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        console.log(paginationLinkList)
        for(let i=0;i<paginationLinkList.length;i++){
            console.log(paginationLinkList[i])
            if(paginationLinkList[i].classList.contains('pageActive')){
                console.log(paginationLinkList[i].innerHTML)
                if(paginationLinkList[i].innerHTML==1){
                    document.querySelector('.pageUp').classList.add('pageGray')
                }
                if(paginationLinkList[i].innerHTML==orderList.value[0]?.pageNum){
                    document.querySelector('.pageDown').classList.add('pageGray')
                }
                return paginationLinkList[i]
            }
        }
        
    }
    //获取第n页的订单数据
    async function obtainByPageNum(pageNum){
        //获取上面的分类栏
        let idValue=0
        const orderState=document.querySelector(".topBoxActive").innerHTML
        if(SearchOrderIdValue.value==undefined){
            idValue=0
        }else{
            idValue=SearchOrderIdValue.value
        }
        console.log(idValue)
        //通过shopId和pageNum获取商家的订单,默认获取的是第一页
        const apiData={
            shopId: localStorage.getItem("shopId"),
            state: orderState,
            id: idValue,
            phone: SearchOrderPhoneValue.value,
            startTime:SearchTimeStartInput.value,
            endTime: SearchTimeEndInput.value,
            pageNum: pageNum
        }
        console.log(apiData)
        let priceAll=0
        const res=await selectDishOrderByShpIdAndPageNum(apiData)
            console.log(res.data.data)
            orderList.value=res.data.data
            for(let i=0;i<orderList.value.length;i++){
                //给订单列表赋值
                priceAll=0
                console.log(orderList.value[i])
                console.log(JSON.parse(orderList.value[i].dishValue).dishIdList)
                orderList.value[i].dishIdList=JSON.parse(orderList.value[i].dishValue).dishIdList
                //给地址列表赋值
                console.log(JSON.parse(orderList.value[i].addressValue))
                orderList.value[i].addressValue=JSON.parse(orderList.value[i].addressValue)
                console.log(orderList.value[i].notes)
                //在这里计算订单的总价格
                for(let j=0;j<orderList.value[i].dishIdList.length;j++){
                    const dishX=orderList.value[i].dishIdList[j]
                    console.log(dishX)
                    priceAll=((Number)(priceAll)+dishX.price).toFixed(2)
                }
                orderList.value[i].priceAll=priceAll
                console.log(priceAll)
            }
            console.log(orderList.value)
    }
</script>
<style scoped>
    .rightTopBox{
        display: flex;
        background-color: #1cb3ef;
        height: 50px;
        color: #fff;
        line-height: 50px;
        padding: 0 30px 0 30px;
    }
    .rightTopBox span{
        text-align: center;
        flex:1;
        cursor: pointer;
    }
    .rightTopBox span:hover{
        background-color: #48c8fb94;
    }
    .orderHandBoxTop{
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        padding-left: 3%;
        padding-right: 3%;
    }
    .topBoxActive{
        background-color: #24a4d2bd;
    }
    .orderHandBoxSearchOrderId,
    .orderHandBoxSearchPhone,
    .orderHandBoxSearchTimeStart,
    .orderHandBoxSearchTimeEnd{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .orderHandBoxSearchOrderIdInput,
    .orderHandBoxSearchPhoneInput,
    .orderHandBoxSearchTimeStartInput,
    .orderHandBoxSearchTimeEndInput{
        width: 60%;
        padding-left: 3px;
    }
    .orderHandBoxSearchButtonBox{
        flex: 0.2;
    }
    .orderHandBoxSearchButton{
        padding-top: 3px;
        padding-block: 3px;
        border-radius: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #1cb3ef;
        color: #fff;
    }
    .orderHandBoxOrderTop{
        border-bottom: 1.5px solid #ccc;
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .orderHandBoxOrderTop div{
        font-weight: 600;
    }
    .orderHandBoxOrderTop div,
    .orderHandBoxOrders div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .orderHandBoxOrder{
        border-bottom: 1.5px solid #f0f0f0;
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .orderHandBoxOrderTopOrderId,
    .orderHandBoxOrderTopOrderIdZi{
        flex: 1;
    }
    .orderHandBoxOrderTopDishes{
        flex: 2;
        display: flex;
        flex-wrap: wrap;
    }
    .orderHandBoxOrderTopDish{
        padding-left: 8px;
        padding-right: 8px;
    }
    .orderHandBoxOrderTopDishesZi{
        flex: 2;
    }
    .orderHandBoxOrderTopAddress,
    .orderHandBoxOrderTopAddressZi{
        flex: 2;
    }
    .orderHandBoxOrderTopNotes,
    .orderHandBoxOrderTopNotesZi{
        flex: 1.5;
        flex-wrap: wrap;
    }
    .orderHandBoxOrderTopPrice,
    .orderHandBoxOrderTopPriceZi{
        flex: 1;
    }
    .orderHandBoxOrderTopPriceContent1{
        color: #ffa200;
        font-weight: 600;
    }
    .orderHandBoxOrderTopPriceContent2{
        font-size: 18px;        
        font-weight: 600;
        color: #ffa200;
    }
    .orderHandBoxOrderTopState,
    .orderHandBoxOrderTopStateZi{
        flex: 1;
    }
    .orderHandBoxOrderTopOperate,
    .orderHandBoxOrderTopOperateZi{
        flex-wrap: wrap;
        flex: 2;
    }
    .OrderTopOperateRefund,
    .OrderTopOperateSendGood,
    .OrderTopOperateView{
        color: 17px;
        cursor: pointer;
        border-radius: 6px;
        width: 50px;
        margin-left: 5px;
        margin-right: 5px;
        text-align: center;
        margin-bottom: 8px;
    }
    .OrderTopOperateAccess,
    .OrderTopOperateRefuse{
        color: 17px;
        cursor: pointer;
        border-radius: 6px;
        width: 60px;
        margin-left: 5px;
        margin-right: 5px;
        text-align: center;
        margin-bottom: 8px;
    }
    .OrderTopOperateRefund{
        border: 1.5px solid rgb(188, 66, 66);
        color: rgb(188, 66, 66);
    }
    .OrderTopOperateRefund:hover{
        color: #fff;
        background-color: rgb(188, 66, 66);
    }
    .OrderTopOperateSendGood{
        border: 1.5px solid #458cbe;
        color: #458cbe;
    }
    .OrderTopOperateSendGood:hover{
        color: #fff;
        background-color: #458cbe;
    }
    .OrderTopOperateView{
        border: 1.5px solid #7f7f7f;
        color: #7f7f7f;
    }
    .OrderTopOperateView:hover{
        color: #fff;
        background-color: #7f7f7f;
    }
    .OrderTopOperateAccess{
        border: 1.5px solid #5ac37d;
        color: #5ac37d;
    }
    .OrderTopOperateAccess:hover{
        color: #fff;
        background-color: #5ac37d;
    }
    .OrderTopOperateRefuse{
        border: 1.5px solid #bacc43;
        color: #bacc43;
    }
    .OrderTopOperateRefuse:hover{
        color: #fff;
        background-color: #bacc43;
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
