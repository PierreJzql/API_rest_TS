export function justify (textToJustify : string, limitLength: number){
    const spaceNewLine: RegExp = RegExp("(?:\\.)(\\s\\n|\\n\\s)","g");
    const multiSpace: RegExp = RegExp("(\\n\\s{1,})","g");
    const endOfLine: RegExp = RegExp("\.$");

    let newTextToJustify: string = textToJustify.toString().replace(spaceNewLine,".\n").replace(multiSpace,"\n");

    let stringToLimitLength: RegExp = RegExp("(?:\\s|^)(.{1,"+ limitLength +"})(?=\\s|$)", "g");
    let resultWithLimitLength: string[] = [];
    let textJustified: string[] = [];
    let line: RegExpExecArray;

    while ((line = stringToLimitLength.exec(newTextToJustify))!== null){
        resultWithLimitLength.push(line[1]);
    };

    for (let i = 0; i<resultWithLimitLength.length - 1; i++){
        let result: (string | RegExp) = resultWithLimitLength[i];

        if (endOfLine.exec(result)[0] !=="."){
            
            if((result.indexOf(" ")) !== -1){

                while(result.length < limitLength){
                    for (let j = 0; j < result.length -1; j++){
                        if(result[j] == " "){

                            result = result.substring(0,j) + " " + result.substring(j);
                            if (result.length == limitLength) break;
                            while(result[j] == " ") j++;
                        
                        }
                    }
                }
            }
        }
        textJustified.push(result);
    }
    textJustified.push(resultWithLimitLength[resultWithLimitLength.length - 1]);
    
    return textJustified.join("\n");
};

