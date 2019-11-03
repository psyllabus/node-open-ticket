import { MongoClient } from "mongodb";
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const time = new Date().getTime();

before('setup local testdb connection', function () {
    return MongoClient.connect(`mongodb://localhost:27017/${time}-testdb`).then((mongo) => {
        this.mongo = mongo;
        this.db = mongo.db();
    });
});

after('dropping local testdb', function () {
    return this.db.dropDatabase().then(() => {
        return this.mongo.close();
    })
})
