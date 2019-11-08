var merge_count=0; //global count for the output files
function mergeJSON(folder,input_file,output_file,max_size,key_value)
{
    merge_count++;
    var file_size=0;
    var jsonSize=require('json-size');//func to determine size of json object
    var fs = require('fs');
    var results ={};
    var flag=0;
    results[key_value]=[];
    var folder_name = __dirname+"\\"+folder; 
    fs.readdirSync(folder_name).forEach((file) => { //reading the directory containing files to be merged
        if(file.indexOf(input_file)===0 && file.indexOf('json')===file.length-4)//checking if the file is .json and has the input name as prefix
        {
            raw_data=fs.readFileSync(__dirname+"\\"+folder+'\\'+file,'utf8');
            data=JSON.parse(raw_data);
            key=Object.keys(data);
            if(file_size+jsonSize(data)<=max_size)//checking if the file size is less than  the given max size
            {
                data[key_value].forEach((item)=>
                {
                    results[key_value].push(item);
                });
                file_size+=jsonSize(data[key_value]);
            }
            else
            {
                flag=1;
            }
        }
    });
    if(flag===1)
        console.log('The file limit exceeded the maximum size');
    results_string=JSON.stringify(results);
    fs.writeFileSync(__dirname+'\\'+folder+'\\'+output_file+merge_count+'.json',results_string);//writing the resultant merged objects into new file
}


mergeJSON('strikers','data','merge',200,"employee");
mergeJSON('strikers','data','merge',180,"strikers");


