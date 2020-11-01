import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// main.js에서 스크립트 파일을 불러와서 아이콘을 등록한다.
import "./utils/fontawesome.js";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
