<template>
    <div class="remarkBigBox">
        <div class="remarkTopBox">
            <div class="remarkShopBox">
                <span>订单号:</span>
                <input v-model="orderIdValue">
            </div>
            <div class="remarkStartBox">
                <span>时间:</span>
                <input class="orderHandBoxSearchTimeStartInput" v-model="startTime" type="datetime-local" v-on:change = "TimeStartInputChange()">
                <span>至：</span>
                <input class="orderHandBoxSearchTimeEndInput" v-model="endTime" type="datetime-local" v-on:change = "TimeEndInputChange()">
            </div>
            <div class="remarkButtonBox">
                <div class="remarkButton" @click="remarkClick">搜索</div>
            </div>
        </div>
        <div class="remarkTitle" >
                <span class="userId">用户id</span>
                <span class="orderId">订单号</span>
                <span class="starNum">星级</span>
                <span class="remarkContentBox">评论内容</span>
                <span class="remarkImgBoxes">配图</span> 
                <span class="remarkTimeBox">发布时间</span>
                <span class="remarkViewBox">操作</span>
            </div>
        <div class="remarkBoxes">
            <div class="remarkBox" v-for="item in remarkList" :key="item">
                <span class="userId">{{ item.userId }}</span>
                <span class="orderId">{{ item.orderId }}</span>
                <span class="starNum">{{ item.star }}</span>
                <span class="remarkContentBox">{{item.content}}</span>
                <span class="remarkImgBoxes">
                    <span v-for="image in item.images" :key="image">
                        <img :src="image" class="remarkImgs">
                    </span>
                </span> 
                <span class="remarkTimeBox">2222-77-2 52.55:4</span>
                <span class="remarkViewBox">
                    <div class="remarkView" @click="remarkViewClick(item)">查看订单</div>
                </span>
            </div>
            
        </div>
    </div>

</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import { selectRemarkByUserId } from '@/apis/remarkAPi.js'
    import { useOrderOneStore } from '@/stores/orderOneStore.js'
    const orderOneStore=useOrderOneStore()

    let orderIdValue=ref("")
    let startTime=ref("")
    let endTime=ref("")
    let remarkList=ref([])
    onMounted(async()=>{
        remarkClick()
    })
    //点击搜索
    async function remarkClick(){
        const apiData={
            userId: localStorage.getItem("id"),
            orderIdValue: orderIdValue.value,
            startTime: startTime.value,
            endTime: endTime.value
        }
        console.log(apiData)
        const res=await selectRemarkByUserId(apiData)
            console.log(res.data.data)
            remarkList.value=res.data.data
            for(let i=0;i<remarkList.value.length;i++){
                remarkList.value[i].images=JSON.parse(remarkList.value[i].images)
            }
    }
    //点击查看订单
    function remarkViewClick(item){
        console.log(item)
        const order=item.dishOrder
        console.log(order)
        //打开订单弹窗
        orderOneStore.orderDownValue=true
        order.dishIdList=JSON.parse(order.dishValue).dishIdList
        order.addressValue=JSON.parse(order.addressValue)
        orderOneStore.openDown(order)
    }
</script>
<style scoped>
    .remarkBigBox{
        margin: 0 0 100px 50px;
        box-shadow: 0px 0px 4px 0px #d0e3f4;
    }
    .remarkTopBox{
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
    }
    .remarkShopBox{
        flex: 1.5;
    }
    .remarkStartBox{
        flex: 2.5;
    }
    .remarkButtonBox{
        flex: 1;
    }
    .remarkButton{
        padding-top: 3px;
        padding-block: 3px;
        border-radius: 10px;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #1cb3ef;
        color: #fff;
    }
    .remarkImgs{
        margin-left: 10px;
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }
    .remarkTitle{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }
    .remarkBoxes{
        padding-bottom: 20px;
    }
    .remarkBox{
        text-align: center;
        justify-content: center;
        align-items: center;
        display: flex;
        box-shadow:  0 1px 8px 0 rgba(0,0,0,0.2);
        margin-bottom: 10px;
        margin-right: 20px;
        margin-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 20px;
    }
    .userId,
    .orderId,
    .starNum{
        flex: 0.5;
    }
    .remarkContentBox{
        flex: 1.5;
    }
    .remarkImgBoxes{
        flex: 2;
    }
    .remarkTimeBox{
        flex: 1.5;
    }
    .remarkViewBox{
        flex: 1;
    }
    .remarkView{
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
</style>