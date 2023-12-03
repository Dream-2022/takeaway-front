<template>
    <div>
        <div class="categoryBoxTop">
            <span class="categoryBoxTopTitle">分类名称：</span>
            <input class="categoryBoxInput" placeholder="请输入分类名称" v-model="categoryBoxInputValue">
            <div class="categoryBoxButton" @click="categoryBoxClick">查询</div>
            <div class="categoryBoxAdd">新建分类<i class="plus circle icon"></i></div>
        </div>
        <div class="categoryBoxBottom">
            <div class=""></div>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    let classList=ref([])
    let categoryBoxInputValue=ref()
    onMounted(async()=>{
        //获取菜品分类下拉框
        const apiData={
            shopId: localStorage.getItem("shopId")
        }
        const res=await selectCategoryAll(apiData)
            console.log(res.data)
            console.log(res.data.data)
            if(res.data.code==0){
                classList.value=res.data.data
            }
    })
    function categoryBoxClick(){
        
    }
</script>
<style scoped>
    .categoryBoxTop{
        width: 100%;
        background-color: #efefef;
        color: #545252;
        padding: 15px 0 15px 0;
        padding-left: 8%;
        padding-right: 8%;
        font-size: 16px;
    }
    .categoryBoxTopTitle{
        display: inline-block;
        margin-right: 1%;
    }
    .categoryBoxInput{
        width: 30%;
        padding: 5px;
        height: 30px;
        border-radius: 8px;
        border: 1px solid #bad9e6;
    }
    .categoryBoxButton{
        background-color: #24b0e8;
        color: white;
        display: inline-block;
        width: 8%;
        margin-left: 2%;
        border-radius: 10px;
        text-align: center;
        padding-top: 3px;
        padding-bottom: 3px;
        margin-right: 30%;
        cursor: pointer;
    }
    .categoryBoxAdd{
        background-color: white;
        color: #24b0e8;
        border: 1px solid #24b0e8;
        width: 10%;
        display: inline-block;
        text-align: center;
        border-radius: 8px;
        padding-top: 3px;
        padding-bottom: 3px;
        cursor: pointer;
    }
    i.icon{
        margin-left: 3px;
        margin-right: 0;
    }
    @media screen and (max-width: 1440px) {
        .categoryBoxAdd{
            width: 15%;
            background-color: #fff;
        }
    }
    @media screen and (max-width: 830px) {
        .categoryBoxAdd,
        .categoryBoxButton{
            margin-right: 10%;
            font-size: 14px;
        }
        .categoryBoxAdd{
            width: 20%;
        }
    }
</style>
