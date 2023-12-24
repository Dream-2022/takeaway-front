<template>
    <div class="personBox">
        <div class="personBox-navigation">
            <div class="personBox-navigation-information active">个人资料</div>
            <div class="personBox-navigation-account">商家收藏</div>
            <div class="personBox-navigation-member">菜品收藏</div>
            <div class="personBox-navigation-remark">我的评论</div>
        </div>
        <div class="person-detail">
            <div class="person-detail-container">
                <div class="float-container">
                    <img ref="imgRef" :src="detailImage" class="detail-image" alt="" @click="avatarImageClick">
                    <input id="upload" type="file" class="upload" ref="uploadInput" style="display: none" @change="uploadClick">
                </div>
                <div class="float-username">{{ nickname }}</div>
            </div>

            <div class="person-detail-information">
                <h3 class="person-detail-h3">基本信息</h3>
                <div>
                    <span class="inline" >
                        <span class="detail-nickname">用户昵称</span>
                        <span class="inline" v-if="isNicknameEdit" @mouseenter="nicknameEditEnter" @mouseleave="nicknameEditLeave">
                            <span class="nickname">{{ nickname }}</span>
                            <span class="edit-icon" v-if="isNickname" @click="nicknameButton"><i class="edit icon"></i>编辑</span>
                        </span>
                    </span>
                    <span class="inline" v-if="!isNicknameEdit" @blur="nicknameCancel">
                        <input class="editInput" v-model="nicknameInput">
                        <button class="nicknameConfirm" @click="nicknameConfirm">确认</button>
                        <button class="nicknameCancel" @click="nicknameCancel">取消</button>
                    </span>
                </div>

                <span class="detail-username">用户&nbsp;&nbsp;&nbsp;ID</span><span class="username">123432544533</span><br>

                <div>
                    <span class="inline">
                        <span class="detail-gender">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span>
                        <span class="inline" v-if="isGenderEdit" @mouseenter="genderEditEnter" @mouseleave="genderEditLeave">
                            <span class="gender">{{ gender }}</span>
                            <span class="edit-icon" v-if="isGender" @click="genderButton"><i class="edit icon"></i>编辑</span>
                        </span>
                    </span>
                    <span class="inline" v-if="!isGenderEdit" @blur="genderCancel">
                        <span class="inline" @click="SelectedGender1">
                            <input type="radio" name="radios" value="1" id="radioNan" :checked="selectedGender1"><label for="radioNan">男</label>
                        </span>
                        <span class="inline" @click="SelectedGender2">
                            <input type="radio" name="radios" value="2" id="radioNv" :checked="selectedGender2"><label for="radioNv">女</label>
                        </span>
                        <button class="genderConfirm" @click="genderConfirm">确认</button>
                        <button class="genderCancel" @click="genderCancel">取消</button>
                    </span>
                </div>

                <div class="inlineBlock">
                    <span class="inline">
                        <span class="detail-introduction">个人简介</span>
                        <span class="inline" v-if="isProfileEdit" @mouseenter="profileEditEnter" @mouseleave="profileEditLeave">
                            <span class="introduction">{{ profile }}</span>
                            <span class="edit-icon" v-if="isProfile" @click="profileButton"><i class="edit icon"></i>编辑</span>
                        </span>
                    </span>
                    <span class="inline" v-if="!isProfileEdit" @blur="profileCancel">
                        <textarea v-model="profile"></textarea>
                        <button class="profileConfirm" @click="profileConfirm">确认</button>
                        <button class="profileCancel" @click="profileCancel">取消</button>
                    </span>
                </div>

                <!-- <div>
                    <span class="detail-address">地址管理</span><span class="address">张家界市永定区</span>
                    <span class="edit-icon"><i class="edit icon"></i>编辑</span>
                </div> -->

                <div>
                    <span class="inline">
                        <span class="detail-birth">出生日期</span>
                        <span class="inline" v-if="isBirthEdit" @mouseenter="birthEditEnter" @mouseleave="birthEditLeave">
                            <span class="birth">{{ formattedDate }}</span>
                            <span class="edit-icon" v-if="isBirth" @click="birthButton"><i class="edit icon"></i>编辑</span>
                        </span>
                        <span class="inline" v-else @blur="birthCancel">
                            <input type="date" v-model="formattedDate" class="dateInput" v-on:change = "onDateChange()">
                            <button class="birthConfirm" @click="birthConfirm">确认</button>
                        <button class="birthCancel" @click="birthCancel">取消</button>
                    </span>
                    </span>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus';
import {editNickname,editGender,editProfile,editBirth,uploadImage} from '@/apis/editInformation.js'
// import func from '../../../vue-temp/vue-editor-bridge';

var isNickname=ref(false)
var isGender=ref(false)
var isIntroduction=ref(false)
var isBirth=ref(false)
var isProfile=ref(false)
const date = new Date(localStorage.getItem("birthday"));
// 提取年、月和日
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1并补零
const day = String(date.getDate()).padStart(2, "0");
let formattedDate = `${year}-${month}-${day}`;
const nicknameEditEnter=()=>{
    isNickname.value=true;}
const nicknameEditLeave=()=>{
    isNickname.value=false;}
const genderEditEnter=()=>{
    isGender.value=true;}
const genderEditLeave=()=>{
    isGender.value=false;}
const introductionEditEnter=()=>{
    isIntroduction.value=true;}
const introductionEditLeave=()=>{
    isIntroduction.value=false;}
const birthEditEnter=()=>{
    isBirth.value=true;}
const birthEditLeave=()=>{
    isBirth.value=false;}
const profileEditEnter=()=>{
    isProfile.value=true;}
const profileEditLeave=()=>{
    isProfile.value=false;}

//编辑按钮
var isNicknameEdit=ref(true)
var isGenderEdit=ref(true)
var isProfileEdit=ref(true)
var isBirthEdit=ref(true)
function nicknameButton(){
    isNicknameEdit=false}
function genderButton(){
    if(gender=="男"){
        console.log("nan")
        selectedGender1.value=true;
    }
    else if(gender=="女"){
        selectedGender2.value=true;
    }
    isGenderEdit=false
}
function profileButton(){
    isProfileEdit=false}
function birthButton(){
    isBirthEdit=false}
//个人信息
let nickname=ref("")
let gender=ref("")
let profile=ref("")
let selectedGender1=ref(false)
let selectedGender2=ref(false)
nickname.value=localStorage.getItem("nickname")
gender.value=localStorage.getItem("gender")
profile.value=localStorage.getItem("profile")
if(gender.value=="null"){
    gender.value="未知"}
var nicknameInput=ref(nickname)
//点击确认编辑昵称
async function nicknameConfirm(){
    if(nicknameInput.value===""){
        ElMessage.warning("昵称不能为空")
        return ;
    }
    if(nicknameInput.value===nickname){
        ElMessage.warning("请修改昵称")
        return
    }
    let username=localStorage.getItem("username")
    const apiData={
        nickname:nicknameInput.value,
        username
    }
    const res=await editNickname(apiData)
    //传到后端
        console.log('成功发送')
        console.log(res.data)
        if(res.data.code==0){
            ElMessage.success("修改成功")
            console.log(nickname+","+nicknameInput.value)
            nickname.value=nicknameInput.value
            //修改localStock中的值
            localStorage.setItem("nickname",nickname.value)
            //去掉输入框
            isNicknameEdit=!isNicknameEdit
        }
        else{
            ElMessage.error(res.data.message)
        }
}
//点击取消编辑昵称,或者失焦的情况
function nicknameCancel(){
    console.log("点击取消编辑昵称"+ isNicknameEdit)
    isNicknameEdit=true
    console.log( isNicknameEdit)
}
//选择性别
function SelectedGender1(){
    selectedGender1.value=true
    selectedGender2.value=false
}
function SelectedGender2(){
    selectedGender1.value=false
    selectedGender2.value=true
}
//点击确认编辑性别按钮
async function genderConfirm(){
    if(selectedGender1.value===false&&selectedGender2.value===false){
      ElMessage.warning("请选择性别")
      return
    }
    let Gender=""
    if(selectedGender1.value===true){
        Gender="男"
    }else{
        Gender="女"
    }
    let username=localStorage.getItem("username")
    //传到后端
    const apiData1={
        gender: Gender,
        username
    }
    const res1=await editGender(apiData1)
        console.log('成功发送')
        console.log(res1.data)
        if(res1.data.code==0){
            ElMessage.success("修改成功")
            gender=Gender
            //修改localStock中的值
            localStorage.setItem("gender",Gender)
            //去掉输入框
            isGenderEdit=!isGenderEdit
        }
        else{
            ElMessage.error(res1.data.message)
        }
}
//点击取消编辑性别,或者失焦的情况
function genderCancel(){
    isGenderEdit=true

}
//点击确认编辑个人简介按钮
async function profileConfirm(){
    if(profile.value===""){
        console.log("空")
        ElMessage.warning("请输入简介")
        return
    }
    let username=localStorage.getItem("username")
    const apiData1={
        profile,
        username
    }
    const res1=await editProfile(apiData1)
        console.log('成功发送')
        console.log(res1.data)
        if(res1.data.code==0){
            ElMessage.success("修改成功")
            //修改localStock中的值
            localStorage.setItem("profile",profile)
            //去掉输入框
            isProfileEdit=!isProfileEdit
        }
        else{
            ElMessage.error(res1.data.message)
        }
}
//点击取消编辑个人简介，或者失焦的情况
function profileCancel(){
    isProfileEdit=true
}
function onDateChange() {
    var myFrom = new Date(formattedDate);
    const today = new Date();
    if (myFrom > today) {
        ElMessage.warning("选择的格式错误")
        return
    }
}
//点击确认编辑生日按钮
async function birthConfirm(){
    console.log("formattedDate"+formattedDate)
    const date=new Date(formattedDate)
    
    let username=localStorage.getItem("username")
    const apiData1={
        birth:date,
        username
    }
    const res1=await editBirth(apiData1)
        console.log('成功发送')
        console.log(res1.data)
        if(res1.data.code==0){
            ElMessage.success("修改成功")
            //修改localStock中的值
            localStorage.setItem("birthday",formattedDate)
            //去掉输入框
            isProfileEdit=!isProfileEdit
        }
        else{
            ElMessage.error(res1.data.message)
        }
}
//点击取消编辑生日，或者失焦的情况
function birthCancel(){
    isBirthEdit=true
}

//点击个人头像
var uploadInput = ref(null);
var imgRef=ref(null)
console.log(localStorage.getItem("picture"))
var detailImage=ref(localStorage.getItem("picture"))

function avatarImageClick(){
    uploadInput.value.click();
}
 function uploadClick(){
    console.log("点击选择框")
    const file = uploadInput.value.files[0];
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                imgRef.value.src=file.path
                console.log(reader.result)

                // 创建一个 FormData 对象
                let formData = new FormData();
                formData.append('username', creator);
                formData.append('avatar', file);
                console.log(creator)
                console.log(file)

                console.log(formData)
                console.log("上传")
                //上传到数据库
                const res=await uploadImage(formData)
            //     axios({
            //         url:'/Blog/user/ModificationAvatarTest',
            //         method:'POST',
            //         data: formData
            //     }).then(res=> {
                    console.log(res)
                    const userObj = res.data.data
                    console.log(userObj)
                    localStorage.setItem("picture",userObj.url);
                    console.log("洒水："+userObj.url)
                    // document.querySelector('.ui.avatar.image').src="/upload/"+userObj.picture;
                    // document.querySelector('.ui.medium.circular.image.headSculpture').src="/upload/"+userObj.picture;
                    localStorage.setItem("picture",userObj.url)
                    detailImage.value=userObj.url
                    console.log(detailImage.value)
                    console.log(detailImage)
            //     })
            };
        }
    };
</script>

<style scoped>
.personBox{
    max-width: 1200px;
    height: 800px;
    display: flex;
    margin: 0 auto;

}
.personBox{
    margin-top: 100px;
}
.personBox-navigation{
    box-shadow: 0px 0px 4px 0px #d0e3f4;
    border-radius: 5px;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 17px;
    margin-bottom: 50px;
    height: 700px;
}
.personBox-navigation div:hover{
    background-color: #e7f0f8;
}
.active{
    background-color: #d0e3f4;
}
.person-detail{
    flex: 4;
    margin-left: 50px;
    margin-bottom: 50px;
}
.personBox-navigation-information,
.personBox-navigation-account,
.personBox-navigation-member,
.personBox-navigation-remark{
    padding: 15px 65px;
    cursor: pointer;
}
.personBox-navigation-information{
    margin-top: 18px;
}
.person-detail-container{
    border-radius: 5px;
    height: 178px;
    display: flex;
    margin-bottom: 20px;
    box-shadow: 0px 0px 4px 0px #d0e3f4;
}
.person-detail-information{
    box-shadow: 0px 0px 4px 0px #d0e3f4;
    border-radius: 5px;
    height: 502px;
}
.person-detail-h3{
    padding:24px 15px 20px 38px;
    color: #0292FE;
}
.detail-image{
    margin-left: 77px;
    margin-top: 38px;
    width: 100px;
    height: 100px;
    border-radius: 100px;
}
.float-username{
    font-size: 17px;
    margin-left: 35px;
    margin-top: 75px;
}
.person-detail-information span,
.editInput{
    margin: 6px 5px 35px 53px;
    cursor: pointer;
}

#radioNan,
#radioNv{
    margin-left: 8px;
    margin-right: 5px;
}
 #radioNan{
    margin-left: 56px;
    margin-right: 6px;
}
.detail-nickname{
    padding-top: 15px;
}
.detail-nickname,
.detail-username,
.detail-gender,
.detail-introduction,
.detail-address,
.detail-birth{
    display: inline-block;
}
.person-detail-information .inline{
    margin: 0;
}
.inlineBlock{
    display: flex;
}
.inlineBlock textarea,
.dateInput{
    margin-left: 50px;
}
.editInput{
    height: 25px;
    width: 160px;
    border-radius: 5px;
    padding-left: 3px;
    border: 1px solid #ccc;
    outline: none;
}
.nicknameConfirm,
.nicknameCancel,
.genderConfirm,
.genderCancel,
.profileConfirm,
.profileCancel,
.birthConfirm,
.birthCancel{
    border-radius: 15px;
    width: 80px;
    height: 26px;
    border: none;
    background-color: #0292FE;
    color: white;
    margin-left: 10px;
}
.nicknameCancel,
.genderCancel,
.profileCancel,
.birthCancel{
    background-color: white;;
    border: 1px solid #0292FE;
    color: #0292FE
}
</style>
