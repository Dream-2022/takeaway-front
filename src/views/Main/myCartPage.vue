<template>
    <!-- 购物车页面 -->
    <div class="cartBigBox">
        <div class="MyCartBox">
            <div class="cartBoxTitle">购物车</div>
            <div class="cartShops">
                <div class="cartShop" v-for="(cart,cartIndex) in myCartAllStore.myCartList" :key="cartIndex">
                    <div class="cartShopNameBox">
                        <input type="checkbox" class="cartShopNameRadio1" v-model="checkboxRowValue[cartIndex]" @click="selectShopClick(cartIndex)">
                        <span class="cartShopName">{{ cart.shopName }}</span>
                        <span class="rightBox" @click="rightBoxClick"><i class="trash alternate icon>"></i>一键清空</span>
                    </div>
                    <div class="cartShopDishes">
                        <div class="cartShopDish" v-for="(item,index) in cart.dishIdList" :key="index">
                            <div class="cartShopDishTop">
                                <input type="checkbox" class="cartShopNameRadio2"
                                    v-if="(checkboxValue.length==undefined&&checkboxRowValue[cartIndex].length)?false:true" 
                                    v-model="checkboxValue[cartIndex][index]" 
                                    @click="selectDishClick(index,cartIndex,item,cart)">
                            </div>
                            <div class="cartShopDishLeft"><img :src="item.picture" class="cartShopDishImg"></div>
                            <div class="cartShopDishMight">
                                <div class="cartShopDishName">{{ item.dishName }}</div>
                                <div class="cartShopDishFlavorZi">{{ item.flavorListZi }}</div>
                                <div class="cartShopDishPriceBox">
                                    <span class="cartShopDishPriceZi">￥</span>
                                    <span class="cartShopDishPrice">{{ item.price }}</span>
                                </div>
                            </div>
                            <div class="cartShopDishRight">
                                <span class="cartShopDishRightMinus" @click="cartShopDishRightPlusClick(index,cartIndex,cart,item,-1)"><i class="minus icon"></i></span>
                                <span class="cartShopDishRightNumber">{{ item.quantity }}</span>
                                <span class="cartShopDishRightPlus" @click="cartShopDishRightPlusClick(index,cartIndex,cart,item,1)"><i class="plus icon"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="myCartAllStore.myCartList.length==0" class="myCartNoneBox">
                <i class="sticky note outline icon"></i>暂无商品
            </div>
            <div class="footerBox">
                <span><i class="shopping cart icon"></i></span>
                <span class="shoppingNumber">{{ mySelectCartStore.mySelectCart[0]==undefined?0:mySelectCartStore.mySelectCart[0].dishIdList.length }}</span>

                <span>￥</span><span class="shoppingPrice">{{ mySelectCartStore.mySelectPrice }}</span>
                <span class="footerZi">包含打包费￥</span><span>{{ mySelectCartStore.mySelectPack }}</span>
                <span class="footerZi">另需配送费约￥</span><span>{{ mySelectCartStore.mySelectDelivery }}</span>
                <button class="footerButton" @click="footerButtonClick">结算</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onBeforeMount, onMounted, ref} from 'vue' 
    import {useCartStore} from'@/stores/cartStore.js'
    import {useMyCartAllStore} from'@/stores/myCartAllStore.js'
    import {useMySelectCartStore} from'@/stores/mySelectCartStore.js'
    import {selectCartAll, deleteAllCartByUserId} from '@/apis/cartApi.js'
    import { useRoute, useRouter } from 'vue-router';

    const router = useRouter();
    import { ElMessage } from 'element-plus';
    const cartStore=useCartStore()
    const myCartAllStore=useMyCartAllStore()
    const mySelectCartStore=useMySelectCartStore()
    //存储复选框的选中状态
    let checkboxValue=ref([[]])
    let checkboxRowValue=ref([])
    onBeforeMount(async()=>{
        //通过userId获取他的全部购物车
        const apiData={
            userId: localStorage.getItem("id")
        }
        const res=await selectCartAll(apiData)
            console.log(res.data.data)
            console.log(myCartAllStore.myCartList)
            myCartAllStore.myCartList=res.data.data
            console.log(myCartAllStore.myCartList)
            for(let i=0;i<myCartAllStore.myCartList.length;i++){
                const dishIdListValue=JSON.parse(myCartAllStore.myCartList[i].detailJson)
                console.log(dishIdListValue)
                console.log(dishIdListValue[0].dishIdList)
                myCartAllStore.myCartList[i].dishIdList=dishIdListValue[0].dishIdList
                console.log(myCartAllStore.myCartList)
            }
            console.log(myCartAllStore.myCartList)
            // console.log(myCartAllStore.getMyCartList())
            myCartAllStore.myCartList=JSON.parse(JSON.stringify(myCartAllStore.myCartList))
            console.log(myCartAllStore.myCartList)
            // console.log(myCartAllStore.myCartList[1].dishIdList)
            console.log(myCartAllStore.myCartList.length)

            checkboxRowValue.value=myCartAllStore.myCartList.map(item=>{
                return false
            })

            console.log(myCartAllStore.myCartList)
            checkboxValue.value=myCartAllStore.myCartList.map(item=>{
            return [
                    ...item.dishIdList.map(item=>{
                        return false
                    })
                ]
            })

            console.log(checkboxRowValue.value)
            console.log(checkboxValue.value)
            console.log(checkboxValue.value.length)
    })
    onMounted(async()=>{
        
            //请购物车中的选中清空
            console.log(mySelectCartStore.mySelectCart)
            console.log(mySelectCartStore.mySelectCart.value)
            console.log(myCartAllStore.getMyCartList.value)
            mySelectCartStore.mySelectCart=[]
            console.log(mySelectCartStore.mySelectCart.length)

            //将价格全部清零
            console.log(mySelectCartStore.mySelectPack)
            mySelectCartStore.mySelectPack=0
            mySelectCartStore.mySelectPrice=0
            mySelectCartStore.mySelectDelivery=0
    })

    //点击结算-------------------------------------------------!
    function footerButtonClick(){
        console.log("点击")
        if(mySelectCartStore.mySelectCart[0]==undefined){
            ElMessage.warning("未选中商品")
            return
        }
        console.log(myCartAllStore.myCartList)
        //将没有对应于mySelectCart中的dish和cart删除，然后将myCartAllList发到后端
        for(let i=0;i<myCartAllStore.myCartList.length;i++){
            console.log(myCartAllStore.myCartList[i])
            console.log(myCartAllStore.myCartList[i].dishIdList)
            for(let j=0;j<myCartAllStore.myCartList[i].dishIdList.length;j++){
                const dishX=myCartAllStore.myCartList[i].dishIdList[j]
                console.log(dishX)
                let flag=mySelectCartStore.mySelectCart[0].dishIdList.length
                for(let k=0;k<mySelectCartStore.mySelectCart[0].dishIdList.length&&mySelectCartStore.mySelectCart[0].dishIdList!=undefined;k++){
                    const dishY=mySelectCartStore.mySelectCart[0].dishIdList[k]
                    console.log(dishY)
                    if(JSON.stringify(dishY)==JSON.stringify(dishX)){
                        //说明两者相同，已经加入购物车了
                        console.log("说明两者相同，已经加入购物车了")
                    }
                    else{
                        flag=flag-1
                    }
                }
                if(flag==0){
                    //说明两者不同，未加入购物车
                    console.log("说明两者不同，未加入购物车")
                    //然后判断是否该cart长度为1，此时移除cart，不是1，此时移除dish
                    if(myCartAllStore.myCartList[i].dishIdList.length==1){
                        console.log("此时移除cart")
                        myCartAllStore.myCartList.splice(i,1)
                        i--;
                        break;
                    }else{
                        console.log("此时移除dish")
                        myCartAllStore.myCartList[i].dishIdList.splice(j,1)
                    }
                }
            }
        }
        //跳转页面
        console.log(mySelectCartStore.mySelectCart)
        console.log(myCartAllStore.myCartList)
        localStorage.setItem("orderShopList",JSON.stringify(myCartAllStore.myCartList))
        //跳转页面
        router.push('/OrderPage') 
    }

    //点击选中商品
    function selectDishClick(index,cartIndex,dishX,cartX){
        console.log(index)
        console.log(cartIndex)
        console.log(mySelectCartStore.mySelectCart)
        console.log(checkboxValue.value)
        console.log(checkboxValue.value[cartIndex][index])
        console.log(checkboxValue.value[cartIndex][index]===false)
        if(checkboxValue.value[cartIndex][index]===false){
            console.log("value为false")
            checkboxValue.value[cartIndex][index]=true
            console.log(checkboxValue.value[cartIndex][index])
            //加入选中的购物车
            console.log(cartX.id)
            const dishJson=JSON.parse(JSON.stringify(dishX))
            console.log(dishJson)
            console.log(myCartAllStore.myCartList)
            if(mySelectCartStore.mySelectCart.length==0){
                const selectCart={
                    userId:localStorage.getItem("id"),
                    shopId: myCartAllStore.myCartList[0].shopId,
                    dishIdList:[dishJson]
                }
                console.log(cartX)
                mySelectCartStore.mySelectCart.push(selectCart)
            }else{
                console.log(mySelectCartStore.mySelectCart)
                console.log(mySelectCartStore.mySelectCart[0].dishIdList)
                mySelectCartStore.mySelectCart[0].dishIdList.push(dishJson)
            }
            console.log(mySelectCartStore.mySelectCart)
        }
        else{
            console.log("value为true")
            checkboxValue.value[cartIndex][index]=false
            //删除选中的dishIdList中的东西
            const dishJson=JSON.parse(JSON.stringify(dishX))
            console.log(dishJson)
            let ans=-1
            for(let i=0;i<mySelectCartStore.mySelectCart[0].dishIdList.length;i++){
                console.log(dishJson==mySelectCartStore.mySelectCart[0].dishIdList[i])
                console.log(mySelectCartStore.mySelectCart[0].dishIdList[i])
                if(dishJson==mySelectCartStore.mySelectCart[0].dishIdList[i]){
                    ans=i;
                }
            }
            if(ans!=-1){
                console.log("找到要删除的元素了")
                mySelectCartStore.mySelectCart[0].dishIdList.splice(ans,1)
            }
        }
        console.log(mySelectCartStore.mySelectCart)
        console.log(mySelectCartStore.mySelectCart[0])
        console.log(mySelectCartStore.mySelectCart[0].dishIdList)
        console.log(mySelectCartStore.mySelectCart[0].dishIdList.length)
        console.log(checkboxValue.value)

        //判断在这个商家里面是不是全选了所有商品
        let flag=true;
        for(let i=0;i<myCartAllStore.myCartList[cartIndex].dishIdList.length;i++){
            const dishX=myCartAllStore.myCartList[cartIndex].dishIdList[i]
            console.log(dishX)
            console.log(checkboxValue.value[cartIndex][i])
            if(checkboxValue.value[cartIndex][i]==false){
                flag=false;
                break;
            }
        }
        if(flag){
            console.log(flag)
            checkboxRowValue.value[cartIndex]=true
        }else{
            checkboxRowValue.value[cartIndex]=false
        }
        console.log(checkboxRowValue.value)
        //计算价格
        mySelectCartStore.getMyCartAllPrice()
    }

    //点击选中商家
    function selectShopClick(cartIndex){
        //要考虑已经全选的情况了
        let flag=false
        if(checkboxRowValue.value[cartIndex]){
            checkboxRowValue.value[cartIndex]=false
            flag=false
        }else{
            checkboxRowValue.value[cartIndex]=true
            flag=true
        }
        for(let i=0;i<myCartAllStore.myCartList[cartIndex].dishIdList.length;i++){
            const dishX=myCartAllStore.myCartList[cartIndex].dishIdList[i]
            console.log(dishX)
            console.log(checkboxValue.value[cartIndex][i])
            if(checkboxValue.value[cartIndex][i]!=flag&&checkboxValue.value[cartIndex][i]){
                checkboxValue.value[cartIndex][i]=flag
                //说明要从mySelectCartList中移除这个
                console.log(dishX)
                for(let j=0;j<mySelectCartStore.mySelectCart[0].dishIdList.length;i++){
                    const dishY=mySelectCartStore.mySelectCart[0].dishIdList[j]
                    console.log(dishY)
                    if(JSON.stringify(dishY)==JSON.stringify(dishX)){
                        mySelectCartStore.mySelectCart[0].dishIdList.splice(j,1)
                    }
                }
            }
            if(checkboxValue.value[cartIndex][i]!=flag&&checkboxValue.value[cartIndex][i]==false){
                checkboxValue.value[cartIndex][i]=flag
                console.log(dishX)
                const dishJson=JSON.parse(JSON.stringify(dishX))
                //说明要从mySelectCartList中加入这个
                if(mySelectCartStore.mySelectCart.length==0){
                    const selectCart={
                        userId:localStorage.getItem("id"),
                        shopId: myCartAllStore.myCartList[0].shopId,
                        dishIdList:[dishJson]
                    }
                    mySelectCartStore.mySelectCart.push(selectCart)
                }else{
                    console.log(mySelectCartStore.mySelectCart)
                    console.log(mySelectCartStore.mySelectCart[0].dishIdList)
                    mySelectCartStore.mySelectCart[0].dishIdList.push(dishJson)
                }
                console.log(mySelectCartStore.mySelectCart)
                // console.log(mySelectCartStore.mySelectCart[0])
                // if(mySelectCartStore.mySelectCart[0]==undefined){
                //     mySelectCartStore.mySelectCart[0].dishIdList=[]
                // }
                // console.log(mySelectCartStore.mySelectCart[0].dishIdList)
                // mySelectCartStore.mySelectCart[0].dishIdList.push(dishX)
            }
        }
        //计算价格
        mySelectCartStore.getMyCartAllPrice()
    }

    //数量加1或减1
    async function cartShopDishRightPlusClick(index,cartIndex,cartX,dishX,minsNum){
        console.log(checkboxValue.value[cartIndex][index])
        //如果处于未选中状态，就先选中
        if(checkboxValue.value[cartIndex][index]==false){
            checkboxValue.value[cartIndex][index]==true
            console.log("该商品正在被选择")
            console.log("value为false")
            checkboxValue.value[cartIndex][index]=true
            console.log(checkboxValue.value[cartIndex][index])
            //加入选中的购物车
            console.log(cartX.id)
            const dishJson=JSON.parse(JSON.stringify(dishX))
            console.log(dishJson)
            console.log(myCartAllStore.myCartList)
            if(mySelectCartStore.mySelectCart.length==0){
                const selectCart={
                    userId:localStorage.getItem("id"),
                    shopId: myCartAllStore.myCartList[0].shopId,
                    dishIdList:[dishJson]
                }
                console.log(cartX)
                mySelectCartStore.mySelectCart.push(selectCart)
            }else{
                console.log(mySelectCartStore.mySelectCart)
                console.log(mySelectCartStore.mySelectCart[0].dishIdList)
                mySelectCartStore.mySelectCart[0].dishIdList.push(dishJson)
            }
            console.log(mySelectCartStore.mySelectCart)
        }
      
        //先将对应于数据库的内容要改变，myCartAllStore里面的数量增加
        console.log(index)
        console.log(cartIndex)
        console.log(myCartAllStore.myCartList)
        console.log(mySelectCartStore.mySelectCart)
        // console.log(mySelectCartStore.mySelectCart[cartIndex])
        // console.log(mySelectCartStore.mySelectCart[cartIndex].dishIdList)
        //判断减1之后数量是否为0
        //还要考虑删除的情况,而不只是改变数量quantity
        for(let i=0;i<mySelectCartStore.mySelectCart.length;i++){
            console.log(mySelectCartStore.mySelectCart[i])
            console.log(cartX)
            console.log("满足")
            for(let j=0;j<mySelectCartStore.mySelectCart[i].dishIdList.length;j++){
                console.log(dishX)
                console.log(mySelectCartStore.mySelectCart[i].dishIdList[j])
                if(JSON.stringify(mySelectCartStore.mySelectCart[i].dishIdList[j])==JSON.stringify(dishX)){
                    console.log("进入")
                    if(mySelectCartStore.mySelectCart[i].dishIdList[j].quantity==1&&minsNum==-1){
                        minsNum=0//判断是否要更改myCartAllStore中的quantity数据（如果都删了，quantity就不用自减了）
                        console.log("cart中的dish减到0")
                        
                        console.log(checkboxValue.value)
                        //接下来还要把mySelectCartStore中的选择更改，因为删除地方后面的数据移动了
                        for(let k=index;k<myCartAllStore.myCartList[cartIndex].dishIdList.length-1;k++){
                            console.log(cartIndex+","+k+","+checkboxValue.value[cartIndex][k])
                            console.log(cartIndex+","+k+1+","+checkboxValue.value[cartIndex][k+1])
                            checkboxValue.value[cartIndex][k]=checkboxValue.value[cartIndex][k+1]
                            console.log(checkboxValue.value[cartIndex][k])
                        }
                        mySelectCartStore.mySelectCart[i].dishIdList.splice(j,1)
                        myCartAllStore.myCartList[cartIndex].dishIdList.splice(index,1)
                        console.log(checkboxValue.value)
                    }else{
                        mySelectCartStore.mySelectCart[i].dishIdList[j].quantity=mySelectCartStore.mySelectCart[i].dishIdList[j].quantity+minsNum
                    }
                    console.log(mySelectCartStore.mySelectCart[i])
                    console.log(mySelectCartStore.mySelectCart)
                }
            }
            
        }
            
        console.log(mySelectCartStore.mySelectCart)
        // console.log(mySelectCartStore.mySelectCart[cartIndex].dishIdList[index])
        // console.log(mySelectCartStore.mySelectCart[cartIndex].dishIdList[index].quantity)
        // mySelectCartStore.mySelectCart[cartIndex].dishIdList[index].quantity=1+mySelectCartStore.mySelectCart[index].dishIdList[cartIndex].quantity
        //更改数据库
        myCartAllStore.addCartOne(cartIndex,index,cartX,minsNum)
        //计算价格
        mySelectCartStore.getMyCartAllPrice()
    }

    //点击一键清空购物车，也就是将userId对应的cart全部删除
    async function rightBoxClick(){
        //是否确认删除
        let result = window.confirm("确认删除购物车的全部商品吗?");
        if(result){
            const apiData={
                userId: localStorage.getItem("id")
            }
            const res=await deleteAllCartByUserId(apiData)
                console.log(res.data.data)
                ElMessage.success("已删除成功")
        }
       
    }
</script>
<style scoped>
    .cartBigBox{
        width: 100%;
        min-height: 700px;
        background-color: rgb(243, 247, 248);
        padding-top: 110px;
        padding-bottom: 80px;
    }
    .MyCartBox{
        width: 800px;
        margin: 0 auto;
        background-color: #fff;
    }
    .myCartNoneBox{
        font-size: 20px;
        margin-top: 100px;
        margin-bottom: 130px;
        margin-left: 50px;
    }
    .footerBox{
        position: sticky;
        z-index: 1; 
        bottom: 0;
        width: 100%;
        height: 63px;
        background-color: #0084ff;
        color: #fff;
    }
    .cartBoxTitle{
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1.5px solid #ccc;
    }
    .cartShops{
        padding: 20px 45px 10px 45px;
    }
    .cartShop{
        border-bottom: 1px solid #ccc;
        margin-bottom: 19px;
    }
    .rightBox{
        color: black;
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }
    .cartShopNameRadio1,
    .cartShopNameRadio2{
        margin-left: 5px;
        margin-right: 5px;
    }
    .cartShopDish{
        padding-top: 10px;
        display: flex;
    }
    .cartShopDishTop{
        line-height: 100px;
        margin-right: 5px;
    }
    .cartShopDishLeft{
        flex: 1;
    }
    .cartShopDishMight{
        flex: 4;
    }
    .cartShopDishRight{
        flex: 1;
        line-height: 100px;
    }
    .cartShopDishImg{
        width: 100px;
        height: 100px;
        border-radius: 10px;
        cursor: pointer;
    }
    .cartShopDishName{
        font-size: 16px;
        margin-top: 5px;
        margin-block: 3px;
        cursor: pointer;
    }
    .cartShopDishPriceZi{
        font-size: 15px;
        color: #ffa200;
        cursor: pointer;
    }
    .cartShopDishFlavorZi{
        margin-bottom: 10px;
    }
    .cartShopDishPrice{
        font-size: 18px;
        font-weight: 600;
        color: #ffa200;
    }
    .cartShopDishRightMinus,
    .cartShopDishRightPlus{
        cursor: pointer;
        padding:3px 10px 3px 12px;
        display: inline-block;
        font-size: 14px;
    }
    .cartShopDishRightMinusGray{
        color: #ccc;
    }
    .cartShopDishRightMinus i.icon,
    .cartShopDishRightPlus i.icon{
        margin: 0;
    }
    .cartShopDishRightNumber{
        padding: 5px 14px 5px 14px;
        background-color: #f2f2f2;
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
        margin-top: 17px;
        margin-right: 44px;
        font-size: 15px;
    }
    .shopping{
        font-size: 34px;
        margin-top: 6px;
        margin-left: 20px;
    }
    .nullBox{
        height: 200px;
        width: 100%;
    }
</style>