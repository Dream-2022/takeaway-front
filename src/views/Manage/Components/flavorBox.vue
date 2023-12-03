<template>
    <div class="flavor">
        <div class="flavorName">{{ flavor.flavorName }}</div>
        <div class="flavorZi">￥</div><div class="flavorPrice">{{ flavor.price }}</div>
        <div class="flavorEditBox" v-if="!flavorBoxMouseValue">
            <span class="flavorDelete" @click="flavorDeleteClick"><i class="trash alternate icon"></i></span>
            <span class="flavorModify" @click="flavorModifyClick"><i class="edit icon"></i></span>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref, defineEmits} from 'vue' 
    import {useAttributeStore} from'@/stores/attributeStore.js'
    import { ElMessage } from 'element-plus';
    const {flavor,attribute}= defineProps(['flavor','attribute'])
    const emits=defineEmits(["clickFather"])

    const attributeStore=useAttributeStore()

    //点击删除和修改口味事件
    function flavorDeleteClick(){
        var result = confirm("你确定要删除"+flavor.flavorName+"吗");
        if(result){
            console.log(attribute)
            console.log(flavor)
            attributeStore.deleteFlavorOne(attribute,flavor)
            ElMessage.success("删除"+flavor.flavorName+"成功")
        }
    }
    function flavorModifyClick(){
        emits("clickFather",flavor);
    }
</script>
<style scoped>
    .flavor{
        width: 200px;
        display: flex;
        justify-content: flex-start;
    }
    .flavor .flavorEditBox{
        display: none;
    }
    .flavor:hover .flavorEditBox{
        display: block;
    }
    .flavorName,
    .flavorPrice,
    .flavorZi{
        display: inline-block;
        padding:2px;
    }
    .flavorName{
        margin-right: 10px;
    }
    .flavorEditBox{
        margin-left: 15px;
    }
</style>