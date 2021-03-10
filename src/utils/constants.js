
module.exports = {
    PORT: 9000,
    DATABASE: {
        COLLECTIONS:{
            USERS: 'users',
            ENTRIES: 'entries'
        },
        URL: 'mongodb://localhost/usersdb'
    },
    ORIGIN: 'http://localhost:3000',
    SALT_ROUNDS: 10,
    MESSAGES: {
        USER_NOT_FOUND: 'User not found',
        AUTH_SUCCESS: 'Authentication was successful',
        INCORRECT_PASS : 'Incorrect Password'
    }
}