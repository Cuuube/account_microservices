export default {
    // db config
    dbCollectionName: 'account',
    dbPath: 'mongodb://localhost:27017/account',
    
    // server config
    registerPath: '/register',
    updatePath: '/update_account',
    findAccountPath: '/account',
    deleteAccountPath: '/remove_account',

    port: '9000',
}