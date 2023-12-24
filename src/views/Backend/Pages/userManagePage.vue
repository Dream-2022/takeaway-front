<template>
    <div class="userBigBox">
        <div class="userTopBox">
            <span class="userTopBoxContent">
                <span>用户Id：</span>
                <input class="idInput" v-model="idValue">
            </span>
            <span class="userTopBoxContent">
                <span>性别：</span>
                <select class="genderSelect" v-model="genderValue">
                    <option value="0">全部</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
            </span>
            <span class="userTopBoxContent">
                <span>用户名：</span>
                <input class="nameInput" v-model="nameValue">
            </span>
            <span class="userSearchButton" @click="handleSearchChange">查询</span>
        </div>
        <div class="userBottom">
            <div class="userTitle"> 
                <div class="idBox">用户ID</div>
                <div class="imageBox">头像</div>
                <div class="nicknameBox">用户昵称</div>
                <div class="genderBox">性别</div>
                <div class="profileBox">简介</div>
                <div class="birthdayBox">出生日期</div>
                <div class="handleBox">操作</div>
            </div>
            <div class="userBoxes">
                <div class="userBox" v-for="item in userList" :key="item">
                    <div class="idBox">{{ item.id }}</div>
                    <div class="imageBox">
                        <img class="userImage" :src="item.picture">
                    </div>
                    <div class="nicknameBox">{{ item.nickname }}</div>
                    <div class="genderBox">{{ item.gender }}</div>
                    <div class="profileBox">{{ item.profile }}</div>
                    <div class="birthdayBox">{{ item.time }}</div>
                    <div class="handleBox">
                        <span class="handleViewButton" @click="handleViewClick(item)">查看</span>
                        <span class="handleDeleteButton" @click="handleDeleteClick(item)">删除</span>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <span v-if="userList.length!=0">
                <div class="pagination">
                    <span class="pageUp"  @click="pageUpClick">上一页</span>
                    <span :class="index==0?'pageActive':''" class="pagination-link" v-for="(page,index) in userList[0].pageNum" :key="page" @click="pageNumClick">
                        {{index+1}}
                    </span>
                    <span class="pageDown" @click="pageDownClick">下一页</span>
                </div>
            </span>
        </div>
    </div>
</template>
<script setup>
    import {onMounted, ref} from 'vue' 
    import {useRouter} from "vue-router"
    import { selectByIdAndGenderAndNickname, deleteUserById } from '@/apis/useApi.js'
    import { useBackendPopStore } from '@/stores/backendPopStore.js'
    import { ElMessage } from 'element-plus';

    const backendPopStore=useBackendPopStore()
    let userList=ref([])
    let idValue=ref("")
    let genderValue=ref(0)
    let nameValue=ref("")
    onMounted(async()=>{
        //从数据库分页获取全部用户
        console.log(idValue.value)
        console.log(genderValue.value)
        console.log(nameValue.value)

        const apiData={
            pageNum:1,
            idValue: idValue.value,
            gender: genderValue.value,
            nickname: nameValue.value
        }
        console.log(apiData)
        const res=await selectByIdAndGenderAndNickname(apiData)
            console.log(res.data.data)
            userList.value=res.data.data
            console.log(userList.value)
            //获取生日
            obtainBirthday()
        
    })
    //点击查看用户
    function handleViewClick(user){
        console.log(user)
        backendPopStore.objectValue=user
        console.log(backendPopStore.objectValue)
        backendPopStore.userPopValue=true//打开弹窗
    }
    //点击删除用户
    async function handleDeleteClick(user){
        console.log(user)
        const result=confirm("确认要删除该用户吗？")
        if(result){
            const apiData={
                id: user.id
            }
            const res=await deleteUserById(apiData)
                console.log(res.data.data)
                ElMessage.success("删除成功")
                document.querySelector(".userSearchButton").click()
        }
    }
    //判断是否是最后一页或者是第一页
    function pageJudgment(){
        const paginationLinkList=document.querySelectorAll('.pagination-link')
        console.log(paginationLinkList)
        for(let i=0;i<paginationLinkList.length;i++){
            console.log(paginationLinkList[i])
            if(paginationLinkList[i].classList.contains('pageActive')){
                console.log(paginationLinkList[i].innerHTML)
                if(paginationLinkList[i].innerHTML==1){
                    document.querySelector('.pageUp').classList.add('pageGray')
                }
                if(paginationLinkList[i].innerHTML==userList.value[0]?.pageNum){
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
        console.log(userList.value[0])
        console.log(userList.value[0].pageNum)
        if(pageCurrent==userList.value[0].pageNum){
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
        if(pageNew==userList.value[0].pageNum){
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
        if(pageNew==userList.value[0].pageNum){
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
    //根据页数获取页面的菜品
    async function getDishListByPageNum(pageNum){
        const adiData2={
            pageNum: pageNum,
            idValue: idValue.value,
            gender: genderValue.value,
            nickname: nameValue.value
        }
        console.log(adiData2)
        //获取全部的商品
        const res2=await selectByIdAndGenderAndNickname(adiData2)
        console.log(res2.data)
            console.log(res2.data.data)
            if(res2.data.code==0){
                userList.value=res2.data.data
                console.log(userList.value)

            }    
            //获取生日
            obtainBirthday()
    }
    //点击搜索
    async function handleSearchChange(){
        const apiData={
            pageNum: 1,
            idValue: idValue.value,
            gender: genderValue.value,
            nickname: nameValue.value
        }
        const res=await selectByIdAndGenderAndNickname(apiData)
            console.log(res.data)
            console.log(res.data.data)
            if(res.data.code==0){
                console.log("获取成功")
                userList.value=res.data.data
            }
            //获取生日
            obtainBirthday()    
    }
    //获取生日
    function obtainBirthday(){
        for(let i=0;i<userList.value.length;i++){
            console.log(userList.value[i])
            if(userList.value[i].birthday==null){
                userList.value[i].time="未知"
            }
            else{
                const inputDate = new Date(userList.value[i].birthday);

                const year = inputDate.getFullYear();
                const month = String(inputDate.getMonth() + 1).padStart(2, '0'); //月份从0开始，需要加1，然后补零
                const day = String(inputDate.getDate()).padStart(2, '0');
                const hours = String(inputDate.getHours()).padStart(2, '0');
                const minutes = String(inputDate.getMinutes()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                console.log(formattedDate);
                userList.value[i].time=formattedDate
            }
            console.log(userList.value[i].time)
        }
    }
</script>
<style scoped>
    .userTopBox{
        padding: 15px 3% 15px 3%;
        background-color: rgb(228, 239, 248);
    }
    .userTopBoxContent{
        display: inline-block;
        margin-left: 3%;
        width: 25%;
    }
    .idInput,
    .genderSelect,
    .nameInput{
        padding-left: 8px;
        height: 28px;
        width: 80%;
        outline: none;
        border: none;
        border-radius: 5px;
    }
    .userSearchButton{
        display: inline-block;
        background-color: #009cd9;
        color: #fff;
        height: 28px;
        width: 10%;
        text-align: center;
        line-height: 28px;
        border-radius: 15px;
        cursor: pointer;
        margin-left: 3%;
    }
    .userBottom{
        margin-bottom: 10px;
    }
    .userTitle{
        text-align: center;
        display: flex;
        padding: 8px 20px 8px 20px;
        justify-content:center;
        align-items: center;
    }
    .userTitle div{
        font-weight: 600;
        color: #0075a3;
    }
    .userBoxes{
        padding-top: 5px;
    }
    .userBox{
        margin-bottom: 8px;
        text-align: center;
        display: flex;
        justify-content:center;
        align-items: center;
        padding: 8px 20px 8px 20px;
        border-radius: 10px;
        box-shadow: 2px 0px 5px 2px rgb(228, 239, 248);
    }
    .idBox{
        flex: 1;
    }
    .imageBox{
        flex: 1;
    }
    .nicknameBox{
        flex: 1;
    }
    .genderBox{
        flex: 0.5;
    }
    .profileBox{
        flex: 1.5;
    }
    .birthdayBox{
        flex: 1.5;
    }
    .handleBox{
        flex: 1.5;
    }
    .handleViewButton,
    .handleDeleteButton{
        cursor: pointer;
        width: 30%;
        display: inline-block;
        background-color: #009cd9;
        color: #fff;
        height: 30px;
        border-radius: 8px;
        line-height: 30px;
        text-align: center;
    }
    .handleDeleteButton{
        margin-left: 5%;
    }
    .userImage{
        width: 100px;
        height: 100px;
        border-radius: 50px;
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