export function handleWithoutPropagation(fun) {
    return e => {
        e.stopPropagation();
        fun();
    }
}