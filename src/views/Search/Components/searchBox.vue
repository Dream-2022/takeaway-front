<template>
    <div class="contentBox">
      <table>
        <tr>
          <!-- src="../../../assets/image/shop/shop.jpg" -->
          <td rowspan="3"><img :src="shop.logoPhoto" class="content-image" alt=""  @click="redirectToShop(shop.id)"></td>
          <td>
            <h4 class="shop-name" @click="redirectToShop(shop.id)">{{ shop.name }}</h4>     
            
          </td>
        </tr>
        <tr>
          <td class="section">
            <span class="shop-score">4.9分</span>
            <span class="shop-zi-price">月售:</span><span class="shop-price">100</span><br>
            <span class="shop-type">{{ shop.type }}</span><span class="shop-zi-deliver">起送￥</span><span class="shop-deliver">{{ shop.begin }}</span><br>
            <span class="shop-content">{{ shop.profile }}</span>
          </td>
        </tr>
      </table>
      <div class="dishBox">
         <div v-for="item in shop.dishList" :key="item.id" :value="item.id" class="shop-dishBox" @click="handleDishItemClick(item.id)">
            <img :src="item.picture" class="content-dish-image" alt="">
            <div>{{ item.dishName }}</div>
            <div>￥{{ item.price }}</div>
        </div>
      </div>
     
      <div class="blueRider">蓝骑士专送</div>
    </div>
</template>
<script setup>
import {useRouter} from "vue-router"
import { ref, defineProps } from 'vue'

const Router=useRouter()
defineProps({
   shop:{
       type:Object
   },
   id: String
})

const redirectToShop=(id)=>{
   Router.push(`/shopDetailPage/${id}/shopDishPage`);
}

function handleDishItemClick(dishId){
  console.log("点击盒子"+dishId)
  //打开商品页面


  ///////////////////
}
</script>
<style scoped>
.contentBox{
 position: relative;
 cursor: pointer;
 box-shadow: 0px 0px 5px 0px rgba(2, 52, 255, 0.3);
 border-radius: 8px;
 margin-top:10px;
}
.shop-dishBox{
    display: inline-block;
    margin-right:10px;
}
.contentBox .shop-dishBox:first-of-type {
  margin-left: 164px;
}
.content-image{
 width:146px;
 height:122px;
 margin-right: 20px;
 border-radius: 10px;
}
.content-dish-image{
    width:80px;
    height:80px;
    border-radius: 10px;
}
.shop-name{
 margin-top:12px;
}
.blueRider{
  position: absolute;
  right: 30px;
  top:39px;
  color:#0292FE;
  padding:2px 3px 2px 3px ;
  border-radius: 5px;
  border: 1px solid #0292FE;
}
.section span{
 margin-bottom: 5px;
 padding-bottom: 20px;
 font-size: 12px;
}
.dishBox{
  white-space: nowrap;
  overflow-x:scroll;
  height: 132px;
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
 padding-bottom: 0;
}
</style>
