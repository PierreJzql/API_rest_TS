export function justify (textToJustify : string){

    let texte: Array<string> = textToJustify.split(" ");
    let taille: number = texte[0].length;
    let titre: string = texte[0];

    for(var i = 1; i < texte.length; i++) {
       
            taille = taille + texte[i].length;
            if(taille > 80) {

                titre +="\n"+texte[i] + " ";
                taille = texte[i].length + 1;

            } else {
                
                titre += " " + texte[i];
                taille += 1;

            }

    }
    console.log(titre);
    return titre;
};
