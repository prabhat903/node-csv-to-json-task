const fs = require('fs');
const path =  require('path');

const convert = (csvpath) => {
	const getCSV = (from,callback)=>{
		console.log(path.join(__dirname,from));
		fs.readFile(path.join(__dirname,from),{encoding: 'utf-8'},(error,data)=>{
			if(error) {return callback(error);}
			var arr = data.split(/\r\n/ig);
			var keys = arr.shift().split(',');
			var result = [];
			console.log(arr.length);
			for(var k=0; k<arr.length-1;k++){
				result.push({});
				arr[k].split(',').forEach((ele,ind)=>{
					result[k][keys[ind]] = ele;
				});
			}
			console.log(result.length)
			callback(null,JSON.stringify(result,null,2));
		});
	};
	const createJSON = (error,data)=>{
		if(error) return console.log(error);
		if(fs.existsSync()){fs.mkdir('JSON_output');}
		fs.writeFileSync(path.join(__dirname,'./JSON_output/customer-data.json'),data);
		console.log(`please find JSON in this path ${path.join(__dirname,'./JSON_output')}.`);
	};
	getCSV(csvpath,createJSON);
}
convert(process.argv[2]);
