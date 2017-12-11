import express  = require('express');
import bodyParser  = require('body-parser');
import cookieParser  = require('cookie-parser');
import Db from './db';
import config from '../config';
import { Request, Response } from 'express';

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
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        // app.use(multer());
        app.use(cookieParser());
        app.use(function (req, res, next) {
            // 最好限制为服务器才能请求
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
        app.get(config.findAccountPath, async (req: Request, res: Response) => {
            let params = req.params;
            try {
                let dbRes = await this.db.find(params);
                res.json(dbRes);
            } catch (e) {
                res.status(500).json({code: 0, msg: e.message || 'error'});
            }
        })
        
        app.post(config.registerPath, async (req: Request, res: Response) => {
            // todo
            let data = req.body.data;
            try {
                await this.db.add(data);
                res.json({code: 1, msg: 'register Success!'});
            } catch (e) {
                console.log({code: 0, msg: e.message || 'error'});
                res.status(400).json({code: 0, msg: e.message || 'error'});
            }
            
        })

        app.put(config.updatePath, async (req: Request, res: Response) => {
            // todo
            let params = req.body.params;
            let data = req.body.data;
            try {
                await this.db.update(params, data);
                res.json({code: 1, msg: 'Update Success!'});
            } catch (e) {
                res.status(400).json({code: 0, msg: e.message || 'error'});
            }
        })

        app.delete(config.deleteAccountPath, async (req: Request, res: Response) => {
            // todo
            let params = req.body.data;
            try {
                await this.db.remove(params);
                res.json({code: 1, msg: 'Delete Success!'});
            } catch (e) {
                res.status(500).json({code: 0, msg: e.message || 'error'});
            }
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