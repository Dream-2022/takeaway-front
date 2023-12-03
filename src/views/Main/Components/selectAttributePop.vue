<template>
    <!-- 选择规格弹窗 -->
    <div class="zhezhao2" id='zhezhao2' v-if="dishStore.openSelectDishDown"></div>
    <div class="tankuang2" v-if="dishStore.openSelectDishDown">
    <div id="header2">
        <div class="headTitle">选规格</div>
        <div id="header-right2" @click="hidder2">x</div>
    </div>
    <div class="modalContent">
        <div class="modalUpper">
          <div>
              <img :src="dishOneStore.dish.picture" class="modalDishImg">
          </div>
          <div class="modalDown">
              <div class="modalDishName">{{ dishOneStore.dish.dishName }}</div>
              <span class="modalDishZi">已选：</span><span class="modalDishZi2">常温/常温/常温/常温</span><br>
              <span class="modalDishPriceZi">￥</span><span class="modalDishPrice">{{ dishOneStore.dish.price }}</span>
          </div>
        </div>
        <div class="modalMight">
          <div class="modalDishMightLeft">数量</div>
          <div class="modalDishMightRight">
              <span class="modalDishMinus modalDishMinusGray" @click="modalDishMinusClick"><i class="minus icon"></i></span>
              <span class="modalDishNumber">{{ dishNumber }}</span>
              <span class="modalDishPlus" @click="modalDishPlusClick"><i class="plus icon"></i></span>
          </div>
        </div>
        <div class="modalLower">
          <div  v-for="item in attributeStore.attributeList" :key="item">
            <div class="modalDishLowerAttribute">
                <div class="modalDishLowerAttributeName">{{ item.attributeName }}</div>
                <div class="modalDishLowerFlavors">
                  <span v-for="item2 in item.flavorList" :key="item2">
                    <div class="modalDishLowerFlavor" @click="modalDishLowerFlavorClick(item,item2)">
                        <div class="modalDishLowerFlavorName">{{ item2.flavorName }}</div>
                        <div class="modalDishLowerFlavorZi" v-if="item2.price!=0">￥</div><div class="modalDishLowerFlavorPrice" v-if="item2.price!=0">{{ item2.price }}</div>
                    </div>
                  </span>
                </div>
            </div>
          </div>
        </div>
    </div>
    
    <div class="buttonBox">
        <button class="TanConfirmButton" @click="addAddressButton">选好了</button>
        <button class="TanCancelButton" @click="hidder2">取消</button>
    </div>
</div>
</template>
<script setup>
  import { onMounted, ref } from 'vue' 
  import { ElMessage } from 'element-plus';
  import {useDishStore} from'@/stores/dishStore.js'
  import {useDishOneStore} from'@/stores/dishOneStore.js'
  import {useAttributeStore} from'@/stores/attributeStore.js'

  const dishStore=useDishStore()
  const dishOneStore=useDishOneStore()
  const attributeStore=useAttributeStore()
  //选好口味
  function addAddressButton(){
    console.log(attributeStore.attributeList)
    console.log(dishOneStore.getSelectDishOne)
    console.log(dishOneStore.getSelectDishOne.value)
  }
  //选中口味
  function modalDishLowerFlavorClick(item,item2){
    //判断是单选还是多选
    if(item.checked==0){
      console.log("单选")

    }
    if(item.checked==1){
      console.log("多选")

    }
  }

  //购买数量的点击事件
  let dishNumber=ref(1)
  function modalDishMinusClick(){
    if(dishNumber.value==1){
        ElMessage.warning("不能再减少了")
        return
    }
    dishNumber.value=dishNumber.value-1;
    if(dishNumber.value==1){
        document.querySelector(".modalDishMinus").classList.add("modalDishMinusGray")
    }
  }
  function modalDishPlusClick(){
    document.querySelector(".modalDishMinus").classList.remove("modalDishMinusGray")
    dishNumber.value=dishNumber.value+1
  }
    

  function hidder2(){
    dishStore.modifySelectDishDown(false)
  }
</script>
<style scoped>

/* 选择规格弹窗 */
#header2{
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}
.modalUpper{
  display: flex;
  margin-left: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}
.modalDishImg{
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.modalDishName{
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 700;
  margin-left: 20px;
}
.modalDishZi{
  margin-left: 20px;
  font-size: 13px;
  color: #686868;
  display: inline-block;
}
.modalDishZi2{
  margin-left: 5px;
  font-size: 13px;
  color: #686868;
  display: inline-block;
}
.modalDown{
  margin-top: 10px;
}
.modalDishPriceZi{
  color: rgb(255, 153, 43);
  margin-left: 20px;
  margin-top: 8px;
  display: inline-block;
  font-size: 14px;
}
.modalDishPrice{
  font-weight: 600;
  color: rgb(255, 153, 43);
  font-size: 17px;
}
.modalMight{
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  margin-top: 10px;
}
.modalDishMightLeft,
.modalDishMightRight{
  display: inline-block;
}
.modalDishMightLeft {
  order: -1;
}
.modalDishMightRight{
  order: 0;
}
.modalDishMinus,
.modalDishPlus{
  cursor: pointer;
  padding:3px 10px 3px 12px;
  display: inline-block;
  font-size: 14px;
}
.modalDishMinusGray{
  color: #ccc;
}
.modalDishMinus i.icon,
.modalDishPlus i.icon{
  margin: 0;
}
.modalDishNumber{
  padding: 5px 14px 5px 14px;
  background-color: #f2f2f2;
}
.modalLower{
  font-size: 15px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
}
.modalDishMightLeft,
.modalDishLowerAttributeName{
  font-size: 14px;
  font-weight: 600;
}
.modalDishLowerAttributeName{
  margin-bottom: 5px;
}
.modalDishLowerFlavorZi,
.modalDishLowerFlavorPrice,
.modalDishLowerFlavorName,
.modalDishLowerFlavor{
  display: inline-block;
}
.modalDishLowerFlavor{
  cursor: pointer;
  background-color: #f2f2f2;
  padding: 4px 14px  4px 14px;
  margin-right: 10px;
  margin-left: 1px;
  border-radius: 5px;
  margin-bottom: 8px;
}
.modalDishLowerAttribute{
  margin-top: 15px;
}
.zhezhao2{
 position: fixed;
 left: 0px;
 top: 0px;
 background: #000;
 width: 100%;
 height: 100%;
 opacity: 0.5;
}
.tankuang2{
 position: fixed;
 top:40px;
 left:50%;
 transform:translateX(-50%);
 background: #fff;
 border-radius: 5px;
 color: black;
}
.tankuang2{
  width: 450px;
}
#header-right2{
 position: absolute;
 width: 25px;
 height: 25px;
 border-radius: 5px;
 background: rgb(167, 166, 166);
 color: #fff;
 right: 23px;
 top: 16px;
 text-align: center;
 cursor: pointer;
 font-size: 17px;
}
.modalContent{
  margin-top: 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-right: 10px;
  margin-left: 10px;
}

.buttonBox{
float: right;
margin-right: 50px;
margin-bottom: 18px;
}
.TanConfirmButton{
  width:80px;
  height:35px;
  margin-top:15px;
  outline:none;
  border:0px;
  border-radius:10px;
  background:rgb(0, 148, 254);
  color:#fff;
  margin-left:30px;
}
.TanCancelButton{
  width:80px;
  height:35px;
  background:#dedede;
  color:#000;
  border:1px solid #ccc;
  border-radius:10px;
  margin-left: 40px;
}

.close:hover
{
  background:#eee;
}
.headTitle{
color: rgb(73, 73, 73);
margin-top: 16px;
margin-left: 20px;
font-size: 17px;
}
.commonScreen{
  display: inline-block;
}
.minScreen{
  display: inline-block;
}
</style>