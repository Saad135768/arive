const { MongoClient, ServerApiVersion } = require('mongodb')

const dbConnect = async () => {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client.connect()
}

export default dbConnect