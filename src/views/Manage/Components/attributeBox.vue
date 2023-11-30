<template>
    <div class="flavorBoxVue">
        <div class="flavorBox">
            <span class="flavorDetailBox">
                <span class="flavorAttribute">
                    <div class="flavorAttributeZi">{{ attribute.attributeName }}</div>
                    <div class="editFlavorAttributeBox">
                        <span class="deleteFlavorAttribute" @click="deleteAttributeClick(flavorAttribute)"><i class="trash alternate outline icon"></i></span>
                        <span class="modifyFlavorAttribute" @click="modifyAttributeClick"><i class="edit outline icon"></i></span>
                        <span class="flavorDetailAbsoluteBox" @click="addAttributeClick"><i class="plus icon"></i></span>

                    </div>
                </span>
                <div class="flavors">
                    <div v-for="item in attribute.flavorList" :key="item">
                        <FlavorBox :flavor="item" :attribute="attribute" @clickFather="clickFather"></FlavorBox>
                    </div>
                </div>
            </span>
            <!-- 添加口味的盒子 -->
            <div class="addDishFlavorInputBox" v-if="!existFlavorButton">
                <div class="addDishFlavorInputZi">{{ addFlavorInputZi }}</div>
                <input class="addDishFlavorInput"  v-model="addDishFlavorContent" placeholder="请添加口味名"><br>
                <input class="addDishFlavorPrice" type="number" min="0" v-model="addDishFlavorPrice" placeholder="请输入口味价格"><br>
                <button class="addDishFlavorInputAddButton" @click="addDishFlavorInputAddClick">添加</button>
                <button class="addDishFlavorInputCancelButton" @click="addDishFlavorInputCancelClick">取消</button>
            </div>
            <!-- 编辑属性的盒子 -->
            <div class="editDishAttributeBox" v-if="!existAttributeButton">
                <div class="addDishFlavorInputZi">编辑属性</div>
                <input class="addDishFlavorInput"  v-model="editDishFlavorContent" placeholder="请添加属性名">
                <input type="radio" value="0" name="radioCheckbox" @click="radioCheckbox0" v-model="radioCheckboxValue" checked="true" id="editDishFlavorCheckbox0"><label for="editDishFlavorCheckbox0">单选</label>
                <input type="radio" value="1" name="radioCheckbox" @click="radioCheckbox1" v-model="radioCheckboxValue" id="editDishFlavorCheckbox1"><label for="editDishFlavorCheckbox1">多选</label><br>
                <button class="addDishFlavorInputAddButton" @click="editDishFlavorInputAddClick">修改</button>
                <button class="addDishFlavorInputCancelButton" @click="editDishFlavorInputCancelClick">取消</button>
            </div>
        </div>
    </div>
    
</template>
<script setup>
    import {onMounted, ref, defineEmits} from 'vue' 
    import { ElMessage } from 'element-plus';
    import FlavorBox from'@/views/Manage/Components/flavorBox.vue'
    import {useAttributeStore} from'@/stores/attribute.js'
    const attributeStore=useAttributeStore()
    const emit = defineEmits()
    const {attribute}= defineProps(['attribute'])
    let addFlavorInputZi=ref("")
    let flavor=ref([])
    function clickFather(params){
        flavor.value=params
        existFlavorButton.value=false
        console.log("触发了",params)
        addFlavorInputZi.value="编辑口味"
        //渲染内容
        addDishFlavorContent.value=params.flavorName
        addDishFlavorPrice.value=params.price
    }
     //点击删除属性！！！！！！！！将所有属性用ref装着，然后属性盒子重新建一个vue，循环输出，删除和修改是改变的ref中的对象
    async function deleteAttributeClick(){
        console.log(attribute)

        var result = confirm("你确定要删除"+attribute.attributeName+"吗");
        if(result){
            attributeStore.deleteAttributeOne(attribute)
            ElMessage.success("删除成功")
        }
    }   

    //点击新增口味
    let addDishFlavorPrice=ref("")
    let addDishFlavorContent=ref()
    function addDishFlavorInputAddClick(){
        console.log(addDishFlavorContent.value)
        console.log(addDishFlavorPrice.value)
        if(addDishFlavorContent.value==""||addDishFlavorPrice.value==""){
            ElMessage.error("输入不能为空")
            return
        }
        //上传口味
        if(addFlavorInputZi.value=="添加口味"){
            attributeStore.addFlavorOne(attribute,addDishFlavorContent.value,addDishFlavorPrice.value)
            ElMessage.success("添加成功")
            existFlavorButton.value=true
        }
        if(addFlavorInputZi.value=="编辑口味"){
            attributeStore.addFlavorOne(attribute,addDishFlavorContent.value,addDishFlavorPrice.value)
            ElMessage.success("修改成功")
            attributeStore.deleteFlavorOne(attribute,flavor)

            existFlavorButton.value=true
        }
    }

    //点击修改属性
    var radioCheckboxValue=ref(0)//单选框的选中的value
    function radioCheckbox0(){
        radioCheckboxValue.value=0}
    function radioCheckbox1(){
        radioCheckboxValue.value=1}
    function editDishFlavorInputAddClick(){
        console.log(editDishFlavorContent.value)
        console.log(radioCheckboxValue.value)
        if(editDishFlavorContent.value==""){
            ElMessage.error("属性名不能为空")
            return
        }
        attributeStore.modifyAttributeOne(attribute,editDishFlavorContent.value,radioCheckboxValue.value)
        ElMessage.success("属性修改成功")
        existAttributeButton.value=true
    }
    
    //添加口味盒子的出现
    let existFlavorButton=ref(true)
    let existAttributeButton=ref(true)
    function addAttributeClick(){
        addFlavorInputZi.value="添加口味"
        existFlavorButton.value=false
        existAttributeButton.value=true
        addDishFlavorPrice.value=""
        addDishFlavorContent.value=""
    }
    function addDishFlavorInputCancelClick(){
        existFlavorButton.value=true
    }
    //编辑属性盒子的出现
    let editDishFlavorContent=ref("")
    function modifyAttributeClick(){
        existAttributeButton.value=false
        existFlavorButton.value=true
        //还要渲染内容
        
        editDishFlavorContent.value=attribute.attributeName
        if(attribute.attributeName.value==1){
            radioCheckboxValue=1;
        }
        
    }
    function editDishFlavorInputCancelClick(){
        existAttributeButton.value=true
    }
</script>
<style scoped>
    .flavorAttribute{
        margin-left:0 !important;
        display: inline-block;
    }
    .flavorAttributeZi{
        padding: 2px;
    }
    .editFlavorAttributeBox{
        display: flex;
        justify-content: flex-start;
    }
    .deleteFlavorAttribute,
    .modifyFlavorAttribute,
    .flavorDetailAbsoluteBox{
        margin-left: 0 !important;
        cursor: pointer;
    }
    .flavors{
        margin-left: 10px;
    }
    .flavor{
        display: flex;
        justify-content: flex-start;
    }
    .flavorName,
    .flavorPrice,
    .flavorZi{
        display: inline-block;
        padding:2px;
    }
    .flavorName{
        margin-right: 10px;
    }
    .flavorBox{
        display: flex; 
        justify-content: space-between;  
        flex-direction: row;  
        flex-wrap: wrap;
    }
    .flavorDetailBox{
        margin-left:0 !important;
        display: flex;
        text-align: center;
        background-color: rgb(219, 236, 248);
        border-radius: 20px;
        padding: 8px;
        width: 98%;
        margin-top: 10px;
    }
    .addDishFlavorInputBox,
    .editDishAttributeBox{
        background-color: rgb(188, 204, 209);
        border-radius: 20px;
        padding-bottom: 8px;
        padding-right: 5px;
        padding-left: 5px;
        margin-top: 8px;
        width: 98%;
    }
    .addDishFlavorInputZi{
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 14px;
    }
    .addDishFlavorInput,
    .addDishFlavorPrice{
        margin-top: 5px;
        margin-bottom: 5px;
        width: 200px;
        outline: none;
        border-radius: 5px;
        padding: 2px;
        border: none;
    }
    #editDishFlavorCheckbox0{
        margin-left: 8px;
    }
    .addDishFlavorInputAddButton,
    .addDishFlavorInputCancelButton{
        width: 72px;
        border: none;
        background-color: rgb(131, 179, 206);
        color: white;
        padding-top: 3px;
        padding-bottom: 3px;
        margin-top: 10px;
        border-radius: 15px;
    }
    .addDishFlavorInputCancelButton{
        background-color: white;
        color:  rgb(131, 179, 206);
        margin-left: 20px;
    }
</style>