<template>
    <div :class="`${abc}123`">
        <div class="categoryBoxTop">
            <span class="categoryBoxTopTitle">分类名称：</span>
            <input class="categoryBoxInput" placeholder="请输入分类名称" v-model="categoryBoxInputValue">
            <div class="categoryBoxButton" @click="categoryBoxClick">查询</div>
            <div class="categoryBoxAdd" @click="categoryBoxAddClick">新建分类<i class="plus circle icon"></i></div>
        </div>
        <div class="categoryBoxBottom">
            <div class="categoryBottomBoxes">
                <div class="categoryBottomBox" v-for="item in categoryStore.categoryList" :key="item">
                    <div class="categoryBottomUpper">
                        <div class="categoryBoxLeft">
                            <div class="categoryBoxLeftName">{{ item.categoryName }}</div>
                            <div class="categoryBoxLeftEdit displayNone">
                                <input class="categoryBoxLeftEditInput" v-model="categoryValue">
                                <span class="categoryBoxLeftEditConfirm" @click="categoryBoxLeftEditConfirmClick($event,item)">确认</span>
                                <span class="categoryBoxLeftEditCancel" @click="categoryBoxLeftEditCancelClick($event)">取消</span>
                            </div>
                        </div>
                        
                        <div class="categoryBoxRight">
                           <span class="categoryBoxRightEdit" @click="categoryBoxRightEditClick($event,item.categoryName)"><i class="edit icon"></i><span>更名</span></span>
                           <span class="categoryBoxRightDelete" @click="categoryBoxRightDeleteClick(item)"><i class="trash alternate icon"></i><span>删除</span></span>
                           <span class="categoryBoxExpand " @click="categoryBoxRightExpandClick($event,item.id)"><i class="angle down icon"></i><span>展开</span></span>
                           <span class="categoryBoxCollapse displayExpandNone" @click="categoryBoxRightExpandClick($event,item.id)"><i class="angle up icon"></i><span>收起</span></span>
                        </div>
                    </div>
                    <div class="categoryBottomUnder displayExpandNone">
                        <div class="categoryDishBox" v-for="item in dishStore.dishList" :key="item">
                            <DealBox :dish="item" :id="item.id"></DealBox>
                        </div>
                    </div>
                </div>
            </div>
            <div class="categoryBottomBoxNone" v-if="!boxNoneValue">
                <div><i class="archive icon"></i>暂无数据</div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, reactive, ref} from 'vue' 
    import DealBox from '@/views/Manage/Components/dealBox.vue'
    import {selectCategoryAll, selectCategoryByShopIdAndContent, deleteCategoryById } from'@/apis/category.js'
    import {selectDishByCategoryId} from'@/apis/dish.js'
    import {updateCategoryName} from'@/apis/category.js'
    import {useCategoryStore} from'@/stores/categoryStore.js'
    import {useDishStore} from'@/stores/dishStore.js'
    import { ElMessage } from 'element-plus';
    const categoryStore=useCategoryStore()
    const dishStore=useDishStore()

    let abc=ref(123)
    let dishList=reactive([])
    let boxNoneValue=ref(false)
    let categoryBoxInputValue=ref("")//输入查询的内容
    onMounted(async()=>{
        //获取菜品分类下拉框
        const apiData={
            shopId:localStorage.getItem("shopId"),
            categoryContent:""
        }
        console.log(apiData)
        const res=await selectCategoryByShopIdAndContent(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                categoryStore.categoryList=res.data.data
                console.log(categoryStore.categoryList)
            }
            else{
                ElMessage.error(res.data.message)
            }
        console.log(document.querySelector('.categoryBottomBox'))
        console.log(document.querySelector('.categoryBottomBox')==null)
        boxNoneValue.value=(document.querySelector('.categoryBottomBoxes').childNodes.length==2)

    })

    //点击展开
    async function categoryBoxRightExpandClick(event,categoryId){
        //如果是选中状态，就收起
        console.log("点击展开")
        console.log(event.target.parentNode)
        console.log(event.target.parentNode.classList.contains('categoryBoxExpand'))
        if(event.target.parentNode.classList.contains('categoryBoxExpand')){
            console.log("是展开")
            const categoryBottomUnderBoxes=document.querySelectorAll('.categoryBottomUnder')
            for(let i=0;i<categoryBottomUnderBoxes.length;i++){
                categoryBottomUnderBoxes[i].classList.add('displayExpandNone')
            }
            console.log(event.target.parentNode.closest('.categoryBoxRight').querySelector('.categoryBoxCollapse'));
            event.target.parentNode.closest('.categoryBoxRight').querySelector('.categoryBoxCollapse').classList.remove('displayExpandNone');
            event.target.parentNode.classList.add('displayExpandNone');

            // event.target.parentNode.closest('.categoryBoxRight').querySelector('.categoryBottomBox').classList.remove('displayExpandNone')

            console.log(event.target.parentNode.parentNode.parentNode)
            console.log(event.target.parentNode.parentNode.parentNode.parentNode)
            console.log(event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.categoryBottomUnder'))
            event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.categoryBottomUnder').classList.remove('displayExpandNone')
            //通过categoryId找到所有商品
            const apiData={
                categoryId
            }
            console.log(categoryId)
            const res2=await selectDishByCategoryId(apiData)
                console.log(res2.data)
                console.log(res2.data.data)
                dishStore.dishList =JSON.parse(JSON.stringify(res2.data.data))
                console.log(dishStore.dishList)
        }
        else if(event.target.parentNode.classList.contains('categoryBoxCollapse')){
            console.log("是收起")
            console.log(event.target.parentNode.closest('.categoryBoxRight').querySelector('.categoryBoxExpand'));
            event.target.parentNode.closest('.categoryBoxRight').querySelector('.categoryBoxExpand').classList.remove('displayExpandNone');
            event.target.parentNode.classList.add('displayExpandNone');
            event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.categoryBottomUnder').classList.add('displayExpandNone')

        }
       
    }
    //点击更改分类名称
    let categoryValue=ref("")
    function categoryBoxRightEditClick(event,categoryNameInput){
        console.log(event.target)
        console.log(event.target.parentNode.parentNode)
        console.log(event.target.parentNode.parentNode.parentNode.childNodes[0])
        console.log(event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0])
        console.log(event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1])
        event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].classList.add('displayNone')
        event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].classList.remove('displayNone')
        console.log(event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0])
        console.log(event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1])
        console.log(JSON.stringify(categoryNameInput))
        categoryValue.value=JSON.parse(JSON.stringify(categoryNameInput))
        console.log(categoryValue.value)
    }
    //点击删除
    async function categoryBoxRightDeleteClick(category){
        let result=confirm("确认删除"+category.categoryName+"吗")
        if(result){
            const apiData={
                id: category.id
            }
            categoryBoxInputValue.value=""
            const res=await deleteCategoryById(apiData)
            console.log(res.data.data)
            ElMessage.success("删除分类成功")
            //获取菜品分类下拉框
            const apiData1={
                shopId:localStorage.getItem("shopId")
            }
            console.log(apiData1)
            const res1=await selectCategoryAll(apiData1)
                console.log(res1.data.data)
                if(res1.data.code==0){
                    categoryStore.categoryList=res1.data.data
                    console.log(categoryStore.categoryList)
                }
                else{
                    ElMessage.error(res1.data.message)
                }
        }
        boxNoneValue.value=(document.querySelector('.categoryBottomBoxes').childNodes.length==2)

    }
    //更改分类名称确认
    async function categoryBoxLeftEditConfirmClick(event,categoryOne){
        console.log(categoryOne.id)
        console.log(categoryOne.categoryName)
        console.log(categoryValue)

        if(categoryOne==categoryValue){
            console.log("请作出修改")
            ElMessage.warning("请作出修改")
            return
        }
        //上传修改(要判断修改之后的值是否和其他分类一样)
        const apiData={
            id:categoryOne.id,
            shopId:localStorage.getItem("shopId"),
            categoryName:categoryValue.value
        }
        const res=await updateCategoryName(apiData)
            console.log(res.data.data)
            categoryOne.categoryName=categoryValue.value
            console.log(categoryOne.categoryName)
            ElMessage.success("修改成功")
            categoryBoxLeftEditCancelClick(event)
    }
    //更改分类名称的取消
    function categoryBoxLeftEditCancelClick(event){
        console.log(event.target.parentNode.parentNode.childNodes[0])
        console.log(event.target.parentNode.parentNode.childNodes[1])
        event.target.parentNode.parentNode.childNodes[0].classList.remove('displayNone')
        event.target.parentNode.parentNode.childNodes[1].classList.add('displayNone')
    }
    //点击新建分类
    function categoryBoxAddClick(){
        categoryStore.setAddCategoryDown(true)
    }
    //通过输入，然后点击查询分类
    async function categoryBoxClick(){
        console.log(document.querySelector('.categoryBottomBoxes').childNodes.length==2)
        const apiData={
            shopId:localStorage.getItem("shopId"),
            categoryContent: categoryBoxInputValue.value
        }
        const res=await selectCategoryByShopIdAndContent(apiData)
            console.log(res.data.data)
            if(res.data.code==0){
                categoryStore.categoryList=res.data.data
                console.log(categoryStore.categoryList)
            }
            else{
                ElMessage.error(res.data.message)
            }
        boxNoneValue.value=(document.querySelector('.categoryBottomBoxes').childNodes.length==2)
    }
    
</script>
<style scoped>
    .displayExpandNone{
        display: none !important;
    }
    .categoryBoxLeft .displayNone{
        display: none !important;
    }
    .categoryBoxLeft .displayBlock{
        display: block !important;
    }
    .categoryBoxTop{
        width: 100%;
        color: #545252;
        padding: 15px 0 15px 0;
        padding-left: 8%;
        padding-right: 8%;
        font-size: 16px;
    }
    .categoryBoxTopTitle{
        display: inline-block;
        margin-right: 1%;
    }
    .categoryBoxInput{
        width: 30%;
        padding: 5px;
        height: 30px;
        border-radius: 8px;
        border: 1px solid #bad9e6;
    }
    .categoryBoxButton{
        background-color: #24b0e8;
        color: white;
        display: inline-block;
        width: 8%;
        margin-left: 2%;
        border-radius: 10px;
        text-align: center;
        padding-top: 3px;
        padding-bottom: 3px;
        margin-right: 30%;
        cursor: pointer;
    }
    .categoryBoxAdd{
        background-color: white;
        color: #24b0e8;
        border: 1px solid #24b0e8;
        width: 10%;
        display: inline-block;
        text-align: center;
        border-radius: 8px;
        padding-top: 3px;
        padding-bottom: 3px;
        cursor: pointer;
    }
    i.icon{
        margin-left: 3px;
        margin-right: 0;
    }
    @media screen and (max-width: 1440px) {
        .categoryBoxAdd{
            width: 15%;
            background-color: #fff;
        }
    }
    @media screen and (max-width: 830px) {
        .categoryBoxAdd,
        .categoryBoxButton{
            margin-right: 10%;
            font-size: 14px;
        }
        .categoryBoxAdd{
            width: 20%;
        }
    }
    .categoryBoxBottom{
        width: 100%;
    }
    .categoryBottomBox{
        width: 97%;
        margin:0 auto;
        margin-bottom: 10px;
    }
    .categoryBottomUpper{
        padding-top: 20px;
        padding-bottom: 20px;
        box-shadow: 5px 5px 5px -1px rgb(0,0,0,.08);
        background-color: #f9f9f9;
        display: flex;
    }
    .categoryBoxLeft{
        margin-left: 5%;
        flex: 3;
    }
    .categoryBoxLeftEditInput{
        width: 60%;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1px 5px 1px 5px;
    }
    .categoryBoxLeftEditConfirm,
    .categoryBoxLeftEditCancel{
        display: inline-block;
        padding: 1px 10px 1px 10px;
        margin-left: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .categoryBoxLeftEditConfirm{
        background-color: #bdd6e0;
    }
    .categoryBoxLeftEditCancel{
        background-color: #e1e1e1;
    }
    .categoryBoxRight{
        flex: 5;
    }
    .categoryBoxRightEdit,
    .categoryBoxRightDelete,
    .categoryBoxExpand,
    .categoryBoxCollapse{
        display: inline-block;
        margin-left:5%;
        margin-right: 3%;
        cursor: pointer;
    }
    .categoryBottomBoxNone{
        background-color: #eeeeee;
        width: 90%;
        margin: 0 auto;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
        border-radius: 10px;
    }
    .categoryBottomBoxNone i.icon{
        margin-right: 2px;
    }
</style>
