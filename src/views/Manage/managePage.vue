<template>
    <div class="Manage">
        <div class="manageTitleBox">
            <span class="manageTitle"><i class="edge icon"></i>饿了么</span>
            <span class="tradeTitle">营业中</span>
            <span class="manageShopImgBox">
                <img src="../../assets/image/shop/guMing.jpg" class="manageShopImg">
                <span class="manageShopName">古茗</span>
            </span>
        </div>
        <div class="manageBottom">
            <div class="manageLeft">
                <RouterLink :to="'/managePage/orderHandlePage'"><div class="manageLeftActive">订单处理</div></RouterLink>
                <RouterLink :to="'/managePage/setMealPage'"><div>工作台</div></RouterLink>
                <RouterLink :to="'/managePage/setMealPage'"><div>数据统计</div></RouterLink>
                <RouterLink :to="'/managePage/setMealPage'"><div>套餐管理</div></RouterLink>
                <RouterLink :to="'/managePage/setMealPage'"><div>菜品管理</div></RouterLink>
                <RouterLink :to="'/managePage/setMealPage'"><div>分类管理</div></RouterLink>
            </div>
            <div class="manageRight">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
  import {useRouter} from "vue-router"
  const router = useRouter();
  import orderHandlePage from './Components/orderHandlePage.vue';
</script>
<style scoped>
    a{
        text-decoration: none;
        color: white;
    }
    .Manage{
        background-color: #f1f1f1;
        height: 100%;
    }
    .manageTitleBox{
        width: 100%;
        height: 100px;
        background-color: #01B6FD;
    }
    .manageTitle{
        font-size: 30px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: white;
        display: inline-block;
        padding-top: 38px;
        padding-left: 30px;
    }
    .tradeTitle{
        color: #009cd9;
        background-color: #fff;
        display: inline-block;
        padding:3px 10px 3px 10px;
        border-radius: 10px;
        margin-left: 20px;
    }
    .manageShopImgBox{
        float: right;
        margin-top: 13px;
    }
    .manageShopImg{
        width: 70px;
        height: 70px;
        vertical-align: middle;
        border-radius: 100px;
    }
    .manageShopName{
        margin: 0 100px 0 20px;
        color: white;
        font-size: 16px
    }
    .manageBottom{
        display: flex;
    }
    .manageLeft{
        flex: 1;
        background-color:#01B6FD;
        color: white;
        margin:10px;
    }
    .manageLeftActive{
        background-color: #24a4d2bd;
    }
    .manageLeft div{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 17px;
        cursor: pointer;
        text-align: center;
    }
    .manageLeft div:hover{
        background-color: #48c8fb94;
    }
    .manageRight{
        flex:8;
        background-color: white;
        margin:10px 10px 10px 0;
        padding: 10px;
    }
</style>