<template>
    <div>
        <el-button type="primary" @click="card">保存名片</el-button>
        <p><canvas id="canvas" width="1024" height="1024"></canvas></p>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                
            }
        },

        methods: {
            card () {
                let img = [],
                    canvas = document.getElementById("canvas"),
                    ctx = canvas.getContext("2d"),
                    src = "./static/images/test.png",
                    flag = 0,
                    imgLength = 4;
                //img.crossOrigin = "Anonymous";
                for(let i=0; i < imgLength;i++){                    
                    img[i] = new Image;
                    img[i].onload = function() {
                        ctx.drawImage( img[i], 0, 0+210*i, 350, 210 );
                        console.log(i);
                        flag = flag + 1;
                        console.log("d",flag);
                        if(flag === imgLength) {
                            console.log(canvas.toDataURL("image/png"));
                        }
                    }                      
                    img[i].src = src;
                }
            }
        }
    }
</script>

<style lang="scss">
    
</style>