<template>
    <div class="bottomBox">
        <div class="leftBox">
            <div v-for="item in categoryStore.categoryList" :key="item" class="leftBoxDiv">
                {{ item.categoryName }}
            </div>
        </div>
        <div class="rightBox">
            <span v-for="cate in categoryStore.categoryList" :key="cate">
                <div>{{ cate.id }}</div>
                <span v-for="item in dishes" :key="item.id">
                    <DishBox :dish="item">
                    </DishBox>
                </span>
            </span>
        </div>
    </div>

</template>
<script setup>
    import {ref,onMounted,onUpdated}  from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import {useCategoryStore} from'@/stores/categoryStore.js'
    import DishBox from '@/views/Shop/Components/dishBox.vue';
    import {dishDetailAll} from '@/apis/dish.js'

    const route = useRoute();
    const categoryStore=useCategoryStore()
    let dishes=ref([])//通过cate找dishId
    let shopDetail=ref([])
    onMounted(async() => {
        //通过categoryId找dishId
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
        })
    //设置商品分类的默认选择    
    onUpdated(async() => {
        console.log(document.querySelector(".leftBox").childNodes)
        console.log(document.querySelector(".leftBox").childNodes.length)
        console.log(document.querySelector(".leftBox").childNodes.length>3)
        if(document.querySelector(".leftBox").childNodes.length>3){
            console.log("进来了")
            console.log(document.querySelector(".leftBox").childNodes[1])
            document.querySelector(".leftBox").childNodes[1].classList.add('leftBoxDivActive')
        }
	})
</script>
<style scoped>
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
    .leftBoxDiv{
        padding: 10px;
        cursor: pointer;
    }
    .leftBoxDiv:hover{
        border-radius: 20px;
        background-color: #eaecf3;
    } 
    .leftBoxDivActive{
        background-color: #dae1f7;
        border-radius: 20px;
    }
    .rightBox{
        margin: 0 20px 20px 5px;
        border-radius: 20px;
        flex: 5;
    }
</style>