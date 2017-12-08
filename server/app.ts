import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import Db from './db';
import config from '../config';

class Server {
    private app = express();
    private db = new Db(config.dbCollectionName, config.dbPath);
    constructor () {

        this.setting()
            .bindRoute()
            .run();
    }

    setting () {
        let app = this.app;
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
            res.header("Access-Control-Allow-Credentials", "true");    
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          
            if (req.method == 'OPTIONS') {
              res.send(200); // 让options请求快速返回
            } else {
              next();
            }
        })
        return this;
    }

    bindRoute () {
        let app = this.app;
        app.get(config.findAccountPath, (req, res) => {
            // todo
        })
        
        app.post(config.registerPath, (req, res) => {
            // todo
        })

        app.put(config.updatePath, (req, res) => {
            // todo
        })

        app.delete(config.deleteAccountPath, (req, res) => {
            // todo
        })

        return this;
    }

    run () {
        this.app.listen(config.port, (err: Error) => {
            if (err) throw new Error('Server error');
            console.log('Server started at: 🌐 http://localhost:' + config.port);
        })

        return this;
    }
}

new Server();