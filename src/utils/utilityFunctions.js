import Status from "./Status";

export const errorReducer = (state, action) => {
  console.log(action);
  state.status = Status.FAILURE;
  if (action?.payload?.errors) {
    state.errors = Object.entries(action.payload.errors).map(
      ([key, value]) => `${key} ${value}`
    );
  } else {
    console.error("Unknown error", action);
    state.errors = ["Smth went wrong..."];
  }
};

export const pendingReducer = (state, action) => {
  state.status = Status.LOADING;
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

export function pageToLimmitAndOffcet(page, pageSize) {
  return {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };
}

export function extractPayload(it) {
  return it.data;
}

export function authHeaderValue(token) {
  return `Token ${token}`;
}
