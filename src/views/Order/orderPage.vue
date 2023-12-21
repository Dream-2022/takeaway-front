<template>
    <div class="orderPageBigBox">
        <div class="orderBoxUpper">
            <div class="orderBoxUpperReturn" @click="orderBoxUpperReturnClick"><i class="angle left icon"></i></div>
            <div class="orderBoxUpperTitle">确认订单</div>
        </div>
        <div class="orderBoxTop">
            <div><i class="bullhorn icon"></i>温馨提示：请适量点餐，避免浪费</div>
        </div>
        <div class="orderBoxMight">
            <div class="orderBoxMightTitle">外卖配送</div>
            <div class="orderBoxMightDeliveryBox">
                <div class="orderBoxMightDeliveryLeft">
                    <div class="orderBoxMightDeliveryAddress">{{ DeliveryAddressValue.addressDetail }}</div>
                    <div class="orderBoxMightDeliveryName">
                        <span class="orderBoxMightDeliveryNickname">{{ DeliveryAddressValue.myName }}</span>
                        <span class="orderBoxMightDeliveryPhone">{{ DeliveryAddressValue.phone }}</span>
                    </div>
                </div>
                <div class="orderBoxMightDeliveryRight" @click="dianwo">
                    <i class="angle right icon"></i>
                </div>
            </div>
        </div>
        <div class="orderBoxBottom">
            <div v-for="cart in cartDishListValue" :key="cart">
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
            <div class="orderBoxBottomPack">
                <div class="orderBoxBottomPackZi1">打包费</div>
                <div class="orderBoxBottomPackZi2">
                    <span>￥</span>
                    <span>{{ orderPackAll }}</span>
                </div>
            </div>
            <div class="orderBoxBottomDelivery">
                <div class="orderBoxBottomDeliveryZi1">配送费</div>
                <div class="orderBoxBottomDeliveryZi2">
                    <span>￥</span>
                    <span>{{ orderDeliveryAll }}</span>
                </div>
            </div>
            <div class="orderBoxBottomDelivery">
                <div class="orderBoxBottomPrice1">共计</div>
                <div class="orderBoxBottomPrice2">
                    <span>￥</span>
                    <span>{{ orderPriceAll }}</span>
                </div>
            </div>
        </div>
        <div class="orderBoxBelow">
            <div class="orderBoxBelowPreferenceBox">
                <span v-if="!orderBoxNoteValue" class="orderBoxBelowNoteZi" @click="orderBoxBelowNoteClick">备注</span>
                <span class="orderBoxBelowPreferences" @click="orderBoxBelowNoteClick">{{ inputNodes }}<i class="angle right icon"></i></span>
                <span v-if="orderBoxNoteValue">
                    <input class="orderBoxBelowNotes" placeholder="请输入备注" v-model="orderBoxBelowNotesValue">
                    <span class="orderBoxBelowNotesButton" @click="orderBoxBelowNotesButtonClick">确认</span>
                </span>
            </div>


            <div class="orderBoxBelowTablewareBox">
                <span v-if="!orderBoxTablewareValue" class="orderBoxBelowTablewareZi" @click="orderBoxBelowTablewareClick">餐具份数</span>
                <span class="orderBoxBelowRequired" @click="orderBoxBelowTablewareClick">{{ inputTableware }}<i class="angle right icon"></i></span>
                <span v-if="orderBoxTablewareValue">
                    <input class="orderBoxBelowTableware" type="number" min="0" placeholder="请输入餐具数量" v-model="orderBoxBelowTablewareValue">
                    <span class="orderBoxBelowTablewareButton" @click="orderBoxBelowTablewareButtonClick">确认</span>
                </span>
            </div>

        </div>
    </div>
    <div class="submitButtonBox">
        <div class="submitButton" @click="submitButtonClick">提交订单</div>
    </div>
    <!-- 查看地址弹窗 -->
    <div class="zhezhao" id='zhezhao'></div>
    <div class="tankuang" style="display:none;">
        <div id="header">
            <div class="headTitle">地址管理</div>
            <div id="header-right" @click="hidder">x</div>

            <div class="modalContent">
            <div class="modalBody">
                <div class="addAddress" @click="addAddressClick"><i class="plus circle icon"></i>新建地址</div>
            </div>

            <div class="contentAddressList">
                <!-- 盒子 -->
                <div  v-for="item in addressList" :key="item" :value="item.id">
                <div class="contentAddress">
                    <div class="contentAddressTable1">
                    <a href="#">
                        <div  class="blackBoxFloatMo" v-if="item.addressDefault=='1'">默认地址</div>
                        <div class="blackBox" v-if="item.addressDefault=='0'">
                        <div class="blackBoxFloat" @click="defaultAddressButton">设为默认</div>
                        </div>
                        <div class="contentAddressBox">
                        <div class="contentAddressTitle">{{ item.province }}{{ item.city }}{{ item.county }}{{ item.addressDetail }}</div>
                        <div class="contentAddressNickname">{{ item.myName }}</div>
                        <div class="contentAddressPhone">{{ item.phone }}</div>
                        </div>
                    </a>
                    </div>
                        <div class="contentAddressTable2">
                        <div class="addressModify" @click="updateAddressButton(item)">修改</div>
                        <div class="addressDelete" @click="deleteAddressButton">删除</div>
                        <div class="addressSelect" @click="selectAddressButton(item)">选择</div>
                    </div>
                </div>
                </div>
            </div>
            
            <span class="prompt"></span>
            </div>
            
            <div class="buttonBox">
            <button class="TanConfirmButton" @click="hidder">确定</button>
            <button class="TanCancelButton" @click="hidder">关闭</button>
            </div>
        </div>
    </div>
    <!-- 修改地址弹窗 -->
    <div class="zhezhao1" id='zhezhao1'></div>
    <div class="tankuang1" style="display:none;">
        <div id="header">
            <div class="headTitle">地址管理</div>
            <div id="header-right1" @click="hidder1">x</div>

            <div class="modalContent">
            <div class="inputAddressBox">
                <div class="selectBox">
                    <select class="addressProvince" name="省" @change="handleProvinceChange" ref="myProvinceSelect">
                    <option v-for="item in reDistrictProvinceList" :key="item" :value="item.districtId">{{item.district}}</option>
                    </select>
                </div>
                <div class="selectBox">
                <select class="addressCity" name="市" @change="handleCityChange" ref="myCitySelect">
                    <option v-for="item in reDistrictCityList" :key="item" :value="item.districtId">{{item.district}}</option>
                </select>
                </div>
                <div class="selectBox">
                <select class="addressCounty" name="县" @change="handleCountyChange" ref="myCountySelect">
                    <option v-for="item in reDistrictCountyList" :key="item" :value="item.districtId">{{item.district}}</option>
                </select>
                </div>
                
                <div class="modalZi">详细地址</div>
                <input class="detailedAddress" placeholder="请输入详细地址" ref="myAddressDetail">
                <div class="modalZi">联系人</div>
                <input class="detailedAddress" placeholder="请输入姓名" ref="myName">
                <div class="modalZi">联系电话</div>
                <input class="detailedAddress detailedAddressPhone" placeholder="请输入电话" ref="myPhone">
                <!-- <button class="confirmAdd">添加</button>
                <button class="cancelAdd">取消</button> -->
                </div>
            </div>
            
            <div class="buttonBox">
            <button class="TanConfirmButton" @click="addAddressButton">{{ dianWoButtonZi }}</button>
            <button class="TanCancelButton" @click="hidder1">取消</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref, onMounted, nextTick} from 'vue'
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {useOrderOneStore} from'@/stores/orderOneStore.js'
    import {useCartOneStore} from'@/stores/cartOneStore.js'
    import {addressById,reDistrictProvinceAll,reDistrictCity,addressInsert,addressUpdate,addressDelete,addressDefault,selectAddressDefault} from '@/apis/address.js'
    import {selectById} from '@/apis/shop.js'
    import {addDishOrderOne} from '@/apis/dishOrderApi.js'
    const router = useRouter();
    const orderOneStore=useOrderOneStore()
    const cartOneStore=useCartOneStore()

    let orderPackAll=ref(0)
    let orderPriceAll=ref(0)
    let orderDeliveryAll=ref(0)
    let orderBoxBelowNotesValue=ref("")
    let orderBoxNoteValue=ref(false)
    let orderBoxTablewareValue=ref(false)
    let orderBoxBelowTablewareValue=ref("")
    let inputNodes=ref("请填写口味偏好")
    let inputTableware=ref("必选")
    let DeliveryAddressValue=ref({
        addressDetail:"请添加收货地址",
        myName:"添加收货人姓名",
        phone:"",
        truly: false//说明现在还没有地址，到时候不能被提交订单
    })//用户选中的地址
    const cartDishListValue=ref([])
    onMounted(async()=>{
        orderOneStore.orderOne=[]
        document.getElementById('zhezhao').style.display="none";
        document.getElementById('zhezhao1').style.display="none";
        //获取我的全部地址
        obtainMyAddressAll(localStorage.getItem("id"))
        //初始化市县下拉框为北京
        dropdownChu()

        //获取我的默认地址（存在没有地址的情况）
        const apiData={
            id: localStorage.getItem("id")
        }
        const res=await selectAddressDefault(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log("获取成功")
                if(res.data.data!=null){
                    DeliveryAddressValue.value=res.data.data
                    DeliveryAddressValue.value.truly=true
                }
                console.log(DeliveryAddressValue.value)
            }

        //渲染页面(找到购物列表)
        console.log("从商家购物车跳转")
        //从cartOne中获取到购物车
        console.log(cartOneStore.cartOne[0].shopId)
        if(cartOneStore.cartOne[0].shopId==0){
            cartDishListValue.value=JSON.parse(localStorage.getItem("orderShopList"))
        }else{
            cartDishListValue.value=cartOneStore.cartOne
        }
        console.log(localStorage.getItem("orderShopList"))
        console.log(cartDishListValue.value)
        console.log(cartDishListValue.value.dishIdList)

        //获取商品的flavorZiList
        
        for(let k=0;k<cartDishListValue.value.length;k++){
            const dishList=cartDishListValue.value[k].dishIdList
            console.log(cartDishListValue.value)
            for(let i=0;i<dishList.length;i++){
                console.log(dishList[i])
                let dishFlavorZi=ref("")
                for(let j=0;j<dishList[i].attributeList.length;j++){
                    console.log(dishList[i].attributeList[j])
                    for(let k=0;k<dishList[i].attributeList[j].flavorList.length;k++){
                        if(dishFlavorZi.value==""){
                            dishFlavorZi.value=dishList[i].attributeList[j].flavorList[k].flavorName
                        }
                        else{
                            dishFlavorZi.value=dishFlavorZi.value+"/"+dishList[i].attributeList[j].flavorList[k].flavorName
                        }
                    }
                }
                console.log(dishFlavorZi.value)
                dishList[i].dishFlavorZi=dishFlavorZi.value
            }
        }
        

        //初始化订单的价格
        for(let i=0;i<cartDishListValue.value.length;i++){
            console.log(cartDishListValue.value[i])
            const apiData={
                shopId: cartDishListValue.value[i].shopId
            }
            const res=await selectById(apiData)
                console.log(res.data.data)
                orderDeliveryAll.value=orderDeliveryAll.value+res.data.data.delivery
            for(let j=0;j<cartDishListValue.value[i].dishIdList.length;j++){
                const dishX=cartDishListValue.value[i].dishIdList[j]
                console.log(dishX)
                orderPackAll.value=orderPackAll.value+dishX.pack
                orderPriceAll.value=orderPriceAll.value+dishX.price
            }
        }
        orderPackAll.value=(orderPackAll.value).toFixed(2)
        orderDeliveryAll.value=(orderDeliveryAll.value).toFixed(2)
        orderPriceAll.value=(orderPriceAll.value+(Number)(orderPackAll.value)+(Number)(orderDeliveryAll.value)).toFixed(2)
        console.log(orderDeliveryAll.value)
        console.log(orderPackAll.value)
        console.log(orderPriceAll.value)
    })
    //点击提交订单
    async function submitButtonClick(){
        console.log("点击提交订单")
        //要把购物车里面的这个商品删除！！！！！！！！！！！！！！！！！！！！！！！！
        if(DeliveryAddressValue.value.truly===false){
            //说明还没有选中地址
            ElMessage.warning("请选择收货地址")
            return
        }
        console.log(orderBoxBelowTablewareValue.value) 
        console.log(orderBoxBelowTablewareValue.value=="") 
        if(orderBoxBelowTablewareValue.value===""){
            ElMessage.warning("请选择餐具数")
            return
        }
        const phone=DeliveryAddressValue.value.phone
        //接下来进入支付页面---------------------------------
        //userId，点击支付时间，支付状态，收货地址字符串，购买商品,备注，餐具数量
        console.log(DeliveryAddressValue.value)
        console.log(cartDishListValue.value)
        for(let i=0;i<cartDishListValue.value.length;i++){
            const apiData={
                userId: localStorage.getItem("id"),
                shopId: cartDishListValue.value[i].shopId,
                state: "提交订单",
                phone ,
                addressValue: JSON.stringify(DeliveryAddressValue.value),
                dishValue: JSON.stringify(cartDishListValue.value[i]),
                notes: orderBoxBelowNotesValue.value,
                tablewareNum:orderBoxBelowTablewareValue.value
            }
            const res=await addDishOrderOne(apiData)
                console.log(res.data.data)
                console.log(res.data.data.id)
            
            //将订单消息加入store
            orderOneStore.setOrderOne(res.data.data)
            console.log(orderOneStore.orderOne)
        }
        console.log(orderOneStore.orderOne.value)
        console.log(JSON.stringify(orderOneStore.orderOne.value))
        console.log(DeliveryAddressValue.value)
        console.log(JSON.stringify(DeliveryAddressValue.value))
        localStorage.setItem("orderOneList",JSON.stringify(orderOneStore.orderOne))
        localStorage.setItem("addressValue",JSON.stringify(DeliveryAddressValue.value))
        
        
        //将地址信息加入
        localStorage.setItem("addressValue",JSON.stringify(DeliveryAddressValue.value))
        
        //跳转页面
        router.push(`/paymentPage`);

    }
    //下拉框的变化
    async function dropdownChange(newProvince,City,County){
        const apiData={
            pid: newProvince
        }
        //1
        const res=await reDistrictCity(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                reDistrictCityList.value=res.data.data
                myCitySelect.value.value=City
            }
            await nextTick();
        //2

        if(City!=""){
            console.log("City为空")
            const apiData1={
                pid: City
            }
            const res1=await reDistrictCity(apiData1)
                console.log(res1.data.data)
                if(res1.data.code==0){
                    reDistrictCountyList.value=res1.data.data
                }
        }
        else{
            const apiData1={
                pid: myCitySelect.value.value
            }
            const res1=await reDistrictCity(apiData1)
                console.log(res1.data.data)
                if(res1.data.code==0){
                    reDistrictCountyList.value=res1.data.data
                    if(City!=""||County!=""){
                        myCountySelect.value.value=County
                    }
                    
                }
        }
    }
    let dianWoButtonZi=ref("添加")
    function dianwo(){
        document.getElementById('zhezhao').style.display="";
        document.querySelector('.tankuang').style.display="";
        obtainMyAddressAll(localStorage.getItem("id"))
    }
    function hidder(){
        document.getElementById('zhezhao').style.display="none";
        document.querySelector('.tankuang').style.display="none";
    }
    function dianwo1(){
        document.getElementById('zhezhao1').style.display="";
        document.querySelector('.tankuang1').style.display="";
    }
    function hidder1(){
        document.getElementById('zhezhao1').style.display="none";
        document.querySelector('.tankuang1').style.display="none";
    }
    //在第一个弹窗时点击添加按钮，进入第二个弹窗
    function addAddressClick(){
        dianWoButtonZi.value="添加"
        myAddressDetail.value.value=""
        myName.value.value=""
        myPhone.value.value=""
        //初始化市县下拉框
        dropdownChu()
        hidder()
        dianwo1()
    }

    //存储地址
    let addressList=ref([])
    let reDistrictProvinceList=ref([])
    let reDistrictCityList=ref([])
    let reDistrictCountyList=ref([])
    let myProvinceSelect=ref()
    let myCitySelect=ref()//省
    let myCountySelect=ref()//市
    let myAddressDetail=ref()//县
    let myName=ref()
    let myPhone=ref()
    //获取我设置的所有地址
    async function obtainMyAddressAll(userId){
    //获取用户的地址
    const apiData1={
            id:userId
        }
    const res1=await addressById(apiData1)
        console.log('成功发送')
        console.log(res1.data)
        if(res1.data.code==0){
            addressList.value=res1.data.data
        }
    }
    //初始化市县下拉框为北京
    async function dropdownChu(){
    //获取省市县下拉框
    const apiData1={
        id:localStorage.getItem("id")
    }
    const res2=await reDistrictProvinceAll(apiData1)
        console.log('成功发送')
        console.log(res2.data)
        console.log(res2.data.data)
        if(res2.data.code==0){
            reDistrictProvinceList.value=res2.data.data

        }
    const apiData3={
        pid: 35
    }
    const res3=await reDistrictCity(apiData3)
        console.log(res3.data.data)
        if(res3.data.code==0){
            reDistrictCityList.value=res3.data.data
        }
    const apiData4={
        pid: 397
    }
    const res4=await reDistrictCity(apiData4)
        console.log(res4.data.data)
        if(res4.data.code==0){
            reDistrictCountyList.value=res4.data.data
        }
    }
    //添加地址
    async function addAddressButton(){
        if(myAddressDetail.value.value===""||myName.value.value===""||myPhone.value.value===""){
            ElMessage.error("请输入完整信息")
            return
        }
        var regex = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!regex.test(myPhone.value.value)) {
            ElMessage.error("手机号码格式不正确");
            return
        }
        if(dianWoButtonZi.value=="添加"){
            console.log(myProvinceSelect.value.value)
            console.log("myCitySelect:"+myCitySelect.value.value)
            console.log("myCountySelect:"+myCountySelect.value.value)
            //将信息新增进address表
            const apiData1={
                    addressProvince:myProvinceSelect.value.value,
                    addressCity:myCitySelect.value.value,
                    addressCounty:myCountySelect.value.value,
                    addressDetail:myAddressDetail.value.value,
                    myName:myName.value.value,
                    user_id:localStorage.getItem("id"),
                    phone:myPhone.value.value
                }
            const res1=await addressInsert(apiData1)
                console.log(res1.data)
                if(res1.data.code==0){
                    ElMessage.success("添加成功")
                }
                hidder1()
                dianwo()
        }
        if(dianWoButtonZi.value=="修改"){
            console.log("修改"+myProvinceSelect.value.value)
            const apiData1={
                    addressProvince:myProvinceSelect.value.value,
                    addressCity:myCitySelect.value.value,
                    addressCounty:myCountySelect.value.value,
                    addressDetail:myAddressDetail.value.value,
                    myName:myName.value.value,
                    user_id:localStorage.getItem("id"),
                    id: myProvinceSelect.value.value,
                    phone:myPhone.value.value
                }
            const res1=await addressUpdate(apiData1)
                console.log(res1.data)
                if(res1.data.code==0){
                    ElMessage.success("添加成功")
                }
                hidder1()
                dianwo()
        }
    }
    //删除地址
    async function deleteAddressButton(event){
    var result = confirm("你确定要删除这个地址吗");
    //分为是默认地址和非默认地址的情况
    if(result){
        var parentWithValue = event.target.closest("[value]")
        let id=event.target.closest("[value]").getAttribute("value")
        console.log("要删除的地址盒子是："+id)
        const apiData1={
            id
        }
        const res1=await addressDelete(apiData1)
        console.log('成功发送')
        console.log(res1.data)
        console.log(res1.data.message)
        if(res1.data.code==0&&res1.data.data=="删除成功"){
            var parentContainer = parentWithValue.parentNode;
            parentContainer.removeChild(parentWithValue);
            ElMessage.success("删除成功")
            
        }
        if(res1.data.code==0&&res1.data.data=="不能删除默认地址"){
            ElMessage.success("不能删除默认地址")
        }
    }
    }
    //选择该地址
    function selectAddressButton(address){
        console.log(address)
        DeliveryAddressValue.value=address
        ElMessage.success("选择成功")
        hidder()
    }
    //修改地址
    async function updateAddressButton(item){
        dianWoButtonZi.value="修改"
        myAddressDetail.value.value=item.addressDetail
        myName.value.value=item.myName
        myPhone.value.value=item.phone
        hidder()
        
        dianwo1()
        console.log("执行了省myProvinceSelect:"+myProvinceSelect.value.value+','+item.addressProvince)
        myProvinceSelect.value.value=item.addressProvince
        console.log("执行了省myProvinceSelect:"+myProvinceSelect.value.value+','+item.addressProvince)

        await dropdownChange(item.addressProvince,item.addressCity,item.addressCounty)
        myCitySelect.value.value=item.addressCity
        myCountySelect.value.value=item.addressCounty

    }
    //默认地址
    async function defaultAddressButton(event){
    var parentWithValue = event.target.closest("[value]")
        let id=event.target.closest("[value]").getAttribute("value")
        console.log("设为默认的地址盒子是："+id)
        const apiData1={
            id,
            user_id:localStorage.getItem("id")
        }
        const res1=await addressDefault(apiData1)
        console.log('成功发送')
        console.log(res1.data)
        console.log(res1.data.message)
        if(res1.data.code==0){
            ElMessage.success("设置成功")
            console.log(res1.data.data.id)
            console.log(addressList.value)
            
            //循环遍历更改前端样式
            for (let i = 0; i < addressList.value.length; i++) {  
                const item = addressList.value[i];  
                // 如果 item.id === 3，则更改 item.default 的值  
                if (item.id == res1.data.data.id) {  
                console.log("修改1")
                item.addressDefault = '0'; // 修改为你想要的默认值  
                }  
                console.log(id+","+item.id)
                if(item.id==id){
                console.log("修改2")
                item.addressDefault = '1';
                }
            }
        }
        console.log("成功")
    }

    //省下拉框的内容改变
    async function handleProvinceChange(event){
        const newProvince = event.target.value;
        myProvinceSelect.value.value = newProvince;
        //新的省
        console.log("新的省"+newProvince)
        dropdownChange(newProvince,"","")
    }
    //处理市下拉框的内容改变
    async function handleCityChange(event){
        const newCity = event.target.value;
        //新的市
        console.log("新的市"+newCity)
        const apiData={
            pid: newCity
        }
        const res=await reDistrictCity(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                reDistrictCountyList.value=res.data.data
            }
    }
    //处理县下拉框的改变
    function handleCountyChange(event){
        const newCounty = event.target.value;
        //新的市
        console.log("新的县"+newCounty)
    }


    function orderBoxUpperReturnClick(){
        router.push(`/mainPage`);
    }
    //点击备注输入框的消失与出现
    function  orderBoxBelowNoteClick(){
        orderBoxNoteValue.value=!orderBoxNoteValue.value
    }
    //点击餐具数输入框的消失与出现
    function orderBoxBelowTablewareClick(){
        orderBoxTablewareValue.value=!orderBoxTablewareValue.value
    }
    //点击确认备注
    function orderBoxBelowNotesButtonClick(){
        if(orderBoxBelowNotesValue.value==""){
            ElMessage.warning("请输入备注")
            return
        }
        //弹窗的消失
        orderBoxNoteValue.value=!orderBoxNoteValue.value
        inputNodes.value=orderBoxBelowNotesValue.value

    }
    //点击确认餐具数
    function orderBoxBelowTablewareButtonClick(){
        if(orderBoxBelowTablewareValue.value===""){
            ElMessage.warning("请输入餐具数")
            return
        }
        //弹窗的消失
        orderBoxTablewareValue.value=!orderBoxTablewareValue.value
        inputTableware.value=orderBoxBelowTablewareValue.value
    }
</script>
<style scoped>
    .orderPageBigBox{
        width: 800px;
        padding: 0 20px 100px 20px;
        background: linear-gradient(to top, #fefefe, #0292FE);
        margin: 0 auto;
    }
    .orderBoxTop,
    .orderBoxMight,
    .orderBoxBottom,
    .orderBoxBelow{
        background-color: #fff;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .orderBoxMight{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .orderBoxBelow{
        margin-bottom: 0;
    }
    .orderBoxMightTitle{
        font-size: 15px;
        margin-left: 351px;
    }
    .orderBoxUpper{
        line-height: 80px;
        display: flex;
        height: 80px;
        font-size: 16px;
        color: #fff;
    }
    .orderBoxUpperReturn,
    .orderBoxUpperTitle{
        display: inline-block;
    }
    .orderBoxUpperReturn{
        font-size: 18px;
    }
    .orderBoxUpperReturn:hover{
        background-color: #48a4eb;
        border-radius: 20px;
        color: #fff;

    }
    .orderBoxTop{
        padding-left: 30px;
        color: #005a9e;
    }
    .orderBoxUpperTitle{
        font-weight: 600;
        align-items: center;
        justify-self: center;
        margin: 0 auto;
    }
    .orderBoxMightDeliveryBox{
        display: flex;
    }
    .orderBoxMightDeliveryLeft{
        flex: 9;
        padding-left: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .orderBoxMightDeliveryAddress{
        font-size: 20px;
        font-weight: 600;
    }
    .orderBoxMightDeliveryPhone{
        display: inline-block;
        margin-left: 20px;
    }
    .orderBoxMightDeliveryName{
        color: #8d8d8d
    }
    .orderBoxMightDeliveryRight{
        flex: 1;
        color: #919191;
        line-height: 70px;
        font-size: 16px;
    }
    .orderBoxBottom{
        padding-left: 30px;
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
    .orderBoxBottomPack,
    .orderBoxBottomDelivery{
        display: flex;
        margin-top: 23px;
        margin-left: 5px;
        margin-bottom: 20px;
    }
    .orderBoxBottomPackZi1,
    .orderBoxBottomDeliveryZi1,
    .orderBoxBottomPrice1{
        flex: 6;
    }
    .orderBoxBottomPackZi2,
    .orderBoxBottomDeliveryZi2,
    .orderBoxBottomPrice2{
        flex: 1;
        font-weight: 600;
    }
    .orderBoxBottomPrice1,
    .orderBoxBottomPrice2{
        margin-top: 20px;
        font-size: 18px;
    }
    .orderBoxBottomPrice2{
        color: rgb(75, 186, 255);
    }
    .orderBoxBelow{
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 30px;
    }
    .orderBoxBelowPreferenceBox,
    .orderBoxBelowTablewareBox{
        position: relative;
        height: 40px;
        line-height: 40px;
    }
    .orderBoxBelowNoteZi,
    .orderBoxBelowTablewareZi{
        font-size: 16px;
        cursor: pointer;
    }
    .orderBoxBelowPreferences,
    .orderBoxBelowRequired{
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
    .orderBoxBelowNotes,
    .orderBoxBelowTableware{
        width: 300px;
        outline: none;
        border: 1px solid #ccc;
        height: 30px;
        padding: 4px;
        border-radius: 5px;
    }
    .orderBoxBelowNotesButton,
    .orderBoxBelowTablewareButton{
        width: 50px;
        align-content: center;
        margin-left: 10px;
        cursor: pointer;
        justify-items: center;
        padding: 5px 10px 5px 10px;
        border-radius: 5px;
    }
    .orderBoxBelowNotesButton:hover,
    .orderBoxBelowTablewareButton:hover{
        background-color: #c8ddec;
        transition: all 0.4s;
    }
    .submitButtonBox{
        width: 800px;
        margin:0 auto;
        height: 60px;
        background-color: #fff;
    }
    .submitButton{
        margin-left: 365px;
        width: 100px;
        align-items: center;
        cursor: pointer;
        padding-left: 21px;
        height: 38px;
        line-height: 38px;
        background-color: #0895FE;
        border-radius: 8px;
        color: #fff;

    }
    
    /* 弹窗 */
    .zhezhao,
    .zhezhao1,
    .zhezhao2{
        position: fixed;
        left: 0px;
        top: 0px;
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    .tankuang,
    .tankuang1,
    .tankuang2{
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
    .tankuang1
    {
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
    #header-right,
    #header-right1,
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
    .headTitle{
        color: rgb(73, 73, 73);
        margin-top: 16px;
        margin-left: 20px;
        font-size: 17px;
    }
    .modalContent{
        margin-top: 40px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        margin-right: 10px;
        margin-left: 10px;
    }
    .modalBody{
        background-color: rgb(243, 243, 243);
        margin-right: 10px;
        margin-left: 10px; 
        margin-bottom: 30px;
        padding-top: 4px;
        padding-bottom: 4px;
        color: black;
        border-radius: 12px;
    }
    .addAddress{
        cursor: pointer;
    }
    .contentAddress{
        display: flex;
        margin: 10px 15px 10px 15px;
    }
    
    .contentAddressTable1{
        flex: 13;
        height: 30px;
        border-radius: 5px;
        position: relative;
    }
    .contentAddressTable1 a{
        color: black; 
        text-decoration:none;
    }
    .blackBox{
        /* 先设置隐藏元素 */
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 39px;
        background: rgba(169, 167, 167, 0.3);
        border-radius: 8px;
    }
    .blackBoxFloat{
        float: right;
        color: white;
        margin-top: 8px;
        margin-right: 10px;
        background-color: #ac9e9e;
        padding: 2px 5px 2px 5px;
        border-radius: 5px;
    }
    .blackBoxFloatMo{
        float: right;
        color: rgb(84, 115, 125);
        margin-top: 8px;
        margin-right: 10px;
        padding: 2px 5px 2px 5px;
        border-radius: 5px;
    }
    .contentAddressTable1 a:hover .blackBox {
        /* 设置显示元素 none 为隐藏 block 为显示 */
        display: block;
    }
    .contentAddressNickname,
    .contentAddressPhone{
        display: inline-block;
        margin-right: 10px;
        color: #888888;
        font-size: 13px;
    }
    .contentAddressTable2{
        flex: 6;
        text-align: center;
        line-height: 30px;
        margin-top: 7px;
        border-radius: 10px;
        display: inline-block;
    }
    .contentAddressTable2 div{
        display: inline-block;
        padding:0 8px 0 8px;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
    .addressModify{
        background-color: rgb(148, 189, 200);
        margin-right: 5px;
    }
    .addressDelete{
        background-color: rgb(216, 129, 129);
        margin-right: 5px;
    }
    .addressSelect{
        background-color: rgb(148, 198, 121);
    }
    .inputAddressBox{
        display: inline-block;
    }
    .selectBox{
        display: inline-block;
    }
    .addressProvince,
    .addressCity,
    .addressCounty{
        width: 205px;
        height: 36px;
        font-size: 15px;
        border-radius: 6px;
        border: 1px solid #808080;
    }
    .addressProvince,
    .addressCity{
        margin: 12px 0px 25px 10px;
    }
    .addressProvince{
        margin-left: 28px;
    }
    .addressCounty{
        width: 420px;
        margin-left: 27px;
        margin-bottom: 42px;
    }
    .modalZi{
        margin-left: 27px;
    }
    .detailedAddress{
        height:34px;
        width: 420px;
        border-radius: 6px;
        margin-left: 27px;
        margin-top: 4px;
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid #808080;
    }
    .detailedAddressPhone{
        margin-bottom: 35px;
    }
    .confirmAdd,
    .cancelAdd{
        text-align: center;
        margin-top: 20px;
        margin-bottom: 15px;
        width: 100px;
        color: white;
        border: none;
        padding: 6px;
        border-radius: 10px;
        margin-left: 95px;
    }
    .confirmAdd{
        background-color: rgb(0, 148, 254);
    }
    .cancelAdd{
        background-color: #909090;
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
    .close:hover{
        background:#eee;
    }
    .headTitle{
        color: rgb(73, 73, 73);
        margin-top: 16px;
        margin-left: 20px;
        font-size: 17px;
    }
</style>