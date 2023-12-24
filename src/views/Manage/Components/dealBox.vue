<template>
<div class="TrDealPageTable">
    <span class="table1 dealPageTableFirst"><input type="checkbox" value="checkboxSelect"></span>
    <span class="table2" @click="tableClick(dish.id)"><span>{{ dish.dishName }}</span></span>
    <span class="table3" @click="tableClick(dish.id)"><img :src="dish.picture" class="trDealImg"></span>
    <span class="table4">{{ dish.categoryName }}</span>
    <span class="table5">{{ dish.detail }}</span>
    <span class="table6">￥<strong class="organ">{{ dish.price }}</strong></span>
    <span class="table7">售卖</span>
    <span class="table8">
        <strong>
            <span class="tdDealModify" @click="tdDealModifyClick(dish)">修改</span>
            <span class="tdDealDelete" @click="tdDealDeleteClick(dish.id)">删除</span>
        </strong>
    </span>
</div>
</template>
<script setup>
    import { useRouter } from "vue-router"
    import { ref, defineProps, onMounted } from 'vue'
    import { ElMessage } from 'element-plus';
    import { deleteDishById } from '@/apis/dish.js'
    import {useDishStore} from'@/stores/dishStore.js'
    const emits=defineEmits(["clickFather1"])
    const router = useRouter();
    const dishStore = useDishStore();
    defineProps({
        dish:{
            type:Object
        },
        id: String
    })
    onMounted(async()=>{
        console.log("进入")
    })
    //点击修改商品信息
    function tdDealModifyClick(dish){
        console.log("修改")
        console.log("点击")
        emits("clickFather1",dish);
    }
    //点击删除
    async function tdDealDeleteClick(dishId){
        const result=confirm("确认删除吗")
        if(result){
            const apiData={
                dishId: dishId
            }
            const res=await deleteDishById(apiData)
                console.log(res.data.data)
                ElMessage.success("删除成功")
                console.log(dishStore.dishList)
                console.log(dishStore.dishList.value)
                let ans=-1;
                for(let i=0;i<dishStore.dishList.length;i++){
                    console.log(dishStore.dishList[i])
                    if(dishStore.dishList[i].id==dishId){
                        ans=i;
                        break;
                    }
                }
                if(ans!=-1){
                    dishStore.dishList.splice(ans,1)
                }
        }
    }
    //点击商品盒子
    function tableClick(dishId){

        //跳转页面
        localStorage.setItem("shopper",localStorage.getItem("shopId"))
        let id=localStorage.getItem("shopId")
        router.push(`/shopDetailPage/${id}/productDetailPage/${dishId}`);

         //删除那个本地存储
         setTimeout(function(){
            //1秒后执行
            localStorage.removeItem("shopper")
        }, 2000);
         
    }
</script>
<style scoped>
.categoryDishBox .dealPageTableFirst{
    
    visibility: hidden;
}
.TrDealPageTable{
    margin-bottom: 8px;
}
.TrDealPageTable:hover{
    background-color: #f5f5f5;
}
.TrDealPageTable span{
    display: inline-block;
}
.trDealImg{
    width: 80px;
    height: 80px;
    border-radius: 40px;
}
.dealPageTableFirst{
    padding-left: 30px;
    width: 60px;
}
.tdDealModify,
.tdDealDelete{
    cursor: pointer;
    font-size: 15px;
}
.tdDealModify{
    color: rgb(23, 118, 23);
}
.tdDealDelete{
    margin-left: 30px;
    color: rgb(201, 64, 64);
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
        color: rgb(56, 115, 160)
    }
    .table5{
        width: 22%;
    }
    .table7,
    .table6{
        width:10%;
        
    }
    .table6{
        width:10%;
        color: rgb(255, 157, 0);
        font-size: 15px;
    }
    .table8{
        width:20%;
    }
</style>