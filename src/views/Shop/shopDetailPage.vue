<template>
    <div class="shopBackground">

        <router-view></router-view>

        <div class="footerBox" v-if="isDishValue">
            <div class="cartBox cartBoxNone">
                <div class="cartBoxTop">
                    <span class="cartBoxTopZi">已选商品</span>
                    <span class="cartBoxTopPackZi">打包费&nbsp;&nbsp;</span><span class="cartBoxTopPrice">{{ cartOneStore.cartDishPackSum }}</span><span class="cartBoxTopPackZi2">&nbsp;元</span>
                    <span class="cartBoxTopClean"><i class="trash alternate outline icon"></i>清空</span>
                </div>

                <div class="cartDishBoxes">
                    <div class="cartDishBox" v-for="item in cartOneStore?.cartOne[0]?.dishIdList" :key="item">
                        <div class="cartDishBoxFlex">
                            <div class="cartDishBoxLeft">
                                <img :src="item.picture" class="cartDishImg">
                            </div>
                            <div class="cartDishBoxMight">
                                <div class="cartDishBoxRightName">{{ item.dishName }}</div>
                                <div class="cartDishBoxRightFlavorZi">已选:&nbsp;&nbsp;</div>
                                <div class="cartDishBoxRightFlavor">{{ item.flavorListZi }}</div><br>
                                <span class="cartDishBoxRightPriceZi">￥</span><span class="cartDishBoxRightPrice">{{ item.price }}</span>
                            </div>
                            <div class="cartDishBoxRight">
                                <span class="cartDishBoxRightMinus" @click="cartDishBoxRightMinusClick(item)"><i class="minus circle icon"></i></span>
                                <span class="cartDishBoxRightNumber">{{ item.quantity }}</span>
                                <span class="cartDishBoxRightPlus" @click="cartDishBoxRightPlusClick(item)"><i class="plus circle icon"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span @click="cartBoxClick"><i class="shopping cart icon"></i></span>
            <span class="shoppingNumber">{{ cartOneStore?.cartOne[0]?.dishIdList==undefined?0:cartOneStore?.cartOne[0]?.dishIdList.length }}</span>

            <span  @click="cartBoxClick">￥</span><span class="shoppingPrice" @click="cartBoxClick">{{ cartOneStore.cartDishPriceSum }}</span>
            <span class="footerZi">另需配送费约￥</span><span>{{ shopDetail.packing }}</span>
            <button class="footerButton" @click="footerButtonClick">结算</button>
        </div>
        <div class="nullBox"></div>

    </div>
    

</template>
<script setup>
    import {ref,onMounted} from 'vue'
    import { ElMessage } from 'element-plus';
    import { useRoute, useRouter } from 'vue-router';
    import {selectById} from '@/apis/shop.js'
    import {selectCollectByUserIdShopId, insertCollect, deleteCollect} from '@/apis/collect.js'
    import {useDishStore} from'@/stores/dishStore.js'
    import {useCartStore} from'@/stores/cartStore.js'
    import {useCartOneStore} from'@/stores/cartOneStore.js'
    const dishStore=useDishStore()
    const cartStore=useCartStore()
    const cartOneStore=useCartOneStore()
    let dishes=ref([])
    let shopDetail=ref([])
    let isDishValue=ref(true)
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {

        if(localStorage.getItem('shopper')==undefined){
            isDishValue.value=true
        }
        else{
            isDishValue.value=false
        }
        await cartStore.initializationCartAll(localStorage.getItem("id"))
        console.log(cartStore.cartList)
        console.log(route.params.id)
        //获取dish列表
        dishStore.obtainDishList(route.params.id)
        dishes.value=dishStore.dishList

        const apiData={
            shopId: route.params.id
        }
        const res1=await selectById(apiData)
        console.log(res1.data.data)
        if(res1.data.code==0){
            console.log('成功发送')
            console.log(res1.data)
            if(res1.data.code==0){
                console.log("获取商家信息成功")
                shopDetail.value=res1.data.data
            }
            else{
                ElMessage.error(res1.data.message)
            }
        }

        //获取是否收藏该店铺了
        const apiData2={
            shopId:shopDetail.value.id,
            userId:localStorage.getItem("id")
        }
        let isCollect=ref()
        const res2=await selectCollectByUserIdShopId(apiData2)
            console.log(res2.data)
            if(res2.data.code==0){
                console.log("获取成功："+selectCollectByUserIdShopId)
                if(res2.data.data=="未收藏"){
                    isCollect.value=false
                }else if(res2.data.data=="收藏"){
                    isCollect.value=true
                }
            }
            else{
                ElMessage.error(res2.data.message)
            }
       
        //从cartList中找是否存在满足userId和shopId的
        console.log(cartStore.cartList)
        console.log(cartStore.cartList.length)
        let flag=true
        cartOneStore.cartOne.value=[]
        for(let i=0;i<cartStore.cartList.length;i++){
            console.log(cartStore.cartList[i])
            console.log([cartStore.cartList[i]])
            console.log(cartStore.cartList[i].userId)
            console.log(cartStore.cartList[i].detailJson)
            // console.log(JSON.parse(cartStore.cartList[i].detailJson))
            const detail=JSON.parse(cartStore.cartList[i].detailJson)
            console.log(detail)
            if(cartStore.cartList[i].userId==localStorage.getItem("id")&&cartStore.cartList[i].shopId==route.params.id){
                //说明原先存在该购物车，直接赋值到cartOne
                console.log("说明存在")
                // cartOneStore.cartOne[0].userId=localStorage.getItem("id")
                // cartOneStore.cartOne[0].shopId=route.params.id
                // console.log(cartStore.cartList[i])
                // console.log(cartStore.cartList[i].detailJson)
                // console.log(JSON.parse(JSON.stringify(cartStore.cartList[i].detailJson)))
                // console.log(JSON.parse(cartStore.cartList[i].detailJson))
                // cartOneStore.cartOne[0].dishIdList=(JSON.parse(cartStore.cartList[i].detailJson).dishIdList)

                // console.log(cartOneStore.cartOne.value[0])
                // cartOneStore.cartOne=[cartStore.cartList[i]]
                // console.log(cartOneStore.cartOne)
                // cartOneStore.cartOne[0].dishIdList=JSON.parse(cartStore.detailJson)
                cartOneStore.cartOne=detail
                
                console.log( cartOneStore.cartOne)
                flag=false
            }
        }
        //如果不存在就初始化一下
        if(flag){
            console.log("如果不存在就初始化一下")
            cartOneStore.cartOne=[]
        }
        console.log(cartOneStore.cartOne)
        console.log(cartOneStore.cartOne[0])

         //设置购物车的打包费和总价
         cartOneStore.setCartDishPackSum()
	})
    
    //点击结算购物车
    function footerButtonClick(){
        //判断价格是否达标
        console.log(cartOneStore.cartDishPriceSum)
        console.log(shopDetail.begin)
        if(shopDetail.begin<cartOneStore.cartDishPriceSum){
            ElMessage.warning("价格")
            return
        }
         //获取商家的名称
        console.log(shopDetail.value)
        console.log(shopDetail.value.name)
        cartOneStore.cartOne[0].shopName=shopDetail.value.name
        //将加入的购物车先进行处理（为了渲染选中的属性方便，先将里面的dishFlavorZi渲染好）
        const dishList=cartOneStore.cartOne[0].dishIdList
        console.log(dishList)
        
        console.log(dishList)
        localStorage.setItem("orderShopList",JSON.stringify(cartOneStore.cartOne))
        //跳转页面
        router.push('/OrderPage') 
    }

    //点击查看购物车
    function cartBoxClick(){
        if(document.querySelector('.cartBox').classList.contains('cartBoxNone')){
            document.querySelector('.cartBox').classList.remove('cartBoxNone')
        }
        else{
            document.querySelector('.cartBox').classList.add('cartBoxNone')
        }
    }

    //点击减少购物车数量
    function cartDishBoxRightMinusClick(dishOne){
        if(dishOne.quantity==1){
            cartOneStore.deleteDishFromCart(dishOne)
        }
        else{
            cartOneStore.changeQuantityDish(dishOne,-1)
        }
        //设置购物车的打包费和总价
        cartOneStore.setCartDishPackSum()
    }
    //点击增加购物车数量
    function cartDishBoxRightPlusClick(dishOne){
        cartOneStore.changeQuantityDish(dishOne,1)
        //设置购物车的打包费和总价
        cartOneStore.setCartDishPackSum()
    }
</script>
<style scoped>
    .shopBackground{
        background-color: #efefef;
    }
    .footerBox{
        width: 100%;
        background-color: #0292FE;
        margin:0 auto;
        width: 900px;
        position: sticky;
        z-index: 1; 
        bottom: 0;
        padding-bottom: 8px;
        color: white;
    }
    .cartBox{
        background-color: #fff;
        box-shadow:  0px 0px 3px rgb(42, 108, 161);
        color:black;
    }
    .cartBoxNone{
        display: none;
    }
    .cartBoxTop{
        padding-left: 50px;
        padding-top:10px;
        padding-bottom: 10px;
    }
    .cartBoxTopZi{
        font-size: 15px;
    }
    .cartBoxTopPackZi{
        color: #454545;
        font-size: 13px;
        margin-left: 30px;
    }
    .cartBoxTopClean{
        color: #454545;
        font-size: 13px;
        margin-left: 68%;
        cursor: pointer;
    }
    .cartBoxTopClean i.icon{
        margin:0
    }
    .cartBoxTopPrice{
        color: #ffa200;
        font-weight: 600;
        font-size: 13px;
    }    
    .cartBoxTopPackZi2{
        color: #ffa200;
        font-size: 13px;
    }
    .cartDishBoxFlex{
        display: flex;
    }
    .cartDishBoxLeft{
        flex: 1;
    }
    .cartDishBoxMight{
        flex: 6;
    }
    .cartDishBoxRight{
        line-height: 70px;
        flex: 2;
    }
    .cartDishBoxRightMinus,
    .cartDishBoxRightPlus{
        cursor: pointer;
        padding:3px 10px 3px 12px;
        display: inline-block;
        font-size: 19px;
        color: #0084FF;
       
    }
    .cartDishBoxRightMinusGray{
        color: #b1d0ed;
    }
    .cartDishBoxRightMinus i.icon,
    .cartDishBoxRightPlus i.icon{
        margin: 0;
    }
    .cartDishBoxRightNumber{
        padding: 5px 14px 5px 14px;
        background-color: #f2f2f2;
    }
    .cartDishBoxRightName{
        margin-top: 2px;
        font-weight: 600;
    }
    .cartDishBoxRightPriceZi,
    .cartDishBoxRightPrice{
        color: #ffa200;
        margin-top:10px;
        display: inline-block;
    }
    .cartDishBoxRightPrice{
        font-size: 17px;
        font-weight: 600;
    }
    .cartDishBoxRightFlavor,
    .cartDishBoxRightFlavorZi{
        display: inline-block;
        font-size: 13px;
        color:#767676;
    }
    .cartDishBox{
        padding: 5px 0 5px 50px;
    }
    .cartDishBoxes{
        max-height: 330px;
        white-space: nowrap;
        overflow-x:scroll;
    }
    .cartDishBox:hover{
        background-color: #f6f6f6;
    }
    .cartDishImg{
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
    .shopping{
        font-size: 34px;
        color: white;
        margin-top: 5px;
        margin-left: 20px;
    }
    .shoppingNumber{
        background-color: rgba(255, 29, 29, 0.981);
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 20px;
        position: relative; /* 让元素相对定位 */
        top: -24px;
        left: -13px;
        color: white;
    }
    .shoppingPrice{
        font-size: 19px;
        font-weight: 600;
    }
    .footerZi{
        margin-left: 20px;
        color: #f0f0f0
    }
    .footerButton{
        border: 1px solid white;
        background-color: #fff;
        color: #0071da;
        padding: 3px 17px 3px 17px;
        border-radius: 30px;
        float: right;
        margin-top: 15px;
        margin-right: 44px;
        font-size: 15px;
    }
    .nullBox{
        height: 200px;
        width: 100%;
    }
    

    /* 弹窗 */
    .zhezhao,
    .zhezhao1{
    position: fixed;
    left: 0px;
    top: 0px;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    }
    .tankuang,
    .tankuang1{
    position: fixed;
    top:40px;
    left:50%;
    transform:translateX(-50%);
    background: #fff;
    border-radius: 5px;
    color: black;
    }
    .tankuang{
    width: 550px;
    }
    .tankuang1{
    width: 500px;
    }
    #header{
    height: 40px;
    border-bottom: 1px solid #ccc;
    }
    #header span
    {
    line-height:40px;
    margin-left:30px;
    font-size:16px;
    color:#000;
    }
    #header-right{
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
</style>