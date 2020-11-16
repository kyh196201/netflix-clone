<template>
    <div class="searchInput">
        <span class="searchInput__searchBtn">
            <font-awesome-icon icon="search" />
        </span>
        <input
            type="text"
            class="form-control searchInput__input"
            placeholder="사람, 제목, 장르"
            :value="keyword"
            @input="keyword = $event.target.value"
            @keyup="onKeyup"
            @blur="onBlur"
            ref="keyword"
        />
        <a
            href="#"
            class="searchInput__closeBtn"
            @click.prevent="onClose"
            v-if="isKeyword"
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
            keyword: "",
        };
    },
    computed: {
        isSearchPage() {
            return this.$route.path === "/search";
        },
        isKeyword() {
            return !!this.keyword.trim().length;
        },
    },
    mounted() {
        this.$refs.keyword.focus();
        this.setClickOutSide();
    },
    methods: {
        ...mapMutations(["SET_IS_SEARCHING", "SET_LAST_KEYWORD"]),
        async onKeyup(event) {
            const _key = event.keyCode;

            if (
                (_key === KEYS.backspace || _key === KEYS.delete) &&
                !this.keyword.length
            ) {
                this.keyword = "";
                this.goPrevious();
            }

            if (_key === KEYS.enter) {
                this.keyword = this.keyword.trim();

                if (!this.keyword.length) return;

                try {
                    // this.SET_LAST_KEYWORD(this.keyword);

                    const routerData = {
                        path: "/search",
                        query: {
                            q: encodeURIComponent(this.keyword),
                        },
                    };

                    // if path is "search"
                    if (this.isSearchPage) {
                        this.$router.replace(routerData);
                    } else {
                        // if path is not "search"
                        this.$router.push(routerData);
                    }
                } catch (err) {
                    console.error(err);
                    alert("다시 검색해주세요!");
                    this.$refs.keyword.focus();
                }
            }
        },
        onBlur() {
            if (this.isKeyword) {
                return;
            }

            this.SET_IS_SEARCHING(false);
            this.keyword = "";
            // window.removeEventListener("click", this.onClickOutSide, false);
        },
        onClose() {
            this.keyword = "";
            this.goPrevious();
        },
        goPrevious() {
            if (!this.isSearchPage) return;
            this.$router.push("/browse");
        },
        setClickOutSide() {
            window.addEventListener("click", this.onClickOutSide, false);
        },
        onClickOutSide(event) {
            // FIXME ".searchInput__closeBtn"이게 this.$el에 포함되어 있지 않다고 나옴..
            const $target = event.target;

            if (
                $target.classList.contains("navLink") ||
                $target.classList.contains("home__nav__logo")
            ) {
                this.keyword = "";
                this.SET_IS_SEARCHING(false);
            }
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
    line-height: 1;
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
    line-height: 1;
}

.closeBtn__svg {
    pointer-events: none;
}
</style>
