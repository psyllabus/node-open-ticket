import { Collection, Db } from "mongodb";
import { COLLECTION } from "./collections";

export class Service<ServiceItem> {
    db: Db;
    col: Collection;
    constructor(db: Db, collection: COLLECTION) {
        this.db = db;
        this.col = this.db.collection(collection);
    }

    _col(collection: COLLECTION): Collection {
        return this.db.collection(collection);
    }

    validate(item: ServiceItem) { }
    checkRequirements(item: ServiceItem): Promise<any> { return Promise.resolve(); }
    checkRequiredFor(id: string): Promise<any> { return Promise.resolve(); }

    create(item: ServiceItem): Promise<ServiceItem> {
        return Promise.resolve().then(() => this.validate(item)).then(() => {
            return this.checkRequirements(item).then(() => {
                return this.col.insertOne(item)
                .then(res => {
                    if (res.result.ok != 1 || res.result.n != 1) {
                        return Promise.reject(new Error('The item has not been inserted successfully.'));
                    }
                    return res.ops[0];
                });
            }).catch((err) => Promise.reject(new Error(`Unable to create ticketGroup: ` + err.message)));
        });
    }

    get(id: string): Promise<ServiceItem> {
        return this.col.findOne({_id: id});
    }

    list(perPage?: number, page?: number) {
        let cursor = this.col.find({});
        if (!page) {
            page = 0;
        }
        if (perPage) {
            cursor = cursor.skip(page * perPage).limit((page + 1) * perPage);
        }
        return cursor.toArray();
    }

    update(id: string, item: ServiceItem): Promise<ServiceItem> {
        return Promise.resolve().then(() => this.validate(item)).then(() => {
            return this.checkRequirements(item).then(() => {
                return this.col.updateOne({_id: id}, {$set: item})
                .then(res => {
                    if (res.result.ok != 1 || res.result.n != 1 || res.result.nModified != 1) {
                        return Promise.reject(new Error('The item has not been updated successfully.'));
                    }
                    return this.get(id);
                });
            }).catch((err) => Promise.reject(new Error(`Unable to update ticketGroup: ` + err.message)));
        });
    }

    delete(id: string) {
        return this.checkRequiredFor(id).then(() => {
            return this.col.deleteOne({_id: id});
        })
    }
}
