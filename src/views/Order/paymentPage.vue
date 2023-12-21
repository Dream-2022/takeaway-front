<template>
    <div class="paymentBigBox">
        <div class="TopBox">
            <div class="orderBoxUpperReturn" @click="orderBoxUpperReturnClick"><i class="angle left icon"></i></div>
            <div class="paymentBoxTop">等待支付</div>
        </div>       
        <div class="paymentBoxUpper">
            <div class="paymentBoxUpperContent">
                <span class="paymentBoxUpperZi">待支付，剩余&nbsp;</span><span class="paymentBoxUpperZi">{{ nowTime }}</span>
            </div>
        </div>
        <div class="paymentBoxMight"><i class="volume down icon"></i>15分钟内未支付,&nbsp;订单将自动取消</div>
        <div class="paymentBoxDown">
            <div class="paymentBoxDownBox1">
                <span>请尽快支付</span>
                <span class="paymentBoxDownDeliver">蓝骑士专送</span>
            </div>
            <div class="paymentBoxDownBox2">
                <div class="paymentBoxDownContent1" @click="paymentBoxDownContentClick1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="check square icon"></i>&nbsp;去支付</div>
                <div class="paymentBoxDownContent2" @click="paymentBoxDownContentClick2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="file excel icon"></i>&nbsp;&nbsp;取消订单&nbsp;</div>
            </div>
        </div>
        <div class="paymentBoxBottom">
            <div class="paymentBoxBottomBox" v-for="cart in cartDishListValue" :key="cart">
            <div class="orderBoxBottomTitle">{{ cart.shopName }}</div>
                <div class="orderBoxBottomDishes">
                    <div class="orderBoxBottomDishBox" v-for="item in cart.dishIdList" :key="item">
                        <div class="orderBoxBottomDishLeft">
                            <div><img :src="item.picture" class="orderBoxBottomDishLeftImg"></div>
                        </div>
                        <div class="orderBoxBottomDishRight">
                            <div class="orderBoxBottomDishRightName">{{ item.dishName }}</div>
                            <div class="orderBoxBottomDishRightFlavor">{{ item.dishFlavorZi }}</div>
                            <div class="orderBoxBottomDishRightZi">
                                <span>&nbsp;x&nbsp;</span>
                                <span>{{ item.quantity }}</span>
                            </div>
                        </div>
                        <div class="orderBoxBottomDishPrice">
                            <span>￥</span>
                            <span>{{ item.price }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paymentBoxBottomPack">
                <div class="paymentBoxBottomPackLeft">打包费</div>
                <div class="paymentBoxBottomPackRight">
                    <span>￥</span>
                    <span>{{ packAll }}</span>
                </div>
            </div>
            <div class="paymentBoxBottomDelivery">
                <div class="paymentBoxBottomDeliveryLeft">配送费</div>
                <div class="paymentBoxBottomDeliveryRight">
                    <span>￥</span>
                    <!-- 这里可能付款的是多个店家里面的商品，所以是配送费之和 -->
                    <span>{{ deliveryAll }}</span>
                </div>
            </div>
            <div class="paymentBoxBottomPrice">
                <span>实付款 :&nbsp;</span>
                <span class="paymentBoxBottomPriceZi">￥</span>
                <span class="paymentBoxBottomPriceZi">{{ priceAll }}</span>
            </div>
        </div>
        <div class="paymentBoxDownward">
            <div class="paymentBoxDownwardNodes">
                <div class="paymentBoxDownwardCommentsLeft">订单编号</div>
                <div class="paymentBoxDownwardCommentsRight">{{ cartListValue[0]?.id }}</div>
            </div>
            <div class="paymentBoxDownwardNodes">
                <div class="paymentBoxDownwardNodesLeft">收货信息</div>
                <div class="paymentBoxDownwardNodesRight">
                    <div>{{ addressValue.addressDetail }}</div>
                    <div>
                        <span>{{ addressValue.myName }}&nbsp;&nbsp;</span>
                        <span>{{ addressValue.phone }}</span>
                    </div>
                </div>
            </div>
            <div class="paymentBoxDownwardComments">
                <div class="paymentBoxDownwardCommentsLeft">备注</div>
                <div class="paymentBoxDownwardCommentsRight">{{ cartListValue[0]?.notes }}</div>
            </div>
            <div class="paymentBoxDownwardDetail">
                <div class="paymentBoxDownwardDetailLeft">餐具数</div>
                <div class="paymentBoxDownwardDetailRight">{{ cartListValue[0]?.tablewareNum }}</div>
            </div>
        </div>
    </div>

    <!-- 支付弹窗 -->
    <div class="zhezhao2" id='zhezhao2' v-if="openPaymentDown"></div>
    <div class="tankuang2" v-if="openPaymentDown">
        <div id="header2">
            <div class="headTitle">确认支付</div>
            <div id="header-right2" @click="hidder2">x</div>
        </div>
        <div class="modalContent">
            <div class="paymentDownBox">
                <span class="paymentDownBoxZi">总价格：￥</span>
                <span class="paymentDownBoxPrice">{{ priceAll }}</span>
            </div>
            <div class="passwordDiv">
                <span>请确认密码：</span>
                <input type="password"  class="passwordInput" placeholder="请输入密码" v-model="passwordValue">
            </div> 
        </div>

        <div class="buttonBox">
            <button class="TanConfirmButton" @click="addAddressButton">确认支付</button>
            <button class="TanCancelButton" @click="hidder2">取消</button>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus';
    import { selectDishOrderById, updateDishOrderCancel } from '@/apis/dishOrderApi.js'
    import { selectById } from '@/apis/shop.js'
    import {useOrderOneStore} from'@/stores/orderOneStore.js'
    const orderOneStore=useOrderOneStore()
    const router = useRouter();

    const cartDishListValue=ref([])
    const cartListValue=ref([])
    const addressValue=ref([])
    let openPaymentDown=ref(true)
    let deliveryAll=ref(0)//计算配送费
    let packAll=ref(0)//计算打包费
    let priceAll=ref(0)//计算全部
    let nowTime=ref("15:00")
    let passwordValue=ref("")
    onMounted(async()=>{
        //跳转到这个页面需要在localStock中存入orderShopList和addressValue
        //订单商品信息
        cartDishListValue.value=JSON.parse(localStorage.getItem("orderShopList"))
        //插入数据库的订单信息
        cartListValue.value=JSON.parse(localStorage.getItem("orderOneList"))
        console.log(cartListValue.value)
        console.log(cartListValue.value[0])
        console.log(cartDishListValue.value)
        console.log(cartDishListValue.value.dishIdList)
        //配送地址信息
        console.log(localStorage.getItem("addressValue"))
        addressValue.value=JSON.parse(localStorage.getItem("addressValue"))

        //计算配送费
        console.log(cartDishListValue.value.length)
        for(let i=0;i<cartDishListValue.value.length;i++){
            console.log(cartDishListValue.value[i])
            console.log(cartDishListValue.value[i].shopId)
            const apiData={
                shopId: cartDishListValue.value[i].shopId
            }
            const res=await selectById(apiData)
                console.log(res.data.data)
                console.log(res.data.data.delivery)
                deliveryAll.value=deliveryAll.value+ res.data.data.delivery
        }

        //计算打包费（循环每一个商品*数量）//计算总费用
        for(let i=0;i<cartDishListValue.value.length;i++){
            console.log(cartDishListValue.value[i])
            for(let j=0;j<cartDishListValue.value[i].dishIdList.length;j++){
                const dishValue=cartDishListValue.value[i].dishIdList[j]
                console.log(dishValue)
                packAll.value=packAll.value+dishValue.pack*dishValue.quantity
                priceAll.value=priceAll.value+dishValue.price*dishValue.quantity
            }
        }
        console.log(packAll.value)
        deliveryAll.value=(deliveryAll.value).toFixed(2)
        packAll.value=(packAll.value).toFixed(2)
        priceAll.value=(priceAll.value+(Number)(packAll.value)+(Number)(deliveryAll.value)).toFixed(2)
        
        //更新倒计时

        let k=setInterval(updateCountdown,1000)
        console.log(localStorage.getItem("orderOneList"))
        console.log(JSON.parse(localStorage.getItem("orderOneList")))
        console.log(cartListValue.value)
        console.log(cartListValue.value[0])
        console.log(cartListValue.value[0].updateTime)
        const targetTime=new Date(cartListValue.value[0].updateTime)
        console.log(targetTime)
        function updateCountdown(){
            const currentTime=new Date();
            const timeDiff=targetTime.getTime()+15*60*1000-currentTime.getTime()
            const minutes=Math.floor((timeDiff%(1000*60*60))/(1000*60))
            const seconds=Math.floor((timeDiff%(1000*60))/1000)
            if(minutes<=0&&seconds<=0){
                //更新订单状态(这里要发请求到后端，取消订单了)
                clearInterval(k)
                return
            }
            nowTime.value=`${minutes}分钟 ${seconds}秒`
        }
    })
    
    let orderOneList=ref([])
    //确认支付
    async function addAddressButton(){
        console.log("确认支付")
        if(passwordValue.value==""){
            ElMessage.warning("请输入密码")
            return
        }
        if(passwordValue.value.length!=6){
            ElMessage.warning("密码长度不正确")
            return
        }
        //修改订单状态
        //修改数据库的状态
        console.log(localStorage.getItem("orderOneList"))
        orderOneList=JSON.parse(localStorage.getItem("orderOneList"))
        console.log(orderOneList)
        let flag=0;
        for(let i=0;i<orderOneList.length;i++){
            console.log(orderOneList[i])
            console.log(localStorage.getItem("order"))
            const apiData={
                id: orderOneList[i].id,
                state: "已付款"
            }
            const res=await updateDishOrderCancel(apiData)
                if(res.data.code==0){
                    console.log(res.data.data)
                    flag=1;
                }else if(res.data.code==400009){
                    flag=2;
                }
        }
        console.log(flag)
        if(flag==1){
            ElMessage.success("付款成功")
        }
        if(flag==2){
            ElMessage.warning("订单已超时")
        }
           
        //返回主页面
        router.push(`/mainPage`);
    }
    //去支付
    function paymentBoxDownContentClick1(){
        //打开支付弹窗
        openPaymentDown.value=true
    }
    //取消订单
    async function paymentBoxDownContentClick2(){
        let result = confirm("你确定要取消这个订单吗");
        if(!result){
            return
        }
        //修改数据库的状态
        console.log(localStorage.getItem("order"))
        const apiData={
            id: localStorage.getItem("orderId"),
            state: "取消订单"
        }
        const res=await updateDishOrderCancel(apiData)
            console.log(res.data.data)
        ElMessage.success("成功取消该订单")
        //返回主页面
        router.push(`/mainPage`);
    }

    
    //返回
    function orderBoxUpperReturnClick(){
        router.push(`/mainPage`);
    }
    function hidder2(){
        openPaymentDown.value=false
    }
</script>
<style scoped>
    .paymentBigBox{
        width: 800px;
        margin: 0 auto;
        background-color: #f8f8f8;
        padding-bottom: 50px;
    }
    .orderBoxUpperReturn{
        display: inline-block;
        font-size: 17px;
        margin-left: 20px;
        margin-right: 323px;
    }
    .orderBoxUpperReturn:hover{
        background-color: #48a4eb;
        border-radius: 5px;
    }
    .TopBox{
        color: #fff;
        background-color: #0292FE;
        width: 100%;
    }
    .paymentBoxTop{
        height: 50px;
        line-height: 50px;
        
        font-size: 16px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .paymentBoxUpper{
        height: 120px;
    }
    .paymentBoxUpperContent{
        line-height: 120px;
        margin-left: 50px;
        font-size: 20px;
        font-weight: 600;
    }
    .paymentBoxMight{
        width: 90%;
        background-color: #fff;
        margin: 0 auto;
        height: 35px;
        line-height: 35px;
        padding-left: 42px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    .paymentBoxDown{
        width: 90%;
        background-color: #fff;
        margin: 0 auto;
        padding-bottom: 25px;
        border-radius: 8px;
    }
    .paymentBoxDownBox1{
        padding: 30px 20px 30px 80px;
        font-size: 16px;
    }
    .paymentBoxDownDeliver{
        font-size: 14px;
        display: inline-block;
        margin-left: 30px;
    }
    .paymentBoxDownBox2{
        color: rgb(17, 92, 167);
        display: flex;
        justify-content: center;
        font-size: 15px;
    }
    .paymentBoxDownContent1{
        display: inline-block;
        width: 52px;
        cursor: pointer;
    }
    .paymentBoxDownContent2{
        display: inline-block;
        width: 73px;
        margin-left:82px;
        cursor: pointer;
    }
    .paymentBoxDownContent1:hover,
    .paymentBoxDownContent2:hover{
        background-color: #f3f3f3;
        border-radius: 5px;
    }
    .paymentBoxBottom{
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        background-color: #fff;
        padding: 10px 10px 60px 42px;
        border-radius: 8px;
    }
    .paymentBoxBottomBox{
        margin-bottom: 10px;
    }
    
    .orderBoxBottomTitle{
        padding-top: 16px;
        padding-bottom: 10px;
        margin-left: 3px;
        color: #595959;
    }
    .orderBoxBottomDishLeftImg{
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }
    .orderBoxBottomDishBox{
        display: flex;
        margin-bottom: 10px;
    }
    .orderBoxBottomDishLeft{
        flex: 2;
    }
    .orderBoxBottomDishRight{
        margin-left: 10px;
        flex: 10;
    }
    .orderBoxBottomDishRightName{
        font-weight: 600;
        font-size: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .orderBoxBottomDishRightFlavor{
        color: #595959;
    }
    .orderBoxBottomDishPrice{
        flex: 2;
        line-height: 100px;
        color: #ffa200;
        font-weight: 600;
        font-size: 16px;
    }
    .paymentBoxBottomPack,
    .paymentBoxBottomDelivery{
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .paymentBoxBottomPackLeft,
    .paymentBoxBottomDeliveryLeft{
        float: left;
        margin-right: 50px;
    }
    .paymentBoxBottomPackRight,
    .paymentBoxBottomDeliveryRight{
        float: right;
        margin-right: 63px;
    }
    .paymentBoxBottomPrice{
        float: right;
        font-size: 14px;
        margin-right: 63px;
        height: 30px;
    }
    .paymentBoxBottomPriceZi{
        font-weight: 600;
        color:#ffa200;
        font-size: 16px;
    }
    .orderBoxBottomPackZi1,
    .orderBoxBottomDeliveryZi1{
        flex: 6;
    }
    .orderBoxBottomPackZi2,
    .orderBoxBottomDeliveryZi2{
        flex: 1;
        font-weight: 600;
    }
    .paymentBoxDownward{
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 10px 20px 42px;
        border-radius: 8px;
    }
    .paymentBoxDownwardNodes,
    .paymentBoxDownwardComments,
    .paymentBoxDownwardDetail{
        display: flex;
    }
    .paymentBoxDownwardNodesLeft,
    .paymentBoxDownwardCommentsLeft,
    .paymentBoxDownwardDetailLeft{
        flex: 2;
        line-height: 42px; 
    }
    .paymentBoxDownwardNodesRight,
    .paymentBoxDownwardCommentsRight,
    .paymentBoxDownwardDetailRight{
        flex: 1;
    }
    .paymentBoxDownwardCommentsRight,
    .paymentBoxDownwardDetailRight{
        line-height: 42px;
    }
    .paymentDownBox{
        margin-bottom: 30px;
        margin-left: 20px;
    }
    .paymentDownBoxPrice{
        color: rgb(1, 62, 142);
        font-size: 18px;
        font-weight: 600;
    }
    /* 支付弹窗 */
    #header2{
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
    }
    .zhezhao2{
        position: fixed;
        left: 0px;
        top: 0px;
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    .tankuang2{
        position: fixed;
        top:40px;
        left:50%;
        transform:translateX(-50%);
        background: #fff;
        border-radius: 5px;
        color: black;
    }
    .tankuang2{
        width: 450px;
    }
    #header-right2{
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
        max-height: 500px;
        white-space: nowrap;
        overflow-y:scroll;
    }
    .passwordDiv{
        margin:0 20px 20px 20px;
    }
    .passwordInput{
        font-size: 17px;
        outline: none;
        border: none;
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
        background:rgb(0, 148, 254);
        color:#fff;
        margin-left:30px;
    }
    .TanCancelButton{
        width:80px;
        height:35px;
        background:#dedede;
        color:#000;
        border:1px solid #ccc;
        border-radius:10px;
        margin-left: 40px;
    }

    .close:hover
    {
        background:#eee;
    }
    .headTitle{
        color: rgb(73, 73, 73);
        margin-top: 16px;
        margin-left: 20px;
        font-size: 17px;
    }
</style>