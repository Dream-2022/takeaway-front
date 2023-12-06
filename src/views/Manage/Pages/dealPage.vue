<template>
    <div>
        <div class="dealBoxTop">
            <div class="dealSelectBox">
                <span>菜品分类</span>
                
                <select class="dealClassSelect" name="菜品分类" @change="handleClassChange" ref="myClassSelect">
                    <option :value="0">全部</option>
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
                <!-- 分页 -->
                <span v-if="dealDealList.length!=0">
                    <div class="pagination">
                        <span class="pageUp"  @click="pageUpClick">上一页</span>
                        <span :class="index==0?'pageActive':''" class="pagination-link" v-for="(page,index) in dealDealList[0].pageNum" :key="page" @click="pageNumClick">
                            {{index+1}}
                        </span>
                        <span class="pageDown" @click="pageDownClick">下一页</span>
                    </div>
                </span>
            </div>
        </div>
    </div>



</template>
<script setup>
    import {onMounted, onUpdated, ref} from 'vue' 
    import { ElMessage } from 'element-plus';
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
        //根据页数获取页面的菜品
        getDishListByPageNum(1)

    })
    onUpdated(()=>{
        //判断是否是最后一页或者是第一页,并修改样式
        pageJudgment()
    })
    function pageJudgment(){
        //判断是否是最后一页或者是第一页
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        console.log(paginationLinkList)
        for(let i=0;i<paginationLinkList.length;i++){
            console.log(paginationLinkList[i])
            if(paginationLinkList[i].classList.contains('pageActive')){
                console.log(paginationLinkList[i].innerHTML)
                if(paginationLinkList[i].innerHTML==1){
                    document.querySelector('.pageUp').classList.add('pageGray')
                }
                if(paginationLinkList[i].innerHTML==dealDealList.value[0].pageNum){
                    document.querySelector('.pageDown').classList.add('pageGray')
                }
                return paginationLinkList[i]
            }
        }
        
    }
    //点击上一页
    function pageUpClick(){
        //样式
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        let pageCurrent=pageJudgment().innerHTML
        if(pageCurrent==1){
            ElMessage.warning("当前是第一页")
            return
        }
        let pageNew=Number(pageCurrent)-1
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].innerHTML==pageNew){
                paginationLinkList[i].classList.add('pageActive')
            }
            if(paginationLinkList[i].innerHTML==pageCurrent){
                paginationLinkList[i].classList.remove('pageActive')
            }
        }
        if(pageNew==1){
            document.querySelector('.pageUp').classList.add('pageGray')
        }
        document.querySelector('.pageDown').classList.remove('pageGray')
        //根据页数获取页面的菜品
        getDishListByPageNum(pageNew)

    }
    //点击下一页
    function pageDownClick(){
        //样式
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        let pageCurrent=pageJudgment().innerHTML
        console.log(pageCurrent)
        console.log(dealDealList.value[0])
        console.log(dealDealList.value[0].pageNum)
        if(pageCurrent==dealDealList.value[0].pageNum){
            ElMessage.warning("当前是最后一页")
            return
        }
        let pageNew=Number(pageCurrent)+1
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].innerHTML==pageNew){
                paginationLinkList[i].classList.add('pageActive')
            }
            if(paginationLinkList[i].innerHTML==pageCurrent){
                paginationLinkList[i].classList.remove('pageActive')
            }
            
        }
        if(pageNew==dealDealList.value[0].pageNum){
            document.querySelector('.pageDown').classList.add('pageGray')
        }
        document.querySelector('.pageUp').classList.remove('pageGray')
        //根据页数获取页面的菜品
        getDishListByPageNum(pageNew)
    }
    //点击页数
    function pageNumClick(event){
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        for(let i=0;i<paginationLinkList.length;i++){
            if(paginationLinkList[i].classList.contains('pageActive')){
                paginationLinkList[i].classList.remove('pageActive')
            }
        }
        event.target.classList.add('pageActive')
        //根据页数获取页面的菜品
        let pageNew=(Number)(event.target.innerHTML)
        getDishListByPageNum(pageNew)
        if(pageNew==dealDealList.value[0].pageNum){
            document.querySelector('.pageDown').classList.add('pageGray')
        }else{
            document.querySelector('.pageDown').classList.remove('pageGray')
        }
        if(pageNew==1){
            document.querySelector('.pageUp').classList.add('pageGray')
        }else{
            document.querySelector('.pageUp').classList.remove('pageGray')
        }
    }

    //点击新建菜品(打开下拉框)
    function addDealClick(){
        console.log(dealDealList.value.length)
        console.log(dealDealList.value)
        console.log(dealDealList.length)
        console.log(dealDealList.value.size)
        console.log(dealDealList.size)
        console.log(dealDealList.value[0].pageNum)
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
            pageNum:1,
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
    //根据页数获取页面的菜品
    async function getDishListByPageNum(pageNum){
        const adiData2={
            shopId: shopDetail.value.id,
            pageNum:pageNum,
            saleState:myClassSelect.value.value,
            categoryId:myStateSelect.value.value,
            searchInput:mySearchInput.value.value
        }
        console.log(adiData2)
        //获取全部的商品
        const res2=await selectDishByKeyword(adiData2)
        console.log(res2.data)
            console.log(res2.data.data)
            if(res2.data.code==0){
                dealDealList.value=res2.data.data
                console.log(dealDealList.value)

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
    
    /*分页元素*/
    .pagination-link{
        background-color: #cccccc;
        border-radius: 10px;
        width: 20px;
    }
    .pageUp, .pageDown{
        cursor: pointer;
        margin-bottom: 50px;
    }
    .pageGray{
        color: #ccc !important;;
    }
    .pageUp:hover, .pageDown:hover{
        background-color: #f5f4f4;
        color: #424242;
        border-radius: 5px;
    }
    .pagination .pageActive{
        background-color: #ececec;
        box-shadow: 2px 2px 2px rgb(99, 99, 99);
    }
    
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        text-align: center;
    }

    .pagination span {
        height: 20px;
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
        color: #333;
        text-decoration: none;
    }
</style>