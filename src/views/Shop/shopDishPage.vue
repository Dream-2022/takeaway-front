<template>
    <div>
        <div class="shopImageDetail">
            <div class="shopNavigation">
                <span class="searchInputBox">
                    <input class="searchInput" placeholder="想吃什么搜一搜">
                </span>
                <span @click="isClickSearchClick"><i class="search icon"></i></span>

                <span>聊天</span>
                <span>收藏店铺</span>
                <span>反馈举报</span>
            </div>
            <img :src="shopDetail.background" class="picture">
            
        </div>
    
        <div class="shopContent">
            <div class="shopContentDetail1">
                
                <div class="flexBox1">   
                    <h2 class="shopName">{{ shopDetail.name }}</h2>
                    <span class="shopScore">{{ shopDetail.score }}分</span>
                    <span class="shopZi">月售：</span><span class="shopSaleNum">{{ shopDetail.saleNum }}</span>
                    <div class="shopDetail">{{ shopDetail.detail }}</div>
                </div>         
                <div class="flexBox2">
                    <img :src="shopDetail.picture" class="shopDetailImg">
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
                            <DishBox :dish="item" @open="abc">
                            </DishBox>
                        </span>


                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>
<script setup>
    import {ref,onMounted}  from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import DishBox from '@/views/Shop/Components/dishBox.vue';
    import {dishDetailAll} from '@/apis/dish.js'
    import {selectById} from '@/apis/shop.js'
    const route = useRoute();
    let dishes=ref([])
    let shopDetail=ref([])
    onMounted(async() => {
        const apiData0={
            shopId: route.params.id
        }
        const res0=await dishDetailAll(apiData0)
        console.log(route.params.id)
            console.log('成功发送')
            console.log(res0.data)
            if(res0.data.code==0){
                console.log("获取商品信息成功")
                dishes.value=res0.data.data
            }
            else{
                ElMessage.error(res0.data.message)
            }

        const apiData={
            shopId: route.params.id
        }
        const res=await selectById(apiData)
            console.log('成功发送')
            console.log(res.data)
            if(res.data.code==0){
                console.log("获取商家信息成功")
                shopDetail.value=res.data.data
            }
            else{
                ElMessage.error(res.data.message)
            }
	})
    //监听子组件点击选规格事件
    const abc = () => {
        //获取参数
        console.log("看看我执行了吗");
    }
    //获取详细商品信息
    // let dishX=ref([])
    // onMounted(() => {
    //     console.log(route.params.id)
    //     const http=axios.create({
    //         baseURL:'http://localhost:8080'
    //     })
    //     http({
    //         url:'/api/pre/dish/selectDishById',
    //         method:'POST',
    //         data:{
    //             shopId: route.params.dishId
    //         }
    //     }).then((res)=>{
    //         console.log('成功发送')
    //         console.log(res.data)
    //         if(res.data.code==0){
    //             console.log("获取商品信息成功")
    //             dishX.value=res.data.data
    //         }
    //         else{
    //             ElMessage.error(res.data.message)
    //         }
    //     })
	// })
</script>
<style scoped>
 .shopImageDetail{
        margin:0 auto;
        width: 900px;
        position: relative;
    }
    .shopNavigation{
        width: 900px;
        height: 50px;
        margin: 0 auto;
        background-color: #efefef;
        padding-left: 20px;
        line-height: 50px;
        display: block;
        left: 0;
        position: sticky;
        z-index: 1; 
        top: 53px;
    }
    .shopNavigation .searchInputBox{
        margin-right: 5px;
    }
    .searchInput{
        margin: 0;
        height: 26px;
        border-radius: 25px;
        padding: 7px;
    }
    .shopNavigation span{
        margin-right: 55px;
        cursor: pointer;
    }
    .shopNavigation{
        margin-top:53px;
    }
    .picture{
        width: 900px;
        height: 300px; /* 设置图片的高度，以剪切掉顶部的部分 */
        object-fit: cover;
    }
    .shopContent{
        width: 900px;
        margin:0 auto;
        background-color: white;
        padding: 20px 20px 0 20px;
    }
    .shopContentDetail1{       
        border-radius: 20px;
        background-color: white;
        box-shadow: 0px 0px 3px #8cb5db;
        height: 200px;
        display: flex;
        transform: translateY(-121px);
    }
    .flexBox1{
        flex:5;
    }
    .flexBox2{
        margin-top: 42px;
        flex:1;
    }
    .shopDetailImg{
        border-radius: 100px;
    }
    .shopName{
        margin-left: 20px;
        padding-top: 32px;
    }
    .shopScore{
        margin-left: 10px;
        margin-right: 30px;
        display: inline-block;
        padding: 10px;
        color: #de5454;
        font-weight: 700;
    }
    .shopDetail{
        margin-left: 10px;
        padding: 10px;
    }
    .shopDetailImg{
        width: 100px;
        height: 100px;
    }
    .shopContentDetail2{
        padding-bottom: 50px;
        border-radius: 20px;
        transform: translateY(-100px);
        box-shadow: 0px 0px 3px #8cb5db ;
    }
    .topBox{
        padding: 5px 5px 20px 5px;
    }
    .topBox span{
        display: inline-block;
        padding: 10px 123px 10px 123px;
        cursor: pointer;
    }
    .topBox span:hover{
        background-color: #efefef;
        border-radius: 10px 10px 0 0;
    }
    .topBoxActive{
        border-bottom: 3px solid #0084ff;
    }
    .bottomBox{
        display: flex;
    }
    .leftBox{
        margin: 0 5px 20px 20px ;
        background-color: #e8eeff;
        border-radius: 20px;
        flex: 1;
        position: sticky;
        top: 0;
        z-index: 2;
    }
    .leftBox div{
        padding: 10px;
        cursor: pointer;
    }
    .leftBox div:hover{
        border-radius: 20px;
        background-color: #eaecf3;
    } 
    .rightBox{
        margin: 0 20px 20px 5px;
        border-radius: 20px;
        flex: 5;
    }
</style>
