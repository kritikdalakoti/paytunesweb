const messages = {
    "errorRetreivingData": "Error occured while retreiving the data from collection",
    "successRetreivingData": "Data retreived successfully from the collection",
    //forgot password
    "successSendingForgotPasswordEmail": "Password sent successfully",
    //user message
    "userSuccess": "User saved successfully",
    "userStatusUpdateFailure": "Error occured while updating Status",
    "userStatusUpdateSuccess": "User update successfully",
    "userDeleteFailure": "Error occured while deleting the user",
    "userDeleteSuccess": "User(s) deleted successfully",
    "userUpdateSuccess": "User updated successfully",
    //campaign message
    "streamingadSuccess": "Streaming Ad has been saved successfully.",
    "streamingadStatusUpdateFailure": "An error has been occured while updating Streaming Ad.",
    "streamingadStatusUpdateSuccess": "Streaming Ad has been updated successfully.",
    "streamingadDeleteFailure": "An error has been occured while deleting the Streaming Ad.",
    "streamingadDeleteSuccess": "Streaming Ad(s) deleted successfully.",
}
const uploadPath = { "path": "/var/html/paytunesmusicads/uploads/" }
const azureconnectionstring = { "cstring": "DefaultEndpointsProtocol=https;AccountName=ptmfiles;AccountKey=Y4YuI3fVlI9lnuNlLP6u/NJkzrRsEqVRuSMlwO8LmMYg35w0G5/tbsrbG/CcdXzP0I+qh+DmmKxMnhpS0XXZdw==;EndpointSuffix=core.windows.net" }
const gmailSMTPCredentials = {
    "service": "gmail",
    "host": "smtp.gmail.com",
    "username": "username",
    "password": "password"

}


const facebookCredentials = {
    "app_id": "1655859644662114",
    "secret": "62da09d9663d9f8315e873abfdbbe70f",
    "token_secret": process.env.token_secret || 'JWT Token Secret'
}

const twitterCredentials = {
    "consumer_key": "q2doqAf3TC6Znkc1XwLvfSD4m",
    "consumer_secret": "Yrfi1hr84UMoamS2vnJZQn6CeP8dHsv6XjDoyRqsfzSNwyFQBZ"
}

const googleCredentials = {
    "client_secret_key": "leWdLHJOoo9g6B9oLCV1lMqY"
}

const Presets=[
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

const AudioMediaFiles=[
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

var obj = { messages: messages, uploadPath: uploadPath, azureconnectionstring: azureconnectionstring, gmailSMTPCredentials: gmailSMTPCredentials, facebookCredentials: facebookCredentials, twitterCredentials: twitterCredentials, googleCredentials: googleCredentials,Presets,AudioMediaFiles };
module.exports = obj;
