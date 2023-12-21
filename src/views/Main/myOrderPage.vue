<template>
    <div class="orderBigBox">
        <div class="MyOrderBox">
            <div class="orderBoxTitle">我的订单</div>
            <div class="orderShops">
                
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
    .orderBigBox{
        width: 100%;
        min-height: 700px;
        background-color: rgb(243, 247, 248);
        padding-top: 110px;
        padding-bottom: 80px;
    }
    .MyOrderBox{
        width: 800px;
        margin: 0 auto;
        background-color: #fff;
    }
    .orderBoxTitle{
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1.5px solid #ccc;
    }
    .orderShops{
        padding: 20px 45px 10px 45px;
    }
</style>