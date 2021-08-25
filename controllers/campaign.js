const mongoose = require('mongoose');
const CampaignMaster = require('../models/campaignmaster')
const SubCampaignMaster = require('../models/subcampaignmaster')
const csvparser = require('csv-parser')
const fs = require('fs')
const { uploadAws, uploadMedia, uploadtranscodedfile } = require('../aws_upload/uploadsfunction');
const { AsyncLocalStorage } = require('async_hooks');

let results = []
const readdata = (filename) => {
    fs.createReadStream(`./client/public/uploads/${filename}`).
        pipe(csvparser({})).
        on('data', (data) => {
            results.push(data)
        }).
        on('end', () => console.log('ww', results))
}

exports.createcampaign = async (req, res) => {
    try {
        let { campaignName, budget, startdate, enddate, active } = req.body;
        if (!campaignName || !budget || !startdate || !enddate || !active) {
            return res.status(400).json({ err: "Provide all details!" });
        }
        const campaign = new CampaignMaster({
            title: campaignName,
            budget,
            startdate,
            enddate,
            launch: active == "true" ? true : false
        });
        await campaign.save();
        res.status(200).json({ message: 'Successfuly Created!', data: campaign });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

exports.createsubcampaign = async (req, res) => {
    try {
        // JSON.parse(req.body)
        console.log('bb', req.files)
        let {
            campaignid,
            Advertiser,
            advertiserid,
            type,
            strategy, //need to ask
            lineitem,
            AudioLtbudget,
            VideoLtbudget,
            DisplayLtbudget,
            Audioimpressionlimit,
            Videoimpressionlimit,
            Displayimpressionlimit,
            Audiostartdate,
            Videostartdate,
            Displaystartdate,
            Audioenddate,
            Videoenddate,
            Displayenddate,
            Audiostarttime,
            Videostarttime,
            Displaystarttime,
            Audioendtime,
            Videoendtime,
            Displayendtime,
            Audiocreative, //done
            Videocreative,
            Displaycreative,
            Audiosize,
            Videosize,
            Displaysize,
            Audiotrackurl,
            Videotrackurl,
            Displaytrackurl,
            AudioFileinp,
            VideoFileinp,
            DisplayFileinp,
            AudioFileBanner,
            VideoFileBanner,
            DisplayFileBanner,
            AudioFrequency, VideoFrequency, DisplayFrequency, //done
            AudioTimeperiod, VideoTimeperiod, DisplayTimeperiod, //done
            Audioactive, Videoactive, Displayactive,//done
            AudioRegion, VideoRegion, DisplayRegion,
            Audioage, Videoage, Displayage, //need  to ask

            AudioGrandCityval, VideoGrandCityval, DisplayGrandCityval,//done
            Audiocityval, Videocityval, Displaycityval,
            Audiogender, Videogender, Displaygender,
            AudioLanguage, VideoLanguage, DisplayLanguage,
            Audiocategory, Videocategory, Displaycategory,
            Audioos, Videoos, Displayos,//done
            Audiomakemodel, Videomakemodel, Displaymakemodel,//done
            Audioarea, Videoarea, Displayarea,
            AudioPincode, VideoPincode, DisplayPincode,//done
            AudioPincodeFile, VideoPincodeFile, DisplayPincodeFile,//wait
            audiodays, videodays, displaydays,//done
            audiotime, videotime, displaytime//done
        } = req.body;
        type = type.split(',')
        console.log(lineitem)
        if (!lineitem) {
            return res.status(400).json({ error: "Subcampaign name not provided!" })
        }
        console.log(advertiserid)
        if (!advertiserid) {
            return res.status(400).json({ error: "Please select Advertiser!" })
        }

        if (req.files.AudioPincodeFile) {
            readdata(req.files.AudioPincodeFile[0].filename)
        }
        if (req.files.VideoPincodeFile) {
            readdata(req.files.VideoPincodeFile[0].filename)
        }
        if (req.files.DisplayPincodeFile) {
            readdata(req.files.DisplayPincodeFile[0].filename)
        }
        if (req.files.AudioFileinp) {
            console.log(req.files.AudioFileinp[0])
            fs.readFile(`./client/public/uploads/${req.files.AudioFileinp[0].filename}`, async function (err, data) {
                if (err) {
                    throw new err;
                }
                // let encoded = Buffer.from(data)
                let filetype = req.files.AudioFileinp[0].mimetype
                filetype = filetype.toString();
                console.log(filetype.split('/')[1])
                filetype = filetype.split('/')[1];
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
                let finaldate=`${year}-${month}-${date1}`
                let file = `audio/${finaldate}_${req.files.AudioFileinp[0].filename}`
                let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype }

                await uploadAws(data1)
                await uploadtranscodedfile({key:file,container:filetype})
            })
        }
        if (req.files.VideoFileinp) {

            fs.readFile(`./client/public/uploads/${req.files.VideoFileinp[0].filename}`, async function (err, data) {
                if (err) {
                    throw new err;
                }
                let filetype = req.files.VideoFileinp[0].mimetype
                filetype = filetype.toString();
                console.log(filetype.split('/')[1])
                filetype = filetype.split('/')[1];
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
                let finaldate=`${year}-${month}-${date1}`
                let file = `video/${finaldate}_${req.files.VideoFileinp[0].filename}`
                let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype }

                uploadAws(data1)
                // console.log(encoded)
            })
        }
        if (req.files.DisplayFileinp) {
            fs.readFile(`./client/public/uploads/${req.files.DisplayFileinp[0].filename}`, async function (err, data) {
                if (err) {
                    throw new err;
                }
                // let encoded = Buffer.from(data).toString('base64')
                console.log(data.byteLength)
                let filetype = req.files.DisplayFileinp[0].mimetype
                filetype = filetype.toString();
                console.log(filetype.split('/')[1])
                filetype = filetype.split('/')[1];
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
                let finaldate=`${year}-${month}-${date1}`
                let filename = `${finaldate}_${req.files.DisplayFileinp[0].filename}`
                let data1 = { filename, data }
                await uploadMedia(data1,'image')
                
                console.log('hjj')
            })
        }

        if (req.files.AudioFileBanner) {
            fs.readFile(`./client/public/uploads/${req.files.AudioFileBanner[0].filename}`, async function (err, data) {
                if (err) {
                    throw new err;
                }
                // let encoded = Buffer.from(data).toString('base64')
                // console.log(encoded.length)
                let filetype = req.files.AudioFileBanner[0].mimetype
                filetype = filetype.toString();
                console.log(filetype.split('/')[1])
                filetype = filetype.split('/')[1];
                let filename = `${req.files.AudioFileBanner[0].filename}_${Date.now()}.${filetype}`
                let data1 = { filename, data }
                // console.log('ss',data1)
                await uploadMedia(data1,'image')
                // console.log(encoded)
                console.log('hjj')
            })
        }

        if (req.files.VideoFileBanner) {
            fs.readFile(`./client/public/uploads/${req.files.VideoFileBanner[0].filename}`, async function (err, data) {
                if (err) {
                    throw new err;
                }
                // let encoded = Buffer.from(data).toString('base64')
                // console.log(encoded.length)
                let filetype = req.files.VideoFileBanner[0].mimetype
                filetype = filetype.toString();
                console.log(filetype.split('/')[1])
                filetype = filetype.split('/')[1];
                let filename = `${req.files.VideoFileBanner[0].filename}_${Date.now()}.${filetype}`
                let data1 = { filename, data }
                // console.log('ss',data1)
                await uploadMedia(data1,'image')
                // console.log(encoded)
                console.log('hjj')
            })
        }

        if (req.files.DisplayFileBanner) {
            fs.readFile(`./client/public/uploads/${req.files.DisplayFileBanner[0].filename}`, async function (err, data) {
                if (err) {
                    throw new err;
                }
                // let encoded = Buffer.from(data).toString('base64')
                // console.log(encoded.length)
                let filetype = req.files.DisplayFileBanner[0].mimetype
                filetype = filetype.toString();
                console.log(filetype.split('/')[1])
                filetype = filetype.split('/')[1];
                let filename = `${req.files.DisplayFileBanner[0].filename}_${Date.now()}.${filetype}`
                let data1 = { filename, data }
                await uploadMedia(data1,'image')
                
                console.log('hjj')
            })
        }


        type.map(async typ => {
            if (typ === "Audio") {
                const Audiosubcamp = new SubCampaignMaster({
                    campaignid: mongoose.Types.ObjectId(campaignid),
                    Advertiser,
                    advertiserid: mongoose.Types.ObjectId(advertiserid),
                    AdTitle: lineitem,
                    adType: typ,
                    pincode: AudioPincode ? Array(AudioPincode) : ['calculate from csv'],
                    Gender: Audiogender,
                    language: AudioLanguage,
                    City: Audiocityval,
                    State: AudioRegion,
                    endDate: Audioenddate ? Audioenddate : '',
                    startDate: Audiostartdate ? Audiostartdate : '',
                    starttime: Audiostarttime,
                    endtime: Audioendtime,
                    targetCategory: Audiocategory,
                    area: Audioarea,
                    TargetImpressions: Audioimpressionlimit.toString(),
                    days: audiodays,
                    timelap: audiotime,
                    makemodel: Audiomakemodel,
                    platformType: Audioos,
                    GrandCity: AudioGrandCityval,
                    age: Audioage,
                    active: Audioactive === "true" ? true : false,
                    timeperiod: AudioTimeperiod,
                    frequency: AudioFrequency,
                    Linear: [{ Title: Audiocreative, type: "Audio", MediaFiles: req.files.AudioFileinp ? [{ Name: req.files.AudioFileinp[0].filename }] : [{}] }],
                    strategy: strategy,
                    Companion: req.files.AudioFileBanner ? [{ Title: Audiocreative, type: "Audio", imageFiles: req.files.AudioFileBanner ? [{ Name: req.files.AudioFileBanner[0].filename }] : [{}] }] : [{}],
                })
                await Audiosubcamp.save();

            } else if (typ === "Video") {
                const Videosubcamp = new SubCampaignMaster({
                    campaignid: mongoose.Types.ObjectId(campaignid),
                    Advertiser,
                    advertiserid: mongoose.Types.ObjectId(advertiserid),
                    AdTitle: lineitem,
                    adType: typ,
                    // Pricing: , add later
                    Gender: Videogender,
                    pincode: VideoPincode ? Array(VideoPincode) : ['calculate from csv'],
                    language: VideoLanguage,
                    City: Videocityval,
                    State: VideoRegion,
                    endDate: Videoenddate ? Videoenddate : '',
                    startDate: Videostartdate ? Videostartdate : '',
                    starttime: Videostarttime,
                    endtime: Videoendtime,
                    targetCategory: Videocategory,
                    area: Videoarea,
                    TargetImpressions: Videoimpressionlimit.toString(),
                    days: videodays,
                    timelap: videotime,
                    makemodel: Videomakemodel,
                    platformType: Videoos,
                    GrandCity: VideoGrandCityval,
                    age: Videoage,
                    active: Videoactive === "true" ? true : false,
                    timeperiod: VideoTimeperiod,
                    frequency: VideoFrequency,
                    Linear: [{ Title: Videocreative, type: "Video", MediaFiles: req.files.VideoFileinp ? [{ Name: req.files.VideoFileinp[0].filename }] : [{}] }],
                    strategy: strategy,
                    Companion: req.files.VideoFileBanner ? [{ Title: Videocreative, imageFiles: req.files.VideoFileBanner ? [{ Name: req.files.VideoFileBanner[0].filename }] : [{}] }] : [{}],
                })
                await Videosubcamp.save();
            } else {
                const Displaysubcamp = new SubCampaignMaster({
                    campaignid: mongoose.Types.ObjectId(campaignid),
                    Advertiser,
                    advertiserid: mongoose.Types.ObjectId(advertiserid),
                    AdTitle: lineitem,
                    adType: typ,
                    pincode: DisplayPincode ? Array(DisplayPincode) : ['calculate from csv'],
                    Gender: Displaygender,
                    language: DisplayLanguage,
                    City: Displaycityval,
                    State: DisplayRegion,
                    endDate: Displayenddate ? Displayenddate : '',
                    startDate: Displaystartdate ? Displaystartdate : '',
                    starttime: Displaystarttime,
                    endtime: Displayendtime,
                    targetCategory: Displaycategory,
                    area: Displayarea,
                    TargetImpressions: Displayimpressionlimit.toString(),
                    days: displaydays,
                    timelap: displaytime,
                    makemodel: Displaymakemodel,
                    platformType: Displayos,
                    GrandCity: DisplayGrandCityval,
                    age: Displayage,
                    active: Displayactive === "true" ? true : false,
                    timeperiod: DisplayTimeperiod,
                    frequency: DisplayFrequency,
                    Companion: req.files.DisplayFileBanner ? [{ Title: Displaycreative, type: "Display", imageFiles: req.files.DisplayFileBanner ? [{ Name: req.files.DisplayFileBanner[0].filename }] : [{}] }] : [{}],
                    strategy: strategy
                })
                await Displaysubcamp.save()
            }
        })


        res.status(200).json('created successfuly!')
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}