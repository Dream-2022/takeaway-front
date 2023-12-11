<template>
    <div class="productDetailBox2">
        <!-- <div class="dishTitle2">商品评价</div> -->
        <div class="dishCommentBigBoxes">
            <div class="dishCommentBox">
                <div class="flexBox">
                    <div class="commentPart1">
                        <img src="http://localhost:8080/upload/848bbd1984648ad2ed141476dc67f4fa.jpeg" class="commentPicture">
                    </div>
                    <div class="commentPart2">
                        <div class="dishCommentNickname">李小慧</div>
                        <div class="dishCommentTime">2022-4-5-12:48:52</div>
                    </div>
                </div>
                <div class="dishCommentContent">#古茗奶茶 好喝</div>
            </div>
            <div class="dishCommentBox">
                <div class="flexBox">
                    <div class="commentPart1">
                        <img src="http://localhost:8080/upload/848bbd1984648ad2ed141476dc67f4fa.jpeg" class="commentPicture">
                    </div>
                    <div class="commentPart2">
                        <div class="dishCommentNickname">李小慧</div>
                        <div class="dishCommentTime">2022-4-5-12:48:52</div>
                    </div>
                </div>
                <div class="dishCommentContent">#古茗奶茶 好喝</div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
    .productDetailBox2{
        width: 850px;
        border-radius: 30px;
        padding: 0 25px 25px 25px ;
        margin:0 auto;
    }
    .commentPicture{

        width: 60px;
        height: 60px;
        border-radius: 50px;
    }
    .dishCommentBox{
        padding-left: 10px;
        padding-bottom: 20px;
    }
    .dishCommentBox:hover{
        border-radius: 10px;;
        background-color: #fcfcfc;
        transition: border-bottom 1s ease;
    }
    .flexBox{
        height: 88px;
        display: flex;
    }
    .commentPart1{
        line-height: 100px;
        flex:1;
        text-align: center;
    }
    .commentPart2{
        margin-top: 22px;
        flex:7;
        line-height: 30px;
    }
    .dishCommentNickname{
        font-size: 14px;
    }
    .dishCommentTime{
        color:#7a7979;
    }
    .dishCommentContent{
        margin-left: 100px;
        font-size: 16px;
    }
</style>