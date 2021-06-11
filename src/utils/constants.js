module.exports = {
    PORT: 9000,
    DATABASE: {
        COLLECTIONS:{
            USERS: 'users',
            ENTRIES: 'entries',
            COMPANIES: 'companies'
        },
        URL: 'mongodb://frontdesk-db:27017/usersdb'
    },
    ORIGIN: 'http://localhost:3000',
    SALT_ROUNDS: 10,
    MESSAGES: {
        USER_NOT_FOUND: "Utilizatorul nu a fost găsit",
        AUTH_SUCCESS: "Autentificare cu succes",
        INCORRECT_PASS : "Parolă incorectă"
    },
    CODES: {
        ACCESS: 200,
        FORBIDDEN : 403
    },
    EXP_TIME: '1h'
}