import { userManagement } from "../api/Api";
export function authenticated(userName, password) {
  return new Promise((resolve, reject) => {
    let data = {
      type: "login",
      userName: userName,
      password: password,
    };
    userManagement(data).then((res) => {
      if (res.data) {
        localStorage.setItem("login", true);
        return resolve({ status: true, msg: "user authentication success" });
      } else {
        return resolve({ status: false, msg: "user authentication failed" });
      }
    });
  });
}

export function isAuthenticated() {
  if (localStorage.getItem("login")) {
    return true;
  }
  return false;
}
