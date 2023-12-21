<template>
    <div class="productBox">
        <div class="productReturn" @click="returnButton"><i class="angle left icon"></i></div>
        <div class="productImgBox">
            <img :src="dishContent.picture" class="productImg">
        </div>
        <div class="productMightBox">
            <div class="productName">{{ dishContent.dishName }}</div>
            <div class="productType">{{ dishContent.categoryName }}</div>
            <div class="productZi">打包费￥</div><div class="productPacking">{{ dishContent.pack }}</div>
            <div class="productZi">月售:</div><div class="productSale">1000</div><br>
            <div class="productZi2">￥</div><strong class="productPrice">{{ dishContent.price }}</strong><div class="productZi2">&nbsp;起</div>
            <div class="addShoppingCart" @click="addShoppingCartButton" v-if="dishCollectAll">加入购物车</div>
            <span v-if="dishCollectAll">
                <div class="addDishCollet" @click="addDishCollectButton" v-if="dishCollectValue"><i class="star outline icon"></i>收藏菜品</div>
                <div class="addDishCollet" @click="deleteDishCollectButton" v-if="!dishCollectValue"><i class="star icon"></i>收藏菜品</div>
            </span>
        </div>
        <div class="productBottomBox">
            <nav id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-3">
                <ul class="nav nav-pills" ref="navBox">
                    <li class="nav-item active" @click="clearActiveClassAndAdd('link1')">
                    <a class="nav-link link1" href="#scrollspyHeading1">详情</a>
                    </li>
                    <li class="nav-item" @click="clearActiveClassAndAdd('link2')">
                    <a class="nav-link link2" href="#scrollspyHeading2">评价</a>
                    </li>
                    <li class="nav-item" @click="clearActiveClassAndAdd('link3')">
                    <a class="nav-link link3" href="#scrollspyHeading3">推荐</a>
                    </li>
                </ul>
                <a class="navbar-brand" href="#">返回顶部<i class="angle double up icon"></i></a>
            </nav>
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                <div id="scrollspyHeading1"></div>
                <div class="productDetailBox1">
                    <div class="dishTitle">商品详细</div>
                    <div class="dishZi">商品描述</div><div class="dishDetail">{{ dishContent.detail }}</div><br>
                    <div class="dishZi2">原料</div><div class="dishMaterial">{{ dishContent.material }}</div><br>
                    <div class="dishZi2">分量</div><div class="dishWeight">{{ dishContent.weight }}</div>
                </div>
                <div id="scrollspyHeading2"></div>
                <div class="productDetailBox2">
                    <div class="dishTitle2">商品评价</div>
                    <div class="dishCommentBigBoxes">
                        <div class="dishCommentBox">
                            <div class="flexBox">
                                <div class="commentPart1">
                                    <img src="http://localhost:8080/upload/848bbd1984648ad2ed141476dc67f4fa.jpeg" class="commentPicture">
                                </div>
                                <div class="commentPart2">
                                    <div class="dishCommentNickname">李小慧</div>
                                    <div class="dishCommentTime">2022-4-5-12:48:52</div>
                                </div>
                            </div>
                            <div class="dishCommentContent">#古茗奶茶 好喝</div>
                        </div>
                        <div class="dishCommentBox">
                            <div class="flexBox">
                                <div class="commentPart1">
                                    <img src="http://localhost:8080/upload/848bbd1984648ad2ed141476dc67f4fa.jpeg" class="commentPicture">
                                </div>
                                <div class="commentPart2">
                                    <div class="dishCommentNickname">李小慧</div>
                                    <div class="dishCommentTime">2022-4-5-12:48:52</div>
                                </div>
                            </div>
                            <div class="dishCommentContent">#古茗奶茶 好喝</div>
                        </div>
                    </div>
                </div>
                <h4 id="scrollspyHeading3"></h4>
                <div class="productDetailBox3">
                    <div class="dishTitle">商品推荐</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref,onMounted,onBeforeUnmount} from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus';
    import {selectCollectDishByIdAndDishId, deleteDishCollect, addDishCollect } from'@/apis/collectDishApi.js'
    import {useDishStore} from'@/stores/dishStore.js'
    import {useDishOneStore} from'@/stores/dishOneStore.js'
    import {useAttributeStore} from'@/stores/attributeStore.js'
    const dishStore=useDishStore()
    const dishOneStore=useDishOneStore()
    const attributeStore=useAttributeStore()
    const router = useRouter();
    const route = useRoute();
    var dishContent=ref([])
    let  dishCollectValue=ref(true)
    let  dishCollectAll=ref(true)
    onMounted(async() => {
        window.addEventListener('scroll', handleScroll);
        //渲染页面
        await dishStore.obtainDishList(route.params.id)
        dishContent.value=dishStore.getDishOne(route.params.dishId)
        console.log(dishContent.value)
        //判断该用户是否收藏了该商品
        const apiData={
            userId: localStorage.getItem("id"),
            dishId: route.params.dishId
        }
        const res=await selectCollectDishByIdAndDishId(apiData)
            console.log(res.data.data)
            if(res.data.data=="收藏了商品"){
                dishCollectValue.value=false
            }else{
                console.log("未收藏商品")
                dishCollectValue.value=true
            }
        console.log(localStorage.getItem("shopper")==undefined)    
        if(localStorage.getItem("shopper")==undefined){
            dishCollectAll.value=true
        }else{
            dishCollectAll.value=false
        }
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    
    var navBox=ref()

    //加入购物车
    function addShoppingCartButton(){
        dishStore.modifySelectDishDown(true)
        console.log(dishOneStore.dish)
        dishOneStore.obtainDishOne(route.params.dishId)
        attributeStore.obtainAttributeList(dishOneStore.dish.id)
    }   
    //收藏菜品
    async function addDishCollectButton(){
        const apiData={
            userId: localStorage.getItem("id"),
            dishId: route.params.dishId
        }
        const res=await addDishCollect(apiData)
            console.log(res.data.data)
            dishCollectValue.value=false
            ElMessage.success("收藏成功")
    } 
    //取消收藏菜品
    async function deleteDishCollectButton(){
        const apiData={
            userId: localStorage.getItem("id"),
            dishId: route.params.dishId
        }
        const res=await deleteDishCollect(apiData)
            console.log(res.data.data)
            dishCollectValue.value=true
            ElMessage.success("取消收藏成功")
    }
    //检测滑动事件
    console.log(route.params.id)
    function handleScroll() {
    // 获取元素相对于视口的位置信息
        var box1=document.getElementById('scrollspyHeading1')
        var rect1 = box1.getBoundingClientRect();
        var box2=document.getElementById('scrollspyHeading2')
        var rect2 = box2.getBoundingClientRect();
        var box3=document.getElementById('scrollspyHeading3')
        var rect3 = box3.getBoundingClientRect();

        // 检查元素是否在可见区域内
        if (rect1.top >= 0 &&
            rect1.left >= 0 &&
            rect1.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect1.right <= (window.innerWidth || document.documentElement.clientWidth)) {
                clearActiveClassAndAdd('link1')
                console.log('盒子在可见区域内');
        }
        else if(rect2.top >= 0 &&
            rect2.left >= 0 &&
            rect2.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect2.right <= (window.innerWidth || document.documentElement.clientWidth)){
                clearActiveClassAndAdd('link2')
                console.log('盒子在可见区域内');
        } 
        else if(rect3.top >= 0 &&
            rect3.left >= 0 &&
            rect3.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect3.right <= (window.innerWidth || document.documentElement.clientWidth)){
                clearActiveClassAndAdd('link3')
                console.log('盒子在可见区域内');
                } else {
                console.log('盒子不在可见区域内');
        }
    };

    //导航栏的下划线的active
    function clearActiveClassAndAdd(link){
        // 将children 转换为数组，然后遍历删除 active 样式
        const childrenArray = Array.prototype.slice.call(navBox.value.children);
        childrenArray.forEach(function(item) {
            item.classList.remove('active');
        });
        // event.currentTarget.classList.add('active')
        console.log(link)
        document.querySelector("."+link).parentElement.classList.add('active')
    }

    //返回上一页面
    function returnButton(){
        console.log("点击")
        let id=route.params.id
        router.push(`/shopDetailPage/${id}/shopDishPage/ShopDishBox`);
    }
</script>
<style scoped>
    .productBox{
        margin:0 auto;
    }
    .productReturn{
        height: 100px;
        font-size: 20px;
        line-height: 40px;
        text-align: center;
        border-radius: 40px;
        float: left;
        height: 40px;
        width: 40px;
        background-color: #0292FE;
        opacity: 0.5;
        position: sticky;
        z-index: 1;
        top: 65px;
        left: 367px;
        color: white;
    }
    .productBox{
        margin-top:50px;
        height: 2000px;
        background-color: white;
        width:900px;
    }
    .productImgBox{
        text-align: center;
    }
    .productImg{
        width: 550px;
        height: 450px;
    }
    .productMightBox{
        position: relative;
        padding: 25px 25px 25px 67px;
        background-color: #f6f6f6;
        margin:0 auto;
        border-radius: 30px;
        width: 850px;
    }
    .productZi,
    .productZi2,
    .productPrice,
    .productSale,
    .productPacking{
        display: inline-block;
        
    }
    .productPacking{
        margin-right: 35px;
    }
    .addShoppingCart{
        position: absolute;
        cursor: pointer;
        bottom: 24px;
        right: 67px;
        background-color: #0292FE;
        color: white;
        padding: 5px 15px 5px 15px;
        border-radius: 20px;
    }
    .addDishCollet{
        position: absolute;
        cursor: pointer;
        top: 24px;
        right: 65px;
        color:#006cbe;
        font-size: 16px;
        padding: 5px 15px 5px 15px;
        border-radius: 20px;
    }
    .productName{
        font-size:20px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .productType{
        text-align: center;
        background-color: #8bc5f2;
        color: white;
        width:70px;
        border-radius: 5px;
        margin-bottom:10px;
    }
    .productZi,
    .productPacking,
    .productSale{
        color: #7a7979;
    }
    .productZi2{
        font-size: 15px;
        margin-top: 10px;
    }
    .productPrice{
        font-size: 20px;
    }
    .productBottomBox{
        margin-top: 10px;
    }
    .productBottomBox #navbar-example2{
        background-color:  white !important;
        padding-bottom: 10px;
        position: sticky;
        z-index: 1; 
        top:54px;
        margin-bottom: 0 !important;
    }
    #navbar-example2 a{
        color: black;
        font-size: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
        cursor: pointer;
        width: 100px;
        text-align: center;
    }
    .active{
        border-bottom: 2px solid #0292FE;
        border-radius: 0;
    }
    #navbar-example2 a:hover{
        background-color: #f5f3f3;
        transition: border-bottom 0.5s ease;
    }
    .scrollspy-example{
        background-color: white !important;
    }
    .productDetailBox1{
        width: 850px;
        margin:0 auto;
        background-color: #f6f6f6;
        border-radius: 30px;
        padding:20px 25px 25px 25px;
    }
    .productDetailBox1 div{
        margin: 10px;
    }
    .scrollspy-example{
        padding-top:0 !important;
    }
    #scrollspyHeading1,
    #scrollspyHeading2,
    #scrollspyHeading3{
        position: relative;
        top: -115px;
    }
    .dishTitle{
        margin-top:5px;
        font-size: 16px;
        font-weight: 600;
    }
    .dishTitle2{
        margin-top:5px;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 600;
    }
    .dishZi,
    .dishZi2,
    .dishDetail,
    .dishMaterial,
    .dishWeight{
        display:inline-block;

    }
    .productDetailBox1 .dishZi2{
        margin-right: 37px;
    }
    .productDetailBox2,
    .productDetailBox3{
        width: 850px;
        border-radius: 30px;
        background-color: #f6f6f6;
        padding: 20px 25px 25px 25px ;
        margin:0 auto;
    }
    .productDetailBox2{
        margin-top: 30px;
    }
    .commentPicture{

        width: 60px;
        height: 60px;
        border-radius: 50px;
    }
    .dishCommentBox{
        padding-left: 10px;
        padding-bottom: 20px;
    }
    .dishCommentBox:hover{
        border-radius: 10px;;
        background-color: #fcfcfc;
        transition: border-bottom 1s ease;
    }
    .flexBox{
        height: 88px;
        display: flex;
    }
    .commentPart1{
        line-height: 100px;
        flex:1;
        text-align: center;
    }
    .commentPart2{
        margin-top: 22px;
        flex:7;
        line-height: 30px;
    }
    .dishCommentNickname{
        font-size: 14px;
    }
    .dishCommentTime{
        color:#7a7979;
    }
    .dishCommentContent{
        margin-left: 100px;
        font-size: 16px;
    }
    .productDetailBox3{
        width: 850px;
        border-radius: 30px;
        background-color: #f6f6f6;
        padding: 20px 25px 25px 25px ;
        margin:0 auto;
    }
    .productDetailBox3{
        margin-top: 30px;
    }
</style>