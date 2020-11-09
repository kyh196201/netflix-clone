<template>
    <div class="searchInput">
        <span class="searchInput__searchBtn">
            <font-awesome-icon icon="search" />
        </span>
        <input
            type="text"
            class="form-control searchInput__input"
            v-model="inputTitle"
            @keyup="onSearch"
            ref="inputTitle"
        />
        <a href="#" class="searchInput__closeBtn" @click.prevent="onClose">
            <font-awesome-icon icon="times" />
        </a>
    </div>
</template>

<script>
import { KEYS } from "../utils/constant.js";

export default {
    name: "SearchInput",
    data() {
        return {
            inputTitle: "",
        };
    },
    computed: {
        isBrowse() {
            return this.$route.path === "/browse";
        },
        isEmptyInput() {
            return !this.inputTitle.trim().length || !this.inputTitle;
        },
    },
    mounted() {
        this.$refs.inputTitle.focus();
    },
    methods: {
        onSearch(event) {
            const _key = event.keyCode;

            if (
                (_key === KEYS.backspace || _key === KEYS.delete) &&
                this.isEmptyInput
            ) {
                this.inputTitle = "";
                this.goBrowse();
            }

            if (_key === KEYS.enter && !this.isEmptyInput) {
                this.$router.push({
                    path: "search",
                    query: {
                        q: encodeURIComponent(this.inputTitle.trim()),
                    },
                });
            }
        },
        onClose() {
            this.$emit("close");
            this.inputTitle = "";

            if (!this.isBrowse) {
                this.goBrowse();
            }
        },
        goBrowse() {
            this.$router.push({
                path: "/browse",
            });
        },
    },
};
</script>

<style>
.searchInput {
    position: relative;
}

.searchInput svg {
    color: #fff;
}

.searchInput__searchBtn {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
}

.searchInput__searchBtn svg {
    font-size: 14px;
}

.searchInput__input {
    width: 250px;
    padding: 0 40px 0 30px;
    color: #fff;
    font-size: 16px;
    border-color: #fff;
    background-color: #000;
    letter-spacing: 1.1px;
}

.searchInput__closeBtn {
    position: absolute;
    font-size: 22px;
    top: 6px;
    right: 10px;
}
</style>
