<template>
    <div class="backendBigBox">
        <div class="manageTitleBox">
            <span class="manageTitle"><i class="edge icon"></i>饿了么</span>
            <span class="tradeTitle">后台</span>
        </div>
        <div class="manageBottom">
            <div class="manageLeft">
                <RouterLink :to="'/backendPage/userManagePage'"><div class="manageLeftActive" @click="manageLeftClick">用户管理</div></RouterLink>
                <RouterLink :to="'/backendPage/shopManagePage'"><div @click="manageLeftClick">商家管理</div></RouterLink>
                <RouterLink :to="'/backendPage/dishManagePage'"><div @click="manageLeftClick">菜品管理</div></RouterLink>
                <RouterLink :to="'/backendPage/orderManagePage'"><div @click="manageLeftClick">订单管理</div></RouterLink>
                <RouterLink :to="'/backendPage/reportManagePage'"><div @click="manageLeftClick">举报受理</div></RouterLink>
                <RouterLink :to="'/mainPage'"><div>返回<i class="reply icon"></i></div></RouterLink>
            </div>
            <div class="manageRight">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <!-- 查看用户弹窗 -->
    <ViewUserPop></ViewUserPop>
    <!-- 查看商家弹窗 -->
    <ViewShopPop></ViewShopPop>
    <!-- 查看菜品弹窗 -->
    <ViewDishPop></ViewDishPop>
    
</template>
<script setup>
    import ViewUserPop from'@/views/Backend/Components/viewUserPop.vue'
    import ViewShopPop from'@/views/Backend/Components/viewShopPop.vue'
    import ViewDishPop from'@/views/Backend/Components/viewDishPop.vue'

    function manageLeftClick(event){
        console.log("点击")
        console.log(event.target)
        const manageLeftBoxChild=document.querySelector('.manageLeft').childNodes
        console.log(manageLeftBoxChild)
        for(let i=0;i<manageLeftBoxChild.length;i++){
            console.log(manageLeftBoxChild[i].childNodes[0])
            if(manageLeftBoxChild[i].childNodes[0].classList.contains('manageLeftActive')){
                manageLeftBoxChild[i].childNodes[0].classList.remove('manageLeftActive')
            }
        }
        event.target.classList.add('manageLeftActive')
    }
</script>
<style scoped>
    a{
        text-decoration: none;
        color: #008cc4;
    }
    .backendBigBox{
        background-color: #01B6FD;
        width: 100%;
        height: 100%;
    }
    .manageTitleBox{
        width: 100%;
        height: 100px;
        margin-bottom: 6px;
        box-shadow: 0px 0px 5px 0px rgba(8, 133, 171, 0.3) ;
        background-color: #fff;
    }
    .manageTitle{
        font-size: 30px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: #01B6FD;
        display: inline-block;
        padding-top: 27px;
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
    .manageBottom{
        display: flex;
        margin-top: 10px;
        height: 100%;
        padding-bottom: 10px;
    }
    .manageLeft{
        background-color: #fff;
        margin-right: 10px;
        flex: 1;
        box-shadow: 0px 0px 5px 0px rgb(0,0,0,.3);
    }
    .manageRight{
        min-height: 722px;
        flex: 7;
        background-color: #fff;
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
    .manageLeftActive{
        background-color:rgb(207, 224, 237);
    }
    .manageLeft div:hover{
        background-color: rgb(246, 251, 255);
    }
</style>