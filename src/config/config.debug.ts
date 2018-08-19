import { ConfigInterface } from './config_interface';

export var Config:ConfigInterface = {
    parseServer:{
        appId: 'app.id.debug',
        appName: 'app.test',
        cloud: '/cloud/main.js',
        // databaseURI: 'mongodb://root:1nn0r1a@localhost:27017/parse?authSource=admin',
        databaseURI: 'mongodb://localhost:27017/parse',
        masterKey: 'masterkey',
        port: 1337,
        serverURL: 'http://localhost:1337/parse'
    }
}