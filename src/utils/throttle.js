export default function throttle(fn, delay) {
    delay || (delay = 250);
    let timer = null;

    return function() {
        let context = this;
        let args = arguments;

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                // clearTimeout(timer);
                timer = null;
            }, delay);
        }
    };
}
