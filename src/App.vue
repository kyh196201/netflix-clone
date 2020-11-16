<template>
    <div id="app">
        <Header />
        <router-view></router-view>
        <footer>Footer</footer>
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    components: {
        Header,
    },
};
</script>

<style>
@import "./assets/css/styles.css";
</style>
