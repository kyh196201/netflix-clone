<template>
    <section class="loadingPage">
        <div class="loadingPage__title">Loading Page</div>
        <ul class="loadingPage__list">
            <li class="loadingPage__list__item"></li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "LoadingPage",
};
</script>

<style>
.loadingPage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 130px 30px 0;
    background-color: powderblue;
    z-index: 10;
}

.loadingPage__title {
    font-size: 0;
}
</style>
