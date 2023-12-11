<template>
<div class="TrDealPageTable">
    <span class="table1 dealPageTableFirst"><input type="checkbox" value="checkboxSelect"></span>
    <span class="table2"><span>{{ dish.dishName }}</span></span>
    <span class="table3"><img :src="dish.picture" class="trDealImg"></span>
    <span class="table4">{{ dish.categoryName }}</span>
    <span class="table5">{{ dish.detail }}</span>
    <span class="table6">￥<strong class="organ">{{ dish.price }}</strong></span>
    <span class="table7">售卖</span>
    <span class="table8">
        <strong>
            <span class="tdDealModify">修改</span>
            <span class="tdDealDelete">删除</span>
        </strong>
    </span>
</div>
</template>
<script setup>
import {useRouter} from "vue-router"
import { ref, defineProps } from 'vue'
    defineProps({
        dish:{
            type:Object
        },
        id: String
    })
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