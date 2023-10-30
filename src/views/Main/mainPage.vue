<template>

<!--导航栏-->
<header class="header-box">
  <nav>
    <ul>
      <li class="left"><i class="edge icon"></i>饿了么</li>
      <li><a><router-link active-class="" :to="'/mainPage/MainView'"><i class="home icon"></i>首页</router-link></a></li>
      <li><a><RouterLink to="/mainPage/personPage"></RouterLink><i class="bell icon"></i>消息</a></li>
      <li><a href="#"><i class="clipboard icon"></i>订单</a></li>


      <li>
        <span class="searchNavigation">
            <input type="text" id="acc" class="search" :placeholder="searchPlaceholder" name="search" v-model="searchContent">
            <label for="search-button"><i class="search icon" style="color: white"></i></label>
            <RouterLink to="/mainPage/searchPage"><input type="button" id="search-button" @click="searchButton" value="搜索"></RouterLink>
        </span>
      </li>
      <li>
        <div class="content-container">
          <div class="text image-container" @mouseenter="dropdownContainerMouseover" @mouseleave="dropdownContainerMouseout">
            <router-link active-class="" :to="'/mainPage/PersonPage'">
              <img class="ui avatar image" id="headSculpture" src="../../assets/image/headSculpture.jpeg" alt="">
              <span class="nickname" >{{ username }}</span>
            </router-link>
          </div>
          <!--下拉框-->
          <div class="content-dropdown"  @mouseenter="dropdownContentMouseover" @mouseleave="dropdownContentMouseout" :class="{contentDropdownActive:isDropdownHovered}">
            <div>
              <span class="Nickname">{{ username }}</span>
              <span><RouterLink to="/mainPage/personPage" class="dropdown">个人中心</RouterLink></span>
              <span><RouterLink to="/mainPage/personPage" class="dropdown">消息记录</RouterLink></span>
              <span><RouterLink to="/mainPage/personPage" class="dropdown">{{ userMessage }}</RouterLink></span>
              <span><a class="dropdown exit">退出登录</a></span>
            </div>
          </div>
        </div>
      </li>
      <li><a class="personPage"><i class="map marker alternate icon"></i>地址</a></li>
    </ul>


  </nav>

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
    &copy; 2023 My Blog. All rights reserved.
  </p>
</footer>
</template>
<script setup>
  import {ref,onMounted} from 'vue'
  import axios from 'axios';
  import '../../../node_modules/Semantic-UI-CSS/semantic.min.css'
  import '../../../node_modules/element-plus/es/locale';

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

  //判断是否为商家
  var userMessage=ref("")
  console.log(localStorage.getItem("userType"))
  if(localStorage.getItem("userType")=="customer"){
    userMessage.value="成为商家"
  }else if(localStorage.getItem("userType")=="shopper"){
    userMessage.value="进入商家端"
  }

  //点击搜索按钮
  let searchContent=ref("")
  let searchPlaceholder=ref("查找商家或美食")
  function searchButton(){
    console.log("点击")
    //判断是否有搜索内容
    if(searchContent.value===""){
      searchPlaceholder.value="请输入查找的内容"
      return
    }
    //跳转页面
    console.log("跳转页面")

  }
</script>

<style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    color: #51677e;
}
body::before {
    content: "";
    /* background-image: url("image/leaves.webp"); */
    opacity: 0.3; /* 设置透明度 */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.header-box {
    background-color: #0292FE;
    color: #fff;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
table {
  border-collapse: collapse;
}
.left{
    margin-right: 13px;
    margin-top: 5px;
    font-size: 17px;
}
.header-box nav ul li .sculpture{
    width: 36px;
    position: absolute;
    top:8px;
    right:27px;
}
.header-box nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.header-box nav ul li {
    display: inline-block;
    margin-left: 24px;
}

.header-box nav ul .left {
    float: left;
    font-size: 25px;
}

.header-box nav ul li a {
    text-decoration: none;
}

.header-box nav ul li a:hover {
    color: #91AFD0;
}
h2{
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5) ;
}
p{
    font-size: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) ;
}
.right{
    float: right;
    margin-right: 88px;
}
footer{
    color: white;
    background-color: #475360;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}
  /* 导航栏 */
  /*导航栏样式*/
.header-box {
    color: #fff;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
.left{
    margin-right: 13px;
    margin-top: 5px;
    font-size: 17px;
}
.right{
    float: right;
    margin-right: 88px;
}
.search {
    width: 362px;
    height: 26px;
    border-radius: 10px 0 0 10px;
    padding: 8px;
    font-size: 14px;
    border: none;
    outline: none;
    margin-top: 1px;
}
.searchNavigation{
    border-radius: 10px;
    padding-right: 5px;
    line-height:28px;
    display: flex;
    background-color: #004cff87;
    margin-left: 152px;
    margin-right: 100px;
    height: 28px;
}
li .searchNavigation #search-button { 
    color: white;
    width:50px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: transparent;
}
li .searchNavigation i.icon{
    width: 16px;
    margin: -7px 0.25rem 0 2px;
}
.content-container{
    margin-left: 90px;
}
.header-box .personPage{
  margin-left: 50px;
}
#headSculpture{
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.header-box nav ul li .sculpture{
    width: 36px;
    position: absolute;
    top:8px;
    right:27px;
}
.header-box nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.header-box nav ul li {
    display: inline-block;
    margin-left: 24px;
}

.header-box nav ul .left {
    float: left;
    font-size: 22px;
}

.header-box nav ul li a {
    color: #fff;
    text-decoration: none;
    margin-left: 10px;
}

.header-box nav ul li a:hover {
    color: #e1e5ef;
}
footer{
    color: white;
    background-color: #0292FE;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 下拉框 */
#headSculpture{
    width: 34px;
    height: 34px;
}
.content-container {
    position: relative;
    display: inline-block;
}
.content-dropdown {
    border-radius: 10px;
    position: absolute;
    left: 25%;
    top: calc(100%);
    transform: translateX(-50%);
    display: none;
    background-color: #f9f9f9;
    min-width: 200px;
    padding: 10px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    z-index: 1;
    color:#0292FE;
    height: 260px;
}
.contentDropdownActive{
  display: block;
}
.image-container {
    position: relative;
    display: inline-block;
}

.image-container img{
    transition: transform 0.3s ease;
}

.image-container:hover img{
    transform: scale(1.4);
}
.content-dropdown div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.content-dropdown div span{
    color: #ccc;
    display: block;
    margin-top: 5px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.content-dropdown .Nickname{
    color: #3e4c64;
    cursor: pointer;
    border: none;
    font-size: 17px;
    margin-bottom: 20px;
}
.content-dropdown .nickname{
    margin-bottom: 10px;
    border: none;
    font-size: 15px;
}
.content-dropdown div span .Detail,
.content-dropdown div span .Message,
.content-dropdown div span .Message{
    color: #1b8bc0;
}
.header-box .content-dropdown div .Content{
    color: #60a9d0;
}
.content-dropdown .dropdown{
    color: #0292FE;
}
.content-dropdown .dropdown:hover{
    color: #0060aa;
}
/*新增的导航栏样式*/
.content-view,
.content-like{
    margin-left: 10px;
}
i.icon{
    margin: 0 0.25rem 0 18px;
}
.content-box{
    margin-bottom: 10px;
    height: 170px;
    box-shadow: 10px 10px 10px -4px rgb(0,0,0,.1);
}
.content-image{
    display: inline-block;
    height: 167px;
    width: 250px;
    object-fit: cover;
}
tr .section span{
    margin-left: 10px;
}
tr td h4{
    margin: 0 0 0 20px;
    padding: 0;
}
tr td .content-span{
    display: inline-block;
    padding: 20px;
}
</style>