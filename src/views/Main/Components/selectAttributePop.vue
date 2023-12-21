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
              <div class="modalDishZi">已选：</div><div class="modalDishZi2">{{ modalDishFlavorZi }}</div><br>
              <div class="modalDishPackZi">打包费：￥</div><div class="modalDishPack">1</div><br>
              <span class="modalDishPriceZi">￥</span><span class="modalDishPrice">{{ modalDishPriceValue }}</span>
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
                <div class="modalDishLowerAttributeId">{{ item.id }}</div>
                <div class="modalDishLowerFlavors">
                  <span v-for="(item2,index) in item.flavorList" :key="item2">
                    <div class="modalDishLowerFlavor" :class="(index==0&&item.checked==0)? 'modalDishLowerFlavorValue' :''" @click="modalDishLowerFlavorClick(item,item.id,item2,item2.id)">
                        <div class="modalDishLowerFlavorId">{{ item2.id }}</div>
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
  import { onMounted ,onUpdated, ref, toRaw } from 'vue' 
  import { ElMessage } from 'element-plus';
  import {useDishStore} from'@/stores/dishStore.js'
  import {useDishOneStore} from'@/stores/dishOneStore.js'
  import {useCartOneStore} from'@/stores/cartOneStore.js'
  import {useAttributeStore} from'@/stores/attributeStore.js'
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const dishStore=useDishStore()
  const dishOneStore=useDishOneStore()
  const cartOneStore=useCartOneStore()
  const attributeStore=useAttributeStore()
  let modalDishPriceValue=ref(0)
  let modalDishFlavorZi=ref("")//显示在页面上已选的口味
  onMounted(async()=>{
      console.log(route.params.id)
      cartOneStore.initialization(localStorage.getItem("id"),route.params.id)
  })
  onUpdated(async()=>{
      //初始化页面的已选口味
      changeSelected()

  })
  //选好了
  function addAddressButton(){
    //先将页面上所有选中的口味id加入到map中
    let myFlavorMap = new Map();
    // dishOneStore.dish.price=modalDishPriceValue.value
    const modalFlavorList=document.querySelectorAll('.modalDishLowerFlavor')
    console.log(modalFlavorList)
    for(let i=0;i<modalFlavorList.length;i++){
      console.log(modalFlavorList[i])
      if(modalFlavorList[i].classList.contains('modalDishLowerFlavorValue')){
        console.log(modalFlavorList[i].childNodes[0].innerHTML)
        myFlavorMap.set(modalFlavorList[i].childNodes[0].innerHTML, 1)
      }
    }
    console.log(myFlavorMap)

    //查找是否跟之前选中的是一样的，将quantity+1------------------------------------
    // if(dishOneStore.dish==)
    console.log(cartOneStore.cartOne)
    console.log(cartOneStore?.cartOne[0]?.dishIdList!=undefined)
    let cartCurrentDish=0
    if(cartOneStore?.cartOne[0]?.dishIdList!=undefined){

  
      cartCurrentDish=cartOneStore.cartOne[0].dishIdList
      console.log(cartCurrentDish)
      
      for(let i=0;i<cartCurrentDish.length;i++){
        //如果商品id都匹配不上，说明不是同一件商品
        console.log(cartCurrentDish[i].id)
        console.log(dishOneStore.dish.id)
        console.log(cartCurrentDish[i].id==dishOneStore.dish.id)
        if(cartCurrentDish[i].id!=dishOneStore.dish.id){
          continue;
        }
        let flag=0;
        let flag1=0//解决：单选，单选，多选（第一个商品选择了两个）--》（后面的商品选择了三个），这时前两个匹配也会相当于同一个商品
        const cartCurrentDishAttributeList=cartCurrentDish[i].attributeList
        console.log(cartCurrentDishAttributeList)
        console.log(myFlavorMap.size)
        console.log(cartCurrentDishAttributeList.length)

        for(let j=0;j<cartCurrentDishAttributeList.length;j++){
          console.log(cartCurrentDishAttributeList[j].flavorList[0])
          console.log(cartCurrentDishAttributeList[j].flavorList[0]==undefined)
          if(cartCurrentDishAttributeList[j].flavorList[0]==undefined){
            continue
          }
          flag=flag+1
          flag1=flag1+1
          console.log("+"+flag)
          const cartCurrentFlavorId=cartCurrentDishAttributeList[j].flavorList[0].id
          console.log(cartCurrentFlavorId)
          if(myFlavorMap.has(cartCurrentFlavorId+'')){
            console.log("这里符合")
            flag=flag-1
            console.log("-"+flag)
          }
        }
        //将quantity+1
        console.log(flag)
        if(flag==0&&myFlavorMap.size==flag1){
          cartCurrentDish[i].quantity=cartCurrentDish[i].quantity+1
          console.log("和之前加的菜品重复了,直接将quantity+1")
          console.log(cartCurrentDish)
          //设置购物车的打包费和总价
          cartOneStore.setCartDishPackSum()
          dishStore.modifySelectDishDown(false)//关闭弹窗
          return
        }
      }
    }


    console.log(dishNumber.value)//数量
    console.log(dishOneStore.dish)
    dishOneStore.dish.quantity=dishNumber.value
    console.log(dishOneStore.dish.quantity)
    console.log(attributeStore.attributeList)

    

    //然后将map中没有值的从selectAttributes中去掉
    const selectAttributes=toRaw(attributeStore.attributeList)
    console.log(selectAttributes)
    console.log(myFlavorMap.has(1))
    let flavorListZi=""
    for(let i=0;i<selectAttributes.length;i++){
      const selectFlavorList= selectAttributes[i].flavorList
      for(let j=0;j<selectFlavorList.length;j++){
        console.log(selectFlavorList[j].id)
        console.log(myFlavorMap.has(selectFlavorList[j].id+''))
        if(!myFlavorMap.has(selectFlavorList[j].id+'')){
          console.log("移除")
          selectFlavorList.splice(j, 1)
          j--;
        }else{//加入flavorListZi
          if(flavorListZi==""){
            flavorListZi=selectFlavorList[j].flavorName
          }else{
            flavorListZi=flavorListZi+"/"+selectFlavorList[j].flavorName
          }
        }
      }
    }
    //给dish赋值flavorListZi
    dishOneStore.dish.flavorListZi=flavorListZi

    console.log(selectAttributes)
    dishOneStore.dish.attributeList=selectAttributes
    console.log(dishOneStore.dish.attributeList)
    console.log(dishOneStore.dish)


    console.log(modalDishPriceValue.value)
    console.log(route.params.id)
    cartOneStore.addDishToCart(dishOneStore.dish,modalDishPriceValue.value,route.params.id)
    //设置购物车的打包费和总价
    cartOneStore.setCartDishPackSum()
    dishStore.modifySelectDishDown(false)//关闭弹窗

  }
  //选中口味(分两种情况)
  function modalDishLowerFlavorClick(item,attributeId,item2,flavorId){
    const modalFlavorIdAll=document.querySelectorAll('.modalDishLowerFlavorId')
    const modalAttributeIdBoxAll=document.querySelectorAll('.modalDishLowerAttributeId')
    //判断是单选还是多选

    let flag=0;
    if(item.checked==1){
      console.log("多选")
      //已经选中的状态，就要移除这个选中
      for(let i=0;i<modalFlavorIdAll.length;i++){
        if(modalFlavorIdAll[i].innerHTML==flavorId&&modalFlavorIdAll[i].parentElement.classList.contains('modalDishLowerFlavorValue')){
          modalFlavorIdAll[i].parentElement.classList.remove('modalDishLowerFlavorValue')
          flag=1;
        }
      }
    }
    if(flag==0){
      console.log("单选")
      console.log(item)
      console.log(attributeId)
      console.log(item2)
      console.log(flavorId)
      //遍历取消modalDishLowerFlavorValue属性
      for(let i=0;i<modalAttributeIdBoxAll.length;i++){
        console.log(modalAttributeIdBoxAll[i])
        if(modalAttributeIdBoxAll[i].innerHTML==attributeId){
          const modalAttributeIdBox=modalAttributeIdBoxAll[i]
          const childBoxes=modalAttributeIdBox.parentElement.childNodes[2].childNodes
          console.log(modalAttributeIdBox.parentElement)
          console.log(modalAttributeIdBox.parentElement.childNodes)
          console.log(modalAttributeIdBox.parentElement.childNodes[2])
          console.log(modalAttributeIdBox.parentElement.childNodes[2].childNodes)
          console.log(childBoxes)
          for(let j=1;j<childBoxes.length-1;j++){
            console.log(childBoxes[j].childNodes[0])
            if(childBoxes[j].childNodes[0].classList.contains('modalDishLowerFlavorValue')){
              childBoxes[j].childNodes[0].classList.remove('modalDishLowerFlavorValue')
            }
          }
        }
      }
      //然后选中的加入modalDishLowerFlavorValue属性
      for(let i=0;i<modalFlavorIdAll.length;i++){
        if(modalFlavorIdAll[i].innerHTML==flavorId){
          modalFlavorIdAll[i].parentElement.classList.add('modalDishLowerFlavorValue')
        }
      }
    }
    changeSelected()
  } 
  //更改下拉框中已选的内容
  function changeSelected(){
    const modalFlavorAll =document.querySelectorAll('.modalDishLowerFlavor')
    modalDishFlavorZi.value=""
    //更改价格
    modalDishPriceValue.value=(Number)(dishOneStore.dish.price)
    for(let i=0;i<modalFlavorAll.length;i++){
      if(modalFlavorAll[i].classList.contains('modalDishLowerFlavorValue')){
        //判断口味是否有价格(有价格就加上价格)
        if(modalFlavorAll[i].childNodes[3].innerHTML !=undefined){   
          modalDishPriceValue.value=(Number)(modalDishPriceValue.value)+(Number)(modalFlavorAll[i].childNodes[3].innerHTML)
        }
        //更改已选
        if(modalDishFlavorZi.value==""){
          modalDishFlavorZi.value=modalFlavorAll[i].childNodes[1].innerHTML
        }
        else{
          modalDishFlavorZi.value=modalDishFlavorZi.value+" / "+modalFlavorAll[i].childNodes[1].innerHTML
        }
      }
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
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
  }
  .modalDishZi,
  .modalDishPackZi,
  .modalDishPack{
    margin-left: 20px;
    font-size: 13px;
    color: #686868;
    display: inline-block;
    padding-top: 0;
    padding-bottom: 0;
  }
  .modalDishPack{
    margin-left: 3px;
  }
  .modalDishZi2{
    margin-left: 5px;
    font-size: 13px;
    color: #686868;
    display: inline-block;
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
  .modalDishLowerAttributeId{
    display: none;
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
    border: 1px solid #ccc;
  }
  .modalDishLowerFlavorId{
    display: none;
  }
  .modalDishLowerFlavorValue{
    border: 1px solid rgb(0, 148, 254);
    color: rgb(0, 148, 254);
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
    max-height: 500px;
    white-space: nowrap;
    overflow-y:scroll;
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