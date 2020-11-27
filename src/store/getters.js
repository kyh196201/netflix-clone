export default {
    isHateItem(state) {
        return (id) => {
            return state.hateList.some((item) => item === id);
        };
    },
    isFavoriteItem(state) {
        return (id) => {
            return state.favoriteList.some((item) => item === id);
        };
    },
    isInMyList(state) {
        return (id) => {
            return state.myList.some((item) => item.id === id);
        };
    },
};
