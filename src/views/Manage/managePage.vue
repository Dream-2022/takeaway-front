<template>
    <div class="Manage">
        <div class="manageTitleBox">
            <span class="manageTitle"><i class="edge icon"></i>饿了么</span>
            <span class="tradeTitle">{{ shopState }}</span>
            <span class="manageShopImgBox">
                <img :src="shopDetail.logoPhoto" class="manageShopImg">
                <span class="manageShopName">{{ shopDetail.name }}</span>
            </span>
        </div>
        <div class="manageBottom">
            <div class="manageLeft">
                <div class="zIndex"  ref="navBox">
                    <RouterLink :to="'/managePage/orderHandlePage'"><div class="manageButton link1 " @click="clearActiveClassAndAdd">订单处理</div></RouterLink>
                    <RouterLink :to="'/managePage/setMealPage'"><div  class="manageButton link2 manageLeftActive" @click="clearActiveClassAndAdd">工作台</div></RouterLink>
                    <RouterLink :to="'/managePage/setMealPage'"><div  class="manageButton link3" @click="clearActiveClassAndAdd">数据统计</div></RouterLink>
                    <RouterLink :to="'/managePage/dealPage'"><div class="manageButton link4" @click="clearActiveClassAndAdd">菜品管理</div></RouterLink>
                    <RouterLink :to="'/managePage/setMealPage'"><div  class="manageButton link5" @click="clearActiveClassAndAdd">套餐管理</div></RouterLink>
                    <RouterLink :to="'/managePage/setMealPage'"><div  class="manageButton link6" @click="clearActiveClassAndAdd">分类管理</div></RouterLink>
                    <RouterLink :to="'/managePage/setMealPage'"><div  class="manageButton link7" @click="clearActiveClassAndAdd">修改信息</div></RouterLink>
                    <RouterLink :to="'/mainPage'"><div>返回<i class="reply icon"></i></div></RouterLink>
                </div>
            </div>
            <div class="manageRight">
                <router-view @clickFather="clickFather"></router-view>
            </div>
        </div>
    </div>
    

    
<div class="zhezhao" id='zhezhao'></div>
<div class="tankuang" style="display:none;">
    <div id="header">
        <div class="headTitle">新建菜品</div>
        <div id="header-right" @click="hidder">x</div>

        <div class="modalContent">
            <div>
                <span>商品名称：</span>
                <input class="addDishName" v-model="addDishNameRef">
            </div>
            <div class="addDishImgBox">
                <span class="addDishImgZi">商品图片：</span>
                <img ref="imgStoreImageRef" :src="myStorePhoto" class="addDishImg"  @click="storeImageClick">
                <input id="uploadStoreImage" type="file" class="upload" ref="uploadStoreImageInput" style="display: none" @change="uploadStoreImageClick">
            </div>
            <div class="selectBox">
                <span>所属分类：</span>
                <select class="selectCategory" name="类别" @change="handleCategoryChange" ref="myCategorySelect">
                  <option v-for="item in dishCategoryAll" :key="item" :value="item.districtId">{{item.categoryName}}</option>
                </select>
            </div>
            <div class="addDishDetailBox">
                <span>商品详细：</span>
                <textarea class="addDishDetail" v-model="addDishDetailRef"></textarea>
            </div>
            <div>
                <span>商品价格：</span>
                <input type="number" min="0" class="addDishPrice" v-model="addDishPriceRef">
            </div>
            <div>
                <span>商品库存：</span>
                <input type="number" min="0" class="addDishNumber" v-model="addDishNumberRef">
            </div>
            <div class="addDishFlavorBigBox">
                <span>商品属性：</span>
                <div class="addDishFlavorBox">
                    <div class="addDishFlavorButton" v-if="existFlavorButton" @click="addDishFlavorClick">添加属性</div>
                    <div class="addDishFlavorInputBox" v-if="!existFlavorButton" >
                        <div class="addDishFlavorInputZi">添加属性</div>
                        <input class="addDishFlavorInput"  v-model="addDishFlavorContent" placeholder="请添加属性名">
                        <input type="radio" value="0" name="radioCheckbox" @click="radioCheckbox0" checked="true" id="addDishFlavorCheckbox0"><label for="addDishFlavorCheckbox0">单选</label>
                        <input type="radio" value="1" name="radioCheckbox" @click="radioCheckbox1" id="addDishFlavorCheckbox1"><label for="addDishFlavorCheckbox1">多选</label><br>
                        <button class="addDishFlavorInputAddButton" @click="addDishFlavorInputAddClick">添加</button>
                        <button class="addDishFlavorInputCancelButton" @click="addDishFlavorInputCancelClick">取消</button>
                    </div>
                    <div class="FlavorBoxes">
                        <div v-for="item in attributeStore.getAttributeList()" :key="item">
                            <AttributeBox :attribute="item"></AttributeBox>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span class="addDishPackingZi">打包费：</span>
                <input type="number" min="0" class="addDishPacking" v-model="addDishPackingRef">
            </div>
            <div>
                <span>商品分量：</span>
                <input class="addDishWeight" v-model="addDishWeightRef">
            </div>
            <div>
                <span>商品原料：</span>
                <input class="addDishMaterial" v-model="addDishMaterialRef">
            </div>
            <span class="prompt"></span>
        </div>
        
        <div class="buttonBox">
          <button class="TanConfirmButton" @click="TanConfirmClick">确定</button>
          <button class="TanCancelButton" @click="hidder">关闭</button>
        </div>
    </div>
</div>
</template>
<script setup>
  import {onMounted, ref} from 'vue' 
  import {useRouter} from "vue-router"
  import {selectShopByUserId,uploadShopImage} from'@/apis/shop.js'
  import {selectCategoryAll} from'@/apis/category.js'
  import {useAttributeStore} from'@/stores/attribute.js'
  import {insertDish} from '@/apis/dish.js'
  import { ElMessage } from 'element-plus';
  import AttributeBox from'@/views/Manage/Components/attributeBox.vue'
  const router = useRouter();
  const attributeStore=useAttributeStore()
  var shopDetail=ref([])//商家信息
  var shopState=ref()
  var dishCategoryAll=ref([])//添加菜品下拉框 的全部分类
  onMounted(async()=>{
    document.getElementById('zhezhao').style.display="none";
    //userId获取他的商家id和信息
    const apiData={
        userId:localStorage.getItem("id")
    }
    const res=await selectShopByUserId(apiData)
      console.log(res.data)
      console.log(res.data.data)
      if(res.data.code==0){
        console.log("获取成功")
        shopDetail.value=res.data.data
        localStorage.setItem("shopId",res.data.data.id);
    }
    //商家的营业状态
    console.log(shopDetail.value.state)
    if(shopDetail.value.state=="0"){
        shopState.value="审核中"
    }else if(shopDetail.value.state=="1"){
        shopState.value="营业中"
    }else if(shopDetail.value.state=="2"){
        shopState.value="编辑中"
    }
    //获取新建菜品中下拉框的内容
    console.log(localStorage.getItem("shopId"))
    const apiData1={
        shopId:localStorage.getItem("shopId")
    }
    const res1=await selectCategoryAll(apiData1)
      console.log(res1.data)
      console.log(res1.data.data)
      if(res1.data.code==0){
        dishCategoryAll.value=res1.data.data
      }
  })
  
  //添加口味属性
  var existFlavorButton=ref(true)
  function addDishFlavorClick(){
    console.log("点击")
    existFlavorButton.value=false
  }

  //添加商品下拉框 的确认添加事件
  var addDishNameRef=ref("")
  var myCategorySelect=ref("")
  var addDishDetailRef=ref("")
  var addDishPriceRef=ref("")
  var addDishNumberRef=ref("")
  var addDishPackingRef=ref("")
  var addDishWeightRef=ref("")
  var addDishMaterialRef=ref("")
  async function TanConfirmClick(){
    console.log(myCategorySelect.value.value)
    console.log(myStorePhoto.value)
    if(addDishNameRef.value==""){
        ElMessage.error("商品名称不能为空")
        return
    }
    if(!addDishNameRef.value==""){
        if(addDishDetailRef.value==""){
            ElMessage.error("商品详细不能为空")
            return
        }
        if(addDishPriceRef.value==""){
            ElMessage.error("商品价格不能为空")
            return
        }
        if(addDishNumberRef.value==""){
            ElMessage.error("商品库存不能为空")
            return
        }
        if(addDishPackingRef.value==""){
            ElMessage.error("打包费不能为空")
            return
        }
        if(addDishWeightRef.value==""){
            ElMessage.error("商品分量不能为空")
            return
        }
        if(addDishMaterialRef.value==""){
            ElMessage.error("商品原料不能为空")
            return
        }
    }
    const apiData={
        shopId:localStorage.getItem("shopId"),
        dishName:addDishNameRef.value,
        categoryName:myCategorySelect.value.value,
        picture:myStorePhoto.value,
        price:addDishPriceRef.value,
        number:addDishNumberRef.value,
        detail:addDishDetailRef.value,
        pack:addDishPackingRef.value,
        weight:addDishWeightRef.value,
        material:addDishMaterialRef.value,
        attributeList:attributeStore.getAttributeList()
    }
    const res=await insertDish(apiData)
      console.log(res.data)
      console.log(res.data.data)
      if(res.data.code==0){
        console.log("添加成功")
        ElMessage.success("菜品添加成功")
      }

    //添加菜品的口味
    console.log(res.data.data.id)
  }

  //新建菜品弹窗中添加口味属性
  var radioCheckboxValue=ref(0)//单选框的选中的value
  function radioCheckbox0(){
    radioCheckboxValue.value=0}
  function radioCheckbox1(){
    radioCheckboxValue.value=1}
  var addDishFlavorContent=ref("")
  async function addDishFlavorInputAddClick(){
    console.log(radioCheckboxValue.value)
    if(addDishFlavorContent.value==""){
        ElMessage.error("添加的属性名不能为空")
        return
    }
    attributeStore.addAttribute(addDishFlavorContent.value,radioCheckboxValue.value)
    ElMessage.success("添加成功")
    existFlavorButton.value=true
  }
  //新建菜品弹窗中添加口味属性的取消
  function addDishFlavorInputCancelClick(){
    existFlavorButton.value=true
  }
  //添加商品下拉框 的上传图片事件
  var imgStoreImageRef=ref(null) 
  var uploadStoreImageInput=ref(null)
  let myStorePhoto=ref("http://localhost:8080/upload/upload.png")
  function storeImageClick(){
        uploadStoreImageInput.value.click();
  }
  function uploadStoreImageClick(){
        console.log("点击选择框")
        const file = uploadStoreImageInput.value.files[0];
        if (file) {
            const creator=localStorage.getItem("username")
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend =async function() {
                console.log(file)
                imgStoreImageRef.value.src=file.path
                console.log(reader.result)

                // 创建一个 FormData 对象
                let formData = new FormData();
                formData.append('username', creator);
                formData.append('avatar', file);
                console.log(creator)
                console.log(file)

                console.log(formData)
                console.log("上传")
                //保存本地
                const res=await uploadShopImage(formData)
                    console.log(res)
                    const userObj = res.data.data
                    console.log(userObj)
                    localStorage.setItem("picture",userObj.url);
                    console.log("洒水："+userObj.url)
                    localStorage.setItem("picture",userObj.url)
                    myStorePhoto.value=userObj.url
                    console.log(myStorePhoto.value)
                    console.log(myStorePhoto)
            };
        }
    };

  var sonMsg=ref()
  function clickFather(params){
    sonMsg.value=params
    console.log("触发了",params)
    //清空盒子里面输入的内容
    addDishNameRef.value=""
    myStorePhoto.value="http://localhost:8080/upload/upload.png"
    addDishDetailRef.value=""
    addDishPriceRef.value=""
    addDishNumberRef.value=""
    addDishDetailRef.value=""
    addDishPackingRef.value=""
    addDishWeightRef.value=""
    addDishMaterialRef.value=""

    dianwo()
  }
  function dianwo(){
   document.getElementById('zhezhao').style.display="";
   document.querySelector('.tankuang').style.display="";
  }
  function hidder(){
    document.getElementById('zhezhao').style.display="none";
    document.querySelector('.tankuang').style.display="none";
  }

  //处理active事件
  var navBox=ref()
  function clearActiveClassAndAdd(event){
    console.log(navBox.value);
      const childrenArray = Array.from(navBox.value.children);
      console.log(childrenArray);

      childrenArray.forEach((item) => {
        console.log(item);
        const itemChildrenArray = Array.from(item.children);
        console.log(itemChildrenArray);

        itemChildrenArray.forEach((child) => {
          child.classList.remove('manageLeftActive');
        });
      });
      console.log(event)
      event.currentTarget.classList.add('manageLeftActive')
  }
</script>
<style scoped>
    @import '@/css/managePage.css'
</style>