<template>
    <div>
        <div class="dealBoxTop">
            <div class="dealSelectBox">
                <span>菜品分类</span>
                
                <select class="dealClassSelect" name="菜品分类" @change="handleClassChange" ref="myClassSelect">
                    <option value="0">全部</option>
                    <option v-for="item in classList" :key="item.id" :value="item.id">{{ item.categoryName }}</option>
                </select>
            </div>
            <div class="dealSelectBox2">
                <span>销售状态</span>
                <select class="dealStateSelect" name="销售状态" @change="handleStateChange" ref="myStateSelect">
                <option value="0">全部</option>
                <option value="1">售卖</option>
                <option value="2">停售</option>
                <option value="3">缺货</option>
                </select>
            </div>
            <div class="dealSearchInputBox">
                    <input class="dealSearchInput" ref="mySearchInput">
                    <span class="dealSearchInputButton" @click="handleSearchChange">搜索</span>
            </div>
            <div class="dealDeleteBatch">
                <span class="dealDeleteBatchButton">&nbsp;&nbsp;批量删除&nbsp;<i class="minus circle icon"></i></span>
            </div>
            <div class="dealNewAdd">
                <span class="dealNewAddButton" @click="addDealClick">&nbsp;&nbsp;新建菜品&nbsp;<i class="plus circle icon"></i></span>
            </div>
        </div>
        <div class="dealBoxBottom">
            <div class="dealPageTable">
                <div class="navigationTable">
                    <span class="table1"></span>
                    <span class="table2">菜品名称</span>
                    <span class="table3">图片</span>
                    <span class="table4">菜品分类</span>
                    <span class="table5">描述</span>
                    <span class="table6">售价</span>
                    <span class="table7">售卖状态</span>
                    <span class="table8">操作</span>
                </div>
                <span v-for="item in dealDealList" :key="item.id" :value="item.id">
                    <DealBox :dish="item" :id="item.id"></DealBox>
                </span>
            </div>
        </div>
    </div>



</template>
<script setup>
    import {onMounted, ref} from 'vue' 
     // 弹窗
    import '@/utils/bootstrap.css'
    import 'bootstrap/js/dist/modal.js'
    import {selectCategoryAll} from'@/apis/category.js'
    import {selectShopByUserId} from'@/apis/shop.js'
    import {useAttributeStore} from'@/stores/attributeStore.js'
    import {dishDetailAll, selectDishByKeyword} from'@/apis/dish.js'
    import DealBox from '@/views/Manage/Components/dealBox.vue'
    const emits=defineEmits(["clickFather"])
    const attributeStore=useAttributeStore()
    var classList=ref([])
    var dealDealList=ref([])
    var shopDetail=ref([])
    var myClassSelect=ref()
    var myStateSelect=ref()
    var mySearchInput=ref()
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

        //获取商家的信息
        const apiData1={
            userId: localStorage.getItem("id")
        }
        const res1=await selectShopByUserId(apiData1)
            console.log(res1.data)
            console.log(res1.data.data)
            if(res1.data.code==0){
                shopDetail.value=res1.data.data
            }

        const adiData2={
            shopId: shopDetail.value.id
        }

        //获取全部的商品
        const res2=await dishDetailAll(adiData2)
        console.log(res2.data)
            console.log(res2.data.data)
            if(res2.data.code==0){
                dealDealList.value=res2.data.data
                console.log(dealDealList.value)
            }
    })

    //点击新建菜品(打开下拉框)
    function addDealClick(){
        console.log("点击")
        attributeStore.initialization()
        emits("clickFather",true);
    }


    //菜品分类下拉框被改变
    async function handleClassChange(event){
        console.log(event.target.value)
        // 获取该分类下的商品列表
        console.log(myStateSelect.value.value)
        console.log(mySearchInput.value.value)
        searchFunction(event.target.value,myStateSelect.value.value,mySearchInput.value.value)
    }
    //销售状态下拉框被改变
    async function handleStateChange(event){
        console.log(event.target.value)
        console.log(myClassSelect.value.value)
        console.log(mySearchInput.value.value)
        searchFunction(myClassSelect.value.value,event.target.value,mySearchInput.value.value)
    }
    //点击搜索
    async function handleSearchChange(){
        searchFunction(myClassSelect.value.value,myStateSelect.value.value,mySearchInput.value.value)
    }
    async function searchFunction(categoryId,saleState,searchInput){
        const apiData={
            shopId: shopDetail.value.id,
            saleState,
            categoryId,
            searchInput
        }
        const res=await selectDishByKeyword(apiData)
            console.log(res.data)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log("获取成功")
                dealDealList.value=res.data.data
            }
    }
   
</script>
<style scoped>
    .dealBoxTop{
        width: 100%;
        background-color: #efefef;
        color: #545252
    }
    .dealBoxTop div{
        margin-top:10px;
        margin-bottom: 10px;
    }
    .dealSelectBox{
        margin-left: 70px;
        display: inline-block;
    }
    .dealSelectBox2{
        margin-left: 25px;
        display: inline-block;
    }
    .dealClassSelect,
    .dealStateSelect{
        height: 30px;
        padding: 3px;
        margin-left: 10px;
        border-radius: 10px;
        width: 90px;
    }
    .dealSearchInputBox{
        background-color: #81aaba;
        margin-left: 110px;
        display: inline-block;
        padding-right: 18px;
        border-radius: 10px;
        color: white;
    }
    .dealSearchInput{
        height: 30px;
        border-radius: 10px 0 0 10px;
        outline: none;
        border: 1.5px solid #ccc;
        margin-right: 15px;
        padding: 5px;
        width: 254px;
    }
    .dealDeleteBatch,
    .dealNewAdd{
        display: inline-block;
        line-height: 30px;
        width: 100px;
        text-align: center;
        background-color: #fff;
        border-radius: 20px;
        margin-left: 30px;
        height: 30px;
        border: 1.5px solid #81aaba;
        color: #45616c;
    }
    .dealDeleteBatch i,
    .dealNewAdd i{
        color: #81aaba;
    }
    .dealDeleteBatch{
        margin-left: 130px;
    }
    .dealNewAddButton,
    .dealDeleteBatchButton,
    .dealSearchInputButton{
        cursor: pointer;
    }
    .dealPageTable{
        width: 100%;
        text-align: center;
        margin-top: 20px;
        border-collapse:separate; 
        border-spacing:0px 10px;
    }
    .navigationTable{
        font-size: 15px;
    }
    .navigationTable span{
        display: inline-block;
    }
    .TrDealPageTable span{
        display: inline-block;
    }
    .table1{
        width: 5%;
    }
    .table2{
        width: 10%;
    }
    .table3{
        width: 10%;
    }
    .table4{
        width: 11%;
    }
    .table5{
        width: 22%;
    }
    .table7,
    .table6{
        width:10%;
    }
    .table8{
        width:20%;
    }
</style>