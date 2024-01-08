<template>
    <div class="messageBigBox">
        <div class="MyMessageBox">
            <div class="messageBoxTitle">消息</div>
            <div class="messageBox">
                <div class="messageBoxLeft">
                    <div class="massageBoxMin" v-for="item in messageList[0]?.userList" :key="item" @click="massageBoxMinClick(item)">
                        <span>
                            <img :src="item.picture" class="messageImg">
                        </span>
                        <span class="massageNickname">{{ item.nickname }}</span>
                    </div>
                </div>
                <div class="messageBoxRight">
                    <div>
                        <div class="messageBoxRightTop" v-if="userOne.id!=null">
                            <div>正在和{{userOne.nickname}}聊天</div>
                        </div>
                        <div class="messageBoxRightBottom">
                            <div  v-for="message in messageOne" :key="message">
                                <div class="messageBoxRightBottomLeft" v-if="message.senderId==userOne.id">
                                    <div class="message-box2-time">{{ message.time }}</div>
                                    <div class="message-box2-content-left">
                                        <img :src="message.sender.picture" class="message-box2-image" alt="">
                                        <span class="message-box2-content1">{{ message.content }}</span>
                                    </div>
                                </div>
                                <div class="messageBoxRightBottomRight"  v-if="message.receiverId==userOne.id">
                                    <div class="message-box2-time">{{ message.time }}</div>
                                    <div class="message-box2-content-right">
                                        <span class="message-box2-content2">{{ message.content }}</span>
                                        <img :src="message.sender.picture" class="message-box2-image" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="message-box2-sending"  v-if="userOne.id!=null">
                            <textarea class="message-box2-input" v-model="messageInputValue"
                                        maxlength="200"
                                        placeholder="请输入……"></textarea>
                            <div class="message-box2-confirm" @click="messageConfirmClick">发送</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps, onMounted } from 'vue'
    import { ElMessage } from 'element-plus';
    import {selectMessageByUserId,selectMessageByTwoUserId} from '@/apis/messageApi.js'  
    let ws=null
    let messageList=ref([])
    let messageOne=ref([])
    let userOne=ref([])
    let messageInputValue=ref("")
    onMounted(async()=>{
        const userId=localStorage.getItem("id")
        ws=new WebSocket("ws://localhost:8080/api/websocket/"+userId)
        console.log("连接已建立")
        messageOne.value=[]
        ws.onmessage=(event)=>{
            console.log(messageList.value)
            console.log("收到了消息："+event.data)
            console.log(messageOne.value)
            console.log(messageList.value)
                console.log("收到了消息："+event.data)
                console.log("收到了消息："+JSON.parse(event.data))
                const message=JSON.parse(event.data)
                message.time=obtainTime(message.createTime)
            //如果发送者不存在于左侧的列表中,我要加上去
            if(messageList.value.length!=0&&localStorage.getItem("id")!=message.senderId){
                let flag=0;
                for(let i=0;i<messageList.value[0].userList.length;i++){
                    console.log(messageList.value[0].userList[i])
                    if(messageList.value[0].userList[i].id==message.senderId){
                        flag=1;
                    }
                }
                if(flag==0){
                    //需要加上左侧盒子
                    messageList.value[0].userList.push(message.sender)
                    console.log(message.value)
                    messageList.value.push([message])
                }
            }
            if(messageList.value.length==0&&localStorage.getItem("id")!=message.senderId){
                const x={
                    userList: [message.sender]
                }
                messageList.value.push(x)
            }
            
            //接着将他展示在页面上面
            
                //接着将他展示在页面上面
                messageOne.value.push(message)
                console.log(messageList.value)
        }
        ws.onerror=()=>{
            ElMessage.error("网络连接成功");
        }
        ws.onclose=()=>{
            ElMessage.error("连接已关闭")
        }
        //从数据库获取是否有userId的聊天记录
        const apiData={
            userId: localStorage.getItem("id")
        }
        console.log(apiData)
        const res=await selectMessageByUserId(apiData)
            console.log(res.data.data)
            messageList.value=res.data.data
            console.log(messageList.value[0].receiverId)
            console.log(messageList.value[0].senderId)
            
    })
    //点击用户栏
    async function massageBoxMinClick(user){
        userOne.value=user
        console.log(userOne.value)
        messageOne.value=[]
        //从messageList查询与user对应的聊天
        //从数据库获取user和id的聊天
        const apiData={
            receiverId: localStorage.getItem("id"),
            senderId: user.id
        }
        console.log(apiData)
        const res=await selectMessageByTwoUserId(apiData)
            console.log(res.data.data)
            messageOne.value=res.data.data
        for(let i=0;i<messageOne.value.length;i++){
            //获取转换的时间
            const formattedDate=obtainTime(messageOne.value[i].createTime)
            messageOne.value[i].time=formattedDate
        }
        console.log(messageOne.value)
    }
    //点击发送
    function messageConfirmClick(){
        if(messageInputValue.value==""){
            ElMessage.error("发送的内容不能为空")
            return
        }
        if(ws&&ws.readyState===WebSocket.OPEN){
            const apiData={
                receiverId: userOne.value.id,
                senderId: localStorage.getItem("id"),
                content: messageInputValue.value
            }
            console.log(apiData)
            ws.send(JSON.stringify(apiData))
            messageInputValue.value=""//清空输入框

            // ws.onmessage=(event)=>{
            //     console.log(messageList.value)
            //     console.log("收到了消息："+event.data)
            //     console.log("收到了消息："+JSON.parse(event.data))
            //     const message=JSON.parse(event.data)
            //     message.time=obtainTime(message.createTime)
            //     //接着将他展示在页面上面
            //     messageOne.value.push(message)
            //     console.log(messageList.value)
            // }
            console.log(messageOne.value)

        }
        else{
            ElMessage.error("当前连接已经断开，请重试")
        }
    }
    //获取时间
    function obtainTime(createTime){
        const inputDate = new Date(createTime);
            const year = inputDate.getFullYear()
            const month = String(inputDate.getMonth() + 1).padStart(2, '0'); //月份从0开始，需要加1，然后补零
            const day = String(inputDate.getDate()).padStart(2, '0');
            const hours = String(inputDate.getHours()).padStart(2, '0');
            const minutes = String(inputDate.getMinutes()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
            console.log(formattedDate);
            return formattedDate
    }
</script>
<style scoped>
    .messageBigBox{
        width: 100%;
        min-height: 700px;
        background-color: rgb(243, 247, 248);
        padding-bottom: 80px;
    }
    .MyMessageBox{
        width: 100%;
        margin: 0 auto;
        background-color: #fff;
    }
    .messageBoxTitle{
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 2px solid #ccc;
    }
    .messageBox{
        display: flex;
    }
    .massageNickname{
        margin-left: 10px;
    }
    .massageBoxMin{
        padding: 10px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
    }
    .messageImg{
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
    .messageBoxLeft{
        min-height: 600px;
        border-right: 2px solid #ccc;
        flex: 1;
    }
    .messageBoxRight{
        flex: 4;
    }
    .messageBoxRightTop{
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content:center;
        display: flex;
        font-size: 16px;
    }
    .messageBoxRightBottom{
        height: 550px;
        padding-bottom: 10px;
        overflow-y:scroll;
    }
    .messageBoxRightBottomLeft,
    .messageBoxRightBottomRight{
        margin-bottom: 10px;
    }
    .message-box2-content-left{
        display: flex;
        justify-content:flex-start;
        margin-left: 30px;
    }
    .message-box2-content-right{
        display: flex;
        justify-content:flex-end;
        margin-right: 30px;
    }
    .message-box2-time{
        display: flex;
        justify-content:center;
        color: #6b6b6b;
        font-size: 12px;
    }
    .message-box2-content1{
        line-height: 35px;
        display: inline-block;
        margin-left: 10px;
        background-color: #ececec;
        border-radius: 5px;
        padding-left: 8px;
        padding-right: 8px;
    }
    .message-box2-content2{
        line-height: 35px;
        display: inline-block;
        margin-left: 10px;
        background-color: #c8f3be;
        border-radius: 5px;
        padding-left: 8px;
        padding-right: 8px;
    }
    .message-box2-confirm{
        background-color: #cccccc;
        position: absolute;
        right: 33px;
        bottom: 10px;
        padding: 5px 8px 5px 8px;
        border-radius: 3px;
        cursor: pointer;
    }
    .message-box2-image{
        width: 35px;
        height: 35px;
        margin-left: 10px;
        border-radius: 20px;
    }
    .message-box2-sending{
        height: 112px;
        padding: 5px;
        border-top:1px solid #868686;
        position: relative;
    }
    .message-box2-input{
        padding: 0;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
    }
</style>