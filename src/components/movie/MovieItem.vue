<template>
    <div class="movieItem">
        <figure>
            <img :src="poster" :alt="title"/>
        </figure>
    </div>
</template>

<script>
import getImageUrl from "@/utils/helpers/getImageUrl";
export default {
    props: {
        poster: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.movieItem {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.movieItem figure {
    display: block;
    position: relative;
    width: 100%;
    padding-bottom: 150%;
}

.movieItem img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>
