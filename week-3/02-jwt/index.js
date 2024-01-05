const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return email.match(emailRegex);
}

const validatePassword = (password) => {
    return password.length >= 6;
}

function signJwt(username, password) {
    // Your code here
    if(validateEmail(username) && validatePassword(password)) {
        // const data = {
        //     username: username,
        //     password: password
        // };

        const token = jwt.sign({username: username}, jwtPassword);
        console.log(jwt.decode(token).username, typeof(jwt.decode(token).username));
        return token;
    }
    else {
        console.log("Invalid Username or Password");
        return null;
    }
}

// console.log(jwt.decode(signJwt('rohan@gmail.com', '1234asd')).username);
signJwt('rohan@gmail.com', '123456');

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here
    try {
        const decoded = jwt.verify(token, jwtPassword);
        if(!decoded){
            return false;
        } else {
            return true;
        }
    }
    catch {
        console.log("Token is invalid, expired or not verified using the secret key.");
        return false;
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here
    const decoded = jwt.decode(token);
    console.log(decoded);
    if(decoded) {
        // return decoded;
        return true;
    }
    else {
        return false;
    }
}

// decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoicm9oYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NWFzZCJ9LCJpYXQiOjE3MDM2NDQxNDN9.sV1HKtJ3Gk07zKa-NomHFxDee7loAe_JtvHk2NSjSzA');

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
