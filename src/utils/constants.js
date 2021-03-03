
module.exports = {
    PORT: 9000,
    DATABASE: {
        COLLECTIONS:{
            USERS: 'users',
            ENTRIES: 'entries'
        },
        URL: 'mongodb://localhost/usersdb'
    },
    ORIGIN: 'http://localhost:3000'
}