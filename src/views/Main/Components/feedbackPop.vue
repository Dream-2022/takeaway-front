<template>
<div class="zhezhao2" id='zhezhao2' v-if="shopStore.feedbackPopValue"></div>
<div class="tankuang2" v-if="shopStore.feedbackPopValue">
    <div id="header2">
        <div class="headTitle">举报商家</div>
        <div id="header-right2" @click="hidder2">x</div>
    </div>
    <div class="modalContent">
        <div class="textareaBox">
            <span>举报理由：</span>
            <textarea class="feedTextarea" v-model="feedTextareaValue"></textarea>
        </div>
    </div>
    
    <div class="buttonBox">
        <button class="TanConfirmButton" @click="TanConfirmClick">提交</button>
        <button class="TanCancelButton" @click="hidder2">关闭</button>
    </div>
</div>
</template>
<script setup>
    import {onMounted, ref, nextTick } from 'vue' 
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {insertReport} from'@/apis/reportApi.js'
    import {useShopStore} from'@/stores/shopStore.js'
    const shopStore=useShopStore()
    const route = useRoute();

    let feedTextareaValue=ref("")
    onMounted(async() => {
        feedTextareaValue.value=""
    })
    async function TanConfirmClick(){
        if(feedTextareaValue.value==""){
            ElMessage.warning("举报内容不能为空")
            return
        }
        //新增到数据库
        const apiData={
            userId: localStorage.getItem("id"),
            shopId: route.params.id,
            content: feedTextareaValue.value
        }
        const res=await insertReport(apiData)
            console.log(res.data.data)
            ElMessage.success("举报成功")
            hidder2()

    }
    function hidder2(){
        shopStore.feedbackPopValue=false
    }
</script>
<style scoped>
    .textareaBox{
        display: flex;
    }
    .feedTextarea{
        width: 300px;
    }
    /* 添加分类弹窗 */
    #header2{
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
    }
    .headTitle{
        color: rgb(73, 73, 73);
        margin-top: 16px;
        margin-left: 20px;
        font-size: 17px;
    }
    .zhezhao2{
        position: fixed;
        left: 0px;
        top: 0px;
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    .tankuang2{
        position: fixed;
        top:40px;
        left:50%;
        transform:translateX(-50%);
        background: #fff;
        border-radius: 5px;
        color: black;
    }
    .tankuang2{
    width: 450px;
    }
    #header-right2{
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
        margin-left: 30px;
        margin-top: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid #ccc;
        margin-right: 10px;
        max-height: 500px;
        white-space: nowrap;
        overflow-y:scroll;
    }

    .buttonBox{
        float: right;
        margin-right: 50px;
        margin-bottom: 18px;
    }
    .TanConfirmButton{
        width:80px;
        height:35px;
        margin-top:15px;
        outline:none;
        border:0px;
        border-radius:10px;
        background:rgb(0, 148, 254);
        color:#fff;
        margin-left:30px;
    }
    .TanCancelButton{
        width:80px;
        height:35px;
        background:#dedede;
        color:#000;
        border:1px solid #ccc;
        border-radius:10px;
        margin-left: 40px;
    }
</style>