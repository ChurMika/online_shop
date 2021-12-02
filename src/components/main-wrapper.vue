<template>
    <div class="main-wrapper">
    <keep-alive>
            <router-view></router-view>
    </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'main-wrapper',
        props: {},
        data() {
            return {}
        },
        computed: {},
        methods: {},
        watch: {}
    }
</script>

<style>
    .main-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 900px;
        margin: 0 auto;
    }
</style>
