export const fakeApi = {
  signUp: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // check if email already exists
        const exists = users.some((u) => u.email === userData.email);
        if (exists) {
          reject({
            message: "Email already exists",
            error: true,
          });
        } else {
          users.push(userData);
          localStorage.setItem("users", JSON.stringify(users));
          resolve({
            message: "Signup successful",
            error: false,
            data: userData, 
          });
        }
      }, 100);
    });
  },

  signIn: async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user));
          resolve({ message: "Login successful", user });
        } else {
          reject({ message: "Invalid credentials" });
        }
      }, 500);
    });
  },

  signOut: () => {
    localStorage.removeItem("authUser");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("authUser") || "null");
  },
};
