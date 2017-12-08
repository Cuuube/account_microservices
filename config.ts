export default {
    // db config
    dbCollectionName: 'account',
    dbPath: 'mongodb://localhost:27017/account',
    
    // server config
    registerPath: '/register',
    updatePath: '/update_account',
    findAccountPath: '/account/:id',
    deleteAccountPath: '/remove_account/:id',

    port: '9000',
}