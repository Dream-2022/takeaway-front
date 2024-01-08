<template>
    <div class="remarkTitleBox">
        <div>
            <span>用户ID:</span>
            <input v-model="userIdValue">
        </div>
        <div>
            <span>订单ID:</span>
            <input v-model="orderIdValue">
        </div>
       
        <div>
            <span>星级：</span>
            <select class="remarkStar" v-model="remarkStarSelect">
                <option value="0">全部</option>
                <option value="1">1星</option>
                <option value="2">2星</option>
                <option value="3">3星</option>
                <option value="4">4星</option>
                <option value="5">5星</option>
            </select>
        </div>
        <div class="remarkButtonBox">
            <div class="remarkButton" @click="remarkClick">查询</div>
        </div>
    </div>
    <div class="remarkTitle">
        <span>评论号</span>
        <span>用户ID</span>
        <span class="remarkImgBox">用户头像</span>
        <span>用户名</span>
        <span class="remarkContentBox">评论内容</span>
        <span class="remarkImgBoxes">配图</span> 
        <span class="remarkTimeBox">发布时间</span>
        <span class="remarkOperateBox">操作</span>
    </div>
    <div class="remarkBoxes">
        <div class="remarkBox" v-for="item in remarkList" :key="item">
            <span>{{ item.id }}</span>
            <span>{{ item.userId }}</span>
            <span class="remarkImgBox">
                <img :src="item.user.picture" class="remarkImg">
            </span>
            <span>{{ item.user.nickname }}</span>
            <span class="remarkContentBox">{{ item.content }}</span>
            <span class="remarkImgBoxes">
                <span v-for="image in item.imageValues" :key="image">
                    <img :src="image" class="remarkImgs">
                </span>
            </span> 
            <span class="remarkTimeBox">{{ item.createTime }}</span>
            <span class="remarkOperateBox">
                <span class="remarkOperate" @click="remarkOperateClick(item)">查看订单</span>
            </span>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import { selectRemarkAll } from '@/apis/remarkAPi.js'
    import { useOrderOneStore } from '@/stores/orderOneStore.js'
    const orderOneStore=useOrderOneStore()

    let remarkList=ref([])
    let userIdValue=ref("")
    let orderIdValue=ref("")
    let remarkStarSelect=ref(0)
    onMounted(async()=>{
        obtainRemark()
    })
    //点击查询
    function remarkClick(){
        obtainRemark()
    }
    //点击查看订单
    function remarkOperateClick(item){
        const order=item.dishOrder
        console.log(order)
        order.dishIdList=JSON.parse(order.dishValue).dishIdList
        order.addressValue=JSON.parse(order.addressValue)
        orderOneStore.openDown(order)
    }
    //获取对应条件的评论
    async function obtainRemark(){
        //通过shopId获取全部的订单评论的列表
        const apiData={
            shopId: localStorage.getItem("shopId"),
            userIdValue: userIdValue.value,
            orderIdValue: orderIdValue.value,
            remarkStarSelect:remarkStarSelect.value
        }
        console.log(apiData)
        const res=await selectRemarkAll(apiData)
            console.log(res.data.data)
            remarkList.value=res.data.data
            for(let i=0;i<remarkList.value.length;i++){
                console.log(remarkList.value[i])
                remarkList.value[i].imageValues=JSON.parse(remarkList.value[i].images)
            }
            console.log(remarkList.value)
            for(let i=0;i<remarkList.value.length;i++){
                console.log(remarkList.value[i])
                const inputDate = new Date(remarkList.value[i].createTime);
                const year = inputDate.getFullYear()
                const month = String(inputDate.getMonth() + 1).padStart(2, '0'); //月份从0开始，需要加1，然后补零
                const day = String(inputDate.getDate()).padStart(2, '0');
                const hours = String(inputDate.getHours()).padStart(2, '0');
                const minutes = String(inputDate.getMinutes()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                console.log(formattedDate);
                remarkList.value[i].createTime=formattedDate
                console.log(remarkList.value[i].createTime)
            }
    }
</script>
<style scoped>
    .remarkTitleBox{
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .remarkTitleBox div{
        flex: 1;
    }
    .remarkStar,
    .remarkImage{
        width: 70%;
        height: 28px;
    }
    .remarkTitleBox .remarkButtonBox{
        flex: 0.5;
    }
    .remarkButton{
        padding-top: 3px;
        padding-block: 3px;
        border-radius: 10px;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #1cb3ef;
        color: #fff;
    }
    .remarkBox{
        margin-bottom: 8px;
        padding-top: 5px;
        padding-bottom: 5px;
        box-shadow:  0 1px 8px 0 rgba(0,0,0,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .remarkTitle{
        margin-bottom: 8px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .remarkTitle span{
        flex:0.5;
    }
    .remarkBox span{
        flex:0.5;
    }
    .remarkTitle .remarkContentBox,
    .remarkTitle .remarkTimeBox,
    .remarkBox .remarkContentBox,
    .remarkBox .remarkTimeBox{
        flex: 1;
    }
    .remarkTitle .remarkImgBox,
    .remarkBox .remarkImgBox{
        flex: 1.5;
    }
    .remarkTitle .remarkImgBoxes,
    .remarkBox .remarkImgBoxes{
        flex: 2;
    }
    .remarkTitle .remarkOperateBox,
    .remarkBox .remarkOperateBox{
        flex: 1;
    }
    .remarkOperate{
        display: inline-block;
        color: 17px;
        cursor: pointer;
        border-radius: 6px;
        width: 70px;
        margin-left: 5px;
        margin-right: 5px;
        text-align: center;
        margin-bottom: 8px;
        height: 25px;
        border: 1.5px solid #7f7f7f;
        color: #7f7f7f;
    }
    .remarkOperate:hover{
        color: #fff;
        background-color: #7f7f7f;
    }
    .remarkImg{
        border-radius: 100px;
        width: 80px;
        height: 80px;
    }
    .remarkImgs{
        margin-right: 5px;
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
</style>