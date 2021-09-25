function userReducer(
  state = {
    user: null,
  },
  action
) {
  switch (action.type) {
    case "login":
      return { user: action.value };
    case "logout":
      return { user: null };
    default:
      return state;
  }
}

export default userReducer;
