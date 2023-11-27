export const getUser = () =>
    window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : null;

export const setUser = user =>
    window.localStorage.setItem('user', JSON.stringify(user));

export const removeUser = () => window.localStorage.removeItem('user');
export const isLoggedIn = () => {
    const user = getUser();
    return !!user.username;
};