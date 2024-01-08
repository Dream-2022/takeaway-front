<template>
    <div class="personBigBox">
        <div class="personBox">
            <div class="personBox-navigation">
                <RouterLink :to="'/mainPage/personPage/personView'"><div class="personBoxNavigation active" @click="personBoxNavigationClick">个人资料</div></RouterLink>
                <!-- <RouterLink :to="'/mainPage/personPage/shopCollectView'"><div class="personBoxNavigation" @click="personBoxNavigationClick">商家收藏</div></RouterLink>
                <RouterLink :to="'/mainPage/personPage/dishCollectView'"><div class="personBoxNavigation" @click="personBoxNavigationClick">菜品收藏</div></RouterLink> -->
                <RouterLink :to="'/mainPage/personPage/myRemarkView'"><div class="personBoxNavigation" @click="personBoxNavigationClick">我的评论</div></RouterLink>
            </div>
        </div>
        <div class="personContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    //点击导航栏
    function personBoxNavigationClick(event){
        const personBoxNavigationBox=document.querySelectorAll(".personBoxNavigation")
        console.log(personBoxNavigationBox)
        for(let i=0;i<personBoxNavigationBox.length;i++){
            console.log(personBoxNavigationBox[i])
            if(personBoxNavigationBox[i].classList.contains('active')){
                personBoxNavigationBox[i].classList.remove('active')
            }
        }
        event.target.classList.add('active')
    }
</script>

<style scoped>
.personBigBox{
    min-height: 800px;
    display: flex;
    width: 80%;
    margin: 0 auto;
}
.personBox{
    flex: 1;
    min-height: 800px;
    margin-top: 100px;
}
.personContent{
    min-height: 800px;
    flex: 4;
    margin-top: 100px;

}
a{
    text-decoration: none;
    color: #008cc4;
}
.personBox-navigation{
    box-shadow: 0px 0px 4px 0px #d0e3f4;
    border-radius: 5px;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 17px;
    margin-bottom: 50px;
}
.personBox-navigation div:hover{
    background-color: #e7f0f8;
}
.active{
    background-color: #d0e3f4;
}
.person-detail{
    flex: 4;
    margin-left: 50px;
    margin-bottom: 50px;
}
.personBoxNavigation{
    padding: 15px 65px;
    cursor: pointer;
    text-align: center;
}

</style>
