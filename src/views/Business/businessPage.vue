<template>
    <div class="businessPage">
        <div class="navigation">
            <span class="navigationLogo"><i class="edge icon"></i>饿了么</span>
            <span class="navigationZi2" @click="returnMain">返回客户端</span>
            <span class="navigationZi1">商家版</span>
        </div>
        <div class="businessBox">
            <div class="businessBox-top">
                <div class="businessBox-top-zi1">门店信息</div>
                <div class="businessBox-top-zi2">请准确填写信息，管理员会尽快审核</div>
            </div>
            
            <div class="businessBox-bottom businessBox1">
                <div class="businessBox-left">基本信息</div>
                <div class="businessBox-might">
                    <div>店铺名称</div>
                    <div class="mightZi2">所在城市</div>
                    <div class="mightZi2">门店地址</div>
                </div>
                <div class="businessBox-right">
                    <div>
                        <input placeholder="请输入店铺名称" class="businessInput">
                    </div>
                    <div class="dropdown">
                        <button>选择分类</button>
                        <div class="dropdown-content dropdown-column" onclick="addContentColumnDropdown()">
                            <!-- 这里可以根据需要添加更多的分类选项 -->
                        </div>
                    </div>
                    <div>
                        <input placeholder="请输入门店地址" class="businessInput">
                    </div>
                    
                </div>
            </div>
            <div class="businessBox-bottom businessBox2">
                <div class="businessBox-left">经营信息</div>
                <div class="businessBox-might">
                    <div>营业类目</div>
                    <div>门店照</div>
                    <div class="mightZi1">店内照</div>
                    <div class="mightZi1">门店logo</div>
                    <div class="mightZi1">门店背景</div>
                    <div class="mightZi1">外卖电话</div>
                    <div class="mightZi2">联系姓名</div>
                    <div class="mightZi2">联系电话</div>
                </div>
                <div class="businessBox-right">
                    <div class="dropdown">
                        <select name="" id="">
                            <option v-for="item in 4" :key="item" value="0">123</option>
                        </select>
                        <div  v-if="isDropdownOpen" class="dropdown-content dropdown-column" onclick="addContentColumnDropdown()">
                            <!-- 这里可以根据需要添加更多的分类选项 -->
                            <div v-for="option in options" :key="option" @click="selectOption(option)">  
                                {{ option }}  
                            </div>  
                        </div>
                    </div>
                    <div>
                        <div class="rightZi">需拍全，包含完整的牌匾，门框(建议正对门店2米处拍摄)</div>
                        <img src="../../assets/image/upload.png" class="storeImage">
                    </div>
                    <div>
                        <div class="rightZi">需真实反映堂食区域</div>
                        <img src="../../assets/image/upload.png" class="storeImage">
                    </div>
                    <div>
                        <div class="rightZi">自行上传，可随时更改</div>
                        <img src="../../assets/image/upload.png" class="storeImage">
                    </div>
                    <div>
                        <div class="rightZi">自行上传，可随时更改</div>
                        <img src="../../assets/image/upload.png" class="storeImage2">
                    </div>
                    <div>
                        <input placeholder="请输入外卖电话" class="businessInput">
                    </div>
                    <div>
                        <input placeholder="请输入联系人姓名" class="businessInput">
                    </div>
                    <div>
                        <input placeholder="请输入联系电话" class="businessInput">
                    </div>
                </div>
            </div>

            
        </div>
        <div class="footer">
            
            <span class="businessConfirm">确认</span>
            <span class="businessSave">保存</span>
        </div>
    </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter();
    //返回主页
    function returnMain(){
        console.log("点击")
        router.push('/MainPage') 
    }
</script>
<style scoped>
    .navigation{
        height: 57px;
        background-color: #01B6FD;
    }
    button{
        border: none;
    }
    .navigationLogo{
        line-height: 57px;
        color: white;
        font-weight: 600px;
        font-size: 20px;
        padding-left: 40px;
    }
    .navigationZi1{
        float: right;
        color: white;
        margin-right: 40px;
        margin-top: 20px;
    }
    .navigationZi2{
        cursor: pointer;
        height: 26px;
        background-color: white;
        color: #138dbd;
        margin-right: 60px;
        margin-top: 17px;
        float: right;
        padding: 4px 10px 4px 10px;
        border-radius: 10px;
    }
    .businessBox{
        margin: 0 auto;
        width: 60%;
    }
    .businessBox-top{
        background-color: rgb(230, 241, 250);
        height: 52px;
        margin-top: 10px;
        margin-bottom: 10px;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    .businessBox-top-zi1{
        line-height: 52px;
        color: rgb(9, 102, 9);
        font-size: 17px;
        margin-left: 20px;
    }
    .businessBox-top-zi2{
        line-height: 52px;
        font-size: 14px;
        margin-right: 30px;
        color: rgb(0, 99, 175)
    }
    .businessBox-might{
        flex: 3;
    }
    .businessBox-might div{
        margin: 20px;
    }
    .mightZi1{
        padding-top: 101px;
    }
    .mightZi2{
        padding-top: 8px;
    }
    .businessBox-bottom{
        display: flex;
        width: 100%;
    }
    .businessBox1{
        border-bottom: 1.5px solid rgb(115, 115, 115);
        padding-bottom: 30px;
        padding-top: 10px;
    }
    .businessBox2{
        margin-bottom: 100px;
        padding-top: 30px;
    }
    .businessInput{
        height: 30px;
        width: 350px;
        padding: 5px;
    }
    .businessBox-left{
        flex: 2;
        font-size: 15px;
        margin: 20px;
        background-color: #fff;
    }
    .businessBox-right{
        flex: 16;
        color: #717171;
    }
    .businessBox-right span{
        padding: 10px;
    }
    .businessBox-right div{
        margin: 20px;
    }
    .businessBox-right .rightZi{
        margin-left: 0;
        margin-bottom: 0;
    }
    .storeImage{
        width:  100px;
        height: 100px;
        border-radius: 5px;
    }
    .storeImage2{
        width: 150px;
        height: 100px;
        border-radius: 5px;
    }
    .footer{
        height: 63px;
        background-color: white;
        box-shadow:  0 8px 16px 0 rgba(0,0,0,0.2);
        display: block;
        left: 0;
        position: sticky;
        z-index: 1; 
        bottom: 0;
    }
    .businessSave,
    .businessConfirm{
        background-color: #01B6FD;
        color: white;
        margin: 0 auto;
        margin-top: 16px;
        margin-right: 42px;
        border-radius: 20px;
        float: right;
        padding: 5px 23px 5px 23px;
        box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
    .businessConfirm{
        margin-right: 350px;
    }
</style>