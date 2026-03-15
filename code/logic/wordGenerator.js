// Lists of words for each difficulty level
let availableWords = 
{
    "easy": ["cat","dog","sun","sky","tree","leaf","grass","rock","sand","hill","lake","road","car","bus","bike","run","walk","jump","play","ball", "toy","game","book","pen","cup","plate","fork","spoon","bed","chair","desk","lamp","door","wall","roof","rain","wind","snow","cloud","star", "moon","day","night","light","dark","red","blue","green","yellow","white","black","small","big","tall","short","fast","slow","hot","cold","soft","hard","clean","dirty","happy","sad","laugh","smile","cry","shout","sing","dance","eat","drink","cook","bake","swim","climb","push","pull","open","close","start","stop","build","break","find","lose","give","take","hold","drop","turn","look","watch","hear","speak","think"],
    "normal": ["garden","forest","mountain","valley","desert","ocean","river","island","village","city","building","bridge","tunnel","station","airport","library","museum","theater","restaurant","market","bicycle","vehicle","engine","battery","computer","keyboard","monitor","network","program","website","internet","message","signal","camera","picture","video","music","melody","rhythm","artist","writer","reader","teacher","student","lesson","project","science","history","culture","language","journey","travel","explore","discover","create","design","develop","improve","progress","effort","energy","motion","balance","pattern","system","process","method","problem","solution","strategy","decision","memory","knowledge","wisdom","courage","patience","kindness","honesty","respect","freedom","justice","future","present","moment","chance","success","failure","challenge","adventure","mystery","legend","symbol","meaning","purpose","belief","opinion","debate","discuss"],
    "hard": ["architecture","biodiversity","civilization","communication","consciousness","constitution","controversy","coordination","creativity","declaration","demonstration","development","differentiation","documentation","effectiveness","electricity","engineering","environmental","equilibrium","experimentation","exploration","foundation","generation","globalization","hypothesis","identification","imagination","implementation","independence","infrastructure","innovation","integration","intelligence","interaction","interpretation","investigation","legislation","limitation","manipulation","mathematics","mechanism","negotiation","observation","optimization","organization","orientation","participation","perception","performance","phenomenon","philosophy","productivity","psychology","qualification","reconstruction","regulation","representation","responsibility","revolution","simulation","specialization","statistics","strategy","sustainability","technology","transformation","transportation","uncertainty","understanding","utilization","verification","visualization","vulnerability","collaboration","compatibility","confidentiality","credibility","dependency","efficiency","flexibility","functionality","probability","reliability","resilience","sophistication"],
    "impossible": ["antidisestablishmentarianism","floccinaucinihilipilification","pneumonoultramicroscopicsilicovolcanoconiosis","supercalifragilisticexpialidocious","hippopotomonstrosesquipedaliophobia","thyroparathyroidectomized","dichlorodifluoromethane","incomprehensibilities","disproportionableness","counterrevolutionaries","institutionalization","internationalization","characterization","electroencephalography","spectrophotometrically","immunohistochemistry","hypercholesterolemia","psychopharmacological","neurophysiological","electrophysiological","magnetohydrodynamics","incompressibilities","mischaracterization","overintellectualization","compartmentalization","deinstitutionalization","disproportionateness","ultramicroscopically","crystallographically","anthropomorphization","commercialization","demilitarization","hyperventilation","photosensitization","electrocardiographically","endocrinologically","interdisciplinarity","microarchitecture","pharmacokinetics","psychoneuroimmunology","thermodynamically","incomprehensibility","counterproductiveness","electrochemically","hyperresponsiveness","incomprehensibleness","disproportionability"],
}

// Function to generate a random word based on the current mode and score
function generateWord(mode, score)
{
    // If score is 0 or not provided, return a random word from the current mode
    if (score == 0 || !score)
    {
        return random(availableWords[mode]);
    }
    else
    {
        // Generate a random value based on the score
        let randomValue = random(0, score / 10);

        // Check if the random value is less than 1 or if the mode is "impossible"
        if (randomValue < 1 || mode === "impossible")
        {
            // Return a random word from the current mode
            return random(availableWords[mode]);
        }
        else
        {
            // Determine the next mode based on the current mode
            let nextMode;
            nextMode = mode === "easy" ? "normal" : mode === "normal" ? "hard" : "impossible";

            // Check if the random value is greater than 3 and the next mode is not "impossible"
            if (randomValue > 3 && nextMode !== "impossible")
            {
                // Determine the next mode after the next mode based on the next mode
                let next2Mode;
                next2Mode = nextMode === "easy" ? "normal" : nextMode === "normal" ? "hard" : "impossible";
                
                // Return a random word from the next mode after the next mode
                return random(availableWords[next2Mode]);
            }

            // Return a random word from the next mode
            return random(availableWords[nextMode]);
        }
    }
}