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
    
<div class="zhezhao1" id='zhezhao1'></div>
<div class="tankuang1" style="display:none;">
    <div id="header">
        <div class="headTitle">地址管理</div>
        <div id="header-right" @click="hidder1">x</div>

        <div class="modalContent">
          <div class="inputAddressBox">
              <div class="selectBox">
                <select class="addressProvince" name="省" @change="handleProvinceChange" ref="myProvinceSelect">
                  <option v-for="item in reDistrictProvinceList" :key="item" :value="item.districtId">{{item.district}}</option>
                </select>
              </div>
              <div class="selectBox">
               <select class="addressCity" name="市" @change="handleCityChange" ref="myCitySelect">
                 <option v-for="item in reDistrictCityList" :key="item" :value="item.districtId">{{item.district}}</option>
               </select>
              </div>
              <div class="selectBox">
               <select class="addressCounty" name="县" @change="handleCountyChange" ref="myCountySelect">
                 <option v-for="item in reDistrictCountyList" :key="item" :value="item.districtId">{{item.district}}</option>
               </select>
              </div>
            
              <div class="modalZi">详细地址</div>
              <input class="detailedAddress" placeholder="请输入详细地址" ref="myAddressDetail">
              <div class="modalZi">联系人</div>
              <input class="detailedAddress" placeholder="请输入姓名" ref="myName">
              <div class="modalZi">联系电话</div>
              <input class="detailedAddress detailedAddressPhone" placeholder="请输入电话" ref="myPhone">
              <!-- <button class="confirmAdd">添加</button>
              <button class="cancelAdd">取消</button> -->
            </div>
        </div>
        
        <div class="buttonBox">
          <button class="TanConfirmButton" @click="addAddressButton">{{ dianWoButtonZi }}</button>
          <button class="TanCancelButton" @click="hidder1">取消</button>
        </div>
    </div>
</div>
</template>
<script setup>
    import {ref,onMounted} from 'vue'
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {selectById} from '@/apis/shop.js'
    import {selectCollectByUserIdShopId, insertCollect, deleteCollect} from '@/apis/collect.js'
    import {useDishStore} from'@/stores/dish.js'
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
    .might{
        margin: 0 auto;
        background-color: #143b5f;
    }
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
</style>