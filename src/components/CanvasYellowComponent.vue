<template>

    <div class="cards">
        <div class="card card-yellow">                
            <h1>{{cards.Name}}</h1>
            <p class="position">{{cards.Position}}</p>
            <h2>{{cards.Company}}</h2>
            <p class="tel">
                <i class="iconfont icon-lianxishangjia"></i>
                <span>{{cards.Tel}}</span>
            </p>
            <p class="email">
                <i class="iconfont icon-email"></i>
                <span>{{cards.Email}}</span>
            </p>
            <p class="local">
                <i class="iconfont icon-local"></i>
                <span>{{cards.Local}}</span>
            </p>
            <h3 class="logo">
                <i class="iconfont icon-logo"></i>
            </h3>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['cards']
            
    }
</script>

<style lang="scss" Scoped>
    @import "../assets/scss/canvas.scss";
</style>