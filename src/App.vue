<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
    components: {
        Home,
    },
};
</script>

<style>
@import "./assets/css/styles.css";
</style>
