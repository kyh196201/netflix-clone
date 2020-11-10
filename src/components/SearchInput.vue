<template>
    <div class="searchInput">
        <span class="searchInput__searchBtn">
            <font-awesome-icon icon="search" />
        </span>
        <input
            type="text"
            class="form-control searchInput__input"
            placeholder="사람, 제목, 장르"
            :value="inputTitle"
            @keyup="onSearch"
            @blur="onBlur"
            ref="inputTitle"
        />
        <a
            href="#"
            class="searchInput__closeBtn"
            @click.prevent="onClose"
            v-if="!isEmptyInput"
        >
            <font-awesome-icon icon="times" class="closeBtn__svg" />
        </a>
    </div>
</template>

<script>
import { KEYS } from "../utils/constant.js";
import { mapMutations } from "vuex";

export default {
    name: "SearchInput",
    data() {
        return {
            inputTitle: "",
        };
    },
    computed: {
        isSearch() {
            return this.$route.path === "/search";
        },
        isEmptyInput() {
            return !this.inputTitle.trim().length || !this.inputTitle;
        },
    },
    watch: {
        $route: {
            // FIXME
            handler: function(value) {
                if (!this.isEmptyInput && !this.isSearch) {
                    this.SET_IS_SEARCHING(false);
                    this.inputTitle = "";
                }
            },
        },
    },
    mounted() {
        this.$refs.inputTitle.focus();
        setTimeout(() => {
            this.setClickOutSide();
        }, 250);
    },
    methods: {
        ...mapMutations(["SET_IS_SEARCHING"]),
        onSearch(event) {
            this.inputTitle = event.target.value;

            const _key = event.keyCode;

            if (
                (_key === KEYS.backspace || _key === KEYS.delete) &&
                this.isEmptyInput
            ) {
                this.inputTitle = "";

                this.goPrevious();
            }

            if (_key === KEYS.enter && !this.isEmptyInput) {
                this.$router.push({
                    path: "/search",
                    query: {
                        q: encodeURIComponent(this.inputTitle.trim()),
                    },
                });
            }
        },
        onBlur() {
            if (!this.isEmptyInput) {
                return;
            }

            this.SET_IS_SEARCHING(false);
            // window.removeEventListener("click", this.onClickOutSide, false);
            this.inputTitle = "";
        },
        onClose() {
            this.inputTitle = "";
            this.goPrevious();
        },
        goPrevious() {
            if (!this.isSearch) return;
            this.$router.go(-1);
        },
        setClickOutSide() {
            // window.addEventListener("click", this.onClickOutSide, false);
        },
        onClickOutSide(event) {
            // FIXME ".searchInput__closeBtn"이게 this.$el에 포함되어 있지 않다고 나옴..
            const $target = event.target;
            const $el = document.querySelector(".searchInput");

            const contained = $el.contains($target);

            console.log($el.contains($target));

            if (contained || !this.isEmptyInput) return;

            this.onBlur();
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

.closeBtn__svg {
    pointer-events: none;
}
</style>
