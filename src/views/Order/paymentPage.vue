<template>
    <div class="paymentBigBox">
        <div class="TopBox">
            <div class="orderBoxUpperReturn" @click="orderBoxUpperReturnClick"><i class="angle left icon"></i></div>
            <div class="paymentBoxTop">等待支付</div>
        </div>       
        <div class="paymentBoxUpper">
            <div class="paymentBoxUpperContent">
                <span class="paymentBoxUpperZi1" v-if="paymentBoxValue==1">待支付，剩余&nbsp;</span><span class="paymentBoxUpperZi1" v-if="paymentBoxValue==1">{{ nowTime }}</span>
                <!-- 可以申请退款 -->
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==2">订单已付款</span>
                <!-- 可以申请退款 -->
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==3">订单已完成</span>
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==4">订单已评价，期待下次光临</span>
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==5">订单已取消</span>
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==6">正在申请退款，等待商家通过</span>
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==7">退款成功</span>
                <!-- 可以申请退款 -->
                <span class="paymentBoxUpperZi2" v-if="paymentBoxValue==8">商家未通过退款申请</span>
            </div>
        </div>
        <div class="paymentBoxMight" v-if="paymentBoxValue==1"><i class="volume down icon"></i>15分钟内未支付,&nbsp;订单将自动取消</div>
        <div class="paymentBoxDown"  v-if="paymentBoxValue==1">
            <div class="paymentBoxDownBox1">
                <span>请尽快支付</span>
                <span class="paymentBoxDownDeliver">蓝骑士专送</span>
            </div>
            <div class="paymentBoxDownBox2">
                <div class="paymentBoxDownContent1" @click="paymentBoxDownContentClick1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="check square icon"></i>&nbsp;去支付</div>
                <div class="paymentBoxDownContent2" @click="paymentBoxDownContentClick2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="file excel icon"></i>&nbsp;&nbsp;取消订单&nbsp;</div>
            </div>
        </div>
        <!-- 申请退款 -->
        <div class="paymentBoxMiddle" v-if="paymentBoxValue==2||paymentBoxValue==3||paymentBoxValue==8">
            <div class="paymentBoxDownBox1">
                <span class="paymentBoxDownDeliver1">蓝骑士专送</span>
                <span class="paymentBoxDownDeliver2" v-if="paymentBoxValue==2">订单正在路上，请耐心等待</span>
            </div>
            <div class="paymentBoxDownBox3">
                <div class="paymentBoxDownContent3" @click="paymentBoxDownContentClick3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="file excel icon"></i>&nbsp;&nbsp;申请退款&nbsp;</div>
                <div class="paymentBoxDownContent4" @click="paymentBoxDownContentClick4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="edit icon"></i>&nbsp;&nbsp;立即评价&nbsp;</div>
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

    <!-- 评价弹窗 -->
    <!--  v-if="categoryStore.openAddCategoryDown" -->
     <div class="zhezhao1" id='zhezhao1' v-if="openRemarkDown"></div>
        <div class="tankuang1" v-if="openRemarkDown">
            <div id="header1">
                <div class="headTitle">评价</div>
                <div id="header-right1" @click="hidder1">x</div>
            </div>
            <div class="modalContent">
                <div>
                    <span>星级：</span>
                    <span v-for="item in 5" :key="item" class="starClass">
                        <i class="star icon" @click="starClick"></i>
                    </span>
                </div>
                <div class="remarkContentBox">
                    <span>评价：</span>
                    <textarea class="textareaArea" v-model="textareaValue"></textarea>
                </div>
                <div class="imgContentBox">
                    <span>图片：</span>
                    <span v-for="item in myRemarkImgList" :key="item">
                        <div class="smallBox" @click="smallBoxDeleteClick">x</div>
                        <img :src="item" class="storeImage1">
                    </span>
                    <span>
                        <img ref="imgBackgroundRef" src="http://localhost:8080/upload/upload.png" class="storeImage2"  @click="BackgroundClick">
                        <input id="uploadBackgroundImage" type="file" class="upload" ref="uploadBackgroundInput" style="display: none" @change="uploadBackgroundClick">
                    </span>
                </div>
            </div>
            
            <div class="buttonBox">
                <button class="TanConfirmButton" @click="TanConfirmClick">提交</button>
                <button class="TanCancelButton" @click="hidder1">取消</button>
            </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus';
    import { selectDishOrderById, updateDishOrderCancel } from '@/apis/dishOrderApi.js'
    import { selectById } from '@/apis/shop.js'
    import { insertRemark } from '@/apis/remarkApi.js'
    import { uploadShopImage} from '@/apis/shop.js'
    import {useOrderOneStore} from'@/stores/orderOneStore.js'
    const orderOneStore=useOrderOneStore()
    const router = useRouter();

    const cartDishListValue=ref([])
    const cartListValue=ref([])
    const addressValue=ref([])
    let paymentBoxValue=ref(1)//判断支付状态
    let openPaymentDown=ref(true)
    let openRemarkDown=ref(false)
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
        console.log(cartListValue.value[0].id)
        //从数据库获取这个订单的实时状态
        const apiData={
            id: cartListValue.value[0].id
        }
        const res=await selectDishOrderById(apiData)
            console.log(res.data.data)
            if(res.data.data.state=="提交订单"){
                paymentBoxValue.value=1
            }else{
                openPaymentDown.value=false
            }
            if(res.data.data.state=="已付款"){
                paymentBoxValue.value=2
            }
            if(res.data.data.state=="已完成"){
                paymentBoxValue.value=3
                openRemarkDown.value=true
            }
            if(res.data.data.state=="已评价"){
                paymentBoxValue.value=4
            }
            if(res.data.data.state=="已取消"){
                paymentBoxValue.value=5
            }
            if(res.data.data.state=="申请退款"){
                paymentBoxValue.value=6
            }
            if(res.data.data.state=="同意退款"){
                paymentBoxValue.value=7
            }
            if(res.data.data.state=="拒绝退款"){
                paymentBoxValue.value=8
            }
            console.log(paymentBoxValue.value)
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
        
        // //判断该用户是否评价了该订单，如果评价了这里不需要显示’立即评价‘
        // const apiData1={
        //     orderId: cartListValue.value[0].id,
        //     userId: localStorage.getItem("id")
        // }
        // const res1=await selectRemarkByOrderIdAndUserId(apiData1)
        //     console.log(res1.data.data)
        //     if(res1.data.data==null){
        //         console.log("null")
        //     }

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
    

    //评价弹窗------
    var imgBackgroundRef=ref(null) 
    var uploadBackgroundInput=ref(null)
    let myRemarkImgList=ref([])
    let textareaValue=ref("")
    //上传图片
    function uploadBackgroundClick(){
        console.log("点击选择框")
        const file = uploadBackgroundInput.value.files[0];
        console.log(file)
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                // imgBackgroundRef.value.src=file.path
                console.log(reader.result)

                // 创建一个 FormData 对象
                let formData = new FormData();
                formData.append('username', creator);
                formData.append('avatar', file);
                console.log(creator)
                console.log(file)

                console.log(formData)
                console.log("上传")
                //保存本地
                const res=await uploadShopImage(formData)
                    console.log(res)
                    const userObj = res.data.data
                    console.log(userObj)
                    console.log("洒水："+userObj.url)
                    //加入图片数组
                    myRemarkImgList.value.push(userObj.url)
                    console.log(myRemarkImgList.value)
            };
        }
    };
    //点击星级
    function starClick(event){
        console.log("点击")
        const starBoxes=document.querySelectorAll('.starClass')
        console.log(starBoxes)
        console.log(event.target)
        let flag=1;
        for(let i=0;i<starBoxes.length;i++){
            console.log(starBoxes[i])
            console.log(starBoxes[i].parentNode)
            if(event.target.parentNode!=starBoxes[i]&&flag==1){
                starBoxes[i].classList.add('starActive')
            }else if(event.target.parentNode==starBoxes[i]){
                flag=0
                starBoxes[i].classList.add('starActive')
            }else if(event.target.parentNode!=starBoxes[i]&&flag==0){
                starBoxes[i].classList.remove('starActive')
            }
        }
    }
    //删除上传的图片
    function smallBoxDeleteClick(event){
        console.log(event.target)
        console.log(event.target.parentNode)
        console.log(event.target.parentNode.childNodes[1])
        console.log(event.target.parentNode.childNodes[1].src)
        let ans=-1;
        for(let i=0;i<myRemarkImgList.value.length;i++){
            console.log(myRemarkImgList.value[i])
            if(myRemarkImgList.value[i]==event.target.parentNode.childNodes[1].src){
                console.log("相等")
                ans=i;
            }
        }
        myRemarkImgList.value.splice(ans,1)
    }
    //点击评论
    async function TanConfirmClick(){
        const starBoxes=document.querySelectorAll('.starActive')
        console.log(starBoxes)
        if(starBoxes.length==0){
            console.log("为空")
            ElMessage.warning("请选择星级")
            return
        }
        if(textareaValue.value==""){
            ElMessage.warning("请输入评论")
            return
        }
        //接着上传到数据库
        const apiData={
            userId: localStorage.getItem("id"),
            orderId: localStorage.getItem("orderId"),
            content: textareaValue.value,
            star: starBoxes.length,
            images: JSON.stringify(myRemarkImgList.value)
        }
        console.log(apiData)
        const res=await insertRemark(apiData)
            console.log(res.data.data)
            ElMessage.success("评论成功")
            openRemarkDown.value=false

        //还要修改数据库中订单的状态（从已完成到已评价）
        const apiData1={
            id: localStorage.getItem("orderId"),
            state: "已评价"
        }
        const res1=await updateDishOrderCancel(apiData1)
            console.log(res1.data.data)
            paymentBoxValue.value=4
            console.log(paymentBoxValue.value)
    }


    function BackgroundClick(){
        uploadBackgroundInput.value.click();
    }
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
    //申请退款
    async function paymentBoxDownContentClick3(){
        console.log(paymentBoxValue.value)
        let result = confirm("你确定要申请退款吗");
        if(!result){
            return
        }
        //修改数据库的状态
        console.log(localStorage.getItem("order"))
        const apiData={
            id: localStorage.getItem("orderId"),
            state: "申请退款"
        }
        const res=await updateDishOrderCancel(apiData)
            console.log(res.data.data)
        ElMessage.success("正在申请退款，等待商家通过")
        //返回主页面
        router.push(`/mainPage`);
    }
    //立即评价
    async function paymentBoxDownContentClick4(){
        //打开弹窗
        openRemarkDown.value=true
    }

    function hidder1(){
        openRemarkDown.value=false
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
    .paymentBoxMiddle{
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
    .paymentBoxDownDeliver1{
        font-size: 16px;
        display: inline-block;
        margin-left: 30px;
    }
    .paymentBoxDownDeliver2{
        font-size: 14px;
        display: inline-block;
        margin-left: 30px;
    }
    .paymentBoxDownBox2,
    .paymentBoxDownBox3{
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
    .paymentBoxDownContent3,
    .paymentBoxDownContent4{
        display: inline-block;
        margin-top: 10px;
        width: 73px;
        cursor: pointer;
    }
    .paymentBoxDownContent4{
        margin-left: 20px;
    }
    .paymentBoxDownContent3:hover,
    .paymentBoxDownContent4:hover{
        border-radius: 8px;
        background-color: #f6f6f6;
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
    /* 评价弹窗 */
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
    .TanCancelButton{
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
    .remarkContentBox{
        margin-top: 20px;
        display: flex;
    }
    .starClass{
        color: #ccc;
    }
    .starActive{
        color: rgb(36, 135, 227);
    }
    .imgContentBox{
        margin-top: 20px;
        display: flex;
    }
    .smallBox{
        background-color: #fff;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        font-weight: 600;
        position: absolute;
        line-height: 20px;
        text-align: center;
        margin-left: 10px;
        cursor: pointer;
    }
    .storeImage1,
    .storeImage2{
        width: 100px;
        height: 100px;
        border-radius: 5px;
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .textareaArea{
        width: 300px;
    }
</style>