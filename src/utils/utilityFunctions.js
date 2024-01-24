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

export function createUserProfileRef(username) {
  return `/profile/${username}`;
}

export function toMounthAndDayStr(date) {
  return new Date(date).toDateString();
}
