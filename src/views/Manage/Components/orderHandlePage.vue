<template>
    <div class="rightTopBox">
        <span>全部订单</span>
        <span>待接单</span>
        <span>待派送</span>
        <span>已完成</span>
        <span>已取消</span>
        <span>已退款</span>
    </div>
</template>
<script setup>
    
</script>
<style scoped>
    .rightTopBox{
        display: flex;
        background-color: #b7dae8;
        height: 50px;
        line-height: 50px;
        padding: 0 30px 0 30px;
    }
    .rightTopBox span{
        text-align: center;
        flex:1;
    }
    .rightTopBox span:hover{
        background-color: #fff;
    }
</style>
