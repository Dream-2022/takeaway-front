<template>
  <div class="dishContentBox">
      <div class="dishContentBoxLeft">
          <img :src="dish.picture" class="dishImg">
      </div>
      <div class="dishContentBoxRight">
          <span class="dishName">{{ dish.dishName }}</span><br>
          <span class="dishDetail">{{ dish.detail }}</span><br>
          <span class="dishZi">月售：</span><span>{{ dish.sale }}</span><br>
          <span class="dishPrice">{{ dish.price }}</span><span>元起</span>
          <div class="dishContentBoxBottom" @click="dishContentBoxBottomZi">选规格</div>
      </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router"
import {ref,defineEmits} from 'vue';
const emit = defineEmits()
const Router=useRouter()
defineProps({
   dish:{
       type:Object
   }
})
// const to=(id)=>{
//     Router.push(`/menu/${id}`);
// }
const dishContentBoxBottomZi = () => {
    console.log('点击')
    emit('open')
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