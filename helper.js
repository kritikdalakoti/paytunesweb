const fs=require('fs')
const path=require('path')

const xlsx = require('xlsx')

exports.readdata = (filename) => {
    let results=[]
    let workbook=xlsx.readFile(path.join(__dirname,`/public/uploads/${filename}`))
    var sheet_name_list = workbook.SheetNames;
    let xl_data=xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    if(!xl_data[0].Pincode){
        console.log('hhh')
        throw new Error('Uploaded pincode file does not contain Pincode field! Hint: "Pincode" field should be there')
    }
    xl_data.forEach(data=>results.push(data.Pincode))
    return results
}

exports.deletefiles= (directory)=>{
    try{
        
        let files=fs.readdirSync(directory)
        for(const file of files){
            fs.unlinkSync(path.join(directory,file))
        }
        return {message:"Successfuly Deleted files!"}
    }catch(err){
        return {error:err}
    }
    
}
 exports.AudioMediaFiles=[
    {Bitrate:"64k",Codec:"audio/3gpp"},
    {Bitrate:"32k",Codec:"audio/3gpp"},
    {Bitrate:"256k",Codec:"audio/3gpp"},
    {Bitrate:"128k",Codec:"audio/3gpp"},
    {Bitrate:"320k",Codec:"audio/3gpp"},
    {Bitrate:"256k",Codec:"audio/ogg"},
    {Bitrate:"320k",Codec:"audio/ogg"},
    {Bitrate:"64k",Codec:"audio/ogg"},
    {Bitrate:"128k",Codec:"audio/ogg"},
    {Bitrate:"122k",Codec:"audio/ogg"},
    {Bitrate:"147k",Codec:"audio/ogg"},
]

exports.AudioPresets=[
    {presetid:"1511961081949-fixp1n",suffix:"_64k.mp3"},
    {presetid:"1515665713054-yl0raf",suffix:"_32k.mp3"},
    {presetid:"1515665815957-smmpwv",suffix:"_256k.mp3"},
    {presetid:"1351620000001-300040",suffix:"_128k.mp3"},
    {presetid:"1351620000001-300010",suffix:"_320k.mp3"},
    {presetid:"1597729893820-oiit43",suffix:"_256k.ogg"},
    {presetid:"1597729987666-t2qhi0",suffix:"_320k.ogg"},
    {presetid:"1597730018059-but8ns",suffix:"_64k.ogg"},
    {presetid:"1597730034884-o7j3db",suffix:"_128k.ogg"},
    {presetid:"1599740192753-hth1bo",suffix:"_122k.ogg"},
    {presetid:"1599740235903-3r7sp3",suffix:"_147k.ogg"}
]

exports.VideoPresets=[
    {presetid:"1634143440739-bn0odt",suffix:"_428 × 640.mp4"},
    {presetid:"1634143532968-dtnssb",suffix:"_854 × 1280.mp4"},
    {presetid:"1634143610894-ru2bnz",suffix:"_1280 × 1920.mp4"},
    {presetid:"1634143765167-ps04e8",suffix:"_426 × 640.webm"},
    {presetid:"1634144532742-f1t641",suffix:"_570 × 854.webm"},
    {presetid:"1634144613376-8ynq7d",suffix:"_854 × 1280.webm"},
    {presetid:"1634144763743-78o220",suffix:"_1280 × 1920.webm"},
    {presetid:"1634144846855-e72lh8",suffix:"_570 × 854.mp4"},
    {presetid:"1634144931088-5lxg6z",suffix:"_1280 × 1920_2387.mp4"},
    {presetid:"1634144991512-3404m4",suffix:"_320 × 480.mp4"},
    {presetid:"1634145416928-6msrxw",suffix:"_428 × 640_198.mp4"},
    {presetid:"1634145900009-rrxhwy",suffix:"_428 × 640_259.mp4"},
    {presetid:"1634145992437-7j1404",suffix:"_428 × 640_197.mp4"},
    {presetid:"1634146072225-9j8vto",suffix:"_480 × 720.mp4"},
    {presetid:"1634146184630-x57i88",suffix:"_682 × 1024.mp4"}
]

exports.VideoMediaFiles=[
    {Bitrate:"199k",Codec:"video/mp4"},
    {Bitrate:"879k",Codec:"video/mp4"},
    {Bitrate:"1398k",Codec:"video/mp4"},
    {Bitrate:"111k",Codec:"video/webm"},
    {Bitrate:"165k",Codec:"video/webm"},
    {Bitrate:"340k",Codec:"video/webm"},
    {Bitrate:"559k",Codec:"video/webm"},
    {Bitrate:"275k",Codec:"video/mp4"},
    {Bitrate:"2387k",Codec:"video/mp4"},
    {Bitrate:"135k",Codec:"video/mp4"},
    {Bitrate:"198k",Codec:"video/mp4"},
    {Bitrate:"259k",Codec:"video/mp4"},
    {Bitrate:"197k",Codec:"video/mp4"},
    {Bitrate:"237k",Codec:"video/mp4"},
    {Bitrate:"344k",Codec:"video/mp4"}
]

// ["Audiostrategy",false],
//     ["Audiobudget",false],
//     ["Audiosubcampname",false],
//     ["Audioimplimit",false],
//     ["Audiostartdate",false],
//     ["Audioenddate",false],
//     ["Audiostarttime",false],
//     ["Audiosize",false],
//     ["Audiotrackurl",false],
//     ["Audiocreativename",false],
//     ["Audiofrequency",false],
//     ["Audiotimeperiod",false],
//     ["Audioregion",false],
//     ["Audioage",false],
//     ["Audiocity",false],
//     ["Audiogender",false],
//     ["Audiolanguage",false],
//     ["Audiooperatingsystem",false],
//     ["Audiomakemodel",false],
//     ["Audioarea",false],
//     ["Audiopincode",false],
//     ["Audiodays",false],
//     ["Audiotime",false],
//     ["Audioimpressionurl",false],
//     ["Audiograndcity",false],