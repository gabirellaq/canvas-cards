<template>
    <div class="allcardsbox">
        <h1>服务器上已经存在的名片集锦</h1>
        <ul class="allcards" v-if="allCards">            
            <li v-for="(item,index) in allCards" :keys="index">
                <img :src="item.url">
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import requestPromise from '@/utils/request'
    export default {
        data () {
            return {
                allCards: null
            }
        },
        methods: {
            ChooseAll() {
                requestPromise("GET", "choose", "/")
                    .then(data=> {
                        this.allCards = data.files;
                    }).catch(err => {})
            }
        },

        mounted() {
            this.ChooseAll();
        }
    }
</script>

<style lang="scss">
.allcardsbox {
    > h1 {
        text-align:center;
        margin: 20px 20px 0 20px;
        font-size: 16px;
        font-weight: bold;
    }
}
    .allcards {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        li {
            margin: 20px 10px;
            p {
                text-align:center;
                margin-top:10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
</style>