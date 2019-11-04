import { Collection, Db } from "mongodb";

export class Service<ServiceItem> {
    db: Db;
    col: Collection;
    constructor(db: Db, collection: string) {
        this.db = db;
        this.col = this.db.collection(collection);
    }

    create(item: ServiceItem): Promise<ServiceItem> {
        return this.col.insertOne(item)
        .then(res => {
            if (res.result.ok != 1 || res.result.n != 1) {
                return Promise.reject(new Error('The item has not been inserted successfully.'));
            }
            return res.ops[0];
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
        return this.col.updateOne({_id: id}, {$set: item})
        .then(res => {
            if (res.result.ok != 1 || res.result.n != 1 || res.result.nModified != 1) {
                return Promise.reject(new Error('The item has not been updated successfully.'));
            }
            return this.get(id);
        });
    }

    delete(id: string) {
        return this.col.deleteOne({_id: id});
    }
}
