import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faSearch,
    faGift,
    faBell,
    faCaretDown,
    faPlay,
    faInfoCircle,
    faTimes,
    faPlus,
    faThumbsUp,
    faThumbsDown,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
    faTrashAlt,
    faThumbsUp as faThumbsUpSolid,
    faThumbsDown as faThumbsDownSolid,
} from "@fortawesome/free-regular-svg-icons";

library.add(
    faTrashAlt,
    faGift,
    faBell,
    faCaretDown,
    faPlay,
    faInfoCircle,
    faTimes,
    faPlus,
    faThumbsUp,
    faThumbsDown,
    faThumbsUpSolid,
    faThumbsDownSolid,
    faCheck
);
library.add(faSearch);

Vue.component("font-awesome-icon", FontAwesomeIcon);
