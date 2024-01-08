<template>
    <div class="reportBigBox">
        <div class="reportSelect reportSelectActive" @click="reportSelectClick">全部</div>
        <div class="reportSelect" @click="reportSelectClick">未审核</div>
        <div class="reportSelect" @click="reportSelectClick">已审核</div>
    </div>
    <div class="reportTitle">
        <div class="reportBoxUserId">用户ID</div>
        <div class="reportBoxNickname">用户名</div>
        <div class="reportBoxImg">用户头像</div>
        <div class="reportBoxShopId">商家ID</div>
        <div class="reportBoxName">商家名</div>
        <div class="reportBoxContent">举报内容</div>
        <div class="reportBoxState">举报状态</div>
        <div class="reportBoxOperate">操作</div>
    </div>
    <div class="reportBoxes">
        <div class="reportBox" v-for="item in reportList" :key="item">
            <div class="reportBoxUserId">{{ item.userId }}</div>
            <div class="reportBoxNickname">{{ item.user.nickname }}</div>
            <div class="reportBoxImg">
                <img class="reportImg" :src="item.user.picture">
            </div>
            <div class="reportBoxShopId">{{ item.shopId }}</div>
            <div class="reportBoxName">{{ item.shop.name }}</div>
            <div class="reportBoxContent">{{ item.content }}</div>
            <div class="reportBoxState">{{ item.state==2?"已审核":"未审核" }}</div>
            <div class="reportBoxOperate">
                <div class="reportBoxAccess" v-if="item.state!=2" @click="reportBoxAccessClick(item)">通过举报</div>
                <div class="reportBoxCancel" v-if="item.state!=2" @click="reportBoxCancelClick(item)">取消举报</div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps, onMounted } from 'vue'
    import { ElMessage } from 'element-plus';
    import {selectReportByState, updateByState} from '@/apis/reportApi.js'

    let reportSelect=ref("0")
    const reportList=ref([])
    onMounted(async()=>{
        const selectValue=document.querySelector('.reportSelectActive').innerHTML
        console.log(selectValue)
        if(selectValue=="未审核"){
            reportSelect.value="1"
        }if(selectValue=="审核"){
            reportSelect.value="2"
        }
        //从数据库获取对应状态的举报
        const apiData={
            state: reportSelect.value
        }
        console.log(apiData)
        const res=await selectReportByState(apiData)
            console.log(res.data.data)
            reportList.value=res.data.data
    })
    //点击上方选择栏
    async function reportSelectClick(event){
        const reportSelectBoxes=document.querySelectorAll('.reportSelect')
        console.log(reportSelectBoxes)
        console.log(reportSelectBoxes.length)
        for(let i=0;i,i<reportSelectBoxes.length;i++){
            reportSelectBoxes[i].classList.remove('reportSelectActive')
        
        }
        event.target.classList.add('reportSelectActive')
        const selectValue=document.querySelector('.reportSelectActive').innerHTML
        console.log(selectValue)
        if(selectValue=="未审核"){
            reportSelect.value="1"
        }if(selectValue=="已审核"){
            reportSelect.value="2"
        }
        //从数据库获取对应状态的举报
        const apiData={
            state: reportSelect.value
        }
        console.log(apiData)
        const res=await selectReportByState(apiData)
            console.log(res.data.data)
            reportList.value=res.data.data
    }
    //点击通过举报，商家状态改为5（管理员停售），举报状态改为审核成功（state=2）
    async function reportBoxAccessClick(report){
        const result=confirm("确认要通过审核")
        if(result){
            await updateReport(report,"5")
        }
    }
    //点击忽略举报，此时商家状态不需要改变还是“1”，传过去的state是1
    async function reportBoxCancelClick(report){
        const result=confirm("确认要忽略这个举报")
        if(result){
            await updateReport(report,"1")
        }
    }
    //更新数据库的方法
    async function updateReport(report,state){
        const apiData={
            shopId: report.shopId,
            id: report.id,
            state
        }
        console.log(apiData)
        const res=await updateByState(apiData)
            console.log(res.data.data)
            report.state="2"
    }
</script>
<style scoped>
    .reportBigBox{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-bottom: 1.5px solid #ccc;
        background-color: rgb(228, 239, 248);
    }
    .reportSelect{
        flex: 1;
        cursor: pointer;
        padding-top: 20px;
        padding-bottom: 20px;
        border-right: 1px solid #ccc;
    }
    .reportSelect:hover{
        background-color: rgb(235, 242, 248);
    }
    .reportSelectActive{
        background-color: rgb(210, 232, 250);
    }
    .reportImg{
        width: 80px;
        height: 80px;
        border-radius: 100px;
    }
    .reportTitle{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .reportBox{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        box-shadow: 2px 0px 5px 2px rgb(242, 242, 242);
        margin-top: 5px;
    }
    .reportBoxShopId,
    .reportBoxUserId{
        flex: 0.7;
    }
    .reportBoxName,
    .reportBoxNickname{
        flex:1;
    }
    .reportBoxImg{
        flex: 1;
    }
    .reportBoxContent{
        flex: 2;
    }
    .reportBoxState{
        flex: 1;
    }
    
    .reportBoxOperate{
        display: flex;
        flex: 1.5;
    }
    .reportBoxAccess,
    .reportBoxCancel{
        cursor: pointer;
        border: 1.5px solid #4ac125;
        height: 25px;
        line-height: 25px;
        border-radius: 9px;
        margin-top: 10px;
        width: 80px;
        margin-right: 10px;
        color: #4ac125;
    }
    .reportBoxCancel{
        border: 1.5px solid #e24f59;
        color: #e24f59;
    }
    .reportBoxAccess:hover{
        background-color: #4ac125;
        color: #fff;
    }
    .reportBoxCancel:hover{
        background-color: #e24f59;
        color: #fff;
    }
</style>