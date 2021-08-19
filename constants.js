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

var obj = { messages: messages, uploadPath: uploadPath, azureconnectionstring: azureconnectionstring, gmailSMTPCredentials: gmailSMTPCredentials, facebookCredentials: facebookCredentials, twitterCredentials: twitterCredentials, googleCredentials: googleCredentials };
module.exports = obj;
