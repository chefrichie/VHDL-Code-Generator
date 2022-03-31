class Design{

    constructor(entity_name,input_array,output_array,boolean_function_strings)
    {
        this.LIBRARY_IMPORT = 'library IEEE;\n';
        this.USE_LIBRARY_COMPONENTS = 'use IEEE.std_logic_1164.all;\n';

        this.entity_name = entity_name;
        this.input_array = input_array;
        this.output_array = output_array;
        this.boolean_function_strings = boolean_function_strings;

        this.CODE = ''
        this.CODE += this.generateCode()
    }

    generateCode(){
        this.CODE += this.LIBRARY_IMPORT + this.USE_LIBRARY_COMPONENTS;
        this.CODE += `entity ${this.entity_name} is\n Port(\n`;

        for (let i of this.input_array)
        {
            this.CODE += `\t${i} : in STD_LOGIC;\n`
        }

        for (let i of this.output_array)
        {
            this.CODE += `\t${i} : out STD_LOGIC;\n`
        }

        this.CODE += `);\nend ${this.entity_name};\n\n\n`;



        this.CODE += `architecture Behavioral of ${this.entity_name} is\nbegin\n`;
        
        for(let i = 0;i<this.output_array.length;i++)
        {
            this.CODE += `${this.output_array[i]} <= ${this.boolean_function_strings[i]};\n`;
        }
    
        this.CODE += 'end Behavioral;\n';
        
        return this.CODE;
    }


    showCode(){
        console.log(this.CODE);
    }
}


module.exports = Design;