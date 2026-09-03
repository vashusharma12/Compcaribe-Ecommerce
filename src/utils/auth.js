export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};

export const loginUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

export const logoutUser = () => {
    localStorage.removeItem("currentUser");
};