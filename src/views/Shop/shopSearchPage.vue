<template>
    <div class="shopSearchBox">
        <div class="shopSearchInputBox">
            <input class="shopSearchInputBoxInput" v-model="searchInputValue" placeholder="在店家搜索">
            <span class="shopSearchInputBoxButton" @click="shopSearchInputBoxButtonClick">搜索</span>
        </div>
        <div class="shopSearchDishBoxes">
            <span v-for="item in dishes" :key="item.id">
                    <DishBox :dish="item">
                    </DishBox>
                </span>
        </div>
    </div>
</template>
<script setup>
    import {ref,onMounted} from 'vue'
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import DishBox from '@/views/Shop/Components/dishBox.vue';
    import {selectDishByValue} from '@/apis/dish.js'

    const route = useRoute();
    const router = useRouter();
    let dishes=ref([])
    let searchInputValue=ref("")
    onMounted(async() => {
        searchInputValue.value=route.params.searchValue
        const apiData={
            shopId: localStorage.getItem("shopId"),
            searchInput:searchInputValue.value
        }
        const res=await selectDishByValue(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                dishes.value=res.data.data
            }
    })
    //点击搜索
    async function shopSearchInputBoxButtonClick(){
        console.log("点击")
        const id= route.params.id
        const searchValue=searchInputValue.value
        if(searchValue==""){
            ElMessage.warning("请输入搜索内容")
            return
        }    
        searchInputValue.value=searchInputValue.value
        const apiData={
            shopId: localStorage.getItem("shopId"),
            searchInput:searchInputValue.value
        }
        const res=await selectDishByValue(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                dishes.value=res.data.data
            }
        router.push(`/shopDetailPage/${id}/shopSearchPage/${searchValue}`);

    }
</script>
<style scoped>
    .shopSearchBox{
        width: 900px;
        margin:0 auto;
        background-color: #EFEFEF;
        padding-top: 65px;

    }
    .shopSearchInputBox{
        padding-bottom: 8px;
    }
    .shopSearchInputBoxInput{
        width: 500px;
        height: 30px;
        border-radius: 20px;
        padding: 10px;
        outline: none;
        border: 1px solid #ccc;
        margin-left: 124px;
    }
    .shopSearchInputBoxButton{
        margin-left: 15px;
        padding: 7px 50px 7px 50px;
        background-color: #ccc;
        border-radius: 20px;
        cursor: pointer;
    }
    .shopSearchDishBoxes{
        background-color: #fff;
        min-height: 500px;
    }
</style>