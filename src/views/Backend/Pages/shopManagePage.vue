<template>
    <div class="shopSearchBox">
        <div class="shopSearchIdBox">
            <span>商家编号：</span>
            <input class="shopSearchId" v-model="shopSearchIdValue">
        </div>
        <div class="shopSearchNameBox">
            <span>商家名称：</span>
            <input class="shopSearchName" v-model="shopSearchNameValue">
        </div>
        <div class="shopSearchStateBox">
            <span>商家状态：</span>
            <select class="shopSearchState" v-model="shopSearchStateValue" @change="handleStateChange">
                <option value="0">全部</option>
                <option value="1">已审核</option>
                <option value="2">未审核</option>
                <option value="3">停售</option>
            </select>
        </div>
        <div class="shopSearchButtonBox">
            <span class="shopSearchButton" @click="shopSearchClick">搜索</span>
        </div>
    </div>
    <div class="shopBoxes">
        <div class="shopTitle">
            <span class="shopIdBox">ID</span>
            <span class="shopImgBox">logo</span>
            <span class="shopNameBox">商家名称</span>
            <span class="shopAddressBox">商家地址</span>
            <span class="shopTypeBox">经营类型</span>
            <span class="shopStateBox">商家状态</span>
            <span class="shopOperate">操作</span>
        </div>
        <div class="shopBox" v-for="item in shopList" :key="item">
            <span class="shopIdBox">{{ item.id }}</span>
            <span class="shopImgBox">
                <img :src="item.logoPhoto" class="shopImg">
            </span>
            <span class="shopNameBox">{{ item.name }}</span>
            <span class="shopAddressBox">{{ item.addressProvinceName }}&nbsp;{{ item.addressCityName }}&nbsp;{{ item.addressCountyName }}</span>
            <span class="shopTypeBox">{{ item.type }}</span>
            <span class="shopStateBox">{{ item.stateValue }}</span>
            <span class="shopOperate">
                <span class="shopOperateAccess" v-if="item.state==2" @click="shopOperateAccessClick(item)">审核通过</span>
                <span class="shopOperateReject" v-if="item.state==2" @click="shopOperateRejectClick(item)">审核失败</span>
                <span class="shopOperateQuit" v-if="item.state==1" @click="shopOperateQuitClick(item)">暂停营业</span>
                <span class="shopOperateCancel" v-if="item.state!=2" @click="shopOperateCancelClick(item)">取消停售</span>
                <span class="shopOperateView" @click="shopOperateViewClick(item)">查看商家</span>
            </span>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {useRouter} from "vue-router"
    import { ElMessage } from 'element-plus';
    import { selectShopByIdAndNameAndState, updateShopStateById } from '@/apis/shop.js'
    import { useBackendPopStore } from '@/stores/backendPopStore.js'

    const backendPopStore=useBackendPopStore()
    let shopSearchIdValue=ref("")
    let shopSearchNameValue=ref("")
    let shopSearchStateValue=ref(0)
    let shopList=ref([])
    onMounted(async()=>{
        await obtainShopValue()
    })
    //审核通过
    async function shopOperateAccessClick(shop){
        const result=confirm("确认审核通过吗？")
        if(result){
            console.log(shop)
            updateShopStateFunction(shop,1)
            ElMessage.success("审核成功")
        }
    }
    //审核未通过
    function shopOperateRejectClick(shop){
        const result=confirm("确认审核失败吗？")
        if(result){
            console.log(shop)
            updateShopStateFunction(shop,5)
            ElMessage.success("审核未通过")
        }
    }
    //管理员点击停售商家
    function shopOperateQuitClick(shop){
        const result=confirm("确认停售商家吗？")
        if(result){
            console.log(shop)
            updateShopStateFunction(shop,5)
            ElMessage.success("停售成功")
        }
    }
    //管理员点击取消停售商家
    function shopOperateCancelClick(shop){
        const result=confirm("确认取消停售商家吗？")
        if(result){
            console.log(shop)
            updateShopStateFunction(shop,1)
            ElMessage.success("取消停售成功")
        }
    }
    //点击查看商家
    function shopOperateViewClick(shop){
        backendPopStore.shopPopValue=true
        backendPopStore.objectValue=shop
        console.log(backendPopStore.obtainShopValue)
    }
    //点击搜索
    async function shopSearchClick(){
        await obtainShopValue()
    }
    //下拉框的变化
    async function handleStateChange(){
        await obtainShopValue()
    }
     //修改商家的状态
     async function updateShopStateFunction(shop,state){
        const apiData ={
            id: shop.id,
            state
        }
        const res=await updateShopStateById(apiData)
            console.log(res.data.data)
            obtainShopValue()
    }
    //获取商家信息
    async function obtainShopValue(){
        const apiData={
            idValue: shopSearchIdValue.value,
            name: shopSearchNameValue.value,
            state: shopSearchStateValue.value
        }
        console.log(apiData)
        const res=await selectShopByIdAndNameAndState(apiData)
            console.log(res.data.data)
            shopList.value=res.data.data
            for(let i=0;i<shopList.value.length;i++){
                console.log(shopList.value[i])
                if(shopList.value[i].state==1){
                    shopList.value[i].stateValue="营业"
                }
                if(shopList.value[i].state==2){
                    shopList.value[i].stateValue="未审核"
                }
                if(shopList.value[i].state==3){
                    shopList.value[i].stateValue="暂停营业"
                }
                if(shopList.value[i].state==4){
                    shopList.value[i].stateValue="已保存"
                }
                if(shopList.value[i].state==5){
                    shopList.value[i].stateValue="禁止营业"
                }
            }
    }
</script>
<style scoped>
    /* .shopNavigationBox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shopNavigationBox div{
        color: #008cc4;
        text-align: center;
        height: 45px;
        line-height: 45px;
        width: 33.33%;
        cursor: pointer;
    }
    .navigationActive{
        background-color: #CFE0ED;
    }
    .shopNavigationBox div:hover{
        background-color: #F6FBFF;
    } */
    .shopSearchBox{
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shopSearchIdBox,
    .shopSearchNameBox,
    .shopSearchStateBox{
        text-align: center;
        flex: 2;
    }
    .shopSearchId,
    .shopSearchName,
    .shopSearchState{
        width: 60%;
        height: 28px;
        padding-left: 3px;
    }
    .shopSearchButtonBox{
        flex: 1;
    }
    .shopSearchButton{
        width: 50%;
        text-align: center;
        flex: 1;
        display: inline-block;
        height: 28px;
        line-height: 28px;
        border-radius: 10px;
        cursor: pointer;
        background-color: #01B6FD;
        color: #fff;
    }
    .shopBoxes{
        margin-top: 10px;
    }
    .shopTitle{
        display: flex;
        justify-self: center;
        align-items: center;
        text-align: center;
        font-weight: 600;
    }
    .shopTitle span{
        color: black;
    }
    .shopBox{
        margin-top: 10px;
        box-shadow: 2px 0px 5px 2px rgb(242, 242, 242);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shopIdBox{
        flex: 0.5;
    }
    .shopImgBox{
        flex: 1;
    }
    .shopImg{
        width: 100px; 
        height: 100px;
    }
    .shopNameBox{
        flex: 1;
        font-weight: 600;
    }
    .shopAddressBox{
        flex: 2;
    }
    .shopTypeBox{
        flex: 1;
        color: rgb(41, 123, 212);
        font-weight: 600;
    }
    .shopStateBox{
        flex: 1;
    }
    .shopOperate{
        flex: 2;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items: center;
    }
    .shopOperateAccess,
    .shopOperateReject,
    .shopOperateQuit,
    .shopOperateCancel,
    .shopOperateView{
        cursor: pointer;
        background-color: #c1c0c0;
        height: 25px;
        line-height: 25px;
        border-radius: 9px;
        margin-top: 10px;
        width: 80px;
        margin-right: 10px;
        color: #fff
    }
    .shopOperateAccess{
        background-color: rgb(131, 208, 15);
    }
    .shopOperateReject{
        background-color: rgb(242, 105, 105);
    }
    .shopOperateQuit{
        background-color: rgb(223, 223, 114);
    }
    .shopOperateCancel{
        background-color: rgb(41, 123, 212);
    }
</style>