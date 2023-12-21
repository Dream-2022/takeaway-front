<template>
    <div class="banner">
</div>

<div class="container">
  <div class="left-section">
    <span class="title-fruit active">全部</span>
    <span class="title-flower">奶茶</span>
    <span class="title-medicine">买药</span>
    <span class="title-dessert">甜品</span>
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
   <!-- <div class="right-section">
    <div class="box newBox">
      <h3>活动</h3>
      <div id="slider-body">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img src="../../assets/image/image2.jpg" alt="">
                <img src="../../assets/image/image4.jpg" alt="">
            </el-carousel-item>
        </el-carousel>
       
    </div>
    <div class="box">
      <h3><i class="child icon"></i>推荐</h3>
      <ul class="userList">
      </ul>
    </div>
    </div>
  </div> -->
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
    //要根据用户的默认地址(传用户id过去，在后端找默认地址)找全部的商家
    const apiData={
      userId: localStorage.getItem("id")
    }
    const res=await detailAll(apiData)
          console.log('成功发送')
          console.log(res.data)
          if(res.data.code==0){
              console.log("获取商家信息成功")
              shops.value=res.data.data
          }
          else{
              console.log("不是商家")
          }
   })
</script>

<style scoped>
  @import '@/css/mainView.css';
  @import '@/css/mainViewSmall.css' screen and (max-width: 1180px);
</style>