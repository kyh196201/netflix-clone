export default function debounce(fn, delay) {
    delay || (delay = 250);
    let timer = null;

    return function() {
        let context = this;
        //return 되는 함수에 전달되는 인자를 arguments를 통해 가져온다.
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}
