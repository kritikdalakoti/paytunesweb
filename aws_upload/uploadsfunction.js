    const AWS=require('aws-sdk')
    AWS.config.loadFromPath('/paytunesmusicads/config.json');
    const { BlobServiceClient } = require("@azure/storage-blob");
    const constantObj=require('../constants')
        const AZURE_STORAGE_CONNECTION_STRING=constantObj.azureconnectionstring.cstring;//"DefaultEndpointsProtocol=https;AccountName=ptmfiles;AccountKey=Y4YuI3fVlI9lnuNlLP6u/NJkzrRsEqVRuSMlwO8LmMYg35w0G5/tbsrbG/CcdXzP0I+qh+DmmKxMnhpS0XXZdw==;EndpointSuffix=core.windows.net";
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
		const containerClient = blobServiceClient.getContainerClient('image');
// uploadAudioAws = function(data, callback) {
//     var filetype = data.filetype;
//     var name1 = data.name;
//     var mimeType=data.type;
//     var name = name1.toLowerCase();
//     var filename = 'audio/' + name + '_' + Date.now() + '.' + filetype;
//     var b64string = data.file;
//     /* if (typeof Buffer.from === "function") {
//          // Node 5.10+
//          buf = Buffer.from(b64string, 'base64'); // Ta-da
//      } else {
//        */ // older Node versions
//     buf = new Buffer(b64string, 'base64'); // Ta-da
//     //}
//     if (buf != undefined) {
//         var Data = b64string; //data.file.split('base64,');
//         var base64Data = b64string; //Data[1];
//         var s3Bucket = new AWS.S3({ params: { Bucket: 'paytunesmusicads' } });
//         var dataimg = { Key: filename, Body: buf, ContentEncoding: 'base64', ContentType: mimeType };
//         s3Bucket.putObject(dataimg, function(err, data) {
//             if (err) {
//                 // console.log('Error uploading data: ', err);
//                 callback("Error uploading data");
//             } else {
//                 //console.log('succesfully uploaded the image!');
//                 callback(filename);
//             }
//         });
//         // End of Bucket
//     } else {
//         callback("Error uploading data");
//     }
// }

// uploadMedia = async function(data) {
//     var filetype = data.filetype;
//   var name1 = data.name;
//   var name2=name1.replace(/[^a-zA-Z0-9_]/gi, "");
//   var name = name2.toLowerCase();
//   var filename = name + '_' + Date.now() + '.' + filetype;
//   var b64string = data.file;
//   //var 
//  //if (typeof Buffer.from === "function") {
//         // Node 5.10+
//      //   buffer = Buffer.from(b64string, 'base64'); // Ta-da
//    // } else {
//   // older Node versions
//   buffer = new Buffer(b64string, 'base64'); // Ta-da
//  // }
// if (buffer != undefined) {    
//       var blobName = filename; //'quickstart' + + Date.now() + '.txt';
//       var blockBlobClient = containerClient.getBlockBlobClient(blobName);
//       var uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.byteLength );
//       filename='image/'+filename;
//       callback(filename);
//   } else {
//       callback("Error uploading data");
//   } 
// }

exports.uploadMedia=async (data)=>{
    
    let blockBlobClient=containerClient.getBlockBlobClient(data.filename);
    let uploadBlobResponse=await blockBlobClient.upload(data.encoded,data.encoded.length)
    console.log(uploadBlobResponse)
}

exports.uploadAws=async function(data){
    let s3Bucket=new AWS.S3({params:{Bucket:'paytunesmusicads'}})
    s3Bucket.putObject(data,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('sssssss')
        }
    })
}