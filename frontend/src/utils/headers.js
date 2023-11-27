export const setAuthHeaders = headers => {
    if (localStorage.jwtToken) {
        return {
            ...headers,
            Authorization: `Bearer_ ${localStorage.jwtToken}`
        }
    }
    return headers;
}