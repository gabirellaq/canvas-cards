<template>
    <div class="canvasbox">

        <el-tabs type="border-card" :tab-position="tabPosition" @tab-click="handleClick">
            <el-tab-pane types="default">
                <span slot="label">
                    <img src="../assets/card/default.png">
                </span>
                <CanvasDefaultComponent :cards="card"></CanvasDefaultComponent>
            </el-tab-pane>
            <el-tab-pane types="yellow">
                <span slot="label">
                    <img src="../assets/card/yellow.png">
                </span>
                <CanvasYellowComponent :cards="card"></CanvasYellowComponent>
            </el-tab-pane>
            <el-tab-pane types="purple">
                <span slot="label">
                    <img src="../assets/card/purple.png">
                </span>
                <CanvasPurpleComponent :cards="card"></CanvasPurpleComponent>
            </el-tab-pane>
        </el-tabs>
        <div class="canvasBtnTeams">
            <el-button type="primary" @click="SaveCard(types)">保存名片</el-button>
            <router-link to="/allcards" class="el-button el-button--primary">查看已有名片</router-link>
        </div>
        <div class="cardsForm">
            <div class="from-item">
                <span>Your Name:</span>
                <input type="text" v-model="card.Name">
            </div>
            <div class="from-item">
                <span>Your Position:</span>
                <input type="text" v-model="card.Position">
            </div>
            <div class="from-item">
                <span>Your Company:</span>
                <input type="text" v-model="card.Company">
            </div>
            <div class="from-item">
                <span>Your Telephone:</span>
                <input type="text" v-model="card.Tel">
            </div>
            <div class="from-item">
                <span>Your Email:</span>
                <input type="text" v-model="card.Email">
            </div>
            <div class="from-item">
                <span>Your Local:</span>
                <input type="text" v-model="card.Local">
            </div>
        </div>
        <canvas id="cardCanvas" width="350" height="210"></canvas>
    </div>
</template>

<script>
    import requestPromise from '@/utils/request'
    export default {
        data() {
            return {
                tabPosition: 'bottom',
                types: 'default', //名片模板类型
                card: {
                    Name: 'Your Name',
                    Position: 'Your Position',
                    Company: 'Your Company Col.TD',
                    Tel: 'Your Telephone',
                    Email: 'Your Email',
                    Local: 'Your Local'
                }
            }
        },

        methods: {
            handleClick(tab, event) {
                this.types = tab.$attrs.types;
            },
            async SaveCard (state) {
                let c = document.getElementById('cardCanvas'),
                    type = "png",
                    filename = this.card.Name +"_"+ state +"_"+ (new Date()).getTime() +'.'+ type,
                    imgData = null;
                
                let options = {};
                    
                if(state === "default") {
                    options = {
                        bgFillStyle: '#fff',
                        name: {font:'bold 18px sans-serif', color: '#529efe', x: 30, y: 40, align: 'left', maxwidth: 290},
                        position: {font:'12px sans-serif', color: '#666', x: 30, y: 58, align: 'left', maxwidth: 290},
                        company: {font:'bold 14px sans-serif', color: '#333', x: 30, y: 105},
                        text: {align: 'left'},
                        tel: { x: 30, y: 120, w: 20, h: 20, textx: 53, texty: 135},
                        email: { x: 30, y: 145, w: 20, h: 20, textx: 53, texty: 160},
                        local: { x: 30, y: 170, w: 20, h: 20, textx: 53, texty: 185},
                        logo: { x: 210, y: 39, w: 114, h: 24},
                    }                                                       
                }
                if(state === "yellow") {
                    options = {
                        bgFillStyle: '#F6C15B',
                        name: {font:'bold 18px sans-serif', color: '#fff', x: 30, y: 40,align: 'left', maxwidth: 290},
                        position: {font:'12px sans-serif', color: '#a76e00', x: 30, y: 58,align: 'left', maxwidth: 290},
                        company: {font:'bold 14px sans-serif', color: '#af7008', x: 30, y: 105},
                        text: {align: 'left'},
                        tel: { x: 30, y: 120, w: 20, h: 20, textx: 53, texty: 135},
                        email: { x: 30, y: 145, w: 20, h: 20, textx: 53, texty: 160},
                        local: { x: 30, y: 170, w: 20, h: 20, textx: 53, texty: 185},
                        logo: { x: 210, y: 39, w: 114, h: 24},
                    }                                    
                }
                if(state === "purple") {
                    options = {
                        bgFillStyle: '#7650e9',
                        name: {font:'bold 18px sans-serif', color: '#fff', x: 320, y: 40,align: 'right', maxwidth: 290},
                        position: {font:'12px sans-serif', color: '#bba4ff', x: 320, y: 58,align: 'right', maxwidth: 290},
                        company: {font:'bold 14px sans-serif', color: '#3b387d', x: 30, y: 105},
                        text: {align: 'left'},
                        tel: { x: 30, y: 120, w: 20, h: 20, textx: 53, texty: 135},
                        email: { x: 30, y: 145, w: 20, h: 20, textx: 53, texty: 160},
                        local: { x: 30, y: 170, w: 20, h: 20, textx: 53, texty: 185},
                        logo: { x: 30, y: 39, w: 114, h: 24},
                    }
                                                         
                }

                await this.canvasCtx(state, options).then(data => {
                    imgData = data;
                })


                //save server
                this.savePicToServe(imgData, filename);
            },

            saveFile (data, filename){
                let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                    save_link.href = data;
                    save_link.download = filename;
            
                let event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    save_link.dispatchEvent(event);
            },

            drawPic (state)  {
                
            },
            canvasCtx(state, options) {
                return new Promise((resolve, reject) => {
                    let c = document.getElementById('cardCanvas'),
                        ctx = c.getContext('2d'),
                        images = [],
                        imgs = ['telephone','email','local','logo'],
                        flag = 0;

                    ctx.fillStyle = options.bgFillStyle; 
                    ctx.fillRect(0, 0, 350, 210);                                 

                    ctx.font = options.name.font;
                    ctx.fillStyle = options.name.color;
                    ctx.textAlign = options.name.align;
                    ctx.fillText(this.card.Name, options.name.x, options.name.y, options.name.maxwidth);

                    ctx.font = options.company.font;
                    ctx.fillStyle = options.company.color;
                    ctx.textAlign = options.text.align;
                    ctx.fillText(this.card.Company, options.company.x, options.company.y);

                    ctx.font = options.position.font;
                    ctx.fillStyle = options.position.color;
                    ctx.textAlign = options.position.align;
                    ctx.fillText(this.card.Position, options.position.x, options.position.y);
                    ctx.textAlign = options.text.align;
                    ctx.fillText(this.card.Tel, options.tel.textx, options.tel.texty);
                    ctx.fillText(this.card.Email, options.email.textx, options.email.texty);
                    ctx.fillText(this.card.Local, options.local.textx, options.local.texty);

                    for (let i =0; i< imgs.length; i++){
                        images[i] = new Image();
                        images[i].src = "./static/images/"+state+"/"+imgs[i]+".png";
                        images[i].onload = function (e) {
                            ctx.drawImage(images[0], options.tel.x, options.tel.y, options.tel.w, options.tel.h);
                            ctx.drawImage(images[1], options.email.x, options.email.y, options.email.w, options.email.h);
                            ctx.drawImage(images[2], options.local.x, options.local.y, options.local.w, options.local.h);
                            ctx.drawImage(images[3], options.logo.x, options.logo.y, options.logo.w, options.logo.h);
                            flag = flag + 1;
                            if(flag === imgs.length) {
                                resolve(c.toDataURL("image/png"))
                            }                    
                        }
                    }  
                })
            },
            savePicToServe (url, filename) {
                requestPromise("GET", "upload", "/upload", 
                        {
                            "imgData": url,
                            "fileName": filename
                        }
                    )
                    .then(data=> {
                        console.log("保存成功")
                    }).catch(err => {})

            },
            sleep (ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/canvas.scss";
    .canvasbox {
        .el-tabs {
            box-shadow: none;
            border:0;
        }
        .el-tabs__content {
            background: #f9f9f9;
            padding:20px;
        }
        .el-tabs__header {
            background: #f9f9f9;
            border:0 !important;
            margin:0 !important;
        }
        .el-tabs__item {
            height:128px;
            padding:0 !important;
            overflow:hidden;
            border:0 !important;
            background:none !important;
            span {
                display:inline-block;
                margin: 20px 10px;
            }
            img {
                width:140px;
            }
        }
            
    }
</style>