<template>
    <div class="movieItem">
        <figure>
            <img :src="poster" :alt="title" />
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
    width: 100%;
    height: 100%;
}

.movieItem img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 260px;
    border-radius: 5px;
}
</style>
