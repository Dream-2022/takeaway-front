<template>
    <!--  v-if="categoryStore.openAddCategoryDown" -->
<div class="zhezhao2" id='zhezhao2' v-if="backendPopStore.userPopValue"></div>
<div class="tankuang2"  v-if="backendPopStore.userPopValue">
    <div id="header2">
        <div class="headTitle">查看用户</div>
        <div id="header-right2" @click="hidder2">x</div>
    </div>
    <div class="modalContent">
        <div>
            <span>用户ID：</span>
            <span>{{ backendPopStore.objectValue.id }}</span>
        </div>
        <div>
            <span class="categoryInputZi">用户名：</span>
            <span>{{ backendPopStore.objectValue.nickname }}</span>
        </div>
        <div>
            <span>头像：</span>
            <img :src="backendPopStore.objectValue.picture" class="userImg">
        </div>
        <div>
            <span>性别：</span>
            <span>{{ backendPopStore.objectValue.gender }}</span>
        </div>
        <div>
            <span>邮箱：</span>
            <span>{{ backendPopStore.objectValue.email }}</span>
        </div>
        <div>
            <span>用户简介：</span>
            <span>{{ backendPopStore.objectValue.profile }}</span>
        </div>
        <div>
            <span>用户生日：</span>
            <span>{{ backendPopStore.objectValue.time }}</span>
        </div>
    </div>
    
    <div class="buttonBox">
        <button class="TanConfirmButton" @click="hidder2">关闭</button>
    </div>
</div>
</template>
<script setup>
    import { useBackendPopStore } from '@/stores/backendPopStore.js'
    const backendPopStore=useBackendPopStore()
    function hidder2(){
        backendPopStore.userPopValue=false
    }
</script>
<style scoped>
    .userImg{
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }
    .modalContent div{
        margin-bottom: 10px;
    }
    /* 查看用户弹窗 */
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
        margin-top: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid #ccc;
        margin-right: 10px;
        margin-left: 30px;
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