import * as mongoose from 'mongoose';
import model from './dbmodel';

export default class Db {
    protected name: string;
    protected mongoose: any = mongoose;
    private Model: any;
    private collectionName: string = 'account';

    constructor (dbName: string, url?: string) {
        this.name = dbName;
        this.mongoose.connect(url);
        this.Model = this.createModel(this.collectionName, model);
    }

    createModel (name: string, obj: object) {
        return this.mongoose.model(name, obj);
    }

    add (data: any): Promise<{}> {
        let Model = this.Model;
        let schema = new Model(data);
        return new Promise((resolve, reject) => {
            schema.save((err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                };
            });
        })
    }

    update (params: object, data: object): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.Model.update(params, {
                $set: data
            }, (err: Error) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };

            })
        })
    }

    remove (params: object): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.Model.remove(params, (err: Error) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };

            })
        });
    }

    find (params: object): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.Model.find(params, (err: Error, data: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                };

            })
        })
    }
}

