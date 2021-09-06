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