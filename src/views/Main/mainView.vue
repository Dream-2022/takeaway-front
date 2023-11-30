<template>
    <div class="banner">
</div>

<div class="container">
  <div class="left-section">
    <span class="title-fruit active">水果</span>
    <span class="title-flower">鲜花</span>
    <span class="title-medicine">买药</span>
    <span class="title-dessert">甜品</span>
    <span class="title-tea">奶茶</span>
    <span class="title-western">西餐</span>
    <span class="title-collect">收藏</span>
   
    <div>
      <div class="nextTo">
        <span class="nextTo1">附近</span>
        <span class="nextTo2"><i class="forward icon"></i> 发现附近美食</span>
      </div>
      <div class="shops-box">
        <div class="shops">
          <span v-for="item in shops" :key="item.id">
             <ShopBox :shop="item" :id="item.id">
             </ShopBox>
          </span>
        </div>
      </div>
      <div class="pagination"></div>
    </div>
  </div> 


    <!--  右边的盒子-->
   <div class="right-section">
    <div class="box newBox">
      <h3>活动</h3>
      <div id="slider-body">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img src="../../assets/image/image2.jpg" alt="">
                <img src="../../assets/image/image4.jpg" alt="">
            </el-carousel-item>
        </el-carousel>
        <!-- <div class="slider">
          <div class="slider-content">
          <div class="slider-item" id="slider-item1">
            <img src="../../assets/image/image2.jpg" alt="Image 1">
          </div>
          <div class="slider-item">
            <img src="../../assets/image/image4.jpg" alt="Image 2">
          </div>
          <div class="slider-item">
            <img src="../../assets/image/image3.jpg" alt="Image 3">
          </div>
          <div class="slider-item">
            <img src="../../assets/image/image7.jpg" alt="Image 4">
          
          </div>
          </div>
        </div> -->
    </div>
    <!-- <div class="box">
      <h3><i class="tags icon"></i>标签</h3>
      <ul class="labelList">
      </ul>
    </div> -->
    <div class="box">
      <h3><i class="child icon"></i>推荐</h3>
      <ul class="userList">
      </ul>
    </div>
    </div>
  </div>
</div>
</template>
<script setup>
   import {ref,onMounted } from 'vue'
   import { useRoute, useRouter } from 'vue-router';
   import ShopBox from '@/views/Main/Components/shopBox.vue'
   import http from '@/utils/http.js'
   import '../../../node_modules/Semantic-UI-CSS/semantic.min.css'
   import '../../../node_modules/element-plus/es/locale'
   import {detailAll} from '@/apis/shop.js'
   const router = useRouter();
   var shops=ref([])
   onMounted(async() => {
   const res=await detailAll()
        console.log('成功发送')
        console.log(res.data)
        if(res.data.code==0){
            console.log("获取商家信息成功")
            shops.value=res.data.data
        }
        else{
            ElMessage.error(res.data.message)
        }
   })
</script>

<style scoped>
.banner {
    padding-top: 69px;
    background-image: url('../../assets/image/main5.png');
    background-size: cover;
    background-position: center;
    height: 377px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: #0292FE;
    text-align: center;
}
h2{
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5) ;
}
p{
    font-size: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) ;
}
.banner div{
    flex: 0 0 100%;
}
.sculpture {
    padding-right: 5px;
    float: right;
    width: 13%;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
}
.left-section {
    flex: 2;
    padding: 20px;
}

.left-section .title {
  justify-content: center;
  display: inline-block;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  font-size: 16px;
  margin-bottom: 10px;
}
.nextTo{
  margin-bottom: 10px;
}
.nextTo1{
  margin: 10px;
  font-weight:500;
  font-size: 20px;
  color:#0292FE;
}
.nextTo2{
  margin: 10px;
  color:#0292FE;
}
.shops-box{
  margin-bottom: 100px;
}
.shops {
    display: grid;
    grid-gap: 20px;
    align-items: start;
}
.content-box{
  box-shadow: 0px 0px 5px 0px rgb(0,0,0,.3);
  border-radius: 8px;
}
.content-image{
  width:200px;
  height:150px;
}
.shop-name{
  margin-top:12px;
}
.shop-score{
  color: #de5454;
  font-weight: 600;
  display: inline;
  margin-right: 10px;
}
.shop-deliver{
  display: inline;
  margin-right: 10px;
}
.shop-type{
  color: #de5454;
  font-weight: 600;
  display: inline;
  margin-right: 10px;
}
.shop-price, .shop-zi-price{
  color: #df833d;
  display: inline;
}
.shop-content{
  display: block;
  padding-right: 20px;
}

/*分页元素*/
.pagination-link{
    background-color: #cccccc;
    border-radius: 10px;
    width: 20px;
}
.pageUp, .pageDown{
    cursor: pointer;
    margin-bottom: 100px;
}
.pageUp:hover, .pageDown:hover{
    background-color: #f5f4f4;
    color: #424242;
    border-radius: 5px;
}
.pagination .active{
    background-color: #ececec;
}

.article {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 20px;
}

.article h4 {
    margin-top: 0;
}

.article p {
    color: #666;
}

.article a {
    color: #333;
    text-decoration: none;
    display: inline-block;
    margin-top: 10px;
}

.pagination {
    margin-top: 20px;
    text-align: center;
}

.pagination a {
    display: inline-block;
    margin-right: 10px;
    color: #333;
    text-decoration: none;
}

.pagination .prev,
.pagination .next {
    font-weight: bold;
}

.right-section {
    flex: 1;
    padding: 20px;
    margin-top: 5px;
}

.box {
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;

}
.newBox{
    box-shadow: 0px 0px 5px 0px rgba(2, 52, 255, 0.3);
    margin-top: 7px;
}
.box li{
    display: inline-block;
    margin-right: 10px;
}
.labelList li{
    margin-top: 8px;
    margin-left: 15px;
    font-size: 16px;
}
.lis{
    cursor: pointer;
}
.box h3 {
    margin-top: 0;
}

.box ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
}
.box ul li {
    margin-bottom: 10px;
}
.labelList{
    margin-left: 20px;
    display: inline-block;
}
.userList li {
    display: block;
    margin-left: 11px;
    margin-bottom: 10px;
    margin-top: 25px;
    font-size: 16px;
    cursor: pointer;
}

.container .left-section .title-fruit,
.container .left-section .title-flower,
.container .left-section .title-medicine,
.container .left-section .title-dessert,
.container .left-section .title-tea,
.container .left-section .title-western,
.container .left-section .title-collect
{
    display: inline-block;
    font-size: 20px;
    border-bottom: 2px solid #ccc;
    cursor: pointer;
    margin: 5px 10px;
}
.container .left-section .title-fruit,
.container .left-section .title-flower,
.container .left-section .title-medicine,
.container .left-section .title-dessert,
.container .left-section .title-tea,
.container .left-section .title-western,
.container .left-section .title-collect
{
    margin-bottom: 20px;
    margin-top: 30px;
    font-weight: bold;
}
.container .left-section .title-fruit{
    margin-left: 165px;
 }
.container .left-section .active{
    border-bottom: 2px solid #007bff;
}
#slider-body {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    width: 100%;
    z-index: 98;
}
.slider {
    width: 330px;
    height: 200px;
    overflow: hidden;
    position: relative;
    display: inline-flex;
    border-radius: 10px 10px 10px 10px; /* 调整圆角半径大小 */
}

.slider-content {
    display: flex;
    width: fit-content;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}
.content-id{
    position :absolute;
    top :153px;
    display :none;
}
.slider-item {
    width: 1000px;
    height: 388.88px;
    flex-shrink: 0;
}

.slider-item img {
    width: 350px;
    max-height: 100%;
    object-fit: cover;

}

 .blue{
      display: none;
  }
  .manger{
    margin-bottom: 10px;
    display: inline-block;
    cursor: pointer;
  }
</style>