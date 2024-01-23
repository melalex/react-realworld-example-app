export function handleWithoutPropagation(fun) {
  return (e) => {
    e.stopPropagation();
    fun();
  };
}

export function handleAndPreventDefault(fun) {
  return (e) => {
    e.preventDefault();
    fun();
  };
}
