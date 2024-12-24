import {UserType} from "@shared/types";

/**
 * @function setUserDataToLocalStorage
 * @property {UserType} value
 * @description set user data in local storage
 * */
export const setUserDataToLocalStorage = (value: UserType) => {
    // seth the user data
    localStorage.setItem('user', JSON.stringify(value));
    // set the isLoggedIn to true
    localStorage.setItem('isLoggedIn', 'true');
}

type getUserDataFromLocalStorageType = {
    user: UserType
    isLoggedIn: boolean
}
/**
 * @function getUserDataFromLocalStorage
 * @description get user data from local storage
 * */
export const getUserDataFromLocalStorage = (): getUserDataFromLocalStorageType => {
    const user = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return {
        user: user ? JSON.parse(user) : null,
        isLoggedIn: isLoggedIn === 'true'
    }
}

/**
 * @function removeUserDataFromLocalStorage
 * @description remove user data from local storage
 * */
export const removeUserDataFromLocalStorage = () => {
    // remove the user data
    localStorage.removeItem('user');
    // remove the isLoggedIn
    localStorage.removeItem('isLoggedIn');
}

/**
 * @function setDataToLocalStorage
 * @property {string} key
 * @property {T} value
 * @description set data in local storage
 * */
export const setDataToLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @function getDataFromLocalStorage
 * @property {string} key
 * @description get data from local storage
 * */
export const getDataFromLocalStorage = <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}