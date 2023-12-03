<template>
    <div class="shopBackground">
        <!-- <div>
            <div class="shopImageDetail">
                <div class="shopNavigation">
                    <span class="searchInputBox">
                        <input class="searchInput" placeholder="想吃什么搜一搜">
                    </span>
                    <span @click="isClickSearchClick"><i class="search icon"></i></span>

                    <span>聊天</span>
                    <span v-show="!isCollect" @click="collectClick">收藏店铺&nbsp;<i class="star outline icon"></i></span>
                    <span v-show="isCollect" @click="collectClick">取消收藏&nbsp;<i class="star icon"></i></span>
                    <span>反馈举报</span>
                </div>
                <img :src="shopDetail.background" class="picture">
                
            </div>
        
            <div class="shopContent">
                <div class="shopContentDetail1">
                    
                    <div class="flexBox1">   
                        <h2 class="shopName">{{ shopDetail.name }}</h2>
                        <span class="shopScore">4.9分</span>
                        <span class="shopZi">月售：</span><span class="shopSaleNum">96</span>
                        <div class="shopDetail">{{ shopDetail.profile }}</div>
                    </div>         
                    <div class="flexBox2">
                        <img :src="shopDetail.logoPhoto" class="shopDetailImg">
                    </div>        
                    
                    
                
                </div>
                <div class="shopContentDetail2">
                    <div class="topBox">
                        <span class="topBoxActive">点餐</span>
                        <span>评价</span>
                        <span>品牌故事</span>
                    </div>
                    <div class="bottomBox">
                        <div class="leftBox">
                            <div>推荐尝鲜</div>
                            <div>老板推荐</div>
                            <div>凑单零食</div>
                            <div>鲜果茶</div>
                            <div>轻负担好茶</div>
                        </div>
                        <div class="rightBox">


                            <span v-for="item in dishes" :key="item.id">
                                <DishBox :dish="item">
                                </DishBox>
                            </span>


                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div class="tall"></div> -->
        <!-- <ProductDetailPage></ProductDetailPage> -->
        <router-view></router-view>
        <!-- <ShopDishPage></ShopDishPage> -->
        <div class="footerBox">
            <span><i class="shopping cart icon"></i></span>
            <span class="shoppingNumber">1</span>

            <span>￥</span><span class="shoppingPrice">15</span>
            <span class="footerZi">另需配送费约￥</span><span>{{ shopDetail.packing }}</span>
            <button class="footerBottom">结算</button>
        </div>
        <div class="nullBox"></div>

    </div>
    

</template>
<script setup>
    import {ref,onMounted} from 'vue'
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {selectById} from '@/apis/shop.js'
    import {selectCollectByUserIdShopId, insertCollect, deleteCollect} from '@/apis/collect.js'
    import {useDishStore} from'@/stores/dishStore.js'
    const dishStore=useDishStore()

    let dishes=ref([])
    let shopDetail=ref([])
    const route = useRoute();
    onMounted(async() => {
        console.log(route.params.id)
        //获取dish列表
        dishStore.obtainDishList(route.params.id)
        dishes.value=dishStore.getDishList()

        const apiData={
            shopId: route.params.id
        }
        const res1=await selectById(apiData)
        console.log(res1.data.data)
        if(res1.data.code==0){
            console.log('成功发送')
            console.log(res1.data)
            if(res1.data.code==0){
                console.log("获取商家信息成功")
                shopDetail.value=res1.data.data
            }
            else{
                ElMessage.error(res1.data.message)
            }
        }

        //获取是否收藏该店铺了
        const apiData2={
            shopId:shopDetail.value.id,
            userId:localStorage.getItem("id")
        }
        let isCollect=ref()
        const res2=await selectCollectByUserIdShopId(apiData2)
            console.log(res2.data)
            if(res2.data.code==0){
                console.log("获取成功："+selectCollectByUserIdShopId)
                if(res2.data.data=="未收藏"){
                    isCollect.value=false
                }else if(res2.data.data=="收藏"){
                    isCollect.value=true
                }
            }
            else{
                ElMessage.error(res2.data.message)
            }
	})
    
</script>
<style scoped>
    .shopBackground{
        background-color: #efefef;
    }
    .footerBox{
        height: 55px;
        width: 100%;
        background-color: #0084ff;
        margin:0 auto;
        width: 900px;
        position: sticky;
        z-index: 1; 
        bottom: 0;
        color: white;
    }
    .shopping{
        font-size: 34px;
        color: white;
        margin-top: 5px;
        margin-left: 20px;
    }
    .shoppingNumber{
        background-color: rgba(255, 29, 29, 0.981);
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 20px;
        position: relative; /* 让元素相对定位 */
        top: -24px;
        left: -13px;
        color: white;
    }
    .shoppingPrice{
        font-size: 19px;
        font-weight: 600;
    }
    .footerZi{
        margin-left: 20px;
        color: #f0f0f0
    }
    .footerBottom{
        border: 1px solid white;
        background-color: #fff;
        color: #0071da;
        padding: 3px 17px 3px 17px;
        border-radius: 30px;
        float: right;
        margin-top: 15px;
        margin-right: 44px;
        font-size: 15px;
    }
    .nullBox{
        height: 200px;
        width: 100%;
    }
    

    /* 弹窗 */
    .zhezhao,
    .zhezhao1{
    position: fixed;
    left: 0px;
    top: 0px;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    }
    .tankuang,
    .tankuang1{
    position: fixed;
    top:40px;
    left:50%;
    transform:translateX(-50%);
    background: #fff;
    border-radius: 5px;
    color: black;
    }
    .tankuang{
    width: 550px;
    }
    .tankuang1{
    width: 500px;
    }
    #header{
    height: 40px;
    border-bottom: 1px solid #ccc;
    }
    #header span
    {
    line-height:40px;
    margin-left:30px;
    font-size:16px;
    color:#000;
    }
    #header-right{
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: rgb(167, 166, 166);
    color: #fff;
    right: 23px;
    top: 16px;
    text-align: center;
    cursor: pointer;
    font-size: 17px;
    }
    .modalContent{
    margin-top: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-right: 10px;
    margin-left: 10px;
    }
</style>