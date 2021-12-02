const express = require('express')
const app = express()
const fs = require('fs')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGOURI } = require('./config/keys')
const {uploadMedia, uploadAws} = require('./aws_upload/uploadsfunction')
// const cron = require('node-cron')
const path=require('path')
 console.log(path.join(__dirname)) 
//const cron = require('node-cron')
const AWS = require('aws-sdk')
// AWS.config.loadFromPath('/paytunes_new/server/config.json');
// const S3 = new AWS.S3();
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }));
app.use(cors())


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 900000,
    socketTimeoutMS: 900000,
    useCreateIndex: true
}

mongoose.connect(MONGOURI, options)
mongoose.connection.on('connected', () => {
    console.log("connected to database.....")
})
mongoose.connection.on('error', err => {
    console.log('error in connection', err)
})

const userrouter = require('./routes/user_routes')
const advertiserrouter = require('./routes/advertiser')
const campaignrouter = require('./routes/campaign')
app.use('/user', userrouter)
app.use('/advertiser', advertiserrouter)
app.use('/campaign', campaignrouter)

const getaudio = async (prefix) => {
    const s3 = new AWS.S3();

    const items = await s3
        .listObjectsV2({
            Bucket: "outputbuckettranscoded",
            Prefix: prefix
        })
        .promise();
    console.log(items)
    if (items.Contents) {
        return items.Contents.map((content) => content.Key)
    }
}

const getVideos = (key) => {
    const s3 = new AWS.S3();
    s3.getObject({
        Bucket: "outputbuckettranscoded",
        Key: key
        // Prefix: finaldate,
    }, async function (err, data) {
        if (err) {
            throw err;
        }
        let filename=key.split('/')[1];
        let file={data:data.Body,filename}
        await uploadMedia(file,'audio')
        console.log('uploaded to azure')
        
    })
    // console.log(items)
};

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function pp() {
    try {
        let date = new Date();
        const year = date.getFullYear();
        let month;
        if (date.getMonth() + 1 >= 10) {
            month = `${date.getMonth() + 1}`
        } else {
            month = `0${date.getMonth() + 1}`
        }

        let date1 = date.getDate();
        if (date1 < 10) {
            date1 = `0${date1}`
        }
        let finaldate = `audio/${year}-${month}-${date1}_`

        const keys = await getaudio(finaldate)

        keys.map(key => getVideos(key));
    } catch (err) {
        console.log(err)
    }
}

//pp()



app.listen(port, () => console.log(`app listening on port ${port}!`))

