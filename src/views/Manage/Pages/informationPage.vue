<template>
     <div class="businessBox">
            <div class="businessBox-top">
                <div class="businessBox-top-zi1">门店信息</div>
                <div class="businessBox-top-zi2">请准确填写信息，管理员会尽快审核</div>
            </div>
            
            <div class="businessBox-bottom businessBox1">
                <div class="businessBox-left">基本信息</div>
                <div class="businessBox-might">
                    <div>店铺名称</div>
                    <div class="mightZi2">所在城市</div>
                    <div class="mightZi2">门店地址</div>
                </div>
                <div class="businessBox-right">
                    <div>
                        <input placeholder="请输入店铺名称" class="businessInput" ref="myName">
                    </div>
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
                    <div>
                        <input placeholder="请输入门店地址" class="businessInput" ref="myAddressDetail">
                    </div>
                    
                </div>
            </div>
            <div class="businessBox-bottom businessBox2">
                <div class="businessBox-left">经营信息</div>
                <div class="businessBox-might">
                    <div>营业类目</div>
                    <div class="mightZi3">门店照</div>
                    <div class="mightZi1">店内照</div>
                    <div class="mightZi1">门店logo</div>
                    <div class="mightZi1">门店背景</div>
                    <div class="mightZi1">商家简介</div>
                    <div class="mightZi4">外卖电话</div>
                    <div class="mightZi4">联系姓名</div>
                    <div class="mightZi5">联系电话</div>
                    <div class="mightZi5">起送价</div>
                    <div class="mightZi5">包装费</div>
                    <div class="mightZi5">配送费</div>
                </div>
                <div class="businessBox-right">
                    <div class="selectBox">
                        <select class="businessCategory" name="营业类目" @change="handleCategoryChange" ref="myBusinessCategorySelect">
                        <option v-for="item in businessCategoryList" :key="item" :value="item.id">{{item.descriptionName}}</option>
                        </select>
                    </div>
                    <div>
                        <div class="rightZi">需拍全，包含完整的牌匾，门框(建议正对门店2米处拍摄)</div>
                        <img ref="imgStoreImageRef" :src="myStorePhoto" class="storeImage" @click="storeImageClick">
                        <input id="uploadStoreImage" type="file" class="upload" ref="uploadStoreImageInput" style="display: none" @change="uploadStoreImageClick">
                    </div>
                    <div>
                        <div class="rightZi">需真实反映堂食区域</div>
                        <img  ref="imgInStoreImageRef" :src="myInPhoto" class="storeImage"  @click="InStoreImageClick">
                        <input id="uploadInStoreImage" type="file" class="upload" ref="uploadInStoreImageInput" style="display: none" @change="uploadInStoreImageClick">
                    </div>
                    <div>
                        <div class="rightZi">自行上传，可随时更改</div>
                        <img ref="imgLogoStoreImageRef" :src="myLogoPhoto" class="storeImage"  @click="logoStoreImageClick">
                        <input id="uploadLogoStoreImage" type="file" class="upload" ref="uploadLogoStoreImageInput" style="display: none" @change="uploadLogoStoreImageClick">
                    </div>
                    <div>
                        <div class="rightZi">自行上传，可随时更改</div>
                        <img ref="imgBackgroundRef" :src="myBackground" class="storeImage2"  @click="BackgroundClick">
                        <input id="uploadBackgroundImage" type="file" class="upload" ref="uploadBackgroundInput" style="display: none" @change="uploadBackgroundClick">
                    </div>
                    <div>
                        <input placeholder="请输入商家简介" class="businessInput" ref="myProfile">
                    </div>
                    <div>
                        <input placeholder="请输入外卖电话" class="businessInput" ref="myTakeawayCall">
                    </div>
                    <div>
                        <input placeholder="请输入联系人姓名" class="businessInput" ref="myRealName">
                    </div>
                    <div>
                        <input placeholder="请输入联系电话" class="businessInput" ref="myContactCall">
                    </div>
                    <div>
                        <input type="number" min="0" placeholder="起送价" class="businessInput" ref="myBegin">
                    </div>
                    <div>
                        <input type="number" min="0" placeholder="包装费" class="businessInput" ref="myPacking">
                    </div>
                    <div>
                        <input type="number" min="0" placeholder="配送费" class="businessInput" ref="myDelivery">
                    </div>
                </div>
            </div>
            
        </div>
        <div class="footer">
            <span class="businessConfirm" @click="businessConfirmClick">确认</span>
        </div>
</template>
<script setup>
    import {onMounted, ref, toRaw} from 'vue' 
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {descriptionDetailAll} from '@/apis/dish.js'
    import {selectById } from '@/apis/shop.js'
    import {reDistrictProvinceAll,reDistrictCity} from '@/apis/address.js'
    import {insertShop, uploadShopImage} from '@/apis/shop.js'
    
    //营业类目
    let businessCategoryList=ref([])
    var imgStoreImageRef=ref(null) 
    var uploadStoreImageInput=ref(null)
    var imgInStoreImageRef=ref(null) 
    var uploadInStoreImageInput=ref(null)
    var imgLogoStoreImageRef=ref(null) 
    var uploadLogoStoreImageInput=ref(null)
    var imgBackgroundRef=ref(null) 
    var uploadBackgroundInput=ref(null)
    //点击保存注册商家信息
    let myName=ref()
    let myProvinceSelect=ref()
    let myCitySelect=ref()
    let myCountySelect=ref()
    let myAddressDetail=ref()
    let myBusinessCategorySelect=ref()
    let myStorePhoto=ref()
    let myInPhoto=ref()
    let myLogoPhoto=ref()
    let myBackground=ref()
    let myProfile=ref()
    let myTakeawayCall=ref()
    let myRealName=ref()
    let myContactCall=ref()
    let myBegin=ref()
    let myPacking=ref()
    let myDelivery=ref()
    let myPhone=ref()
    let reDistrictProvinceList=ref([])
    let reDistrictCityList=ref([])
    let reDistrictCountyList=ref([])
    //商家信息
    let shopValue=ref([])
    onMounted(async()=>{
        //初始化省市县下拉框
        dropdownChu()
        //初始化营业类目下拉框
        const res=await descriptionDetailAll()
            console.log(res.data.data)
            if(res.data.code==0){
                businessCategoryList.value=res.data.data
            }
        const apiData1={
            shopId: localStorage.getItem("shopId")
        }
        const res1=await selectById(apiData1)
            console.log(res1.data.data)
            shopValue=res1.data.data
            console.log(shopValue)
            console.log(shopValue.name)
            console.log(shopValue.logoPhoto)
            myAddressDetail.value.value=shopValue.addressDetail
            myName.value.value=shopValue.name
            myBusinessCategorySelect.value.value=shopValue.typeId
            myStorePhoto=shopValue.storePhoto
            myInPhoto=shopValue.inPhoto
            myLogoPhoto=shopValue.logoPhoto
            myBackground=shopValue.background
            myProfile.value.value=shopValue.profile
            myTakeawayCall.value.value=shopValue.takeawayCall
            myRealName.value.value=shopValue.realName
            myContactCall.value.value=shopValue.contactCall
            myBegin.value.value=shopValue.begin
            myPacking.value.value=shopValue.packing
            myDelivery.value.value=shopValue.delivery

            console.log("执行了省myProvinceSelect:"+myProvinceSelect.value.value+','+shopValue.addressProvince)
            myProvinceSelect.value.value=shopValue.addressProvince
            console.log("执行了省myProvinceSelect:"+myProvinceSelect.value.value+','+shopValue.addressProvince)

            await dropdownChange(shopValue.addressProvince,shopValue.addressCity,shopValue.addressCounty)
            myCitySelect.value.value=shopValue.addressCity
            myCountySelect.value.value=shopValue.addressCounty    
    })
    async function businessConfirmClick(){
        console.log(myName.value.value+','+myProvinceSelect.value.value+','+myLogoPhoto.value+',')
        const apiData={
            userId:localStorage.getItem("id"),
            name:myName.value.value,
            addressProvince:myProvinceSelect.value.value,
            addressCity:myCitySelect.value.value,
            addressCounty:myCountySelect.value.value,
            addressDetail:myAddressDetail.value.value,
            profile:myProfile.value.value,
            logoPhoto:myLogoPhoto.value,
            storePhoto:myStorePhoto.value,
            inPhoto:myInPhoto.value,
            background:myBackground.value,
            begin:myBegin.value.value,
            takeawayCall:myTakeawayCall.value.value,
            contactCall:myContactCall.value.value,
            realName:myRealName.value.value,
            type:myBusinessCategorySelect.value.value,
            packing:myPacking.value.value,
            delivery:myDelivery.value.value,
            state:"0"//等待管理员审核
        }
        const res=await insertShop(apiData)
            console.log(res.data)
            console.log(res.data.data)
            if(res.data.code==0){
                ElMessage.success("保存成功")
            }
        
    }
    //点击照片
    function storeImageClick(){
        uploadStoreImageInput.value.click();
    }
    function InStoreImageClick(){
        uploadInStoreImageInput.value.click();
    }
    function logoStoreImageClick(){
        uploadLogoStoreImageInput.value.click();
    }
    function BackgroundClick(){
        uploadBackgroundInput.value.click();
    }
    function uploadStoreImageClick(){
        console.log("点击选择框")
        const file = uploadStoreImageInput.value.files[0];
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                imgStoreImageRef.value.src=file.path
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
                    myStorePhoto=userObj.url
                    console.log(myStorePhoto.value)
                    console.log(myStorePhoto)
            };
        }
    };
    function uploadInStoreImageClick(){
        console.log("点击选择框")
        const file = uploadInStoreImageInput.value.files[0];
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                imgInStoreImageRef.value.src=file.path
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
                    myInPhoto=userObj.url
                    console.log(myInPhoto.value)
                    console.log(myInPhoto)
            };
        }
    };

    function uploadLogoStoreImageClick(){
        console.log("点击选择框")
        const file = uploadLogoStoreImageInput.value.files[0];
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                imgLogoStoreImageRef.value.src=file.path
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
                    myLogoPhoto.value=userObj.url
                    console.log(myLogoPhoto.value)
                    console.log(myLogoPhoto)
            };
        }
    };
    function uploadBackgroundClick(){
        console.log("点击选择框")
        const file = uploadBackgroundInput.value.files[0];
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                imgBackgroundRef.src=file.path
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
                    myBackground.value=userObj.url
                    console.log(myBackground.value)
                    console.log(myBackground)
            };
        }
    };
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
            pid: 2
        }
        const res3=await reDistrictCity(apiData3)
            console.log(res3.data.data)
            if(res3.data.code==0){
                reDistrictCityList.value=res3.data.data
            }
        const apiData4={
            pid: 52
        }
        const res4=await reDistrictCity(apiData4)
            console.log(res4.data.data)
            if(res4.data.code==0){
                reDistrictCountyList.value=res4.data.data
            }
    }
    //省，市下拉框的改变
    async function dropdownChange(newProvince,City,County){
        const apiData={
            pid: newProvince
        }
        const res=await reDistrictCity(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                reDistrictCityList.value=res.data.data
            }
        if(City!=""||County!=""){
            console.log("执行了市"+myCitySelect.value.value)
            myCitySelect.value.value=toRaw(City)
            console.log(myCitySelect.value.value+','+City)
        }
        const apiData1={
            pid: City
        }
        const res1=await reDistrictCity(apiData1)
            console.log(res1.data.data)
            if(res1.data.code==0){
                reDistrictCountyList.value=res1.data.data
            }
        if(City!=""||County!=""){
            console.log("执行了县"+myCountySelect.value.value)
            myCountySelect.value.value=toRaw(County)
            console.log(myCountySelect.value.value+','+County)
        }
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
</script>
<style scoped>
    .businessBox{
        margin: 0 auto;
        width: 90%;
    }
    .businessBox-top{
        background-color: rgb(230, 241, 250);
        height: 52px;
        margin-top: 10px;
        margin-bottom: 10px;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    .businessBox-top-zi1{
        line-height: 52px;
        color: rgb(9, 102, 9);
        font-size: 17px;
        margin-left: 20px;
    }
    .businessBox-top-zi2{
        line-height: 52px;
        font-size: 14px;
        margin-right: 30px;
        color: rgb(0, 99, 175)
    }
    .businessBox-might{
        flex: 3;
    }
    .businessBox-might div{
        margin: 20px;
    }
    .mightZi1{
        padding-top: 100px;
    }
    .mightZi2{
        padding-top: 28px;
    }
    .mightZi3{
        padding-top:24px;
    }
    .mightZi4{
        padding-top:12px;
    }
    .mightZi5{
        padding-top:9px;
    }
    .businessBox-bottom{
        display: flex;
        width: 100%;
    }
    .businessBox1{
        border-bottom: 1.5px solid rgb(115, 115, 115);
        padding-bottom: 30px;
        padding-top: 10px;
    }
    .businessBox2{
        margin-bottom: 100px;
        padding-top: 30px;
    }
    .businessInput{
        height: 30px;
        width: 350px;
        padding: 5px;
    }
    .businessBox-left{
        flex: 2;
        font-size: 15px;
        margin: 20px;
        background-color: #fff;
    }
    .businessBox-right{
        flex: 16;
        color: #717171;
    }
    .businessBox-right span{
        padding: 10px;
    }
    .businessBox-right div{
        margin: 20px;
    }
    .businessBox-right .rightZi{
        margin-left: 0;
        margin-bottom: 0;
    }
    .storeImage{
        width:  100px;
        height: 100px;
        border-radius: 5px;
    }
    .storeImage2{
        width: 150px;
        height: 100px;
        border-radius: 5px;
    }
    .footer{
        height: 63px;
        background-color: white;
        box-shadow:  0 8px 16px 0 rgba(0,0,0,0.2);
        display: block;
        left: 0;
        position: sticky;
        z-index: 1; 
        bottom: 0;
    }
    .businessSave,
    .businessConfirm{
        background-color: #01B6FD;
        color: white;
        margin: 0 auto;
        margin-top: 16px;
        margin-right: 42px;
        border-radius: 20px;
        float: right;
        padding: 5px 23px 5px 23px;
        box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
    .businessConfirm{
        margin-right: 350px;
    }
    /* 下拉框 */
    .businessBox-right .selectBox{
        display: inline-block;
        margin-top: 15px;
    }
    .addressProvince,
    .addressCity,
    .addressCounty{
        width: 165px;
        height: 30px;
    }
    .businessCategory{
        width: 350px;
        height: 30px;
    }
</style>
