<template>
    <div class="informationBox">
        <div class="informationName">古茗</div>
        <div class="informationDetail">
            <span class="informationScore">4.9</span><span class="informationScoreZi">分</span><br>
            <span class="informationAddress"><i class="map marker alternate icon"></i>{{ shopDetail.addressProvinceName }}{{ shopDetail.addressCityName }}{{ shopDetail.addressCountyName }}{{ shopDetail.addressDetail }}</span>
            <div class="informationCreateTimeBox">
                <span class="informationCreateTimeZi"><i class="clock icon"></i>开店时间:</span>
                <span>{{ createTime }}</span>
            </div>
            <div class="informationImgBox">
                <div class="informationImgBoxZi">门面:</div>
                <img :src="shopDetail.storePhoto" class="informationStorePhoto">
            </div>
            <div class="informationImgBox">
                <div class="informationImgBoxZi">店内:</div>
                <div>
                    <img :src="shopDetail.inPhoto" class="informationInPhoto">
                </div>
            </div>
        </div>
    </div>
    <div class="informationBox2">
        <div class="informationName2">商家承诺</div>
        <span>食品安全</span>
        <span>食无忧保障</span>
        <span>亮证经营</span>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {selectById} from '@/apis/shop.js'

    import {useDishOneStore} from'@/stores/dishOneStore.js'
    const dishOneStore=useDishOneStore()
    let shopDetail=ref([])
    let createTime=ref("")
    onMounted(async()=>{
        const apiData={
            shopId:localStorage.getItem("shopId")
        }
        const res=await selectById(apiData)
            console.log(res.data)
            console.log(res.data.data)
            if(res.data.code==0){
                shopDetail.value=res.data.data
            }
        console.log(shopDetail.value.createAt)    
        const date = new Date(shopDetail.value.createAt);  
  
        createTime = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}时${date.getMinutes()}分`;  
        console.log(createTime);  
    })
</script>
<style scoped>
    .informationBox,
    .informationBox2{
        padding: 20px 40px 20px 40px;
        margin-left: 30px;
        margin-right: 30px;
        box-shadow:0px 0px 3px #b2cde7;
        border-radius: 20px;
    }
    .informationBox2{
        margin-top: 20px;
    }
    .informationName{
        padding-bottom: 5px;
        font-size: 18px;
        font-weight: 600;
    }
    .informationName2{
        font-size: 15px;
        font-weight: 600;
        padding-bottom: 9px;
    }
    .informationBox2 span{
        display: inline-block;
        margin-right: 30px;
    }
    .informationScore{
        color: #ffa200;
        font-weight: 600;
        font-size: 16px;
    }
    .informationAddress{
        display: inline-block;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .informationImgBox{
        display: flex;
    }
    .informationScoreZi{
        color: #ffa200;
    }
    .informationImgBoxZi{
        margin-right: 8px;
    }
    .informationStorePhoto,
    .informationInPhoto{
        width: 120px;
        height: 120px;
    }
    .informationCreateTimeBox{
        margin-bottom: 5px;
    }
    .informationCreateTimeZi{
        display: inline-block;
        margin-right: 10px;
    }
    .informationImgBox{
        margin-bottom: 8px;
    }
</style>