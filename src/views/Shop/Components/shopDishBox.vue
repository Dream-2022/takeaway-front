<template>
    <div class="bottomBox">
        <div class="leftBox"> 
           <div class="leftStrick">
                <div  class="leftBoxDiv" v-for="cate in categoryList" :key="cate" @click="leftBoxDivClick">
                    <a class="nav-link link1" :href="`#scrollspyHeading${cate.id}`">{{ cate.categoryName }}</a>
                </div>
            </div>
        </div>
        <div class="rightBox">
            <div v-for="cate in categoryList" :key="cate">
                <div class="scrollBox" :id="`scrollspyHeading${cate.id}`"></div>
                <span class="cateName">{{ cate.categoryName }}</span>
                <span v-for="item in cate.dishList" :key="item">
                    <span>
                        <DishBox :dish="item">
                        </DishBox>
                    </span>
                </span>
            </div>
        </div>
    </div>

</template>
<script setup>
    import { ref, onMounted, onUpdated, onBeforeUnmount }  from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import {useCategoryStore} from'@/stores/categoryStore.js'
    import DishBox from '@/views/Shop/Components/dishBox.vue';
    import {dishDetailAll,dishDetailAllNoPage} from '@/apis/dish.js'
    import { selectDishByShopIdAndObtainCategory } from '@/apis/shop.js'

    const route = useRoute();
    const categoryStore=useCategoryStore()
    let categoryList=ref([])//通过cate找dishId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let shopDetail=ref([])
    onMounted(async() => {
        window.addEventListener('scroll', handleScroll);
        //通过shopId找对应category对应的dish（穿过来一个数组）
        const apiData0={
            id: route.params.id
        }
        console.log(apiData0)
        const res0=await selectDishByShopIdAndObtainCategory(apiData0)
            console.log(route.params.id)
            console.log('成功发送')
            console.log(res0.data.data)
            if(res0.data.code==0){
                console.log("获取商品信息成功")
                categoryList.value=res0.data.data
            }
            else{
                ElMessage.error(res0.data.message)
            }
            const leftBoxes=document.querySelectorAll('.leftBoxDiv')
            console.log(leftBoxes)
            console.log(leftBoxes.length)
            for(let i=0;i<leftBoxes.length;i++){
                console.log(leftBoxes[i])
            }
    })
    let flag=ref(0)
    //设置商品分类的默认选择    
    onUpdated(async() => {
        if(flag.value==0){
            const leftBoxDivBoxes=document.querySelectorAll('.leftBoxDiv')
            console.log(leftBoxDivBoxes[0])
            console.log(document.querySelector(".leftStrick").childNodes)
            console.log(document.querySelector(".leftStrick").childNodes.length)
            console.log(document.querySelector(".leftStrick").childNodes.length>3)
            if(document.querySelector(".leftStrick").childNodes.length>3){
                console.log("进来了")
                console.log(document.querySelector(".leftStrick").childNodes[1])
                console.log(document.querySelector('leftBoxDivActive'))
                document.querySelector(".leftStrick").childNodes[1].classList.add('leftBoxDivActive')
            }
            flag.value=1
        }

	})
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    //设置检测滑动事件
    function handleScroll() {
        const links=document.querySelector('.nav-link')
    }
    //点击分类，将样式清空再加上
    async function leftBoxDivClick(event){
        const leftBoxDivBoxes=document.querySelectorAll('.leftBoxDiv')
        console.log(leftBoxDivBoxes)
        for(let i=0;i<leftBoxDivBoxes.length;i++){
            console.log(leftBoxDivBoxes[i])
            console.log(leftBoxDivBoxes[i].classList)
            console.log(leftBoxDivBoxes[i].classList.contains('leftBoxDivActive'))
            if(leftBoxDivBoxes[i].classList.contains('leftBoxDivActive')){
                console.log("删除")
                leftBoxDivBoxes[i].classList.remove('leftBoxDivActive')
            }
        }
        console.log("第二种情况")
        console.log(event.target)
        console.log(event.target.parentNode)
        console.log(leftBoxDivBoxes[0])
        leftBoxDivBoxes[0].classList.remove('leftBoxDivBoxes')
        console.log(leftBoxDivBoxes[0])
        event.target.parentNode.classList.add('leftBoxDivActive')
        
        
    }
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
    .leftStrick{
        position: sticky;
        z-index: 1; 
        top: 160px;
    }
    .leftBoxDiv{
        height: 35px;
        line-height: 35px;
        text-align: center;
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
    .cateName{
        font-size: 15px;
        font-weight: 600;
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 10px;
    }
    .nav-link{
        height: 100%;
    }
    .scrollBox{
        top: -55px;
        position: relative;
    }
</style>