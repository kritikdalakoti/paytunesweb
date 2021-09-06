const mongoose = require('mongoose');
const CampaignMaster = require('../models/campaignmaster')
const SubCampaignMaster = require('../models/subcampaignmaster')
const path=require('path')
const { readdata, deletefiles } = require('../helper')
const xlsx = require('xlsx')
const fs = require('fs')
const { uploadAws, uploadMedia, uploadtranscodedfile, uploadAzure } = require('../aws_upload/uploadsfunction');
const { AudioMediaFiles } = require('../constants')





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
        // console.log(req.body)
        let {
            campaignid,
            Advertiser,
            advertiserid,
            type,
            strategy, //need to ask
            lineitem,
            totalbudget,
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
            // Audiosize,
            // Videosize,
            // Displaysize,
            Audiotrackurl,
            Videotrackurl,
            Displaytrackurl,
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
        console.log(type)
        type = type.split(',')
        console.log(type)
        console.log(AudioLtbudget,VideoLtbudget,DisplayLtbudget)
        if (!lineitem) {
            return res.status(400).json({ error: "Subcampaign name not provided!" })
        }
        if (!advertiserid) {
            return res.status(400).json({ error: "Please select Advertiser!" })
        }
        if (parseInt(totalbudget) < parseInt(AudioLtbudget) ? parseInt(AudioLtbudget) : 0 + parseInt(VideoLtbudget) ? parseInt(VideoLtbudget) : 0 + parseInt(DisplayLtbudget) ? parseInt(DisplayLtbudget) : 0) {
            return res.status(400).json({ error: "Sum of SubCampaign Budgets cannot increase than the total Budget of the campaign!" })
        }
        Audiogender = Audiogender ? Audiogender.split(',') : ''
        Videogender = Videogender ? Videogender.split(',') : ''
        Displaygender = Displaygender ? Displaygender.split(',') : ''

        AudioLanguage = AudioLanguage ? AudioLanguage.split(',') : ''
        VideoLanguage = VideoLanguage ? VideoLanguage.split(',') : ''
        DisplayLanguage = DisplayLanguage ? DisplayLanguage.split(',') : ''

        Audiocityval = Audiocityval ? Audiocityval.split(',') : ''
        Videocityval = Videocityval ? Videocityval.split(',') : ''
        Displaycityval = Displaycityval ? Displaycityval.split(',') : ''

        AudioRegion = AudioRegion ? AudioRegion.split(',') : ''
        VideoRegion = VideoRegion ? VideoRegion.split(',') : ''
        DisplayRegion = DisplayRegion ? DisplayRegion.split(',') : ''

        Audiocategory = Audiocategory ? Audiocategory.split(',') : ''
        Videocategory = Videocategory ? Videocategory.split(',') : ''
        Displaycategory = Displaycategory ? Displaycategory.split(',') : ''

        Audioarea = Audioarea ? Audioarea.split(',') : ''
        Videoarea = Videoarea ? Videoarea.split(',') : ''
        Displayarea = Displayarea ? Displayarea.split(',') : ''

        audiodays = audiodays ? audiodays.split(',') : ''
        videodays = videodays ? videodays.split(',') : ''
        displaydays = displaydays ? displaydays.split(',') : ''

        audiotime = audiotime ? audiotime.split(',') : ''
        videotime = videotime ? videotime.split(',') : ''
        displaytime = displaytime ? displaytime.split(',') : ''

        Audiomakemodel = Audiomakemodel ? Audiomakemodel.split(',') : ''
        Videomakemodel = Videomakemodel ? Videomakemodel.split(',') : ''
        Displaymakemodel = Displaymakemodel ? Displaymakemodel.split(',') : ''

        Audioos = Audioos ? Audioos.split(',') : ''
        Videoos = Videoos ? Videoos.split(',') : ''
        Displayos = Displayos ? Displayos.split(',') : ''

        AudioGrandCityval = AudioGrandCityval ? AudioGrandCityval.split(',') : ''
        VideoGrandCityval = VideoGrandCityval ? VideoGrandCityval.split(',') : ''
        DisplayGrandCityval = DisplayGrandCityval ? DisplayGrandCityval.split(',') : ''

        Audioage = Audioage ? Audioage.split(',') : ''
        Videoage = Videoage ? Videoage.split(',') : ''
        Displayage = Displayage ? Displayage.split(',') : ''

        AudioPincode = AudioPincode ? AudioPincode.split(',') : ''
        VideoPincode = VideoPincode ? VideoPincode.split(',') : ''
        DisplayPincode = DisplayPincode ? DisplayPincode.split(',') : ''


        let AudioPincodes = []
        let VideoPincodes = []
        let DisplayPincodes = []
        if (req.files.AudioPincodeFile) {
            AudioPincodes = readdata(req.files.AudioPincodeFile[0].filename)
        }
        if (req.files.VideoPincodeFile) {
            VideoPincodes = readdata(req.files.VideoPincodeFile[0].filename)
        }
        if (req.files.DisplayPincodeFile) {
            DisplayPincodes = readdata(req.files.DisplayPincodeFile[0].filename)
        }
        if (req.files.AudioFileinp) {
            console.log(req.files.AudioFileinp[0])
            
            let data = fs.readFileSync(`${path.join(__dirname,'../public/uploads/')}${req.files.AudioFileinp[0].filename}`)
            console.log(data)
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
            let finaldate = `${year}-${month}-${date1}`
            let file = `audio/${finaldate}_${req.files.AudioFileinp[0].filename}`
            let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype }

            let result = await uploadAws(data1)
            if (result.error) {
                return res.status(400).json({ error: result.error.message })
            }
            let result1 = await uploadtranscodedfile({ key: file, container: filetype })
            if (result1.error) {
                return res.status(400).json({ error: result1.error.message })
            }
            await uploadAzure();
            AudioMediaFiles.forEach((audio) => {
                audio.Name = req.files.AudioFileinp[0].filename
            })
        }
        if (req.files.VideoFileinp) {

            let data = fs.readFileSync(`${path.join(__dirname,'../public/uploads/')}${req.files.AudioFileinp[0].filename}`)
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
            let finaldate = `${year}-${month}-${date1}`
            let filename = `${finaldate}_${req.files.VideoFileinp[0].filename}`
            let data1 = { filename, data }

            let result = await uploadMedia(data1, 'video')
            if (result.error) {
                return res.status(400).json({ error: result.error.message })
            }
        }
        if (req.files.DisplayFileinp) {
            let data = fs.readFileSync(`${path.join(__dirname,'../public/uploads/')}${req.files.AudioFileinp[0].filename}`)
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
            let finaldate = `${year}-${month}-${date1}`
            let filename = `${finaldate}_${req.files.DisplayFileinp[0].filename}`
            let data1 = { filename, data }
            let result = await uploadMedia(data1, 'image')
            if (result.error) {
                return res.status(400).json({ error: result.error.message })
            }
        }

        if (req.files.AudioFileBanner) {
            let data = fs.readFileSync(`${path.join(__dirname,'../public/uploads/')}${req.files.AudioFileinp[0].filename}`)
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
            let finaldate = `${year}-${month}-${date1}`
            let filename = `${finaldate}_${req.files.AudioFileBanner[0].filename}`
            let data1 = { filename, data }
            let result = await uploadMedia(data1, 'image')
            if (result.error) {
                return res.status(400).json({ error: result.error.message })
            }
        }

        if (req.files.VideoFileBanner) {
            let data = fs.readFileSync(`${path.join(__dirname,'../public/uploads/')}${req.files.AudioFileinp[0].filename}`)
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
            let finaldate = `${year}-${month}-${date1}`
            let filename = `${finaldate}_${req.files.VideoFileBanner[0].filename}`
            let data1 = { filename, data }
            let result = await uploadMedia(data1, 'image')
            if (result.error) {
                return res.status(400).json({ error: result.error.message })
            }
        }

        if (req.files.DisplayFileBanner) {
            let data = fs.readFileSync(`${path.join(__dirname,'../public/uploads/')}${req.files.AudioFileinp[0].filename}`)
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
            let finaldate = `${year}-${month}-${date1}`
            let filename = `${finaldate}_${req.files.DisplayFileBanner[0].filename}`
            let data1 = { filename, data }
            let result = await uploadMedia(data1, 'image')
            if (result.error) {
                return res.status(400).json({ error: result.error.message })
            }
        }

        type.map(async typ => {
            if (typ === "Audio") {
                try {
                    const Audiosubcamp = new SubCampaignMaster({
                        campaignid: mongoose.Types.ObjectId(campaignid),
                        Advertiser,
                        advertiserid: mongoose.Types.ObjectId(advertiserid),
                        AdTitle: lineitem,
                        adType: typ,
                        pincode: AudioPincode ? AudioPincode : AudioPincodes,
                        Gender: Audiogender,
                        Pricing: AudioLtbudget ? parseInt(AudioLtbudget) : "",
                        trackurl: Audiotrackurl,
                        language: AudioLanguage,
                        City: Audiocityval,
                        State: AudioRegion,
                        endDate: Audioenddate ? Audioenddate : '',
                        startDate: Audiostartdate ? Audiostartdate : '',
                        starttime: Audiostarttime,
                        endtime: Audioendtime,
                        targetCategory: Audiocategory,
                        area: Audioarea,
                        TargetImpressions: parseInt(Audioimpressionlimit),
                        days: audiodays,
                        timelap: audiotime,
                        makemodel: Audiomakemodel,
                        platformType: Audioos,
                        GrandCity: AudioGrandCityval,
                        age: Audioage,
                        active: Audioactive === "true" ? true : false,
                        timeperiod: AudioTimeperiod,
                        frequency: AudioFrequency,
                        Linear: [{ Title: Audiocreative, type: "Audio", MediaFiles: req.files.AudioFileinp ? AudioMediaFiles : [{}] }],
                        strategy: strategy,
                        Companion: req.files.AudioFileBanner ? [{ Title: Audiocreative, type: "Audio", imageFiles: req.files.AudioFileBanner ? [{ Name: req.files.AudioFileBanner[0].filename }] : [{}] }] : [{}],
                    })
                    await Audiosubcamp.save();
                } catch (err) {
                    res.status(400).json({ error: err.message })
                }


            } else if (typ === "Video") {
                try {
                    const Videosubcamp = new SubCampaignMaster({
                        campaignid: mongoose.Types.ObjectId(campaignid),
                        Advertiser,
                        advertiserid: mongoose.Types.ObjectId(advertiserid),
                        AdTitle: lineitem,
                        adType: typ,
                        Pricing: VideoLtbudget ? parseInt(VideoLtbudget) : "",
                        Gender: Videogender,
                        trackurl: Videotrackurl,
                        pincode: VideoPincode ? VideoPincode : VideoPincodes,
                        language: VideoLanguage,
                        City: Videocityval,
                        State: VideoRegion,
                        endDate: Videoenddate ? Videoenddate : '',
                        startDate: Videostartdate ? Videostartdate : '',
                        starttime: Videostarttime,
                        endtime: Videoendtime,
                        targetCategory: Videocategory,
                        area: Videoarea,
                        TargetImpressions: Videoimpressionlimit ? parseInt(Videoimpressionlimit) : null,
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
                } catch (err) {
                    res.status(400).json({ error: err.message })
                }


            } else {

                try {
                    const Displaysubcamp = new SubCampaignMaster({
                        campaignid: mongoose.Types.ObjectId(campaignid),
                        Advertiser,
                        advertiserid: mongoose.Types.ObjectId(advertiserid),
                        AdTitle: lineitem,
                        adType: typ,
                        pincode: DisplayPincode ? DisplayPincode : DisplayPincodes,
                        Gender: Displaygender,
                        language: DisplayLanguage,
                        Pricing: DisplayLtbudget ? parseInt(DisplayLtbudget) : "",
                        trackurl: Displaytrackurl,
                        City: Displaycityval,
                        State: DisplayRegion,
                        endDate: Displayenddate ? Displayenddate : '',
                        startDate: Displaystartdate ? Displaystartdate : '',
                        starttime: Displaystarttime,
                        endtime: Displayendtime,
                        targetCategory: Displaycategory,
                        area: Displayarea,
                        TargetImpressions: Displayimpressionlimit ? parseInt(Displayimpressionlimit) : null,
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
                } catch (err) {
                    res.status(400).json({ error: err.message })
                }
            }
        })
        let directory = path.join(__dirname,'../public/uploads/')
        console.log(directory)
        let result3 = deletefiles(directory)
        if (result3.error) {
            return res.status(400).json({ error: result3.error.message })
        }
        console.log('jjhjhvvggcgfcff')
        res.status(200).json({ message: 'created successfuly!' })
    } catch (err) {
        console.log('main', err.message);
        res.status(400).json({ error: err.message });
    }
}