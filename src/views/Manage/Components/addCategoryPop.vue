<template>
<!-- 新建分类弹窗 -->
    <div class="zhezhao2" id='zhezhao2' v-if="categoryStore.openAddCategoryDown"></div>
    <div class="tankuang2" v-if="categoryStore.openAddCategoryDown" >
        <div id="header2">
            <div class="headTitle">添加分类</div>
            <div id="header-right2" @click="hidder2">x</div>
        </div>
        <div class="modalContent">
            <span class="categoryInputZi">分类名：</span>
            <input class="categoryInput" v-model="categoryInputValue" placeholder="请输入分类名"> 
        </div>
        
        <div class="buttonBox">
            <button class="TanConfirmButton" @click="addCategoryButton">新建</button>
            <button class="TanCancelButton" @click="hidder2">取消</button>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {useCategoryStore} from'@/stores/categoryStore.js'
    import {insertCategory} from'@/apis/category.js'

    import { ElMessage } from 'element-plus';
    import { useDishStore } from '@/stores/dishStore.js';
    const dishStore=useDishStore()
    const categoryStore=useCategoryStore()

    let categoryInputValue=ref("")
    onMounted(async()=>{
        categoryInputValue.value=""
    })
    async function addCategoryButton(){
        console.log(categoryInputValue.value)
        if(categoryInputValue.value==""){
            ElMessage.warning("分类名不能为空")
            return
        }
        const apiData={
            shopId:localStorage.getItem("shopId"),
            categoryName:categoryInputValue.value
        }
        const res=await insertCategory(apiData)
        console.log(res.data)
        if(res.data.code==0){
            ElMessage.success("新建成功")
            categoryStore.setAddCategoryDown(false)
        }else{
            ElMessage.warning(res.data.message)
        }
        //更新分类列表的数据
        categoryStore.obtainCategoryList(localStorage.getItem("shopId"))
        
        categoryInputValue.value=""

        //刷新数据
        getDishListByPageNum(1) 

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
                dishStore.dishList.value=res2.data.data
                console.log(dishStore.dishList.value)

            }
    }
    function hidder2(){
        categoryStore.setAddCategoryDown(false)
    }
</script>
<style scoped>
.categoryInputZi{
    display: inline-block;
    margin-left:25px;
}
.categoryInput{
    width:290px;
    padding: 3px;
    height: 28px;
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
  margin-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #ccc;
  margin-right: 10px;
  margin-left: 10px;
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