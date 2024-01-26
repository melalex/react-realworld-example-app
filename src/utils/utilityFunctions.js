import Status from "./Status";

export const errorReducer = (state, action) => {
  state.status = Status.FAILURE.value;
  state.errors = Object.entries(action.payload.errors).map(
    ([key, value]) => `${key} ${value}`
  );
};

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

export function handleApiError(error, rejectWithValue) {
  if (error.response) return rejectWithValue(error.response.data);
  else throw error;
}

export function handleChangeWith(formData, setState) {
  return (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setState({
      ...formData,
      [name]: value,
    });
  };
}
