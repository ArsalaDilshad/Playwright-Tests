const randomstring = require('randomstring');

/**
 * Generates a random string with specified options.
 *
 * This function generates a random string of a fixed length (2 characters)
 * using an alphanumeric character set. The resulting string is in uppercase.
 *
 * @returns {string} A random string with 2 uppercase alphanumeric characters.
 */
export function generateRandomString() {
    return randomstring.generate({
        length: 2,
        charset: "alphanumeric",
        capitalization: "uppercase",
    });
}

/**
 * Generates a random password with a specified length.
 *
 * This function generates a random password that includes a mix of uppercase letters,
 * lowercase letters, numbers, and special characters. The length of the password is
 * determined by the `length` parameter.
 *
 * @param {number} passwordLength - The desired length of the generated password.
 * @returns {string} A random password with the specified length.
 */
export function generateRandomPassword(passwordLength) {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
    
    let password = '';

    for (let i = 0; i < 3; i++) {
        password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
        password += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    }

    return password;
}