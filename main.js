const fs = require('fs');
const path = require('path');

const Design = require('./src/design/design.js')
const Test = require('./src/test/test')
function read_from_file(filename){
    return JSON.parse(fs.readFileSync(`./configs/${filename}`));
}




// Main Function
(() => {
    let config_array = [];

    let files = fs.readdirSync('./configs');

    for(let i of files)
        config_array.push(read_from_file(i));
    
    
    for(i of config_array)
    {
        const entity_name = i["entity_name"];
    
        const input_array = i["input_ports"]
        const output_array = i["output_ports"]
        const boolean_function_strings = i["Boolean_Function_String"];
        const input_values_array = i["input_values_array"];
        const wait_duration = i["wait_duration"];


        const o1 = new Design(entity_name,input_array,output_array,boolean_function_strings);
        const generated_design_code = o1.CODE;

        const o2 = new Test(entity_name,input_array,output_array,boolean_function_strings,input_values_array,wait_duration);
        const generated_test_code = o2.CODE;

        if (!fs.existsSync('./res')) {
            fs.mkdirSync('./res');
        }

        fs.mkdirSync(`./res/${entity_name}`);

        fs.writeFileSync(`./res/${entity_name}/design.txt`,String(generated_design_code));
        fs.writeFileSync(`./res/${entity_name}/test.txt`,String(generated_test_code));

    }

})();