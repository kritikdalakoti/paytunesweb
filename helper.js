const fs=require('fs')
const path=require('path')
exports.readdata = (filename) => {
    let results=[]
    let workbook=xlsx.readFile(path.join(__dirname,`../public/uploads/${filename}`))
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

exports.Presets=[
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