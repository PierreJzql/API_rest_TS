export function justify (textToJustify : string, limitLength: number){
    const spaceNewLine: RegExp = RegExp("(?:\\.)(\\s\\n|\\n\\s)","g");
    const multiSpace: RegExp = RegExp("(\\n\\s{1,})","g");
    const endOfLine: RegExp = RegExp("\.$");

    let newTextToJustify: string = textToJustify.replace(spaceNewLine,".\n").replace(multiSpace,"\n");

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
    
    console.log(textJustified.join("\n"))
    return textJustified.join("\n");
};

justify(`Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint le bon. 

    Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
     Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.
     `,80);