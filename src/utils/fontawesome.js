import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faSearch,
    faGift,
    faBell,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

library.add(faTrashAlt, faGift, faBell, faCaretDown);
library.add(faSearch);

Vue.component("font-awesome-icon", FontAwesomeIcon);