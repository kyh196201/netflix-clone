<template>
    <div>
        <div class="detailView__header" slot="header">
            <div class="detailView__bg-wrapper">
                <div class="detailView__bg skeleton"></div>
            </div>
        </div>
        <div class="detailView__content" slot="body">
            <div class="detailView__overview-wrapper skeleton">
                <div class="detailView__overview">
                    <div class="detailView__overview__top">
                        <span class="skeleton-bar"></span>
                        <span class="skeleton-bar"></span>
                        <span class="skeleton-bar"></span>
                        <span class="skeleton-bar"></span>
                    </div>
                    <p class="synopsis skeleton"></p>
                </div>
            </div>
            <div class="detailView__info-wrapper skeleton">
                <ul class="detailView__info skeleton">
                    <li class="skeleton-list-item">
                        <div class="skeleton-circle"></div>
                        <div class="skeleton-bar"></div>
                    </li>
                    <li class="skeleton-list-item">
                        <div class="skeleton-circle"></div>
                        <div class="skeleton-bar"></div>
                    </li>
                    <li class="skeleton-list-item">
                        <div class="skeleton-circle"></div>
                        <div class="skeleton-bar"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="detailView__footer" slot="footer"></div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* skeletons */
.detailView__bg.skeleton {
    background: linear-gradient(to top, #181818, transparent 50%);
    background-color: #000;
}

.detailView__overview-wrapper.skeleton {
    flex: 1 1 70%;
}

.detailView__info-wrapper.skeleton {
    flex: 1 1 30%;
}

.detailView__overview__top .skeleton-bar {
    width: 25%;
}

.detailView__overview__top .skeleton-bar:last-child {
    margin: 0;
}

.detailView__info .skeleton-bar {
    width: 100%;
}

.synopsis.skeleton {
    width: 100%;
    height: 1.25rem;
    background-color: var(--skeleton-color);
}
</style>
