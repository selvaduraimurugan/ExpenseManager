const mongo = require('mongodb');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

// connect to MongoDB
var dbo = null;
mongo.connect('mongodb://localhost:27017/cpbs-db', {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    dbo = db.db('cpbs-db');
    console.log('connected to the database');
});

redis.on("connect", () => {
    console.log('connected to Redis');
});

function getArticle(id) {
    return new Promise((resolve, reject) => {
        redis.get(id,(err, reply) => {
            if(err) {
                console.log(err);
            } else if(reply) {
                resolve(JSON.stringify(reply));
            } else {
                dbo.collection('transactions').find({
                    id: id
                }).toArray((err, articleData) => {
                    if(err) {
                        return reject(err);
                    }
                    if(articleData.length > 0) {
                        // set in redis
                        redis.set(id, JSON.stringify(articleData));
                    }
                    resolve(articleData);
                });
            }
        });
    });
}

module.exports = {
    getArticle: getArticle
};