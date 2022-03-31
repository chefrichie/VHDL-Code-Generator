const fs = require('fs');


class Test{

    constructor(entity_name,input_array,output_array,boolean_function_strings,input_values_array,wait_duration)
    {
        this.LIBRARY_IMPORT = 'library IEEE;\n';
        this.USE_LIBRARY_COMPONENTS = 'use IEEE.std_logic_1164.all;\n';

        this.entity_name = entity_name;
        this.input_array = input_array;
        this.output_array = output_array;
        this.boolean_function_strings = boolean_function_strings;
        this.input_values_array = input_values_array;
        this.wait_duration = wait_duration;

        this.CODE = ''
        this.CODE += this.generateCode()
    }

    generate_Input_snippet(input_vars,input_values,wait){
        let ans = '';

        for(let i = 0;i<input_vars.length;i++)
        {
            ans += `\t\t${input_vars[i]} <= ${String(input_values[i])};\n`;
        }

        ans += `\t\twait for ${wait};\n\n`;

        return ans;
    }


    generateCode(){
        this.CODE += this.LIBRARY_IMPORT + this.USE_LIBRARY_COMPONENTS;
        
        this.CODE += `entity ${this.entity_name}_TB is\nend ${this.entity_name}_TB;\n`;
        this.CODE += `architecture TB of ${this.entity_name} is \n\n`;

        this.CODE += `component ${this.entity_name} is\nPort(\n`;
        
        for (let i of this.input_array)
        {
            this.CODE += `\t${i} : in std_logic;\n`
        }

        for (let i of this.output_array)
        {
            this.CODE += `\t${i} : out std_logic;\n`
        }

        this.CODE += `);\nend component;\n`

        this.CODE += `signal `;

        for (let i of this.input_array)
        {
            this.CODE += `${i},`
        }

        for (let i of this.output_array)
        {
            this.CODE += `${i},`
        }

        this.CODE = this.CODE.slice(0,-1);

        this.CODE +=` : std_logic\n\nbegin\n`;

        this.CODE += `\ttest_${this.entity_name} : ${this.entity_name} port map(`;

        for (let i of this.input_array)
        {
            this.CODE += `${i},`
        }

        for (let i of this.output_array)
        {
            this.CODE += `${i},`
        }

        this.CODE = this.CODE.slice(0,-1);

        this.CODE += `);\n`;

        this.CODE += 'process\n\tbegin\n';


        for(let i = 0;i<Math.pow(this.input_array.length,2);i++)
        {
            this.CODE += this.generate_Input_snippet(this.input_array,this.input_values_array[i],this.wait_duration);
        }

        this.CODE += '\twait;\n\tend process;\n\nend TB'
        return this.CODE;
    }


    showCode(){
        console.log(this.CODE);
    }
}


module.exports = Test;


