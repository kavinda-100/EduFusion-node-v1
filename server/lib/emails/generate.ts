
/**
 * @property {number} length - The length of the generated string. (Default: 4)
 * @description Generate a random OTP
 * */
export const generateOTP = (length: 4 | 6 | 8): number => {
    if(length === 4) {
        return Math.floor(1000 + Math.random() * 9000);
    }
    if(length === 6) {
        return Math.floor(100000 + Math.random() * 900000);
    }
    if(length === 8) {
        return Math.floor(10000000 + Math.random() * 90000000);
    }
    return Math.floor(1000 + Math.random() * 9000);
}

/**
 * @description Generate a random string (Magic Link)
 */
export const generateMagicLink = (): string => {
    // string of 26 random alphanumeric characters.
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}