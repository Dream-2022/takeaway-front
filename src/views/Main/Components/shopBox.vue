<template>
     <div class="contentBox" @click="redirectToShop(shop.id)">
            <table>
              <tr>
                <!-- src="../../../assets/image/shop/shop.jpg" -->
                <td rowspan="2"><img :src="shop.picture" class="content-image" alt=""></td>
                <td>
                  <h4 class="shop-name">{{ shop.name }}</h4>     
                </td>
              </tr>
              <tr>
                <td class="section">
                  <span class="shop-score">{{ shop.score }}分</span>
                  <span class="shop-zi-price">月售:</span><span class="shop-price">{{ shop.saleStr }}</span><br>
                  <span class="shop-type">{{ shop.type }}</span><span class="shop-zi-deliver">起送￥</span><span class="shop-deliver">{{ shop.begin }}</span><br>
                  <span class="shop-content">{{ shop.detail }}</span>
                </td>
              </tr>
            </table>
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
    Router.push(`/mainPage/shopDetailPage/${id}`);
}
</script>
<style scoped>
.contentBox{
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(2, 52, 255, 0.3);
  border-radius: 8px;
}
.content-image{
  width:200px;
  height:150px;
}
.shop-name{
  margin-top:12px;
}
.section span{
  margin-bottom: 5px;
  padding-bottom: 20px;
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
</style>
