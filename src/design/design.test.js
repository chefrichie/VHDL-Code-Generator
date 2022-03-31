const fs = require('fs');

(() => {
    const CONFIG = JSON.parse(fs.readFileSync('../config.json'));


    const entity_name = CONFIG["entity_name"];

    const input_array = CONFIG["input_ports"]
    const output_array = CONFIG["output_ports"]
    const boolean_function_strings = CONFIG["Boolean_Function_String"];


    const o1 = new Design(entity_name,input_array,output_array,boolean_function_strings);
    o1.showCode();
})();