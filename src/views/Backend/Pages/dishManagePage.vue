<template>
    <div class="dishBigBox">
        <span>菜品ID：</span>
        <input class="dishIdInput" v-model="dishIdInputValue">
        <span>商家ID：</span>
        <input class="dishShopIdInput" v-model="dishShopIdValue">
        <span>菜品名称：</span>
        <input class="dishDishNameInput" v-model="dishDishNameValue">
        <span class="dishSelectStateBox">
            <span>商品状态：</span>
                <select class="dishStateSelect" v-model="dishStateValue"  @change="handleStateChange">
                    <option value="0">全部</option>
                    <option value="1">售卖</option>
                    <option value="2">停售</option>
                </select>
            </span>
        <span>商品描述：</span>
        <input class="dishDescriptionInput" v-model="dishDescriptionValue">
        <span class="dishButtonBox">
            <span class="dishButton" @click="handleStateChange">查询</span>
        </span>
    </div>
    <div class="dishBoxes">
        <div class="dishTitle">
            <span class="dishIdBox">商品ID</span>
            <span class="dishImgBox">商品图片</span>
            <span class="dishNameBox">商品名称</span>
            <span class="dishDetailBox">商品简介</span>
            <span class="dishPriceBox">商品价格</span>
            <span class="dishStateBox">售卖状态</span>
            <span class="dishOperateBox">商品操作</span>
        </div>
        <div class="dishBox" v-for="item in dishList" :key="item">
            <span class="dishIdBox">{{ item.id }}</span>
            <span class="dishImgBox">
                <img :src="item.picture" class="dishImg">
            </span>
            <span class="dishNameBox">{{ item.dishName }}</span>
            <span class="dishDetailBox">{{ item.detail }}</span>
            <span class="dishPriceBox">￥{{ item.price }}</span>
            <span class="dishStateBox">{{ item.state }}</span>
            <span class="dishOperateBox">
                <span class="dishAccess" v-if="item.saleState==2" @click="dishAccessClick(item)">审核通过</span>
                <span class="dishFail"  v-if="item.saleState==2" @click="dishFailClick(item)">审核失败</span>
                <span class="dishOff" v-if="item.saleState==1" @click="dishOffClick(item)">商品下架</span>
                <span class="dishView" @click="dishViewClick(item)">查看商品</span>
            </span>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {useRouter} from "vue-router"
    import { ElMessage } from 'element-plus';
    import { selectDishByIdAndShopIdAndNameAndDetail, updateDishStateById } from '@/apis/dish.js'
    import { useBackendPopStore } from '@/stores/backendPopStore.js'
    const backendPopStore=useBackendPopStore()

    let dishIdInputValue=ref("")
    let dishShopIdValue=ref("")
    let dishDishNameValue=ref("")
    let dishStateValue=ref(0)
    let dishDescriptionValue=ref("")
    let dishList=ref([])
    onMounted(async()=>{
        obtainDishList()
    })
    //查看商品，打开下拉框
    function dishViewClick(dish){
        console.log(dish)
        backendPopStore.dishPopValue=true
        backendPopStore.objectValue=dish
        console.log(backendPopStore.objectValue)
    }
    //状态下拉框的改变,点击搜索
    function handleStateChange(){
        obtainDishList()
    }
    //商品下架
    async function dishOffClick(dish){
        const result=confirm("确认下架商品吗")
        if(result){
            updateDishState(dish,3)
            ElMessage.success("商品下架成功")
        }
    }
    //审核通过
    async function dishAccessClick(dish){
        updateDishState(dish,1)
        ElMessage.success("审核通过")
    }
    //审核失败
    async function dishFailClick(dish){
        updateDishState(dish,3)
        ElMessage.success("审核失败")
    }
    //更新菜品状态
    async function updateDishState(dish,state){
        const apiData={
            dishId: dish.id,
            saleState: state
        }
        const res=await updateDishStateById(apiData)
            console.log(res.data.data)
        document.querySelector('.dishButton').click()
    }
    //从数据库获取商品列表信息
    async function obtainDishList(){
        const apiData={
            idValue: dishIdInputValue.value,
            shopIdValue: dishShopIdValue.value,
            dishName: dishDishNameValue.value,
            state:dishStateValue.value,
            detail: dishDescriptionValue.value
        }
        console.log(apiData)
        const res=await selectDishByIdAndShopIdAndNameAndDetail(apiData)
            console.log(res.data.data)
            dishList.value=res.data.data
            console.log(dishList.value)
            for(let i=0;i<dishList.value.length;i++){
                console.log(dishList.value[i])
                if(dishList.value[i].saleState=="1"){
                    dishList.value[i].state="售卖"
                }
                if(dishList.value[i].saleState=="2"){
                    dishList.value[i].state="未审核"
                }
                if(dishList.value[i].saleState=="3"){
                    dishList.value[i].state="停售"
                }
            }
    }
</script>
<style scoped>
    .dishBigBox{
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dishBigBox span{
        flex: 1
    }
    .dishBigBox input{
        flex: 2;
    }
    .dishSelectStateBox{
        flex: 1;
    }
    .dishStateSelect{
        width: 80%;
        height: 25px;
    }
    .dishButtonBox{
        flex: 1;
    }
    .dishButton{
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 28px;
        line-height: 28px;
        border-radius: 10px;
        cursor: pointer;
        background-color: #01B6FD;
        color: #fff;
    }
    .dishImg{
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }
    .dishTitle{
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .dishBox{
        margin-top: 8px;
        box-shadow: 2px 0px 5px 2px rgb(242, 242, 242);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .dishIdBox{
        flex: 1;
    }
    .dishImgBox{
        flex: 1;
    }
    .dishNameBox{
        flex: 1;
    }
    .dishDetailBox{
        flex: 1.5;
    }
    .dishPriceBox{
        flex: 1;
    }
    .dishBox .dishPriceBox{
        color: #ffaa00;
        font-weight: 600;
    }
    .dishStateBox{
        flex: 1;
    }
    .dishOperateBox{
        flex: 2;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items: center;
    }
    .dishAccess,
    .dishFail,
    .dishOff,
    .dishView{
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
    .dishAccess{
        background-color: rgb(131, 208, 15);
    }
    .dishFail{
        background-color: rgb(242, 105, 105);
    }
    .dishOff{
        background-color: rgb(41, 123, 212);
    }
</style>