<template>
    <section class="browse">
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    created() {
        console.log("[Browse] created!!");
    },
};
</script>

<style>
.browse {
    background-color: #141414;
}
</style>
