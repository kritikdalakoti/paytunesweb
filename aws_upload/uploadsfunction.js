    const AWS=require('aws-sdk')
    const path=require('path')
    AWS.config.loadFromPath(path.join(__dirname,'../config.json'))//('/paytunes_new/server/config.json');
    const { BlobServiceClient } = require("@azure/storage-blob");
    const constantObj=require('../constants')
        const AZURE_STORAGE_CONNECTION_STRING=constantObj.azureconnectionstring.cstring;//"DefaultEndpointsProtocol=https;AccountName=ptmfiles;AccountKey=Y4YuI3fVlI9lnuNlLP6u/NJkzrRsEqVRuSMlwO8LmMYg35w0G5/tbsrbG/CcdXzP0I+qh+DmmKxMnhpS0XXZdw==;EndpointSuffix=core.windows.net";
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
		const containerClient = blobServiceClient.getContainerClient('image');
        const containerClientAudio=blobServiceClient.getContainerClient('audio');

    const Etranscoder=new AWS.ElasticTranscoder();    

     exports.getAudios = async () => {
        const s3 = new AWS.S3();
      
        const items = await s3
          .listObjectsV2({
            Bucket: "outputbuckettranscoded",
            Prefix:'audio/'
          })
          .promise();
          console.log(items)
        // if (items.Contents) {
        //   return items.Contents.map((content) => content.Key) 
        // }
        
        throw new Error("No contents");
      };

exports.uploadMedia=async (dd,type)=>{
    
    let blockBlobClient = (type==='image'?containerClient:containerClientAudio).getBlockBlobClient(dd.filename);
    let uploadBlobResponse=await blockBlobClient.upload(dd.data,dd.data.byteLength)
    console.log(uploadBlobResponse)
}


    // [{
    //     Key: 'transcoded/video',
    //     PresetId: 'Preset_ID',
    //     // "SegmentDuration":'3', //Duration in segment on which transcoding is done as we chose HLS streaming
    //     // ThumbnailPattern: 'poster-{count}', //It is used to create snapshot of Video
    //     }]

   

exports.uploadAws=async function(data){
    try{
        let s3Bucket=new AWS.S3({params:{Bucket:'paytunesmusicads'}})
        await s3Bucket.putObject(data).promise();
    }catch(err){
        console.log(err)
    }
    
    // s3Bucket.putObject(data,(err,data)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('sssssss',data)
    //     }
    // })
}

exports.uploadtranscodedfile=async function ({key,container}){
    // const videos= await getVideos();
    // console.log('videos',videos)
    // for(video in videos){
        // console.log(typeof(videos[video]),videos[video])
        console.log( typeof(key) ,container)
        let key1=key.split('.');
        let params = {
            PipelineId: '1629397799617-jdjjh3', //PipelineId of Elastic transcoder
            // OutputKeyPrefix: 'transcoded' + '/',
            Input: {
            Key: key,  //Source path of video 
            Container: container
            },
            Outputs: constantObj.Presets.map(obj=>{
                return {Key:`${key1[0]}${obj.suffix}.${key1[1]}`,PresetId:`${obj.presetid}`}
            })
            
            }
            await Etranscoder.createJob(params).promise();
    //     Etranscoder.createJob(params,(err,data)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log('hj',data)
    //        }
    //    })
    
    
        
       
}

