<template>
  <div class="dishContentBox">
      <div class="dishContentBoxLeft" @click="dishContentBoxClick(dish.id)">
          <img :src="dish.picture" class="dishImg">
      </div>
      <div class="dishContentBoxRight">
          <span class="dishName" @click="dishContentBoxClick(dish.id)">{{ dish.dishName }}</span><br>
          <span class="dishDetail" @click="dishContentBoxClick(dish.id)">{{ dish.detail }}</span><br>
          <span class="dishZi">月售：</span><span>{{ dish.sale }}</span><br>
          <span class="dishPrice">{{ dish.price }}</span><span>元起</span>
          <div class="dishContentBoxBottom" @click="dishContentBoxBottomZi">选规格</div>
      </div>
  </div>
</template>
<script setup>
import {useRouter,useRoute} from "vue-router"
import {ref,defineEmits} from 'vue';
import {useDishStore} from'@/stores/dish.js'
const dishStore=useDishStore()
const emit = defineEmits()
const router=useRouter()
const route = useRoute();
defineProps({
   dish:{
       type:Object
   }
})

function dishContentBoxBottomZi () {
    console.log('点击')
    dishStore.modifySelectDishDown(true)
}

//点击菜品盒子
function dishContentBoxClick(dishId){
    console.log("点击菜品盒子"+dishId)
    let id=route.params.id
    router.push(`/shopDetailPage/${id}/productDetailPage/${dishId}`);
}

</script>
<style scoped>
   .dishContentBox{
        margin-bottom: 10px;
        display: flex;
        height: 120px;
        box-shadow: 0px 0px 3px #8cb5db ;
        border-radius: 10px;
        padding-top: 9px;
        padding-left: 10px;
    }
    .dishImg{
        width: 100px;
        height: 100px;
        border-radius: 20px;
    }
    .dishContentBoxLeft{
        flex: 1;
    }
    .dishContentBoxRight{
        position: relative;
        flex: 5;
    }
    .dishContentBoxRight span{
        cursor: pointer;
    }
    .dishContentBoxBottom{
        display: float;
        float: right;
        right: 10px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
        background-color: #0084ff;
        padding: 3px 8px 3px 8px;
        border-radius: 10px;
        color: white;
    }
    .dishName,
    .dishDetail,
    .dishZi,
    .dishPrice{
        display: inline-block;
        margin-top: 3px;
    }
    .dishName{
        font-size: 15px;
        font-weight: 600;
    }
    .dishPrice{
        color: #ffa200;
        font-weight: 600;
        margin-right: 5px;
        font-size: 16px;
    }
</style>