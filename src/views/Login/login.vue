<template>
    <div class="BigBox">
        <div class="headLift blue" :class="{moveRight:isMove}">
            <div class="welcome">WELCOME</div>
            <div class="join"> JOIN US</div>
            <div class="hungry-icon-box">
                <img src="../../assets/image/饿了么.webp" class="hungry-icon" alt="">
            </div>
        </div>
        <div class="register-box">
            <div class="headLift">

                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" id="myToast">
                    <div class="toast-body"></div>
                </div>

                <h1 class="title">立即注册</h1>
                <form class="acc" action="RegisterTest" method="POST">

                <div class="box boxAcc">
                    <label for="abc">
                        <img src="../../assets/image/邮箱.png" class="hao" alt="">
                    </label>
                    <input type="text" class="text email" id="abc" placeholder="请输入邮箱" v-model="registerData.email" @blur="CheckLoginForgetEmail2">
                </div>

                <div class="box boxPas">
                <label for="password">
                    <img src="../../assets/image/时间.png" class="pas" alt="">
                </label>
                <input type="text" id="password" class="code" placeholder="获取的验证码" v-model="registerData.code">
                <button type="button" class="obtainCode" @click="obtainCodeButton">{{ ObtainCode }}</button>
                </div>

                <div class="box boxPas">
                    <label for="bcd">
                        <img src="../../assets/image/密码.png" class="pas" alt="">
                    </label>
                    <input type="password" id="bcd" placeholder="请输入密码" v-model="registerData.password" @blur="CheckPwdLogin4">
                </div>

                <div class="box boxPas">
                    <label for="cde">
                        <img src="../../assets/image/确认密码.png" class="pas confirm" alt="">
                    </label>
                    <input type="password" placeholder="请确认密码" id="cde" v-model="registerData.ensurePwd" @blur="CheckPwdLogin5">
                </div>

                <div class="redDiv">
                    <span class="red">&nbsp;{{ promptRegister }}</span>
                </div>

                <div class="Register-Box">
                    <button type="button" class="Register-button" @click="registerButton">注册</button>
                </div>

                <div class="Login-Box">
                   <button type="button" class="btn" @click="MoveLeft">登录</button>
                </div>
                </form>
            </div>
            <!-- <div class="head blue-register"></div> -->
        </div>
        <div :class="{loginBox:!isForgetLogin}">
            <div class="headRight">
                <h1 class="title">登录</h1>
                <form class="acc" method="post" action="/login">
                    <div class="box boxAcc-login">
                        <img src="../../assets/image/账号.png" class="hao" alt="">
                        <input type="text" class="text " placeholder="请输入账号" name="usernameLogin" prop="usernameLogin" @blur="CheckUserLogin" v-model="loginData.username">
                    </div>

                    <div class="box boxPas">
                        <img src="../../assets/image/密码.png" class="pas" alt="">
                        <label for="password">
                            <img src="../../assets/image/闭眼.png" alt="" class="png">
                        </label>
                        <input type="password" id="password" placeholder="请输入密码" name="passwordLogin" @blur="CheckPwdLogin" v-model="loginData.password">
                        <span class="forget"><button @click.prevent="forgetPasswordButton">忘记密码？</button> </span>
                    </div>

                    <div class="redDiv">
                      <span>&nbsp;{{ promptLogin }}</span>
                    </div>

                    <div>
                      <button type="button" class="bu loginForm" @click="loginButton">登录</button>
                    </div>

                </form>
                <div>
                <button type="submit" class="returnLoginBtn" @click="MoveRight">注册</button>
                </div>
                <div>
                    <!-- <button type="button" class="touristLoginBtn"><a href="MainPage.html">游客进入</a></button> -->
                </div>
            </div>
        </div>
        <div :class="{loginBox:isForgetLogin}">
            <div class="headRight">
                <h1 class="title">找回密码</h1>
                <div class="modal-content">
                    <div class="modal-body">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱:</span>
                        <input type="email" placeholder="请输入邮箱" class="input-email" id="abc" @blur="CheckLoginForgetEmail" v-model="registerData.email"><br>
                        <span>&nbsp;&nbsp;&nbsp;验证码:</span>
                        <input type="text" class="input-code" placeholder="获取的验证码" v-model="registerData.code">
                        <button class="obtainCode" @click="obtainCodeButton">{{ ObtainCode }}</button><br>
                        <span>重置密码:</span>
                        <input type="password" placeholder="请输入密码" class="input-password" id="bcd" v-model="registerData.password" @blur="CheckPwdLogin2"><br>
                        <span>确认密码:</span>
                        <input type="password" placeholder="请确认密码" class="input-confirm" id="cde" v-model="registerData.ensurePwd" @blur="CheckPwdLogin3"><br>
                        <div class="red">&nbsp;{{ promptLoginForget }}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="forgetSaveButton" @click="forgetSaveButton">确认</button>
                    <button class="forgetCloseButton" @click="forgetPasswordButton">返回登录</button>
                </div>
            </div>
        </div>
    </div>
 </template>

  
  <script setup>
    import {ref} from 'vue'
    import axios from 'axios';
    import CryptoJS from "crypto-js";
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import 'element-plus/theme-chalk/index.css'
    import {useCartStore} from'@/stores/cartStore.js'

    import {changeUserInfo,obtainCodeInfo,modifyPassword,registerUser} from '@/apis/login.js'
    // D:\javaj\TakeawayPlatform\TakeawayFront\src\utils\http.js
    const router = useRouter();
    const cartStore=useCartStore()
    let promptLogin=ref(" ")//登录页面的格式提示
    let promptLoginForget=ref(" ")//登录忘记密码页面的格式提示
    let ObtainCode=ref("获取验证码")//显示验证码
    let isForgetLogin=ref(true)//切换登录页面和忘记密码页面
    let promptRegister=ref(" ")//注册页面的格式提示
    let emailCode=ref({
        canClick: true,
        countdown: 60
    })
    const loginData=ref({
        username: "",
        password: ""
    })
    const registerData=ref({
        email: "",
        password: "",
        ensurePwd: "",
        code: ""
    })
    const isMove=ref(0);
    const MoveLeft=()=>{
        isMove.value=0;
        registerData.value.email=""
        registerData.value.code=""
        registerData.value.password=""
        registerData.value.ensurePwd=""
        promptLogin.value=" "
        promptLoginForget.value=" "
        promptRegister.value=" "
    }
    const MoveRight=()=>{
        isMove.value=1;
        registerData.value.email=""
        registerData.value.code=""
        registerData.value.password=""
        registerData.value.ensurePwd=""
        promptLogin.value=" "
        promptLoginForget.value=" "
        promptRegister.value=" "
    }

    const token=localStorage.getItem("token")
    console.log(token)
    //账号验证
    function CheckUserLogin(){
        if(loginData.value.username===""){
            console.log("账号不能为空")
            promptLogin.value="账号不能为空"
        }
        else{
            promptLogin.value=" "
        }
    }
    //邮箱验证
    function CheckLoginForgetEmail(){
        const regex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(regex.test(registerData.value.email)) {
            promptLoginForget.value=" "
            return true
        }
        promptLoginForget.value='邮箱格式不正确'
        return false
    }
    function CheckLoginForgetEmail2(){
        const regex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(regex.test(registerData.value.email)) {
            promptLoginForget.value=" "
            return true
        }
        promptRegister.value='邮箱格式不正确'
        return false
    }
    //密码验证
    function CheckPwdLogin(){
        const Pattern=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
        if(loginData.value.password===""){
            console.log("密码不能为空")
            promptLogin.value="密码不能为空"
            return
        }
        if(!Pattern.test(loginData.value.password)){
            console.log("密码格式不正确")
            promptLogin.value="密码格式不正确"
            return
        }
        else{
            promptLogin.value=" "
        }
    }
    function CheckPwdLogin2(){
        const Pattern=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
        if(registerData.value.password===""){
            console.log("密码不能为空")
            promptLoginForget.value="密码不能为空"
            return
        }
        if(!Pattern.test(registerData.value.password)){
            console.log("密码格式不正确")
            promptLoginForget.value="密码格式不正确"
            return
        }
        if(registerData.value.ensurePwd!=""&&registerData.value.password!=""&&registerData.value.ensurePwd!=registerData.value.password){
            promptLoginForget.value="两次输入的密码不一致"
            return
        }
        promptLoginForget.value=" "
        
    }
    function CheckPwdLogin3(){
        const Pattern=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
        if(registerData.value.ensurePwd===""){
            console.log("密码不能为空")
            promptLoginForget.value="密码不能为空"
            return
        }
        if(!Pattern.test(registerData.value.ensurePwd)){
            console.log("密码格式不正确")
            promptLoginForget.value="密码格式不正确"
            return
        }
        if(registerData.value.ensurePwd!=""&&registerData.value.password!=""&&registerData.value.ensurePwd!=registerData.value.password){
            promptLoginForget.value="两次输入的密码不一致"
            return
        }
        promptLoginForget.value=" "
        
    }
    //注册密码验证
    function CheckPwdLogin4(){
        const Pattern=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
        if(registerData.value.password===""){
            console.log("密码不能为空")
            promptRegister.value="密码不能为空"
            return
        }
        if(!Pattern.test(registerData.value.password)){
            console.log("密码格式不正确")
            promptRegister.value="密码格式不正确"
            return
        }
        if(registerData.value.ensurePwd!=""&&registerData.value.password!=""&&registerData.value.ensurePwd!=registerData.value.password){
            promptRegister.value="两次输入的密码不一致"
            return
        }
        promptRegister.value=" "
        
    }
    function CheckPwdLogin5(){
        const Pattern=/^(?=.*[a-zA-Z])(?=.*\d|[^\da-zA-Z]).{6,18}$/
        if(registerData.value.ensurePwd===""){
            console.log("密码不能为空")
            promptRegister.value="密码不能为空"
            return
        }
        if(!Pattern.test(registerData.value.ensurePwd)){
            console.log("密码格式不正确")
            promptRegister.value="密码格式不正确"
            return
        }
        if(registerData.value.ensurePwd!=""&&registerData.value.password!=""&&registerData.value.ensurePwd!=registerData.value.password){
            promptRegister.value="两次输入的密码不一致"
            return
        }
        promptRegister.value=" "
        
    }
    //点击登录按钮
    async function loginButton(){
        if(promptLogin.value!==" "){
            console.log("'"+promptLogin.value+"'")
            return;
        }
        if(loginData.value.password===""||loginData.value.username===""){
            console.log('2')
            promptLogin.value="请填写账号和密码"
            return;
        }        
        console.log('账号密码符合条件')
        let md5=CryptoJS.MD5(loginData.value.password).toString();

        const user={
            username:loginData.value.username,
            password:md5
        }
        const res=await changeUserInfo(user)
        // const res=await http({
        //     url:'/api/login',
        //     method:'POST',
        //     data:{
        //         username:loginData.value.username,
        //         password:md5
        //     }
        // })
            console.log(res)
            console.log('成功发送')
            console.log(res.data)
            if(res.data.code==0){
                ElMessage.success("登陆成功")
                localStorage.removeItem("shopper")
                // var headers = getRequestHeaders(); // 使用前面的函数获取请求头中的所有键值对
                // var token = headers["token"];
                // var longt = headers["longt"];
                // localStorage.setItem("token",token)
                // localStorage.setItem("longt",longt)
                const user=res.data.data;
                console.log(user)
                localStorage.setItem("id",user.id)
                localStorage.setItem("username",user.username)
                localStorage.setItem("email",user.email)
                localStorage.setItem("nickname",user.nickname);
                localStorage.setItem("gender",user.gender)
                localStorage.setItem("picture",user.picture)
                localStorage.setItem("userState",user.userType)
                localStorage.setItem("profile",user.profile)
                localStorage.setItem("birthday",user.birthday)

                //接下来是找到对应的购物车--------------
                cartStore.initializationCartAll(user.id)

                console.log("页面跳转")
                setTimeout(()=>{
                    router.push('/MainPage') 
                },2000)
            }
            else{
                ElMessage.error("登录失败")
            }
    }

    //点击忘记密码（在找回密码和登录页面切换）
    function forgetPasswordButton(){
        console.log(isForgetLogin.value)
        isForgetLogin.value=!isForgetLogin.value
        registerData.value.email=""
        registerData.value.code=""
        registerData.value.password=""
        registerData.value.ensurePwd=""
    }

    //点击获取验证码
    async function obtainCodeButton(){
        if(!emailCode.value.canClick){
            console.log("不能点击")
            return
        }
        if(!promptLoginForget.value===" "||registerData.value.email===""){
            ElMessage.error("请填写正确的邮箱")
            return;
        }
        const email = registerData.value.email
        emailCode.value.canClick=!emailCode.value.canClick
        //倒计时（不可点击事件）
        let n=setInterval(function (){
            emailCode.value.countdown--;
            ObtainCode.value=`${emailCode.value.countdown}`
            if(emailCode.value.countdown===0){
                clearInterval(n)//关闭定时器
                ObtainCode.value='重新获取'
                emailCode.value.countdown=60
                emailCode.value.canClick=!emailCode.value.canClick
            }
        },1000)
        const user1={
            email:registerData.value.email
        }
        const res=await obtainCodeInfo(user1)
            console.log('成功发送')
            console.log(res.data)
            if(res.data.code==0){
                console.log("发送成功")
            }
            else{
                ElMessage.error("验证码发送失败")
            }
        // axios({
        //     url: '/Blog/user/EmailTest',
        //     method: 'post',
        //     params: {email}
        // }).then(result => {
        //     console.log("result:" + result.data)
        // }).catch(error => {
        //     console.log("error:" + error.response.data.message)
        // })
    }

    //点击找回密码的确认
    async function forgetSaveButton(){
        if(promptLoginForget.value!=" "&&registerData.value.email!=""&&registerData.value.code!=""&&registerData.value.password!=""){
            ElMessage.error("请填写信息")
            return
        }
        //发送请求修改密码
        let md5=CryptoJS.MD5(registerData.value.password).toString();
        const user1={
            email:registerData.value.email,
            code:registerData.value.code,
            password:md5
        }
        const res=await modifyPassword(user1)
            console.log('成功修改')
            console.log(res.data)
            if(res.data.code==0){
                 ElMessage.success("修改成功")
                 isForgetLogin.value=!isForgetLogin.value
            }
            else{
                ElMessage.error(res.data.message)
            }
    }

    //点击注册
    async function registerButton(){
        if(registerData.value.email===""||registerData.value.code===""||registerData.value.password===""||registerData.value.ensurePwd===""){
            promptRegister.value="请输入数据"
            return
        }
        if(promptRegister.value===""){
            return
        }
        let md5=CryptoJS.MD5(registerData.value.password).toString();
        const http=axios.create({
            baseURL:'http://localhost:8080'
        })
        //发送注册请求
        const user1={
            email:registerData.value.email,
            code:registerData.value.code,
            password:md5
        }
        const res=await registerUser(user1)
        
            console.log('成功修改')
            console.log(res.data)
            if(res.data.code==0){
                //这里需要一个确认框
                ElMessage.success("注册成功，请记住你的账号")
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
            })
                //这里要转换到登录页面
                router.push("../mainPage")
            }
            else{
                ElMessage.error(res.data.message)
            }
    }
  </script>
  
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.prompt{
    float: left; 
    width:250px;
    height: 40px;
    border-radius: 17px;
    z-index: 10;
    line-height: 40px;
    text-align:center;
}
.success{
    background-color: #bde7b5;
    z-index: 10;
}
.fail{
    background-color: #e5b098;
    z-index: 10;
}
.prompt{
    margin-right:-125px;
}
.promptBox{
    top: 50px;
    border-radius: 17px;
    height: 100%;
    width: 100%;
}
.BigBox{
    /* 径向渐变 */
    background: linear-gradient(to right, #F1F8FF, #c4dbf3);
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
}
.loginBox{
    display: none;
}
.title{
    color: #5f6f7c;
    text-align: center;
    margin: 50px;
}
.welcome{
    margin-top: 100px;
    font-size: 30px;
    color: White;
    font-weight: bold;
    text-shadow: 2px 2px 3px rgb(0, 119, 162) ;
    text-align: center;
}
.join{
    margin: 12px;
    font-size: 18px;
    color: white;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 119, 162) ;
}
.headRight {
    margin-top: 100px;
    background-color:white;
    /* margin:100px auto; */
    width: 500px;
    height: 600px;
    border: 1px #ccc solid;
    border-radius:0 10px 10px 0;
}
.hungry-icon-box{
    margin: 72px;
    text-align: center;
}
.hungry-icon{
    width: 230px;
    height: 230px;
    filter: blur(0.5px);
    -webkit-filter: blur(0.5px);
    border-radius: 200px;
    text-align : center;
}
.BigBox .blue{
    background-color: #C6DCF4;
    border-radius:10px 0 0 10px;
    border-right-style:none;
    position: absolute;
    transform: translateX(-50%);
    z-index:88;
    transition: all 1s;
}
.box{
    position: relative;
    width: 400px;
    border-bottom:1px solid #ccc;
}
.boxAcc-login{
    margin:80px auto;
}
.boxAcc{
    margin:32px auto;
}
.boxPas{
    margin: auto;
}
input{
    padding-left: 50px;
    font-size: 15px;
    width: 400px;
    height: 35px;
    border: 0;
    font-family: "楷体";
    border-radius: 5px;
}
#password{
    width: 324px;
}
.boxAcc-login .hao{
    position: absolute;
    top: 5px;
    left: 3px;
    width: 24px;
}
.boxAcc .hao{
    position: absolute;
    top: 5px;
    left: 3px;
    width: 24px;
}
.boxPas .pas{
    position: absolute;
    top: 7px;
    left: 8px;
    width: 24px;
}
.boxPas .png{
    position: absolute;
    top: 7px;
    right: 80px;
    width: 24px;
}
.redDiv {
    width: 400px;
    padding-top: 20px;
    text-align: right;
    color: #af0909;
}
.touristLoginBtn{
    background-color: transparent;
    color: #47575e;
    border: none;
    justify-content: center;
    margin-top: 31px;
    margin-left: 220px;
}
.touristLoginBtn a{
    color: #47575e;
    text-decoration: none;
}
.forgetCloseButton,
.forgetSaveButton,
.loginForm,
.returnLoginBtn{
    margin-top: 40px;
    margin-left: 46px;
    width: 400px;
    height: 35px;
    padding: 7px;
    background-color: #B8CDE4;
    color:#ffffff;
    border:none;
    border-radius: 4px;
    /*鼠标显示小手*/
    cursor:pointer;
    box-shadow: 10px 10px 10px -4px rgb(0,0,0,.3);
}
.modal-footer button{
    margin-right: 42px;
}
.forgetSaveButton{
    margin-top:0px;
}
.forgetCloseButton:hover,
.forgetSaveButton:hover,
.loginForm:hover,
.returnLoginBtn:hover{
    background-color: #91AFD0;
}

.forgetCloseButton:hover a,
.forgetSaveButton:hover a,
.loginForm:hover a,
.returnLoginBtn a{
    color: white;
    text-decoration: none;
}
.forget button{
    padding: 5px;
    text-decoration:none;
    border: none;
    background-color: white;
    font-size:13px;
    color: #60a9d0;
}

.modal-content{
    width: 80%;
    margin: 0 auto;
}
.modal-body .obtainCode {
    margin-top: 14px;
    border: none;
    background-color: transparent;
    float: right;
    cursor: pointer;
    font-size: 15px;
    color: #60a9d0;
    display: inline;
    margin-right: 20px;
}
.modal-body .input-email{
    padding-left: 10px;
    width: 79%;
}
.modal-body .input-code{
    width: 55%;
    padding-left: 9px;
}
.modal-body input{
    margin: 5px 8px 5px 8px;
    padding-left: 8px;
    width: 79%;
    outline: none;
    margin-top: 10px;
    margin-bottom: 10px;
}
.modal-body input:focus {
    border-bottom: 1px solid #ccc;
    box-shadow: 10px 10px 10px -4px rgb(0,0,0,.03);
}
.save-button{
    background-color: #4692cc;
    border: none;
}
.save-button:hover{
    background-color: #4083b6;
}
.red{
    font-size: 15px;
    color: #af0909;
    float: right;
    padding-right: 30px;
    margin: 10px;
}

/*    登录成功浮窗*/
.toast {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: orangered;
    min-width: 200px;

}



    /* 注册 */

body{
    /* 径向渐变 */
    background: linear-gradient(to right, #F1F8FF, #CBDFF3);
}

.title{
    color: #5f6f7c;
    text-align: center;
    margin: 60px 156px 40px 150px;
}
.headLift {
    margin-top: 100px;
    background-color:white;
    /* margin:100px auto; */
    width: 500px;
    height: 600px;
    border: 1px #ccc solid;
    border-radius:10px 0 0 10px;
}
template .BigBox .headRight{
    border-radius:0 100px 10px 0;
}
.box{
    position: relative;
    width: 400px;
    border-bottom:1px solid #ccc;
    margin-bottom: 26px;
    margin-left:48px;
}
.boxPas input,
.boxAcc input,
.boxAcc-login input{
    padding-left: 50px;
    font-size: 15px;
    width: 392px;
    height: 35px;
    border: 0;
    font-family: "楷体";
    border-radius: 5px;
}
#password{
    width: 313px;
}
.boxAcc-login .hao{
    position: absolute;
    top: 5px;
    left: 7px;
    width: 24px;
}

.boxAcc .hao{
    position: absolute;
    top: 5px;
    left: 7px;
    width: 24px;
}
.boxPas .pas{
    position: absolute;
    top: 6px;
    left: 7px;
    width: 24px;
}
.boxPas .png{
    position: absolute;
    top: 7px;
    right: 92px;
    width: 24px;
}
.redDiv {
    width: 430px;
    text-align: right;
    margin-top: 10px;
}
.redDiv .red {
    color: #af0909;
}
div .btn{
    margin-top: 32px;
}
.Register-Box button ,
.Login-Box button{
    margin-top: 29px;
    margin-left: 46px;
    width: 400px;
    height: 35px;
    background-color: #B8CDE4;
    color:#ffffff;
    border:none;
    border-radius: 4px;
    /*鼠标显示小手*/
    cursor:pointer;
    box-shadow: 10px 10px 10px -4px rgb(0,0,0,.3);
}
.Register-Box button{
    margin-top: 0;
}
.Register-Box .btn{
    margin-top: 20px;
}
.Register-Box button:hover ,
.Login-Box button:hover{
    background-color: #91AFD0;
}
div button a{
    color: white;
    text-decoration: none;
}
.boxPas .obtainCode{
    margin-top: 10px;
    border: none;
    background-color: transparent;
    float: right;
    cursor: pointer;
    font-size:13px;
    color: #60a9d0;
    display: inline;
    margin-right: 3px;
}

 .toast {
     position: fixed;
     top: 50px;
     left: 50%;
     transform: translateX(-50%);
     color: orangered;
     min-width: 200px;
 }

 .BigBox .moveRight{
    transform:translateX(50%);
    border-radius:0 10px 10px 0;
    background-color: #DDEBFA;
    border-left-style:none;
 }

  </style>
  