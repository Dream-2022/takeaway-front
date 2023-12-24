<template>
    <div class="zhezhao2" id='zhezhao2' v-if="backendPopStore.shopPopValue"></div>
    <div class="tankuang2" v-if="backendPopStore.shopPopValue">
        <div id="header2">
            <div class="headTitle">查看商家</div>
            <div id="header-right2" @click="hidder2">x</div>
        </div>
        <div class="modalContent">
            <div>
                <span>商家ID：</span>
                <span>{{ backendPopStore.objectValue.id }}</span>
            </div>
            <div>
                <span>商家名称：</span>
                <span>{{ backendPopStore.objectValue.name }}</span>
            </div>
            <div>
                <span>菜品logo：</span>
                <img :src="backendPopStore.objectValue.logoPhoto" class="userImg">
            </div>
            <div>
                <span>商家位置：</span>
                <span>{{ backendPopStore.objectValue.addressProvinceName }}{{ backendPopStore.objectValue.addressCityName}}{{ backendPopStore.objectValue.addressCountyName }}</span>
            </div>
            <div>
                <span>商家简介：</span>
                <span>{{ backendPopStore.objectValue.profile }}</span>
            </div>
            <div>
                <span>菜品类型：</span>
                <span>{{ backendPopStore.objectValue.type }}</span>
            </div>
            <div>
                <span>起送价：</span>
                <span>￥{{ backendPopStore.objectValue.begin }}</span>
            </div>
            <div>
                <span>联系电话：</span>
                <span>{{ backendPopStore.objectValue.contactCall==""?"暂无":backendPopStore.objectValue.contactCall }}</span>
            </div>
            <div>
                <span>配送费：</span>
                <span>￥{{ backendPopStore.objectValue.delivery }}</span>
            </div>
            <div>
                <span>商家状态：</span>
                <span>{{ backendPopStore.objectValue.stateValue }}</span>
            </div>
        </div>
        
        <div class="buttonBox">
            <button class="TanConfirmButton" @click="hidder2">关闭</button>
        </div>
    </div>
    </template>
    <script setup>
        import {onMounted, ref} from 'vue' 
        import { useBackendPopStore } from '@/stores/backendPopStore.js'
        const backendPopStore=useBackendPopStore()
        onMounted(async()=>{
            console.log(backendPopStore.objectValue)
            console.log(backendPopStore.objectValue.value)
        })
        function hidder2(){
            backendPopStore.shopPopValue=false
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