<template>
    <div class="home">
        <nav-bar></nav-bar>
        <main></main>
        <footer></footer>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";

export default {
    name: "Home",
    components: {
        "nav-bar": Navbar,
    },
};
</script>

<style>
.home {
    position: relative;
}
</style>
