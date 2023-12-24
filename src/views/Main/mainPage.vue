<template>

<!--导航栏-->
<header class="header-box">
  <nav>
    <ul>
      <li class="left"><RouterLink active-class="" :to="'/mainPage/MainView'"><i class="edge icon"></i>饿了么</RouterLink></li>
      <div class="minScreen">
        <li><a><RouterLink active-class="" :to="'/mainPage/MainView'"><i class="home icon"></i>首页</RouterLink></a></li>
        <li><RouterLink to="/mainPage/myMessagePage" class="messagePage"><i class="bell icon"></i>消息</RouterLink></li>
        <li><RouterLink to="/mainPage/myOrderPage"><i class="clipboard icon"></i>订单</RouterLink></li>
        
      </div>
      <div class="commonScreen">
        <li>
          <span class="searchNavigation"  v-if="isSearchButton">
              <input type="text" id="acc" class="search" :placeholder="searchPlaceholder" name="search" v-model="searchContent">
              <label for="search-button"><i class="search icon" style="color: white"></i></label>
              <input type="button" id="search-button" value="搜索" @click="redirectToSearch(searchContent)">
          </span>
          <span class="searchNavigationNull" v-if="!isSearchButton"></span>
        </li>
        <li>
          <div class="content-container">
            <div class="text image-container" @mouseenter="dropdownContainerMouseover" @mouseleave="dropdownContainerMouseout">
              <router-link active-class="" :to="'/mainPage/PersonPage'">
                <img class="ui avatar image" id="headSculpture" :src="headSculptureImage" alt="">
                <span class="nickname" >{{ username }}</span>
              </router-link>
            </div>
            <!--下拉框-->
            <div class="content-dropdown"  @mouseenter="dropdownContentMouseover" @mouseleave="dropdownContentMouseout" :class="{contentDropdownActive:isDropdownHovered}">
              <div>
                <span class="Nickname">{{ username }}</span>
                <span><RouterLink to="/mainPage/personPage" class="dropdown">个人中心</RouterLink></span>
                <span><RouterLink to="/mainPage/myCartPage" class="dropdown">购物车</RouterLink></span>
                <span v-show="userMessage"><RouterLink to="/businessPage" class="dropdown">成为商家</RouterLink></span>
                <span v-show="!userMessage"><RouterLink to="/managePage" class="dropdown">进入商家端</RouterLink></span>
                <span class="messagePageBox"><RouterLink class="messagePage" to="/mainPage/myMessagePage">我的消息</RouterLink></span>
                <span class="orderPageBox"><RouterLink to="/mainPage/myOrderPage"  class="orderPage">我的订单</RouterLink></span>
                <span @click="exitBottom"><a class="dropdown exit">退出登录</a></span>
              </div>
            </div>
          </div>
        </li>
      </div>
      <li><a class="personPage"  @click="dianwo"><i class="map marker alternate icon"></i>地址</a></li>
    </ul>
  </nav>

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
<!-- 选择规格弹窗 -->
<SelectAttributePop></SelectAttributePop>
</header>


<router-view></router-view>
<!-- <footer class="blue">
  <p class="manger">
    &copy; 2023 My Blog. All rights reserved.
    <em>|</em>
     管理员入口
  </p>
</footer> -->
<footer class="orange">
  <p>
    &copy; 2023 Are You Hungry. All rights reserved.
    <em  v-if="isManageValue">|</em>
    <RouterLink :to="'/backendPage/userManagePage'"><span v-if="isManageValue" class="manageButton">&nbsp;管理员入口</span></RouterLink>
  </p>
</footer>


</template>
<script setup>
  import {onMounted, ref, nextTick } from 'vue' 
  import { ElMessage } from 'element-plus';
  import '../../../node_modules/Semantic-UI-CSS/semantic.min.css'
  import '../../../node_modules/element-plus/es/locale'
  import {useRouter} from "vue-router"


  // 弹窗
  import '@/utils/bootstrap.css'
  import 'bootstrap/js/dist/modal.js'
  
  import {addressById,reDistrictProvinceAll,reDistrictCity,addressInsert,addressUpdate,addressDelete,addressDefault} from '@/apis/address.js'
  import {selectShopMerchant} from'@/apis/shop.js'
  import SelectAttributePop from '@/views/Main/Components/selectAttributePop.vue'

  // import '../../utils/modal.js'
  const router = useRouter();
  const Router=useRouter()

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
var userMessage=ref(0)
let isManageValue=ref(false)//判断是否是管理员
onMounted(async()=>{
  document.getElementById('zhezhao').style.display="none";
  document.getElementById('zhezhao1').style.display="none";

  //获取我的全部地址
  obtainMyAddressAll(localStorage.getItem("id"))

  //初始化市县下拉框为北京
  dropdownChu()

  //判断是否为商家
  console.log(localStorage.getItem("userType"))
  const apiData={
    userId:localStorage.getItem("id")
  }
  const res=await selectShopMerchant(apiData)
      console.log(res.data)
      console.log(res.data.data)
      if(res.data.code==0){
        console.log(res.data.data)
        localStorage.setItem("userType",res.data.data)
        if(res.data.data=="成为商家"){
            userMessage.value=1
            localStorage.setItem("userType","customer")
        }else{
            userMessage.value=0
            localStorage.setItem("userType","shopper")
            localStorage.setItem("shopId",res.data.data.id)
        }
      }
  //获取是否是管理员
  console.log(localStorage.getItem("userState"))    
  if(localStorage.getItem("userState")==1){
    isManageValue.value=true
  }
  console.log(isManageValue.value)
})

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

var headSculptureImage=ref(localStorage.getItem("picture"))
console.log(localStorage.getItem("token"))
if(localStorage.getItem("token")===null){
  ElMessage.error("登录过期，请重新登录")
  router.push("../login")
}
defineProps({
   dish:{
       type:Object
   }
})


const redirectToSearch=(shopName)=>{
    Router.push(`/mainPage/searchPage/${shopName}`);
}


  //下拉框的出现和消失
  var isDropdownHovered = ref(false)
  var isZiDropdown=ref(false)
  //头像
  const dropdownContainerMouseover=()=>{
     isDropdownHovered.value=true;
  }
  const dropdownContainerMouseout=()=>{
    console.log(isDropdownHovered.value)
    if(isZiDropdown.value===true)
      isDropdownHovered.value=false;  
    else isDropdownHovered.value=true 
    console.log(isDropdownHovered.value)
  }
  //弹窗
  const dropdownContentMouseover=()=>{
    isDropdownHovered.value=true
    isZiDropdown.value=true;
  }
  const dropdownContentMouseout=()=>{
    isDropdownHovered.value=false
    isZiDropdown.value=false;
  }

  
  var username=ref("")
  username.value=localStorage.getItem("nickname")

  //点击搜索按钮
  let searchContent=ref("")
  let searchPlaceholder=ref("查找商家或美食")

const currentRoute = ref(Router.currentRoute.value)

// 当路由发生变化时更新当前路由信息(用来处理搜索框是否存在的)
var isSearchButton=ref(true)
Router.afterEach((to, from) => {
  var regex = /^\/mainPage\/searchPage\/.+/;
  currentRoute.value = to
  console.log("路由变化"+from.path+","+to.path)
  if (regex.test(to.path)){
    console.log("是搜索页面")
    isSearchButton.value=false;
  }
  else{
    console.log("不是搜索页面")
    isSearchButton.value=true;
  }
})
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
//退出登录
function exitBottom(){
  localStorage.removeItem("token")
  localStorage.removeItem("long_token")
  router.push("../login")
}


</script>

<style src='@/css/mainPage.css' scoped></style>
<style scoped>

</style>