//GLOBAL VARS HERE
       let baseName ="";
       let baseNumber = 0;
       let savedTextName = "savedText";
       let  classCharIndex ;
       let activeYodVowel = false;
       let yodVowelOffset = 0;
       let dageshOffset = 0;
       let metegOffset = 0;
       let origRight ="";
       let origLeft = "";
       let backupText = "";
       let savedEditText = "";
       let letterGroupRight = "";
       let savePending = false;
       let letterGroupLeft =  "";
       let letterGroupReserved = "";
       let overlay;  // The transparent overlay
       let returnedTrope ;
        let editMode = "info";
        let returnedVowel ;
        let returnedYodVowelName;
        let returnedYodVowelChar;
        let dageshAllowed = true;
        let activeEdit = false;
        let activeEdit2 = false;
        let activeGroupEdit = false;
        let baseLetterIndex = -1;
        let vowelIndex = -1;
        let tropeIndex =-1;
        let vavHolamIndex = -1;
        let dageshIndex = -1;
        let metegIndex = -1;
        let punctuationIndex = -1;
        let yodVowelIndex = -1;
        let startingIndex = -1;
        let popupTextId ;
        let originalText ;
         let startEdit = true;
        let noLetterGroup = true;
        let letterCount = 0;
        let  letterPositions = [-1];
        let specialVavPositions = [];
        let specialYodPositions = [];
        let finalCount = 0;
        let finalPosition = 0;
         let pendingMappiq = false;
         let lastVowelPosition = -1;
          let lastVavHolamPosition = -1;
         let lastLetterAdded = "";
         let hasMeteg= false;
         let hasDagesh = false;
         let hasTrope = false;
	 let hasVowel = false;
         let hasVavHolam = false;
         let hasPunctuation = false;
         let hasSoffit = false;
         let isVavHolam = false; 
         let extraShift = 0;
        let lastLetterCode = "";
        let previousText = "";
        let recoveredText = "";
        let recoveredVavs = [];
        let answer = "";
         let basicLettersArray = [];
         let soffitLettersArray = [];
         let punctuationArray = [];
         let hebrewVowelsArray = [];
         let hebrewVowelsArrayShort = [];
         let tropeSymbolsArray = [];
         let yodVowelsArray = ["tsere_yod","hiriq_yod","qamats_yod","shiruq_yod","holam_yod","patah_yod","segol_yod","qamats_yod_hiriq","qamats_yod_vav"];
         let vavVowelsArray = ["shiruq","vav_holam"];
         let dageshArray = ["dagesh"];
         let metegArray =  ["meteg"];
         let okLetters = [];
         let everyLetter = [];
         let onlyBasicLetters = [];
         let sofPasuk_period = [];
         let space_maqaf_pasek = [];
         let soffitOK = [];
         let vowelsOK = [];
         let tropeOK = [];
         let newLetterPosition;
         let newLetterType;
         let newLetter;
         const elements = {};
         let seclectedGroupNumber ;
        let lastCursorPosition = -1; // Global var for editiing text string
        const mainText = document.querySelector(".main_text");               
        let textBox1 ;
        let textBox2 ;
        // Hebrew character constants (using Unicode escape sequences)
        //  use the name of the dotter letter as the base name and add _dagesh for its dotted partner.  Could be reversed later.
        const aleph = "\u05D0"; // א
        const bet_dagesh = "\uFB31"; // בּ
        const bet = "\u05D1"; // ב
        const gimel = "\u05D2"; // ג
        const dalet = "\u05D3"; // ד
        const hey = "\u05D4"; // ה
        const vav = "\u05D5"; // ו
        const zayin = "\u05D6"; // ז
        const chet = "\u05D7"; // ח
        const tet = "\u05D8"; // ט
        const yod = "\u05D9"; // י
        const khaf_dagesh = "\uFB3B"; // כּ
        const kaf = "\u05DB"; // כ
        const lamed = "\u05DC"; // ל
        const mem = "\u05DE"; // מ
        const nun = "\u05E0"; // נ
        const samekh = "\u05E1"; // ס
        const ayin = "\u05E2"; // ע
        const peh_dagesh = "\uFB44"; // פּ
        const peh = "\u05E4"; // פ
        const tsade = "\u05E6"; // צ
        const qof = "\u05E7"; // ק
        const resh = "\u05E8"; // ר
        const shin = "\uFB2A"; // שׁ
        const sin = "\uFB2B"; // שׂ
        const sof_dagesh = "\uFB4A";
        const sof = "\u05EA"; // ת

        baseName = window.location.pathname.split('/').pop();
        baseName = baseName.replace(".html","");
        let right3 = baseName.slice(-3);
        let isNotNumber;
        let baseNumberString = "";
        isNotNumber = isNaN(right3);
        
       if (!isNotNumber) {
        baseNumberString = right3;
           }  else {
           right3 = right3.slice(-2);
            isNotNumber = isNaN(right3);
              if (!isNotNumber) {
              baseNumberString = right3;
                }  else   {      
                  right3 = right3.slice(-1);
                 isNotNumber = isNaN(right3);
                          if (!isNotNumber ) {
                           baseNumberString = right3;
                            }
                 }
             }

     //   alert (baseName + "  "  + baseNumberString);
          if (baseNumberString != "") {
           baseNumber = Number(baseNumberString);
           savedTextName = savedTextName + baseNumberString;
           }
           else {
            baseNumber = -1;
            }

          
       const noDageshLetters = [aleph, chet, ayin, resh, bet, kaf, peh, sof];
        //  dagesh is allowed in hey but logic to check if final letter because this is a mappiq using same symbol
        // dagesh in not allowed in a letter that has a unified symbol for its dotter pair. 
        //  of the six begedkefet letters 4 have uniifed dotte so the other two are not excluded.  

        // Constants for soffit letters
        const soffitKaf_dagesh = "\uFB3A"; // ךּ
        const soffitKaf = "\u05DA"; // כ
        const soffitMem = "\u05DD"; // ם
        const soffitNun = "\u05DF"; // ן
        const soffitPeh_dagesh  = "\uFB43"; // ףּ
        const soffitPeh = "\u05E3"; // ף
        const soffitTsade = "\u05E5"; // ץ

        // Define structured letter data (updated order to match constant declarations)
        const basicLetters = [
            { letter: aleph, variable: "aleph" },
            { letter: bet_dagesh, variable: "bet_dagesh" },
            { letter: bet, variable: "bet" },
            { letter: gimel, variable: "gimel" },
            { letter: dalet, variable: "dalet" },
            { letter: hey, variable: "he" },
            { letter: vav, variable: "vav" },
            { letter: zayin, variable: "zayin" },
            { letter: chet, variable: "chet" },
            { letter: tet, variable: "tet" },
            { letter: yod, variable: "yod" },
            { letter: khaf_dagesh, variable: "khaf_dagesh" },
            { letter: kaf, variable: "kaf" },
            { letter: lamed, variable: "lamed" },
            { letter: mem, variable: "mem" },
            { letter: nun, variable: "nun" },
            { letter: samekh, variable: "samekh" },
            { letter: ayin, variable: "ayin" },
            { letter: peh_dagesh, variable: "peh_dagesh" },
            { letter: peh, variable: "peh" },
            { letter: tsade, variable: "tsade" },
            { letter: qof, variable: "qof" },
            { letter: resh, variable: "resh" },
            { letter: shin, variable: "shin" },
            { letter: sin, variable: "sin" },
            { letter: sof_dagesh, variable: "sof_dagesh" },
            { letter: sof, variable: "sof" }
        ];

        const soffitLetters = [
            { letter: soffitKaf_dagesh, variable: "soffitKaf_dagesh" },
            { letter: soffitKaf, variable: "soffitKaf" },
            { letter: soffitMem, variable: "soffitMem" },
            { letter: soffitNun, variable: "soffitNun" },
            { letter: soffitPeh_dagesh, variable: "soffitPeh_dagesh" },
            { letter: soffitPeh, variable: "soffitPeh" },
            { letter: soffitTsade, variable: "soffitTsade" }
        ];

        const punctuation = [
            { letter: "\u05BE", variable: "maqaf" }, // Maqaf
            { letter: "\u05C3", variable: "sofPasuk" }, // Sof Pasuk
            { letter: ".", variable: "period" }, // Period
            { letter: "\u0020", variable: "space" }, // Space
            { letter: "\u05C0", variable: "pasek" } // Pasek
        ];
         
        const space = "\u0020";

        
        // Compute padding sizes
        const padSizeBasic = (8 - (basicLetters.length % 8)) % 8;
        const padSizeSoffit = (8 - (soffitLetters.length % 8)) % 8;
        const padSizePunctuation = (8 - (punctuation.length % 8)) % 8;

        // Create padding objects with empty string for display, "nullSpace" for variable tracking
        const paddingBasic = Array(padSizeBasic).fill({ letter: "", variable: "nullSpace" });
        const paddingSoffit = Array(padSizeSoffit).fill({ letter: "", variable: "nullSpace" });
        const paddingPunctuation = Array(padSizePunctuation).fill({ letter: "", variable: "nullSpace" });

        // Combine all sections with padding
        let allLetters = basicLetters.concat(paddingBasic, soffitLetters, paddingSoffit, punctuation, paddingPunctuation);

        // Populate the grid
        const grid = document.getElementById("hebrewGrid");
        let row = [];

       // const basicLetters = [
       //     { letter: aleph, variable: "aleph" },
       
       let nullCounter = 0;

        allLetters.forEach((item, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // Handle text and padding
            cell.textContent = item.letter;
            cell.setAttribute("data-variable", item.variable);
            if (item.variable === "nullSpace" ) {
            nullCounter = nullCounter + 1;
            cell.id = item.variable + nullCounter +"Div";  // Optional: Assign ID
            cell.classList.add("nullClass");
            } else {
              cell.id = item.variable+"Div";  // Optional: Assign ID
             } 
            // Highlight space character
            if (item.letter === " " || item.variable === "space") {
                cell.classList.add("highlight");
            }

            row.push(cell);

            if (row.length === 8) {
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("row");

                row.reverse().forEach(cell => rowDiv.appendChild(cell)); // Reverse for RTL order

                grid.appendChild(rowDiv);
                row = []; // Reset row
            }
        });

        // Append any remaining cells
        if (row.length > 0) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            row.reverse().forEach(cell => rowDiv.appendChild(cell));

            grid.appendChild(rowDiv);
        }
//populate variable name arrays
basicLetters.forEach ((item,index) => {
basicLettersArray.push(item.variable);
});

soffitLetters.forEach ((item,index) => {
soffitLettersArray.push(item.variable);
});

punctuation.forEach ((item,index) => {
punctuationArray.push(item.variable);
});



let spaceVar = document.getElementById("spaceDiv")?.id;  

// Add appropriate classes based on category, only for cells inside hebrewGrid
grid.querySelectorAll(".cell").forEach(cell => {
 
    let varName = cell.id.replace("Div", ""); // Remove 'Div' suffix
    
    if (basicLettersArray.includes(varName)) {
       cell.classList.add("basicLetterClass");
       //cell.style.backgroundColor = "LightYellow"; // Directly apply background color
    } else if (soffitLettersArray.includes(varName)) {
        cell.classList.add("soffitLetterClass");
    } else if (punctuationArray.includes(varName) && cell.id !== spaceVar) {  
        cell.classList.add("punctuationClass");
    }
});


        //LETTER LISTENER 
        // Event listener to log variable name when main letter grid is clicked
        grid.addEventListener("click", async function(event) {
            const target = event.target;
            let mainText = document.querySelector(".main_text");
            var fullText =  mainText.textContent;
            if (target.classList.contains("cell")) {
                const variableName = target.getAttribute("data-variable");
                console.log("Clicked on: " + variableName);
                //alert("Clicked on: " +  variableName);
                var newText = target.textContent; // Extract visible text from the grid cell
                if (newText != " ") {
                newText.trim();
                }
            let oldCharacterType = classifyCharacter(mainText.textContent[lastCursorPosition - 1]);
            let oldCharacterVariable = oldCharacterType.variable;
            let newCharacterType = classifyCharacter(newText);  
            let newCharacterCode = newCharacterType.letterCode;

      // handle pendingMappiq
              if ( !( ( pendingMappiq === true)  && ((newCharacterCode === "P")) ) === true  ) {
              // don't insert the mappiq  aka dagest at the current position befoe the nex characer is added.
                pendingMappiq = false;
              }
       const  okToAdd = checkPermissions(variableName);
             if (newCharacterCode === "P") {
                 // switch (oldCharacterVariable ) {
                switch (variableName) {
                    case "sofPasuk":
                    case "period":
                    okLetters = [];
                     okLetters.push("space");
                     break;
                   case "space":
                   case "maqaf":
                   case  "pasek":
                    okLetters = [].concat(onlyBasicLetters);
                   break;
                 } // end switch
               }  // if punctuation
        
                 if (okToAdd === true) {
                //alert ("has vowels: " + hasVowel + " last Letter added: " + lastLetterAdded);
                answer = "NO";
                if ((lastLetterAdded === hey) && (hasVavHolam === true)) {   // vav holam not allowed on final Hey
                let workingText = "";
                workingText = fullText;
                workingText =  workingText.slice(0, lastVavHolamPosition - 1 ) + workingText.slice(lastVavHolamPosition );  // adjust for lastVowelPosition offset
                lastCursorPosition = lastCursorPosition -1 ;  // adjust for the removed letter
                 hasVowel = false;   
                 hasVavHolam = false;  
                mainText.textContent = workingText;  
                 xOver("Letter Listener") ;
                };

                if ((lastLetterAdded === hey) && (hasVowel === true)) {
                 //doModal("Warning:  Previous hey is now a final letter in the word and has vowels attached");
               answer = await doModal("Warning:  Previous hey is now a final letter in the word and has vowels attached", "Reply Yes to Remove", "Yes");
                  }
                if (answer === "YES" ) {
                 let workingText = "";
                 workingText = fullText;
                 if ( hasVavHolam === false) {
                 workingText =  workingText.slice(0, lastVowelPosition - 1 ) + workingText.slice(lastVowelPosition );  // adjust for lastVowelPosition offset
                 } else {
                 workingText =  workingText.slice(0, lastVowelPosition  ) + workingText.slice(lastVowelPosition + 1);  // adjust for lastVowelPosition offset on vav Holam
                  }
                 lastCursorPosition = lastCursorPosition -1 ;  // adjust for the removed letter
                  hasVowel = false;    
                  hasVavHolam = false; 
                 mainText.textContent = workingText;  
                 xOver("Last letter hey") ;
                //doModal("Removing vowels from final Hey. Current text string: " + workingText );
                 }

        // if there is a pending mappiq add it first and increment the cursor position
                if (pendingMappiq === true) {
                 insertCharacterAtPosition(dagesh);
                 pendingMappiq = false;
                 lastCursorPosition = lastCursorPosition + 1;
                 }
                insertCharacterAtPosition(newText);
                xOver("pending mapiq") ;
                lastLetterAdded = newText;
                hasVowel = false;
                hasTrope = false;
                hasPunctuation = false;
                // need to set dagesh permissions 
                dageshAllowed = true;
                hasDagesh = false;
                hasMeteg = false;
                hasVavHolam = false;
                if (noDageshLetters.indexOf(newText) > -1 ) {
                  dageshAllowed = false;
                  }
                 }
              }
             activeYodVowel = false;
             yodVowelOffset = 0;
        xOver("end of letter listerner");
        });


      function checkPermissions(vName) {
        returnV = false;
       if (okLetters.includes(vName)) {
        returnV = true;
       }
        return returnV;
      }


    // New Hebrew vowel constants (using Unicode escape sequences)
    const shevah = "\u05B0";
    const hataf_segol = "\u05B1";
    const hataf_patah = "\u05B2";
    const hataf_qamats = "\u05B3";
    const hiriq = "\u05B4";
    const tsere = "\u05B5";
    const segol = "\u05B6";
    const patah = "\u05B7";
    const qamats = "\u05B8";
    const holam = "\u05B9";
    const dagesh = "\u05BC";
    const qubuts = "\u05BB";
    const shiruq = "\uFB35";
    const vav_holam = "\uFB4B";
    const meteg =  "\u05BD";

// yod vowels
     const tsere_yod = tsere + yod;
     const hiriq_yod = hiriq + yod;
     const qamats_yod = qamats + yod;
     const qamats_yod_hiriq = qamats + yod + hiriq;
     const qamats_yod_vav = qamats + yod + vav;
     const shiruq_yod = shiruq + yod;
     const holam_yod = vav_holam + yod;
     const patah_yod = patah + yod;
     const segol_yod = segol + yod;
    // Define structured vowel data
    const hebrewVowels = [
        { letter: shevah, variable: "shevah" },
        { letter: hataf_segol, variable: "hataf_segol" },
        { letter: hataf_patah, variable: "hataf_patah" },
        { letter: hataf_qamats, variable: "hataf_qamats" },
        { letter: hiriq, variable: "hiriq" },
        { letter: tsere, variable: "tsere" },
        { letter: segol, variable: "segol" },
        { letter: patah, variable: "patah" },
        { letter: qamats, variable: "qamats" },
        { letter: holam, variable: "holam" },
        { letter: dagesh, variable: "dagesh" },
        { letter: qubuts, variable: "qubuts" },
        { letter: shiruq, variable: "shiruq" },
        { letter: vav_holam, variable: "vav_holam" },
        { letter: meteg, variable: "meteg"}
    ];

hebrewVowels.forEach ((item,index) => {
hebrewVowelsArray.push(item.variable);
});
const vavVowels = [
    { letter: shiruq, variable: "shiruq" },
    { letter: vav_holam, variable: "vav_holam" }
];

const yodVowels = [
    {letter: tsere_yod , variable: "tsere_yod"}, 
    {letter: hiriq_yod , variable: "hiriq_yod"},
    {letter: qamats_yod , variable: "qamats_yod"},
    {letter: shiruq_yod , variable: "shiruq_yod"},
    {letter: holam_yod  , variable: "holam_yod"},
    {letter: patah_yod ,  variable: "patah_yod"},
    {letter: segol_yod ,  variable: "segol_yod"},
    {letter: qamats_yod_hiriq , variable: "qamats_yod_hiriq"},
    {letter: qamats_yod_vav , variable: "qamats_yod_vav"}
];

const dageshVowels = [
{ letter: dagesh, variable: "dagesh" }
];

const metegVowels = [
{ letter: meteg, variable: "meteg" }
];

         let dipthongCharArray = [];
         dipthongCharArray.push(tsere + yod);
         dipthongCharArray.push(hiriq + yod);
         dipthongCharArray.push(qamats + yod);
         dipthongCharArray.push(shiruq + yod);
         dipthongCharArray.push(vav_holam + yod);
         dipthongCharArray.push(patah + yod);
         dipthongCharArray.push(segol + yod);
         dipthongCharArray.push(qamats + yod + hiriq );
         dipthongCharArray.push(qamats + yod+ vav );

    // Padding size for vowels 
     let totalVowelLength = hebrewVowels.length + yodVowels.length;
      const padSizeVowels = (8 - (totalVowelLength % 8)) % 8;

    // Create padding objects with empty string for display, "nullSpace" for variable tracking
    const paddingVowels = Array(padSizeVowels).fill({ letter: "", variable: "nullSpace" });

    // Combine vowel section with padding
    let allVowels = [];
    allVowels = allVowels.concat(hebrewVowels);
    allVowels = allVowels.concat(yodVowels);
    allVowels = allVowels.concat(paddingVowels);

    // Populate the second grid
    const grid2 = document.getElementById("hebrewGrid2");
    let rowVowels = [];
      allVowels.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Handle text and padding
       cell.textContent = "\u00A0" + item.letter;
        cell.setAttribute("data-variable", item.variable);
        cell.id = item.variable+"Div";  // Optional: Assign ID
         if (item.variable != "nullSpace") {
       cell.classList.add("vowelLetterClass");
      // cell.style.backgroundColor = "Lavender"; // Directly apply background color
     }  else {
        nullCounter = nullCounter + 1;
        cell.classList.add("nullClass");
        cell.id = item.variable + nullCounter +"Div";  // Optional: Assign ID
          }


       
        // Highlight space character (if any)
        if (item.letter === " " || item.variable === "space") {
            cell.classList.add("highlight");
        }

        rowVowels.push(cell);

        if (rowVowels.length === 8) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            rowVowels.reverse().forEach(cell => rowDiv.appendChild(cell)); // Reverse for RTL order

            grid2.appendChild(rowDiv);
            rowVowels = []; // Reset row
        }
    });

    // Append any remaining cells
    if (rowVowels.length > 0) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        rowVowels.reverse().forEach(cell => rowDiv.appendChild(cell));

        grid2.appendChild(rowDiv);
    }
  // VOWEL LISTENER
// Event listener to log variable name when clicked for second grid
grid2.addEventListener("click", function(event) {
    const target = event.target;
    let lastPosition;
    let mainText = document.querySelector(".main_text");
   // activeYodVowel = false;
    
    if (target.classList.contains("cell")) {
        const variableName = target.getAttribute("data-variable");
        console.log("Clicked on vowel: " + variableName);
        var newText = target.textContent.trim();
        const okToAdd = checkPermissions(variableName);

        if (okToAdd === false) {
            return;
        }
        

        if ((newText != dagesh) && (newText != meteg)) {
            if (hasVowel === false) {
                 insertCharacterAtPosition(newText);
                  if (yodVowelsArray.includes(variableName)) {
                  activeYodVowel = true;
                 //alert("Active yod vowel: " + variableName);
                    if((variableName === "qamats_yod_vav" )||( variableName === "qamats_yod_hiriq" )) {
                 specialVavPositions.push(lastCursorPosition-1);  //because insertion bumpted up the cursor index
                 specialYodPositions.push(lastCursorPosition-2);
                 yodVowelOffset = 3;
                 } else {
                 yodVowelOffset = 2;
                }
                 }
               
                 hasVowel = true;
                lastVowelPosition = lastCursorPosition;
                if ((newText === shiruq) || (newText === vav_holam)) {
                lastVavHolamPosition = lastCursorPosition;
                 }
                pendingMappiq = false;   // adding a vowel will clear a pending mappiq 
                if ((newText === shiruq) || (newText === vav_holam)) {
                    hasVavHolam = true;
                }
            }
        }

        if ((newText === dagesh) && (dageshAllowed === false)) {
            return;
        }

        if ((newText === meteg) || (newText === dagesh)) {
            switch (newText) {
                case meteg:
                    if (hasMeteg === true) {
                    return;
                     }
                    hasMeteg = true;
                    break;
                case dagesh:
                   if (hasDagesh === true) {
                    return;
                     }
                    hasDagesh = true;
                    break;
            }

            if ((newText === dagesh) && (lastLetterAdded === hey)) {
                 pendingMappiq = true;
                 doModal("Mappiq addition to letter hey is pending until word termination is established");
                  return;    // the dagesh won't be added until a final letter is determined.
              }
/*
        // adjust here for multicharacter adds
              switch(variableName) {
               case "kamats_yod_hiriq":
               case "kamats_yod_vav":
               //lastCursorPosition = lastCursorPosition + 2;
              lastCursorPosition = lastCursorPosition + 3;
               break;
               case  "tsere_yod":
               case  "qamats_yod":
               case  "shiruq_yod":
               case  "holam_yod":
               case  "hiriq_yod":
               case  "patah_yod":
               lastCursorPosition = lastCursorPosition + 2;
               break;
            }
*/

            // Need to adjust cursor position if vavholam type vowel or actvieYodVowl
            lastPosition = lastCursorPosition;
            if (hasVavHolam === true) {
                lastCursorPosition = lastCursorPosition - 1;
                insertCharacterAtPosition(newText);
                lastCursorPosition = lastPosition + 1;
            }  else if(activeYodVowel === true) {
               let oldPosition = lastCursorPosition;
               lastCursorPosition = lastCursorPosition - yodVowelOffset;
                insertCharacterAtPosition(newText);
               lastCursorPosition = oldPosition + 1;
            } else {
                insertCharacterAtPosition(newText);
            }
         }
    } // class list contains "cell"
let savedVavsString = JSON.stringify(specialVavPositions);
console.log(savedVavsString);
localStorage.removeItem('savedVavs');
localStorage.setItem("savedVavs", savedVavsString);
});

// New trope symbols constants
const etnahcta = "\u0591";
const segol_trope = "\u0592";
const shalshelet = "\u0593";
const zakef_katan = "\u0594";
const zakef_gadol = "\u0595";
const tipcha = "\u0596";
const revii = "\u0597";
const zarka = "\u05AE";
const pashta = "\u0599";
const yetiv = "\u059A";
const tevir = "\u059B";
const geresh = "\u059C";
const kadma_veazla = "\u059C"
const gershayim = "\u059E";
const karnei_parah = "\u059F";
const telisha_gedola = "\u05A0";
const pazer = "\u05A1";
const munach = "\u05A3";
const mapach = "\u05A4";
const mercha = "\u05A5";
const mercha_kefulah = "\u05A6";
const darga = "\u05A7";
const kadma = "\u05A8";
const telisha_ketanah = "\u05A9";
const yerach_ben_yomo = "\u05AA";

// Define structured trope symbol data
const tropeSymbols = [
    { letter: etnahcta, variable: "etnahcta" },
    { letter: segol_trope, variable: "segol_trope" },
    { letter: shalshelet, variable: "shalshelet" },
    { letter: zakef_katan, variable: "zakef_katan" },
    { letter: zakef_gadol, variable: "zakef_gadol" },
    { letter: tipcha, variable: "tipcha" },
    { letter: revii, variable: "revii" },
    { letter: zarka, variable: "zarka" },
    { letter: pashta, variable: "pashta" },
    { letter: yetiv, variable: "yetiv" },
    { letter: tevir, variable: "tevir" },
    { letter: geresh, variable: "geresh" },
    { letter: kadma_veazla, variable: "kadma_veazla" },
    { letter: gershayim, variable: "gershayim" },
    { letter: karnei_parah, variable: "karnei_parah" },
    { letter: telisha_gedola, variable: "telisha_gedola" },
    { letter: pazer, variable: "pazer" },
    { letter: munach, variable: "munach" },
    { letter: mapach, variable: "mapach" },
    { letter: mercha, variable: "mercha" },
    { letter: mercha_kefulah, variable: "mercha_kefulah" },
    { letter: darga, variable: "darga" },
    { letter: kadma, variable: "kadma" },
    { letter: telisha_ketanah, variable: "telisha_ketanah" },
    { letter: yerach_ben_yomo, variable: "yerach_ben_yomo" }
];

let   alephDiv;
let    bet_dageshDiv;
let    betDiv;
let    gimelDiv;
let    daletDiv;
let    heyDiv;
let    vavDiv;
let    zayinDiv;
let    chetDiv;
let    tetDiv;
let    yodDiv;
let    khaf_dageshDiv;
let    kafDiv;
let    lamedDiv;
let    memDiv;
let    nunDiv;
let    samekhDiv;
let    ayinDiv;
let    peh_dageshDiv;
let    pehDiv;
let    tsadeDiv;
let    qofDiv;
let    reshDiv;
let    shinDiv;
let    sinDiv;
let    sof_dageshDiv;
let    sofDiv;
let    soffitKaf_dageshDiv;
let    soffitKafDiv;
let    soffitMemDiv;
let    soffitNunDiv;
let    soffitPeh_dageshDiv;
let    soffitPehDiv;
let    maqafDiv 
let    sofPasukDiv 
let    periodDiv 
let    spaceDiv 
let    pasekDiv 
let    shevahDiv;
let    hataf_segolDiv;
let    hataf_patahDiv;
let    hataf_qamatsDiv;
let    hiriqDiv;
let    tsereDiv;
let    segolDiv;
let    patahDiv;
let    qamatsDiv;
let    holamDiv;
let    dageshDiv;
let    qubutsDiv;
let    shiruqDiv;
let    vav_holamDiv;
let    metegDiv;
let    etnahctaDiv;
let    segol_tropeDiv;
let    shalsheletDiv;
let    zakef_katanDiv;
let    zakef_gadolDiv;
let    tipchaDiv;
let    reviiDiv;
let    zarkaDiv;
let    pashtaDiv;
let    yetivDiv;
let    tevirDiv;
let    gereshDiv;
let    kadma_veazlaDiv;
let    gershayimDiv;
let    karnei_parahDiv;
let    telisha_gedolaDiv;
let    pazerDiv;
let    munachDiv;
let    mapachDiv;
let    merchaDiv;
let    mercha_kefulahDiv;
let    dargaDiv;
let    kadmaDiv;
let    telisha_ketanahDiv;
let    yerach_ben_yomoDiv;
let    tsere_yodDiv;
let    hiruq_yodDiv;
let    qamats_yod_vavDiv;
let    qamats_yod_hiriqDiv;
let    qamats_yodDiv;
let    shiruq_yodDiv;
let    holam_yodDiv;


// Padding size for trope symbols (ensuring even row completion)
const padSizeTrope = (8 - (tropeSymbols.length % 8)) % 8;
const paddingTrope = Array(padSizeTrope).fill({ letter: "", variable: "nullSpace" });

// Combine trope symbols with padding
let allTropes = tropeSymbols.concat(paddingTrope);

// Populate the third grid
const grid3 = document.getElementById("hebrewGrid3");
let rowTropes = [];

allTropes.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Handle text and padding
    cell.textContent = "\u00A0" + item.letter;
    cell.setAttribute("data-variable", item.variable);
    if (item.variable != "nullSpace") {
      cell.classList.add("tropeLetterClass");
        cell.id = item.variable+"Div";  // Optional: Assign ID
      }  else { 
     nullCounter = nullCounter + 1;
     cell.classList.add("nullClass");
     cell.id = item.variable + nullCounter +"Div";  // Optional: Assign ID
      }
    rowTropes.push(cell);

    if (rowTropes.length === 8) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        rowTropes.reverse().forEach(cell => rowDiv.appendChild(cell)); // Reverse for RTL order

        grid3.appendChild(rowDiv);
        rowTropes = []; // Reset row
    }
});

// Append any remaining cells
if (rowTropes.length > 0) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    rowTropes.reverse().forEach(cell => rowDiv.appendChild(cell));

    grid3.appendChild(rowDiv);
}
/*
//populate variable name arrays
basicLetters.forEach ((item,index) => {
basicLettersArray.push(item.variable);
});

soffitLetters.forEach ((item,index) => {
soffitLettersArray.push(item.variable);
});

punctuation.forEach ((item,index) => {
punctuationArray.push(item.variable);
});


hebrewVowels.forEach ((item,index) => {
hebrewVowelsArray.push(item.variable);
});
*/

hebrewVowelsArrayShort = [].concat(hebrewVowelsArray);
let tempArray  = removeElement(hebrewVowelsArrayShort, "meteg");
tempArray  = removeElement(hebrewVowelsArrayShort, "dagesh");
tempArray  = removeElement(hebrewVowelsArrayShort, "shiruq");
tempArray  = removeElement(hebrewVowelsArrayShort, "vav_holam");
hebrewVowelsArrayShort = [].concat(tempArray);

tropeSymbols.forEach ((item,index) => {
tropeSymbolsArray.push(item.variable);
});

dummy = 1;

//create array with all options
  everyLetter = [].concat(basicLettersArray);
  everyLetter = everyLetter.concat(soffitLettersArray);
  everyLetter = everyLetter.concat(punctuationArray);
  everyLetter = everyLetter.concat(hebrewVowelsArray);
  everyLetter = everyLetter.concat(tropeSymbolsArray);
  everyLetter = everyLetter.concat(yodVowelsArray);
//create array with only basic letters
   onlyBasicLetters = [].concat(basicLettersArray);
//for sofPasuk_peroid
   sofPasuk_period.push("space");
 //for space_maqaf_pasek
    space_maqaf_pasek = space_maqaf_pasek.concat(onlyBasicLetters);  
// for soffit
    soffitOK = soffitOK.concat(punctuation);
//for vowels
vowelsOK = vowelsOK.concat(onlyBasicLetters);
vowelsOK = vowelsOK.concat(soffitLettersArray);
vowelsOK = vowelsOK.concat(tropeSymbolsArray);
vowelsOK = vowelsOK.concat(punctuation);
vowelsOK.push("meteg");
// for tropes
tropeOK = tropeOK.concat(onlyBasicLetters);
tropeOK = tropeOK.concat(soffitLettersArray);
tropeOK = tropeOK.concat(punctuation);
   

//TROPE LISTENER
// Event listener to log variable name when clicked for the third grid
grid3.addEventListener("click", function(event) {
    const target = event.target;
    let delta = 0;
    if (target.classList.contains("cell")) {
        const variableName = target.getAttribute("data-variable");
        console.log("Clicked on trope: " + variableName);
        //alert("Clicked on trope: " + variableName);
       var startingEnd = lastCursorPosition;
      
     // if (isVavHolam === true ) {
             if (hasVavHolam === true ) {

              delta = checkLetterGroup(startingEnd);
              let tempPosition = 0;
              tempPosition = lastCursorPosition - delta;
              lastCursorPosition = tempPosition;
         }
        var newText = target.textContent.trim();
       const  okToAdd = checkPermissions(variableName);
                if  ((okToAdd === true) && (hasTrope === false) ){
             //  adjust for an active vowel
              if (activeYodVowel === true ) {
                lastCursorPosition = lastCursorPosition - yodVowelOffset;
                 activeYodVowel = false;
                 yodVowelOffset = 0;
                   }
                insertCharacterAtPosition(newText);
                 isVavHolam = false;
                 hasTrope = true;
                 }

    }
    lastCusrorPosition = startingEnd;
});

//observer to track cursor position
mainText.addEventListener("click",function() {
getCursorPosition();
});


// observer to do stuff after load
document.addEventListener("DOMContentLoaded", async function () {
        elements["alephDiv"] = document.getElementById("alephDiv");
        elements["bet_dageshDiv"] = document.getElementById("bet_dageshDiv");
        elements["betDiv"] = document.getElementById("betDiv");
        elements["gimelDiv"] = document.getElementById("gimelDiv");
        elements["daletDiv"] = document.getElementById("daletDiv");
        elements["heyDiv"] = document.getElementById("heDiv");
        elements["vavDiv"] = document.getElementById("vavDiv");
        elements["zayinDiv"] = document.getElementById("zayinDiv");
        elements["chetDiv"] = document.getElementById("chetDiv");
        elements["tetDiv"] = document.getElementById("tetDiv");
        elements["yodDiv"] = document.getElementById("yodDiv");
        elements["khaf_dageshDiv"] = document.getElementById("khaf_dageshDiv");
        elements["kafDiv"] = document.getElementById("kafDiv");
        elements["lamedDiv"] = document.getElementById("lamedDiv");
        elements["memDiv"] = document.getElementById("memDiv");
        elements["nunDiv"] = document.getElementById("nunDiv");
        elements["samekhDiv"] = document.getElementById("samekhDiv");
        elements["ayinDiv"] = document.getElementById("ayinDiv");
        elements["peh_dageshDiv"] = document.getElementById("peh_dageshDiv");
        elements["pehDiv"] = document.getElementById("pehDiv");
        elements["tsadeDiv"] = document.getElementById("tsadeDiv");
        elements["qofDiv"] = document.getElementById("qofDiv");
        elements["reshDiv"] = document.getElementById("reshDiv");
        elements["shinDiv"] = document.getElementById("shinDiv");
        elements["sinDiv"] = document.getElementById("sinDiv");
        elements["sofDiv"] = document.getElementById("sofDiv");
        elements["sof_dageshDiv"] = document.getElementById("sof_dageshDiv");

        elements["soffitKaf_dageshDiv"] = document.getElementById("soffitKaf_dageshDiv");
        elements["soffitKafDiv"] = document.getElementById("soffitKafDiv");
        elements["soffitMemDiv"] = document.getElementById("soffitMemDiv");
        elements["soffitNunDiv"] = document.getElementById("soffitNunDiv");
        elements["soffitPeh_dageshDiv"] = document.getElementById("soffitPeh_dageshDiv");
        elements["soffitPehDiv"] = document.getElementById("soffitPehDiv");
        elements["maqafDiv"] = document.getElementById("maqafDiv"); 
        elements["sofPasukDiv"] = document.getElementById("sofPasukDiv"); 
        elements["periodDiv"] = document.getElementById("periodDiv"); 
        elements["spaceDiv"] = document.getElementById("spaceDiv"); 
        elements["pasekDiv"] = document.getElementById("pasekDiv"); 
        elements["shevahDiv"] = document.getElementById("shevahDiv");
        elements["hataf_segolDiv"] = document.getElementById("hataf_segolDiv");
        elements["hataf_patahDiv"] = document.getElementById("hataf_patahDiv");
        elements["hataf_qamatsDiv"] = document.getElementById("hataf_qamatsDiv");
        elements["hiriqDiv"] = document.getElementById("hiriqDiv");
        elements["tsereDiv"] = document.getElementById("tsereDiv");
        elements["segolDiv"] = document.getElementById("segolDiv");
        elements["patahDiv"] = document.getElementById("patahDiv");
        elements["qamatsDiv"] = document.getElementById("qamatsDiv");
        elements["holamDiv"] = document.getElementById("holamDiv");
        elements["dageshDiv"] = document.getElementById("dageshDiv");
        elements["qubutsDiv"] = document.getElementById("qubutsDiv");
        elements["shiruqDiv"] = document.getElementById("shiruqDiv");
        elements["vav_holamDiv"] = document.getElementById("vav_holamDiv");
        elements["tsere_yodDiv"] = document.getElementById("tsere_yodDiv");
        elements["patah_yodDiv"] = document.getElementById("patah_yodDiv");
        elements["hiriq_yodDiv"] = document.getElementById("hiriq_yodDiv");
        elements["qamats_yodDiv"] = document.getElementById("qamats_yodDiv");
        elements["qamats_yod_hiriqDiv"] = document.getElementById("qamats_yod_hiriqDiv");
        elements["qamats_yod_vavDiv"] = document.getElementById("qamats_yod_vavDiv");
        elements["shiruq_yodDiv"] = document.getElementById("shiruq_yodDiv");
        elements["holam_yodDiv"] = document.getElementById("holam_yodDiv");

        elements["metegDiv"] = document.getElementById("metegDiv");
        elements["etnahctaDiv"] = document.getElementById("etnahctaDiv");
        elements["segol_tropeDiv"] = document.getElementById("segol_tropeDiv");
        elements["shalsheletDiv"] = document.getElementById("shalsheletDiv");
        elements["zakef_katanDiv"] = document.getElementById("zakef_katanDiv");
        elements["zakef_gadolDiv"] = document.getElementById("zakef_gadolDiv");
        elements["tipchaDiv"] = document.getElementById("tipchaDiv");
        elements["reviiDiv"] = document.getElementById("reviiDiv");
        elements["zarkaDiv"] = document.getElementById("zarkaDiv");
        elements["pashtaDiv"] = document.getElementById("pashtaDiv");
        elements["yetivDiv"] = document.getElementById("yetivDiv");
        elements["tevirDiv"] = document.getElementById("tevirDiv");
        elements["gereshDiv"] = document.getElementById("gereshDiv");
        elements["kadma_veazlaDiv"] = document.getElementById("kadma_veazlaDiv");
        elements["gershayimDiv"] = document.getElementById("gershayimDiv");
        elements["karnei_parahDiv"] = document.getElementById("karnei_parahDiv");
        elements["telisha_gedolaDiv"] = document.getElementById("telisha_gedolaDiv");
        elements["pazerDiv"] = document.getElementById("pazerDiv");
        elements["munachDiv"] = document.getElementById("munachDiv");
        elements["mapachDiv"] = document.getElementById("mapachDiv");
        elements["merchaDiv"] = document.getElementById("mercha");
        elements["mercha_kefulahDiv"] = document.getElementById("mercha_kefulahDiv");
        elements["dargaDiv"] = document.getElementById("dargaDiv");
        elements["kadmaDiv"] = document.getElementById("kadmaDiv");
        elements["telisha_ketanahDiv"] = document.getElementById("telisha_ketanahDiv");
        elements["yerach_ben_yomoDiv"] = document.getElementById("yerach_ben_yomoDiv");

    let gridMain = document.querySelector(".grid-main");
    let mainText = document.querySelector(".main_text");

    if (gridMain && mainText) {
        let offsetLeft = gridMain.getBoundingClientRect().left;
        mainText.style.left = offsetLeft + 200 + "px";
    }

    // Assuming highlightKadmaVeAzla is defined elsewhere
    highlightKadmaVeAzla();

    recoveredText = localStorage.getItem(savedTextName);  // try the saved text using the filename-specific key 
     //  if there is no value to recover use the default backup
    if (!recoveredText) {
    recoveredText = localStorage.getItem("savedText") || "";
     }

    if (!recoveredText || recoveredText.length === 0) {
        mainText.textContent = "";
        lastCursorPosition = 0;
         okLetters = [].concat(onlyBasicLetters);  // recovered text is empty so all choices for the moment.
        xOver("recovered text");
    } else {
        answer = "";  // Initialize answer before calling doModal
        // Await the response from doModal
        answer = await doModal("Do you want to use the following saved text to initialize the text field?", recoveredText, "Yes");

        // Now that answer has been set based on the user's choice, continue with your logic
        if (answer === "YES") {
/*
            recoveredVavs = JSON.parse(localStorage.getItem("savedVavs")) || [];
            if(recoveredVavs.length > 0 ) {
             alert (recoveredVavs);
             specialVavPositions = [].concat(recoveredVavs);
             localStorage.removeItem('savedVavs');
            } else {
             specialVavPositions - [];
             }
*/
            mainText.textContent = recoveredText;
            backupText = recoveredText;
            savedEditText = recoveredText;  //*****
            let workingText = recoveredText;
            lastCursorPosition = workingText.length ;
    //need to check the last character in the string.
            let lastCharacter = workingText[lastCursorPosition - 1];
            let lastCharacterType = classifyCharacter(lastCharacter);  
            lastLetterCode = lastCharacterType.letterCode;
          if (lastLetterCode === "X") {
           isVavHolam = true; 
        }
  switch (lastLetterCode) {
    case "L":
      okLetters = [].concat(everyLetter);  //can add anything
      break;
    case "S":
      okLetters = [].concat(punctuation);  // after a sofit we need to have a punctuation
      break;
    case "P":
         switch (lastCharacterType.variable) {
            case "sofPasuk":
            case "period":
            okLetters = [];
            okLetters.push("space");
             break;
           case "space":
           case "maqaf":
           case "pasek":
             okLetters= [].concat(onlyBasicLetters);
             break;
           case "meteg":
             break;
            }
         break;
  
    case "V":
    case "X":
     okLetters = [].concat(onlyBasicLetters);  // can add anything but another vowel but a mateg is allowed.
     okLetters = okLetters.concat(soffitLettersArray);
     okLetters = okLetters.concat(tropeSymbolsArray);
     okLetters = okLetters.concat(punctuationArray);
     okLetters.push("meteg");
      break;
    case "T":
      // Code to execute if expression === value2
      okLetters = [].concat(onlyBasicLetters);         // after a trope there must be anything but a trope or vowel
      okLetters = okLetters.concat(soffitLettersArray);
      okLetters = okLetters.concat(punctuationArray);
      break;
          }
//temporary override while debugging
     // okLetters = [].concat(everyLetter);
        } else {
            mainText.textContent = "";
            lastCursorPosition = 0;
            okLetters = [].concat(onlyBasicLetters);
        }

    }
 xOver("recovere text2") ;

});

// Find and highlight the cell containing 'kadma'
function highlightKadmaVeAzla() {
    const cells = document.querySelectorAll("#hebrewGrid3 .cell");
    
    cells.forEach(cell => {
        if (cell.getAttribute("data-variable") === "kadma_veazla") {
            cell.style.borderStyle = "dashed";
        }
    });
}

//Function to get and track the cursor position in the main_text div
function getCursorPosition() {
const selection = window.getSelection();
if (selection.rangeCount > 0) {
const range = selection.getRangeAt(0);
const preCaretRange = range.cloneRange();
preCaretRange.selectNodeContents(mainText); // use current div (main_text)
preCaretRange.setEnd(range.startContainer,range.startOffset);
lastCursorPosition =  preCaretRange.toString().length;  //save the cursor position
//alert( "The current cursor position is :"  + lastCursorPosition);
}
}
function insertCharacterAtPosition(character) {
  let updatedText;
  const text = mainText.textContent;  // Get the current text from the div
  //alert (character + "  "+ character.charCodeAt(0));
  // If lastCursorPosition is 0, it means the cursor is at the beginning
  if (lastCursorPosition === 0 && text.length === 0) {
    // If the string is empty and the cursor is at the beginning, just insert the character
    mainText.textContent = character;
    updatedText = character;
  } else {
    // Otherwise, insert the character at the saved position
   updatedText = text.slice(0, lastCursorPosition) + character + text.slice(lastCursorPosition);

    mainText.textContent = updatedText;
  }
   //newLetterPosition = lastCursorPosition + 1;
    newLetterPosition = lastCursorPosition + character.length;
    lastCursorPosition = lastCursorPosition + character.length;
    newLetter = character;
    newLetterType = classifyCharacter(character).letterCode;  

  // After insertion, update the cursor position to be at the end of the inserted character
    lastCursorPosition = updatedText.length  // Position after the new character

  // Now the cursor is at the end for subsequent insertions
  if (character === space) {
 alert ("Space character has been inserted or added.");
  }
  // set permissions for next add  to be MODIFIED!
 // okLetters = [].concat(everyLetter);    was active code
if (newLetterType === "L") {
 okLetters = [].concat(everyLetter); 
}
if ( newLetterType === "S" ) { 
okLetters = [].concat(punctuationArray);
}
     dummy = 1;
}

function classifyCharacter(char) {
    // Define search order with corresponding codes and object names
    const categories = [
        { array: basicLetters, code: "L", name: "basicLetters" },
        { array: soffitLetters, code: "S", name: "soffitLetters" },
        { array: punctuation, code: "P", name: "punctuation" },
        { array: hebrewVowels, code: "V", name: "hebrewVowels" },
        { array: tropeSymbols, code: "T", name: "tropeSymbols" }, 
        { array: dageshVowels, code: "D", name: "dageshVowels" }, 
        { array: metegVowels, code: "M", name: "metegVowels" }, 
        { array: yodVowels, code: "Y", name: "yodVowels" }, 
        { array: vavVowels, code: "X", name: "vavVowels" }  //
    ];

    // Loop through each category and search for a match
    for (let category of categories) {
        if (category.name === "vavVowels") {  // 
            break;
        }

        for (let obj of category.array) {
            if (obj.letter === char) {
                //  Special case: Override category for shiruq or vav_holam
                if ((char === shiruq) || (char === vav_holam)) {  
                    category = categories.find(cat => cat.name === "vavVowels");  
                }

            if (char === meteg )  {  
                    category = categories.find(cat => cat.name === "metegVowels");  
                }

            if (char === dagesh )  {  
                    category = categories.find(cat => cat.name === "dageshVowels");  
                }
// on initial build of grid there are no "G" characters but after the assingment of letters need to make sure that a G is returned for yod following a G.
              
             if (char === yod ) {

              }


                return { 
                    letterCode: category.code, 
                    category: category.name, 
                    character: obj.letter, 
                    variable: obj.variable 
                };
            }
        }
    }
    
    // Return default values if no match is found
    return { letterCode: "N", category: "0", character: "", variable: "" };
}

function createMapGrid(passedText) {
    // Example data
    var textString = "שלום";
   var categories = ['L', 'L', 'V', 'L'];
   var  variables = ['1', '', '', '2'];
       letterCount = 0;
    letterPositions = [];
    letterPositions.push(-1);
    finalCount = 0;
    finalPosition = 0;
let tPos = lastCursorPosition - 1;
let workingText ="";
let passedMode = false;

if (typeof passedText !== "undefined" ) {
workingText = passedText;
passedMode = true;
}  else {  // no passed argument

if (activeEdit === true)  {
workingText = savedEditText;
passedMode = true;
} else {
passedMode = false;
workingText = mainText.textContent;
}

}

tPos = 0;
var  testChar =  workingText.charAt(tPos);
var characterData = classifyCharacter( testChar);
var mapCharacter = characterData.character;
var letterCode = characterData.letterCode;
var letterPosn ;
var lastLetterIndex = -1;
var mapVariable = characterData.variable;
//check for open popup.  If not open use mainText else use textBox1.textConent
textBox1 = document.getElementById("textBox1");

const windowOpen = window.getComputedStyle(popup);
//workingText = mainText.textContent;
var textLength = workingText.length;
textString = "";
let isYodVowel;
categories = [];
variables = [];
letterPosn = 0;
var letterPosnS = "";
var emptyVariable = "";
let vavPoints = [ "tsere", "qamats", "hiriq", "patah", "shiruq", "holam", "shiruq", "vav_holam"];
//let vavPoints = [ "tsere", "qamats", "hiriq", "patah", "shiruq", "holam", "shiruq"];
if (specialVavPositions.length > 0 ) {
//alert(specialVavPositions);
}
let tindex;
let pointCharIndex;
let pointData;
let pointName;
for (let i = 0; i < textLength; i++) {
    tindex = i;
    tPos = tindex + 1;
    testChar = workingText.charAt(tindex);
    characterData = classifyCharacter(testChar);
    mapCharacter = characterData.character;
    letterCode = characterData.letterCode;
    mapVariable = characterData.variable;
    textString = textString + mapCharacter;

    // Handle "L" or "S" letter codes with vowel check
    if ((letterCode === "L") || (letterCode === "S")) {
        if (mapVariable === "yod" && tindex > 0) {  // Ensure i-1 is valid
            let prevChar = workingText.charAt(tindex - 1);
            let prevCharData = classifyCharacter(prevChar);
            let prevCharName = prevCharData.variable;

            if (vavPoints.includes(prevCharName)) {
                letterCode = "Y";  // Modify letterCode when preceding character is a vowel
            }
        }

        // Compute position
        lastLetterIndex = tindex;
        letterPosn = letterPosn + 1;
        letterCount = letterPosn;
        letterPositions.push(i);
        finalPosition = i;
        finalCount = textLength - 1 - finalPosition;
        letterPosnS = letterPosn.toString();
        variables.push(letterPosnS);
    } else {
        variables.push("");  // Ensure blank entry for other cases
    }

    // Push modified letterCode after logic is fully determined
    categories.push(letterCode);
}

// need to reverse arrays
categories.reverse;
variables.reverse;

    // Create the mapGrid div
    const mapGrid = document.createElement("div");
const grid = document.querySelector(".mapGrid");
 mapGrid.style.gridTemplateColumns = `repeat(${textLength}, var(--cell-width, 30px))`;
    mapGrid.id = "textMap";
    mapGrid.classList.add("mapGrid");

    // Create a grid for the header row (positions)
    for (let i = textLength; i>0  ; i--) {
        const cell = document.createElement("div");
        cell.textContent = i; // Position starts from 1
        cell.style.backgroundColor = "khaki";
        mapGrid.appendChild(cell);
        dummy = 0;
    }

    // Create the characters row
     for (let i = textLength; i>0  ; i--) {
        const cell = document.createElement("div");
        cell.textContent = textString[i-1];
        mapGrid.appendChild(cell);
        if (cell.textContent === space ) {
         cell.classList.add("highlight");
         }
       dummy = 0;
    }

     // Create the category row
     for (let i = textLength; i>0  ; i--) {
        const cell = document.createElement("div");
        cell.textContent = categories[i-1];
         cell.classList.add("mapTypeClass");
        mapGrid.appendChild(cell);
         dummy = 0;
    }

/*
    // Create the variable row
    for (let i = textLength; i>0   ; i--) {
        const cell = document.createElement("div");
        cell.textContent = variables[i-1];
        mapGrid.appendChild(cell);
        let  newId = (textLength * 4)- 1 - (i -1);
        dummy = 0;
    }
*/
  // Create the variable row
   for (let i = textLength; i > 0; i--) {
    const cell = document.createElement("div");
    cell.textContent = variables[i - 1];
    // Assign the ID before appending
    let newId = "mapCell" + ((textLength * 4) - 1 - (i - 1));
    cell.id = newId; 
    cell.classList.add("mapCellClass");
    mapGrid.appendChild(cell);
dummy - 1;
}

    // Append the mapGrid below all other content  and add right click listerners for the last row.
    document.body.appendChild(mapGrid);

  addGridListeners();
  addGridListeners2();

// Call the function to apply the color and adjust for yods etc.
//reclassifyLetters(textLength);

 let mainTextRight = mainText.getBoundingClientRect().right;
 let mapGridWidth = mapGrid.offsetWidth;
let button = document.getElementById('makeMapButton');
 mapGrid.style.position = 'absolute';
 // Adjust the left position of mapGrid to align the right edges
 //mapGrid.style.left = (mainTextRight - (mapGrid.offsetLeft + mapGridWidth) - 100) + 'px';
  mapGrid.style.left = (button.offsetLeft + button.offsetWidth + 50) + 'px';
 // mapGrid.style.left = ( button.offsetWidth + 1) + 'px';
mapGrid.style.top = button.offsetTop + 'px';  // Aligns the top with the button
//mapGrid.style.marginTop = "-1px";
//mapGrid.style.marginLeft = "20px";;
reclassifyLetters(textLength);
}

function makeGrid(passedText) {
    // Clear any previous grid
    const existingGrid = document.getElementById("textMap");
    if (existingGrid) {
        existingGrid.remove();
    }
   // Call createMapGrid to generate the new grid
   if (typeof passedText === "undefined" ) {
    createMapGrid(); 
} else {
 createMapGrid(passedText); 
}
}
// Function to iterate the 4th row, check the content, and color the matching columns

     async function reclassifyLetters(textLength) {
    const mapGrid = document.querySelector(".mapGrid"); // If using a class instead of an ID
    const gridItems = mapGrid.children; // Get all grid items (cells)
    const numRows = 4; // Fixed number of rows
    const numColumns = textLength; // Assuming textLength defines the number of columns
     let nextCol = -1;
     let prevCol = -1;
     let testPattern = "";
     let testPattern2 = "";
     let testPattern3 = "";
     let colCount = -1;
     let isDipthong ;
      let nextCharacter;
      let prevCharacter;
      let nextCharacterType;
      letterPositions = [-1];
      letterCount = 0;
    // Iterate over the cells in the 4th row (index 3) 
     // diagnostic for grid values
      /*
    let gridvalues = [];
     for (let j = 0; j < numRows * numColumns; j++ ) {
        gridvalues.push(gridItems[j].textContent);
        if (j >= 3 * numColumns) {
         //await doModal ("Index: " + j + "&nbsp;&nbsp;&nbsp;" +  gridItems[j].textContent + "&nbsp;&nbsp;&nbsp;" +  gridItems[j- 2*numColumns].textContent );
           }
         }
     dummy = -1
     */

    // 
      // for (let i = (numRows - 1) * numColumns; i < numRows * numColumns; i++) {
      //  count right to left so from hight index in a row to beginning
        let firstIndex = numRows * numColumns - 1;
        let lastIndex = (numRows-1) * numColumns;
        for (let i = firstIndex; i >= lastIndex; i--) {
        if (i === lastIndex) {
        dummy = -1;
        }
       isDiphthong = false;
        testPattern = "";
        patternName = "";
        colCount = 0;
        const cell = gridItems[i];
        const cellValue = cell.textContent.trim(); // Get the value of the cell in the 4th row
        const charCellIndex = i -2 * numColumns;
        const typeCellIndex = i -1 * numColumns;
        const  characterCell = gridItems[i -2 * numColumns];
        const typeCodeCell = gridItems[i -  1 * numColumns];
        const character = characterCell.textContent;
        var typeCode = typeCodeCell.textContent;
         if (typeCode === "X") {
           dummy = -1;
          }
        // don't trap a yod if the first letter since it begins a string and must be a letter;
        if ( i < firstIndex ) {
         if  (typeCode === "Y")   {  // process a yod in the string
  
         prevCol = i + 1;
         nextCol = i - 1;
        prevCharacter = gridItems[prevCol - 2 * numColumns].textContent;
         if (nextCol >= lastIndex ) {
         nextCharacter = gridItems[nextCol - 2 * numColumns].textContent;
         nextCharacterType = gridItems[nextCol -1 * numColumns].textContent;
         } else {
            nextCharacter = "";
         }


         testPattern = "";
         colCount = 0;
         if  ((nextCharacter === hiriq ) && (prevCharacter === qamats ) ) {
         testPattern3 =  prevCharacter + character + nextCharacter;
         colCount = 3;
         testPattern = testPattern3;
         } else { 
         testPattern2 =  prevCharacter + character ;
         colCount = 2;
         testPattern = testPattern2;
                  }

         let yodIndex = i;
         let nakedYod = true;
         let testIndex = yodIndex  - 1;
         let testChar = gridItems[testIndex - 2 * numColumns].textContent;
         let testType = gridItems[testIndex - 1 * numColumns].textContent;

         //await doModal(testChar);
        // await doModal ("Index: " + testIndex + "&nbsp;&nbsp;&nbsp;" +  gridItems[testIndex].textContent + "&nbsp;&nbsp;&nbsp;" +  gridItems[testIndex- 2*numColumns].textContent );
     
 if (colCount > 1 ) {        
         const  patternName = returnNameInObject(testPattern,yodVowels); 
        isDipthong =  dipthongCharArray.includes(testPattern);
                 }
                 // alert( "Test: " + testPattern.length +  "  Yod Array: " + qamats_yod_vav.length);
                if (isDipthong === true) {   
                    if (colCount === 2) {
                     if (yodIndex === lastIndex ) {
                         nakedYod = true;   // nothing follows so must be naked yod.
                         } else {  // not last in string
                   
                         switch (testType )  {
                         case "P":
                         case "S":
                         case "L":
                         case "X":
                         nakedYod = true;
                         break;
                         case "V":
                         case "T":
                         case "D":
                         case "M":
                         nakedYod = false;
                         break;
                         }   // end switch            
                   } // end else
                      gridItems[prevCol -1 * numColumns].textContent = "G";
                 } // end colCount is 2
    	
         
                if (colCount === 3 ) {
                 gridItems[nextCol -1 * numColumns].textContent = "G";
                 gridItems[prevCol -1 * numColumns].textContent = "G";
                     }

                if (colCount === 2 ) {
                gridItems[prevCol -1 * numColumns].textContent = "G";
                     }

                }  // end dipthong
} 
}
 
        // if  ((typeCode === "S" ) ||  ( (typeCode === "L" ) && (character != vav)) )  {
         if  ((typeCode === "S" ) |  ( typeCode === "L" ))  {

                letterCount = letterCount + 1;
                 letterPositions.push(numRows * numColumns -1 -i);
               gridItems[i].textContent = letterCount.toString();
            }  else {
               gridItems[i].textContent = "";
             }
// how to do a vav letter after a yod.  Check two chars back for a G.

   /*    
         let prevType2= gridItems[typeCellIndex + 2].textContent;
         if ((typeCode === "L")  && (character === vav) && (prevType2 === "G") ) {
          gridItems[typeCellIndex].textContent = "G";
         }
*/


dummy = cellValue;
}  // end of i for loop
        


      for (let kk = lastIndex; kk <= firstIndex; kk++ ) { // colorize loop
         cellValue =gridItems[kk].textContent;  // use the cellValue variable to hold the content of last row index;
         
        // Check if the cell content is a valid number (as a text string)
         if (!isNaN(cellValue) && cellValue !== "") {
            const columnIndex = kk % numColumns; // Find the column index

            // Change the background color for rows 2, 3, and 4 (1-based)
            for (let j = 1; j < numRows; j++) {
                const rowCellIndex = j * numColumns + columnIndex;
                const rowCell = gridItems[rowCellIndex];
                rowCell.style.backgroundColor = 'lightgreen'; // Set the color
            }
        } 
} //end of colorize loop
dummy = -1;
}  // end of function

function saveText(text2Save) {
   localStorage.setItem(savedTextName, text2Save);
   let testName = localStorage.getItem("savedText")
   if (!testName) {
   localStorage.setItem("savedText", text2Save);  // if there is no save without a number save it the first time.
      }
    //let savedVavsString = JSON.stringify(specialVavPositions);
    // console.log(savedVavsString);
    // localStorage.setItem("savedVavs", savedVavsString);
}
function loadText() {
   //recoveredText = localStorage.getItem("savedText") || "";
   //recoveredVavs = JSON.parse(localStorage.getItem("savedVavs")) || [];
}

window.addEventListener("beforeunload", function () {
    saveText(mainText.textContent);
});

async function doModal(text1, text2 = "", mode = "") {
    return new Promise((resolve) => {
        // Create modal elements
        let modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.left = "50%";
        modal.style.top = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "600px";
        modal.style.height = "400px";
        modal.style.backgroundColor = "lightyellow";
        modal.style.border = "2px solid red";
        modal.style.paddingTop = "15px"; // Adjust padding for top       
        modal.style.paddingBottom = "15px"; // Adjust padding for bottom
        modal.style.paddingLeft = "40px"; // Added padding for left side
        modal.style.paddingRight = "40px"; // Added padding for right side
        modal.style.textAlign = "center";
        modal.style.fontFamily = "Times New Roman, serif";
        modal.style.zIndex = "1001";
        modal.style.boxShadow = "5px 5px 15px rgba(0,0,0,0.3)";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.justifyContent = "flex-start";
        modal.style.alignItems = "center";

        // Create modal title
        let title = document.createElement("h2");
        title.textContent = mode.toLowerCase().startsWith("y") ? "PLEASE CHOOSE YES OR NO" : "INFORMATION";
        modal.appendChild(title);

        // Create text1 element
        let text1Elem = document.createElement("p");
        //text1Elem.textContent = text1;
        text1Elem.innerHTML = text1;
        text1Elem.style.marginTop = "5px";   // Small space before text1
        text1Elem.style.marginBottom = "5px"; // Remove extra space after text1
        text1Elem.style.fontSize = "30px";
        text1Elem.style.fontWeight = "bold";
        text1Elem.style.fontFamily = "Times New Roman";
        text1Elem.style.margin = "0"; // Remove any inherited margin/padding
        modal.appendChild(text1Elem);

        // Create text2 element (if applicable)
        let text2Elem = document.createElement("p");
        text2Elem.textContent = text2 ? text2 : "\u00A0"; // Display a blank line if text2 is empty
        text2Elem.style.fontSize = "36px";
        text2Elem.style.fontWeight = "bold";
        text2Elem.style.color = "darkred";
        text2Elem.style.marginTop = "10px"; //
        text2Elem.style.marginBottom = "0"; // Remove any bottom margin
        text2Elem.style.padding = "0"; // Remove any inherited padding
        modal.appendChild(text2Elem);

        // Create button container
        let buttonContainer = document.createElement("div");
        buttonContainer.style.marginTop = "35px";

        if (mode.toLowerCase().startsWith("y")) {
            // YES button
            let yesButton = document.createElement("button");
            yesButton.textContent = "YES";
            yesButton.style.height = "30px";
            yesButton.style.backgroundColor = "darkgreen";
            yesButton.style.color = "white";
            yesButton.style.fontWeight = "bold";
            yesButton.style.fontSize = "22px";
            yesButton.onclick = function() {
            if (overlay) document.body.removeChild(overlay);
             document.body.removeChild(modal); 
             resolve("YES");
            };
            buttonContainer.appendChild(yesButton);

            // NO button
            let noButton = document.createElement("button");
            noButton.textContent = "NO";
            noButton.style.height = "30px";
            noButton.style.marginLeft = "20px";
            noButton.style.backgroundColor = "red";
            noButton.style.color = "white";
            noButton.style.fontWeight = "bold";
            noButton.style.fontSize ="22px";
            noButton.onclick = function() {
            if (overlay) document.body.removeChild(overlay);
            document.body.removeChild(modal);
            resolve("NO");
            };
            buttonContainer.appendChild(noButton);
        } else {
            // CLOSE button for info mode
            let closeButton = document.createElement("button");
            closeButton.textContent = "CLOSE";
            closeButton.style.height = "30px";
            closeButton.style.backgroundColor = "red";
            closeButton.style.color = "white";
            closeButton.style.fontWeight = "bold";
            closeButton.style.fontSize = "22px";
            closeButton.onclick = function() {
            if (overlay) document.body.removeChild(overlay);
            document.body.removeChild(modal);
            resolve("");  // Return an empty string for the CLOSE action
            };
            buttonContainer.appendChild(closeButton);
        }

        modal.appendChild(buttonContainer);
// Create the overlay to block interaction with the background
overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent
overlay.style.zIndex = "999";  // Below the modal, but above everything else
overlay.style.pointerEvents = "all";  // Blocks all interactions with the background

// Append the overlay before the modal so it's underneath it
document.body.appendChild(overlay);


        document.body.appendChild(modal);
    });
}

function closeGrid() {
  if (checkOpenDropdown() === true) {
             return;
            }

 let mapGrid = document.querySelector(".mapGrid");
mapGrid.style.display = "none";
}

function findMatch(value, array, defaultValue = "") {
    const found = array.find(item => item.letter === value);
    return found ? found.variable : defaultValue;
}
function checkLetterGroup(position) {
let index = position -1 ;
let delta = 0;
let hasMeteg = false;
hasTrope = false;
let textDiv = document.querySelector(".main_text");
let textLine =  textDiv.textContent;
let lastChar = textLine[position-1];
let letterCode = ""
do  {
delta = delta + 1;
let newClass = classifyCharacter(textLine[position -1 - delta]);
letterCode = newClass.letterCode;
if (letterCode === "T") {
hasTrope = true;
}
} while (letterCode != "L");
return delta;
}

function trimArray(array,element) {
const index = array.indexOf(element);
if (index > -1 ) {
array.spice(index,1);
}
return array;
}

 function showMainPopup() {
  if (checkOpenDropdown() === true) {
             return;
            }

 let textMap = document.getElementById("textMap");
 // Check if textMap exists
    if (!textMap) {
        alert("Please open the text map first.");
        return; // Exit the function
    }

    // Check if textMap is displayed (not 'none')
    if (window.getComputedStyle(textMap).display === "none") {
        alert("The text map is not visible. Please open it first.");
        return; // Exit the function
        }
// okay to open popup
//ADD MAIN POPUP
            textBox1 = document.getElementById("textBox1");
            textBox2 = document.getElementById("textBox2");
            let currentMainText;
            if (activeEdit === false ) {
            currentMainText = mainText.textContent;
            } else {
            currentMainText = savedEditText;
            }
            textBox1.textContent = currentMainText;            
            textBox2.textContent = currentMainText;
            originalText = currentMainText;
            activeEdit = false;
            editMode = "info";
            baseLetterIndex = -1;
            vowelIndex = -1;
            tropeIndex =-1;
            vavHolamIndex = -1;
            dageshIndex = -1;
            metegIndex = -1;
            punctuationIndex = -1;
            const displaybox = document.getElementById("display-box");
            displaybox.textContent = "--";  
            let letterGroupBox = document.getElementById("letterGroupBox");
            populateLetterGroupSelect();
           document.getElementById("popup").style.display = "block"; 
           loadRadioButtons();   //   
        }

function closePopup() {
            if (checkOpenDropdown() === true) {
             return;
            }
            textBox1 = document.getElementById("textBox1");
            textBox2 = document.getElementById("textBox2");
            let letterGroupBox = document.getElementById("letterGroupBox");
            textBox1.style.backGroundColor = "white";
            textBox2.style.backGroundColor = "white";
            letterGroupBox.style.backGroundColor = "white";


            document.getElementById("popup").style.display = "none";
        }

function removeElement (array, element){
const index = array.indexOf(element);
if (index > -1 ) {
array.splice(index,1);
return array;
}
}

function returnCharInObject(objArray, variableName) {
    const entry = objArray.find(item => item.variable === variableName);
    return entry ? entry.letter : null; // Return character if found, otherwise null
}

function returnNameInObject(charString, objArray) {
    const found = objArray.find(obj => obj.letter === charString);
    return found ? found.variable : null; // Return the variable name or null if not found
}


function showPopup(popupId) {
     var popup;
     if ((popupId.startsWith("trope")) && (tropeIndex === -1 )) {
     alert("Can not do trope edit since trope is not in the letter group.");
     return;
      }

    if ((popupId.startsWith("shortVowel")) && (vowelIndex === -1 )) {
     alert("Can not do attached vowel edit since attached vowel is not in the letter group.");
     return;
      }

   if (popupId.startsWith("yodVowel")) {
    popup = document.getElementById(popupId);
    } else  {
    popup = document.getElementById(popupId);
    if (editMode != "edit") {
     alert(" no popup allowed in delete mode");
     return;
   }
}

    popup.style.display = 'block';
 // Check if the popup contains a grid
    const grid = popup.querySelector('.popupGrid');
    
    if (grid) {
        // Log the number of items in the grid for debugging
        const gridItems = grid.children.length; // Get the number of child elements (rows)
        console.log(`The grid for ${popupId} contains ${gridItems} rows.`);
    } else {
        console.log(`No grid found in ${popupId}.`);
    }

}

function hidePopup(popupId) {
const popup = document.getElementById(popupId);
popup.style.display = 'none';
}
/*
//Populate popup dropdowns with options from arrays
function populatePopup(popupId, options) {
    const select = document.getElementById(popupId + 'Select');
    select.innerHTML = ''; // Clear existing options

    // Determine which object to use
    var dataObject = popupId === "shortVowelPopup" ? hebrewVowels : tropeSymbols;
    if (popUpId === "yodVowelsPopupList" ) {
      dateObject = yodVowels;
      alert(" in data object popup for yud vowels");
      return;
     }


    // Add placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = "";
    placeholder.textContent = popupId === "tropePopup" 
        ? "Please choose a trope marking." 
        : "Please choose a vowel (niqqud).";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    // Add actual options using returnCharInObject
    options.forEach(name => {
        const optionElement = document.createElement('option');
        const char = returnCharInObject(dataObject, name); // Get actual character

        optionElement.value = char;
        optionElement.textContent = char; // Show the character in the dropdown
        select.appendChild(optionElement);
    });
}
*/

function populatePopupLists(popupId, options) {
    // Determine which object to use based on the popupId
    let dataObject;

    if (popupId === "shortVowelPopupList") {
        dataObject = hebrewVowels;
    } else if (popupId === "tropePopupList") {
        dataObject = tropeSymbols;
    } else if (popupId === "yodVowelsPopupList") {
        dataObject = yodVowels;
    } else {
          alert( "Invalid data object in call so aborting popup list genertion.");
        return;
    }


    // Clear the existing grid (in case we're repopulating it)
    const grid = document.querySelector(`#${popupId} .popupGrid`);
    grid.innerHTML = ''; // Clear previous entries

    options.forEach(name => {
        const char = returnCharInObject(dataObject, name); // Get actual character for the name
        // Create a row for each option (character + name)
        const optionRow = document.createElement('div');
        optionRow.classList.add('popupItemRow');

        // Create character column
        const charElement = document.createElement('div');
        charElement.classList.add('popupItem', 'popupChar');
        charElement.textContent = char;

        // Create name column
        const nameElement = document.createElement('div');
        nameElement.classList.add('popupItem', 'popupName');
        nameElement.textContent = name;

        // Append character and name columns to the row
        optionRow.appendChild(charElement);
        optionRow.appendChild(nameElement);

        // Append the populated row to the grid
        grid.appendChild(optionRow);
    });
}

// Initialize popups with content using the existing arrays
//multi-column list option
 //alert("Initializing Trope and Vowel Lists");
 populatePopupLists('tropePopupList', tropeSymbolsArray);
// for Hebrew Vowels remove shiruq and vav_holam from the array
 populatePopupLists('shortVowelPopupList', hebrewVowelsArrayShort);
 populatePopupLists('yodVowelsPopupList', yodVowelsArray);
//Add event listeners for small box clicks;

document.getElementById('small-box-top-left').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
}
 if (noLetterGroup === true) {
   return;
 }
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
showPopup('shortVowelPopupList');
});

document.getElementById('small-box-bottom-left').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
 }
 if (noLetterGroup === true) {
   return;
}
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
showPopup('shortVowelPopupList');
});

document.getElementById('small-box-top-right').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
 }
 if (noLetterGroup === true) {
   return;
}
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
showPopup('tropePopupList');
});

document.getElementById('small-box-bottom-right').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
 }
 if (noLetterGroup === true) {
   return;
}
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
showPopup('tropePopupList');
});

document.getElementById('small-box-right-center').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
 }
 if (noLetterGroup === true) {
   return;
}
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
if (dageshIndex > 0 ){
if (editMode === "edit" ) {
alert ("The dagesh cannot be edited since there is no replacment character available.");
}
}
});

document.getElementById('small-box-left-center').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
 }
 if (noLetterGroup === true) {
   return;
}
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
if (vavHolamIndex > 0 ){
//alert ("vavHolam edit selected");
let letterGroup = document.getElementById("letterGroupBox");
let groupText = letterGroup.textContent;
let character = groupText[vavHolamIndex];
//swap characters
if (character === shiruq ) {
character = vav_holam;
} else {
character = shiruq;
}
processSelection("vavHolam", vavHolamIndex, character);

}

});


document.getElementById('small-box-bottom-center').addEventListener('click', () => {
 let okToEdit = false;
 if (checkOpenDropdown() === true) {
   return;
 }
 if (noLetterGroup === true) {
   return;
}
 if ( editMode === "info") {
  doModal("Can not edit in Info Only Mode.  Use radio buttons to change edit mode.");
 return;
}
if (metegIndex > 0 ){
if (editMode === "edit" ) {
alert ("The meteg cannot be edited since there is no replacment character available");
}
}
});




function checkOpenDropdown() {
    let shortVowelPopup = document.getElementById("shortVowelPopupList").style.display;
    let tropePopup = document.getElementById("tropePopupList").style.display;
    return (shortVowelPopup === "block" || tropePopup === "block");
}

 async function handleSelection(event) {
    console.log('Clicked Element:', event.target);
    var selectionType;
    let selectedContent = '';
    let objectToUse = null;
    returnedTrope = "";
    returnedVowel = "";
    returnedyYodVowelName = "";
    returnedyYodVowelChar = "";
    let selectionIndex = -1;

    // Determine the grid source (trope or vowel) based on the event's current target
    let isTropeGrid = event.currentTarget.classList.contains('tropeGrid');
    let isVowelGrid = event.currentTarget.classList.contains('shortVowelGrid');
    let isyodVowelGrid = event.currentTarget.classList.contains('yodVowelGrid');

    if (isTropeGrid) {
        objectToUse = tropeSymbols;
        selectionType = "Trope"
        selectionIndex = tropeIndex;
        if (tropeIndex === -1) {
 const popupList = event.target.closest('.popupList');
    if (popupList) {
        popupList.style.display = 'none';
    }
        alert("cannot edit a trope since there is no trope in the letter group");
         return;
         }
        }

        if (isVowelGrid) {
        objectToUse = hebrewVowels;
        selectionType = "Vowel";
        selectionIndex = vowelIndex;
      if (vowelIndex === -1 ) {
 const popupList = event.target.closest('.popupList');
    if (popupList) {
        popupList.style.display = 'none';
    }
        alert("cannot edit attached vowel since there is no attached  in the letter group");
         return;
          }
      }
 if (isyodVowelGrid) {
       selectionIndex = 1;
        objectToUse = yodVowels;
        selectionType = "yodVowel";
          }  

    if (event.target.classList.contains('popupName')) {
        // Name clicked, look up corresponding character
        selectedContent = event.target.textContent.trim();
        console.log('Selected Name:', selectedContent);

        if (objectToUse) {
            selectedContent = returnCharInObject(objectToUse, selectedContent);
        }
    } else if (event.target.classList.contains('popupChar')) {
        // Character clicked, store directly
        selectedContent = event.target.textContent.trim();
        console.log('Selected Character:', selectedContent);
    }
    

  
    // Store the result in the correct global variable
    if (isTropeGrid) {
        returnedTrope = selectedContent;
        console.log("Stored in returnedTrope:", returnedTrope);
    } else if (isVowelGrid) {
        returnedVowel = selectedContent;
        console.log("Stored in returnedVowel:", returnedVowel);
         }  else if (isyodVowelGrid) {
        returnedYodVowelChar = selectedContent;
        returnedYodVowelName  = returnNameInObject(returnedYodVowelChar,yodVowels); 
        //alert( returnedYodVowelChar.length);
        console.log("Stored in returnedYodVowelCharacter:", returnedYodVowelChar);
        }

    // Hide the popup after selection
    const popupList = event.target.closest('.popupList');
    if (popupList) {
        popupList.style.display = 'none';
    }
    var alertText = "Selected " +  selectionType + " is:&nbsp;&nbsp;&nbsp";
    alertText = alertText + "<span style='font-size: 50px; color: darkred; font-weight: bold;'>" + selectedContent + "</span>";
     //alert("ready to process edit");
    if (!isyodVowelGrid ) {
    processSelection(selectionType, selectionIndex, selectedContent);
       } else {
        doGroupEdit() 
}
dummy = 1;
}

function processSelection(type, index, value) {
let workingText ;
if (activeEdit === true ) {
if (savedEditText === "") {
workingText = backupText;
} else {
workingText = savedEditText;
}
} else {
let groupVowelIndex = -1;
let groupTropeIndex = -1;
let groupIndex = -1;
workingText = textBox1.textContent;
}
let groupTextBox = document.getElementById("letterGroupBox");
var groupText = groupTextBox.textContent;

if (type == "Vowel" ) {
groupIndex = startingIndex + vowelIndex;
}
if (type === "Trope" ) {
groupIndex = startingIndex + tropeIndex;
}
if (type ===  "vavHolam") {
groupIndex = startingIndex + vavHolamIndex;
}


groupText = replaceInString(groupText, index, value);
groupTextBox.textContent = groupText;
workingText = replaceInString(workingText, groupIndex, value);
 savedEditText = workingText;
//textBox1.textContent = workingText;

activeGroupEdit = true;
groupTextBox.style.backgroundColor = "LightPink";
//textBox1.style.backgroundColor = "LightPink";
activeEdit = true;
//activeEdit2 = true;
// redo the map grid since the letter group was modified.
 savedEditText = workingText;
makeGrid(workingText);


}

// Adding the event listener to both popup grids (trope and shortVowel)
document.querySelector('.popupGrid.tropeGrid').addEventListener('click', handleSelection);
document.querySelector('.popupGrid.shortVowelGrid').addEventListener('click', handleSelection);
document.querySelector('.popupGrid.yodVowelGrid').addEventListener('click', handleSelection);


function populateLetterGroupSelect() {
    var select = document.getElementById("numberSelect");
    var finalIndex = -1;
    select.innerHTML = ""; // Clear existing options
    
 // Add placeholder option
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Pick #";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);


    for (var i = 1; i <= letterCount; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

select.addEventListener("change", function() {   // listener for letter group selection
        //alert("Selected number: " + select.value);
        const newLetterGroup = select.value;
        select.blur();
        noLetterGroup = false;
const mapGrid = document.querySelector(".mapGrid");
const gridItems = mapGrid.children;
const gridCount = gridItems.length;
const numRows = 4;
const numColumns = gridCount/numRows;
const rightIndex = gridCount - 1;
const leftIndex = rightIndex - numColumns + 1;

// find the column in the text map 
//if (activeEdit === false ) {
let foundIndex= -1;
let nextLetterIndex  = -1;
baseLetterIndex = -1;
vowelIndex = -1;
tropeIndex = -1;
dageshIndex = -1;
metegIndex = -1;
vavHolamIndex = -1;
punctuationIndex = -1;
letterGroupRight = "";
letterGroupLeft = "";
letterGroupReserved = "";
//}
let workingText;
const textBox2 = document.getElementById("textBox2");

// on inital load use originalText else get from textBox1
if (activeEdit === false) {
workingText = originalText;
activeEdit = true;
} else {
//workingText = textBox1.textContent;
workingText = savedEditText;

}

let displaybox = document.getElementById("display-box");
popupTextId  = document.getElementById("main_textID");
finalIndex = workingText.length -1;
let finalCharacter = workingText[workingText.length -1];
let finalCharacter2 = workingText[workingText.length -2]; //check for two punctuations in a row at end
classCharIndex = finalCharacter;
let finalCharType = classifyCharacter(finalCharacter);
classCharIndex = finalCharacter2;
let finalCharType2 = classifyCharacter(finalCharacter2);
let finalIsPunctuation = false;
if ((finalCharType.letterCode === "P") || (finalCharType2.letterCode === "P"))  {
finalIsPunctuation = true;
}
let pCount = 0;
if (finalCharType.letterCode === "P") {
pCount = pCount + 1 ;
}
if (finalCharType2.letterCode === "P") {
pCount = pCount + 1;
}


let newLetterGroupNumber = Number(newLetterGroup);
startingIndex = letterPositions[newLetterGroupNumber];
foundIndex = findColumnWithValueInTextMap(newLetterGroupNumber) ;  //index in char string
let  letterPositionIndex =  letterPositions.indexOf(foundIndex);
if (letterPositionIndex < letterPositions.length -1 ) {
// not last letter
let nextLetterGroupNumber = newLetterGroupNumber +1 ;
finalIndex = letterPositions[nextLetterGroupNumber]-1;
dummy = 1;
} else {
//last letter
if (finalIsPunctuation === true) {
//finalIndex = finalIndex - 1;
finalIndex = finalIndex - pCount;
punctuationIndex = finalIndex + 1;
}
dummy = 1;
}
//alert("Letter is at index: " + startingIndex + "; The letter group ends with index: " + finalIndex);
let letterGroupText = "";
let shiftP = 0;
let localCharType;
displaybox.textContent = startingIndex;
letterGroupRight = workingText;
letterGroupLeft = workingText;
for (let i = startingIndex ; i <= finalIndex; i ++ ) {
//let gridIndex = rightIndex - letterPositions[letterPositionIndex] - i;
let gridIndex = rightIndex -  i;
let testIndex = gridIndex - 1 * numColumns;
let typeFromGrid =  gridItems[testIndex].textContent;
classCharIndex = finalCharacter;  // used ???
localCharType = classifyCharacter(workingText[i]).letterCode;
switch  (localCharType) {
case "L":
if (typeFromGrid === "Y" ) {     // prevent yod in dipthong from looking like a letter
break;
}
baseLetterIndex = i - startingIndex;
break;
case "V":
 if (typeFromGrid === "G" ) {       // override return from classify for G in grid
   break;
} 
vowelIndex = i - startingIndex;
break;

case "X":
 if (typeFromGrid === "G" ) {          // override return from classify for G in grid
break;
}
vavHolamIndex = i - startingIndex;
break;

case "T":
tropeIndex = i - startingIndex;
break;
case "M":
metegIndex = i - startingIndex;
break;
case "D":
dageshIndex = i - startingIndex;
break;
}
if (localCharType != "P") {
letterGroupText = letterGroupText + workingText[i];
}  else {
shiftP = shiftP + 1;
}
}
finalIndex = finalIndex - shiftP; // adjust for punctuation in letter group
// Get everything from index 0 to startingIndex - 1
letterGroupRight = letterGroupRight.slice(0, startingIndex);
// Get everything from finalIndex + 1 to end
 letterGroupLeft = letterGroupLeft.slice(finalIndex + 1);
punctuationIndex = finalIndex + 1;

const letterGroupBox = document.getElementById("letterGroupBox");
letterGroupBox.innerText = letterGroupText;
letterGroupReserved = letterGroupText;
let combinedStrings = letterGroupRight + letterGroupReserved + letterGroupLeft;
if (combinedStrings === workingText ) {
//alert("strings match");
} else {
//alert ("strings do not match");
}
dummy = -1;
    });


// Function to close the parent popup
function closePopupX(event) {
    const popup = event.target.closest('.popupList');
    if (popup) {
       alert("No selection made.  Closing Selection Window.");
        popup.style.display = 'none';
    }
    event.stopPropagation(); // Prevents accidental clicks from propagating
}

// Attach event listeners to all close buttons
document.querySelectorAll('.popupClose').forEach(closeBtn => {
    closeBtn.addEventListener('click', closePopupX);
});

}  // end needed because the listener is added as part of function populateLetterGroupSelect()

function findColumnWithValueInTextMap(testVar) {
    // Convert the testVar (number) to a string to match displayed values
    let testVarAsString = String(testVar);

    // Reference the grid element by its ID
    const grid = document.getElementById("textMap");

    if (!grid) {
        console.warn("Grid with id 'textMap' not found");
        return -1; // Return if the grid is not found
    }

    // Get all grid cells (since they are stored in a flat order)
    const cells = grid.getElementsByTagName("div");

    // Ensure we can derive number of columns from the total cells count
    const textLength = cells.length / 4; // Since there are always 4 rows

    // Iterate over the "Variables" row only (row index 3)
    for (let col = 0; col < textLength; col++) {
        let cellIndex = (3 * textLength) + col; // Calculate the correct cell index for row 3
        let cellValue = cells[cellIndex].textContent.trim(); // Get the text content

        if (cellValue === testVarAsString) { // Check if it matches the testVar
            let adjustedIndex = (textLength - 1) - col; // Adjust index for RTL ordering
            console.log(`Found ${testVarAsString} at column ${col}, adjusted index: ${adjustedIndex}`);
            return adjustedIndex; // Return the adjusted index
        }
    }

    console.log(`${testVarAsString} not found in the grid`);
    return -1;  // Return -1 if no match is found
}

function loadRadioButtons() {
    document.getElementById("modeInfo").checked = true; // Set default to Info Only

    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener("change", function() {
            console.log("Mode changed to:", this.value); // Placeholder for future actions
            let newMode = this.value;
             editMode = newMode;
           
   // doModal("The new edit\/delete\/info  mode has been changed to: " + newMode);
        });
    });
}

function replaceInString(originalString, index, replacement) {
      let newString =  originalString.substring(0, index) + replacement + originalString.substring(index + 1);
       return newString;
}

function acceptGroupEdit() {
//alert( "in accept group edit.");
if (activeEdit === false ) {
return;
}
textBox1 = document.getElementById("textBox1");
const letterGroupBox = document.getElementById("letterGroupBox");
letterGroupBox.style.backgroundColor = "White";
textBox1.style.backgroundColor = "White";
textBox2.style.backgroundColor = "LightPink";

//redo the grid with new letter group
makeGrid();
activeEdit = false;
}

function saveGroupEdit(){
activeEdit = false;
activeEdit2 = false;
savePending = true;
textBox1 = document.getElementById("textBox1");
textBox2 = document.getElementById("textBox2");
textBox2.textContent = textBox1.textContent;
textBox2.style.backgroundColor = "#C2DFFF";
textBox1.style.backgroundColor = "White";
}

function finalSave() {
savePending = false;
textBox2 = document.getElementById("textBox2");
textBox2.style.backgroundColor = "White";
closePopup();
cloawGrid();
}

function startOver() {
savePending = false;
activeEdit = false;
activeEdit2 = false;
textBox1 = document.getElementById("textBox1");
textBox2 = document.getElementById("textBox2");
letterGroupBox = document.getElementById("letterGroupBox");
textBox1.style.backgroundColor = "White";
textBox2.style.backgroundColor = "White";
letterGroupBox.style.backgroundColor = "White";
closePopup();
cloawGrid();
}


function checkOpenPopup() {
const popup = document.getElementById("popup");
let returnV = false;
if (popup.style.display != "none") {
returnV = true;
}
return returnV;
}

function addGridListeners() {
    document.querySelectorAll('.mapCellClass').forEach(cell => {
        selectedGroupNumber = -1;

        // Right-click (contextmenu) event listener
        cell.addEventListener("contextmenu", async function (event) {
            event.preventDefault(); // Prevent the default right-click menu

            // Retrieve the selected cell's content before any conditions
            let cellContent = this.textContent.trim(); // Get the content of the clicked cell
            let gridBox = document.getElementById("textMap"); // Get parent grid
            
            // Detect if CTRL key is held during right-click
            if (event.ctrlKey) {
                console.log("CTRL + Right-click detected on", this);

                // Execute special logic when CTRL + Right-click is detected
                showMainPopup();
                let numberSelect = document.getElementById("numberSelect");  
                if (numberSelect) {
                    numberSelect.value = cellContent; // Set the detected value in the select dropdown
                    // Manually trigger the change event if needed
                    numberSelect.dispatchEvent(new Event("change"));
                }
                return; // Exit early to prevent further processing
            }

            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
           
            if (cellContent === "") {
                return; // Do nothing if the cell is blank
            }

            let cellNumber = Number(cellContent); // Try converting to a number
            let typeIndex;
            if (!isNaN(cellNumber)) {
                let cellId = this.id; // Get the ID of the clicked cell
                let clickedGridIndex = Number(cellId.replace("mapCell", "")); // Extract number from the ID
                selectedGroupNumber = cellNumber;
                let mainTextBox = document.getElementById("main_textID");
                let workingText = mainTextBox.textContent;
                let beginningIndex = letterPositions[cellNumber];
                let endingIndex;
                if (cellNumber === letterPositions.length - 1) {
                    endingIndex = workingText.length - 1;
                } else {
                    endingIndex = letterPositions[cellNumber + 1] - 1;
                }
                //alert( beginningIndex + " " + endingIndex);
                let allCodes = "";
                 numRows = 4;
                 numColumns = gridBox.children.length / numRows;
                for  (jj = beginningIndex; jj <= endingIndex;  jj ++ ) {
                typeIndex = numColumns -1 - jj ;
                typeIndex = typeIndex  + 2*numColumns;
                allCodes = allCodes + gridBox.children[typeIndex].textContent;
                }
                //alert (allCodes);
                if (allCodes.indexOf("G") < 0 ) {
                await doModal("Letter Group: " + cellContent + " does not contain any yod vowels so no further replacement is permitted.");
                return;
                }
                let workingString =  document.getElementById("main_textID").textContent;
                let groupString = workingText.substring(beginningIndex, endingIndex + 1);
                let matchArray = countMatches(allCodes, "G") ;
                let firstMatch = matchArray[0] + beginningIndex;
                let lastMatchIndex = firstMatch + matchArray.length + 1;  // last index in the existing yod vowel grouping;
                origRight = workingString.substring(0, firstMatch);  // Text up to first match
                origLeft = workingString.substring(lastMatchIndex);  // Text after the last match
                //await doModal( origRight + "&nbsp;&nbsp;&nbsp;" + origLeft);
                //await doModal( "Full text for  group number " + cellContent  + " is:&nbsp;\"" + groupString + "\";with " + matchArray.length +  " matches to 'G' ");
                let hebrewText = "<span dir='rtl'>" + groupString + "</span>";
                let allText = "Full text for group number " + cellContent + " is:&nbsp;\"" +hebrewText + "\" with " + matchArray.length + " matches to 'G'";
                //await doModal(allText);

                let beginningTopIndex = beginningIndex;
                let endingTopIndex = endingIndex;
                let oldColor = gridBox.children[numColumns - (endingTopIndex + 1)].style.backgroundColor;

                // Apply Olive background to the selected cells
                for (let mm = beginningTopIndex; mm <= endingTopIndex; mm++) {
                    gridBox.children[numColumns - (mm + 1)].style.backgroundColor = "Olive";
                }
                let answer;
                 let changedText;
                 let mm;
                 let wasSaved = false;
                 answer = await doModal("Do you want to delete the highlighted characters?", "", "Yes");
                if (answer === "NO") {
                    for ( mm = beginningTopIndex; mm <= endingTopIndex; mm++) {
                        gridBox.children[numColumns - (mm + 1)].style.backgroundColor = oldColor;
                    }
                } else {
                   for (mm = beginningTopIndex; mm <= endingTopIndex; mm++) {
                        gridBox.children[numColumns - (mm + 1)].style.backgroundColor = oldColor;
                    }
                changedText = workingText.slice(0,beginningTopIndex) + workingText.slice(endingTopIndex);
                 answer = await doModal( "Save the following with deleted text?",  changedText, "Yes");
                  if (answer === "YES") {
                     wasSaved = true;
                  } else {

                   }//  end of save 
                  } // end delete else yes
       
                if (wasSaved === false) {
            for (let mm = beginningTopIndex; mm <= endingTopIndex; mm++) {
                    gridBox.children[numColumns - (mm + 1)].style.backgroundColor = "Olive";
                     }                 
               answer = await doModal("Do you want to replace the highlighted characters?", "", "Yes");
                if (answer === "NO") {
                    for ( mm = beginningTopIndex; mm <= endingTopIndex; mm++) {
                        gridBox.children[numColumns - (mm + 1)].style.backgroundColor = oldColor;
                    }
                } else {
                   for (mm = beginningTopIndex; mm <= endingTopIndex; mm++) {
                       gridBox.children[numColumns - (mm + 1)].style.backgroundColor = oldColor;
                    }
                 showPopup("yodVowelsPopupList");
                
                } // end else yes

               }
            }

        });
            
          
        // Hover in (mouse over) event listener
        cell.addEventListener("mouseover", function (event) {
            let cellContent = this.textContent.trim(); // Get the content of the hovered cell

            if (cellContent === "") {
                return; // If empty, do nothing
            }

            // Create the tooltip only if it's not already created
            let tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");
            tooltip.innerHTML = "Right click on a number in the bottom row to delete <br> that letter group from the text line.";

            // Set the tooltip position just above the cell
            let cellRect = this.getBoundingClientRect();
            let gridRect = document.getElementById("textMap").getBoundingClientRect(); // Get parent grid bounds
            let tooltipWidth = 400; // Estimated tooltip width (adjust as needed)
            let tooltipLeft = cellRect.left;
           // let tooltipTop = cellRect.top - 60;
            let tooltipTop = cellRect.top - 10;


            // Adjust position if the tooltip extends beyond the grid
            if (tooltipLeft + tooltipWidth > gridRect.right) {
                tooltipLeft = gridRect.right - tooltipWidth - 10; // Move left to fit within the grid
            }

            tooltip.style.width = tooltipWidth; // Set a fixed width  
            tooltip.style.whiteSpace = "normal"; // Allow text wrapping  
            tooltip.style.wordWrap = "break-word"; // Ensure text wraps properly  
            tooltip.style.overflowWrap = "break-word"; // Prevent uncontrolled expansion  
            tooltip.style.position = "absolute";
            tooltip.style.left = tooltipLeft + "px";
            tooltip.style.top = tooltipTop + "px";
            tooltip.style.zIndex = "501"; // Ensure it's above the mapGrid

            // Apply basic tooltip styles
            tooltip.style.backgroundColor = "#333"; // Dark background
            tooltip.style.color = "#fff"; // White text
            tooltip.style.fontWeight = "bold"; // Bold text
            tooltip.style.fontSize = "18px"; // Set font size to 18px
            tooltip.style.padding = "5px 10px"; // Padding around the text
            tooltip.style.borderRadius = "5px"; // Optional: Rounded corners

            // Append the tooltip to the body
            document.body.appendChild(tooltip);

            // Store the tooltip for later removal (on mouse out)
            this.tooltip = tooltip;
        });

        // Hover out (mouse off) event listener
        cell.addEventListener("mouseout", function (event) {
            // Remove the tooltip when the mouse leaves the cell
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });

    });
}


// Function to add event listeners for right-click and hover
function addGridListeners2() {
    document.querySelectorAll('.mapTypeClass').forEach(cell => {
     cell.addEventListener("mouseover", function (event) {
            let cellContent = this.textContent.trim(); // Get the content of the hovered cell
            let tipText = "";
            let extraText = "";
            if (cellContent === "") {
                return; // If empty, do nothing
            }
            // Create the tooltip only if it's not already created
            let tooltip2 = document.createElement("div");
            tooltip2.classList.add("tooltip2");
            tipText = "";
            tipText = tipText + "Character at this position has type " + cellContent + ". ";

            switch (cellContent) {
            case "L": 
            extraText = "This is a normal letter, not final sofit form or a yod " + "( " + yod + " ) within a vowel grouping with a type of Y.";
            break;
            case "S":
            extraText = "This is a normal final letter (sofit form).";
            break;
            case "V":
            extraText = "This is a normal vowel appearing above or below the parent letter,  not part of a vowel grouping with a yod " + "( " + yod + " ).";
            break;
            case "X":
            extraText = "This is a vowel incorporating a vav ( " + vav + " ) placed after the parent letter, either a <i>shirug<\/i> ( " + shiruq +" ) ";
            extraText = extraText + " or a <i>holam male<\/i> ( " + vav_holam + " ).";
            break;
            case "G":
            extraText = extraText + "This indicates that the vowel at this position is used in a vowel grouping with a yod " + "( " + yod + " ).";
            extraText = extraText + " This may also be part of a dipthong combination.";
            break;
            case "Y":
            extraText = extraText + "This indicates that the yod " + "( " + yod + " ) at this position is part of a vowel or dipthong grouping ";
            extraText = extraText + " and is not a normal letter which would be indicated with a type of L.";
            break;
            case "P":
            extraText = extraText + "This is a standard punctuation.";
            break;
            case "M":
            extraText = extraText + "This indicates that a <i>meteg<\/i> ( " + space + meteg + " ) has been placed on the base letter.";      
            break;
            case "D":
            extraText = extraText + "This indicates that a <i>dagesh<\/i> ( " + space + dagesh + " ) has been placed on the base letter. ";
            extraText = extraText + " or an identical looking  marking has been placed on a letter <i>hey<\/i> ( " + hey + " ) that is the final letter of word. ";
            extraText = extraText + "This alternate marking is called a <i>mappiq<\/i>.";  
            break;
            case "T":
            extraText = extraText + "This indictes that a trope symbol (cantillation marking) has been placed on the base letter.";
            break;


            }           
         
            if ( extraText  != "") {
            tipText = tipText + extraText;
              }
            tooltip2.innerHTML = tipText;

            // Set the tooltip position just above the cell
            let cellRect = this.getBoundingClientRect();
            let gridRect = document.getElementById("textMap").getBoundingClientRect(); // Get parent grid bounds
             let tooltip2Width = 600; // Tooltip width

let tooltip2Left = cellRect.left;
let tooltip2Top = cellRect.top - 10; // Position above the cell

// Calculate the right edge of the tooltip
let tooltip2Right = tooltip2Left + tooltip2Width;

// Check if the tooltip exceeds the grid's right edge
if (tooltip2Right > gridRect.right) {
    // Calculate the amount of overshoot
    let overshoot = tooltip2Right - gridRect.right;

    // Shift the tooltip to the left by the overshoot amount, plus a margin
    tooltip2Left = tooltip2Left - (overshoot + 10); // 10px margin to give some space between tooltip and grid
}
            tooltip2.style.width = tooltip2Width + "px"; // Set a fixed width  
            tooltip2.style.whiteSpace = "normal"; // Allow text wrapping  
            tooltip2.style.wordWrap = "break-word"; // Ensure text wraps properly  
            tooltip2.style.overflowWrap = "break-word"; // Prevent uncontrolled expansion  
            tooltip2.style.position = "absolute";
            tooltip2.style.left = tooltip2Left + "px";
            tooltip2.style.top = tooltip2Top + "px";
            tooltip2.style.zIndex = "501"; // Ensure it's above the mapGrid
            tooltip2.style.textAlign = "left"; // Align text to the left
            tooltip2.style.fontFamily = "Times New Roman";


tooltip2.style.display = "inline-block"; // Make the tooltip adjust to the content's width
        
            // Apply basic tooltip styles
            tooltip2.style.backgroundColor = "DarkGreen"; // Dark background
            tooltip2.style.color = "#fff"; // White text
            tooltip2.style.fontWeight = "bold"; // Bold text
            tooltip2.style.fontSize = "18px"; // Set font size to 18px
            tooltip2.style.padding = "5px 10px"; // Padding around the text
            tooltip2.style.borderRadius = "5px"; // Optional: Rounded corners

            // Append the tooltip to the body
            document.body.appendChild(tooltip2);

            // Store the tooltip for later removal (on mouse out)
            this.tooltip2 = tooltip2;
        });

        // Hover out (mouse off) event listener
        cell.addEventListener("mouseout", function (event) {
            // Remove the tooltip when the mouse leaves the cell
            if (this.tooltip2) {
                this.tooltip2.remove();
                this.tooltip2 = null;
            }
        });

    });
}
 async function doGroupEdit() {
              changedText = origRight + returnedYodVowelChar + origLeft;
               // await doModal(  "In group edit for: " + selectedGroupNumber + " with yod vowel selction: " + returnedYodVowelName);
             answer = await doModal( "Save the following with modified text?",  changedText, "Yes");
            }

function countMatches(mainStr, searchStr) {
    const regex = new RegExp(searchStr, "g");
    return [...mainStr.matchAll(regex)].map(match => match.index);
}

function saveToClipBoard()  {
let mainText = document.getElementById("main_textID").textContent;
navigator.clipboard.writeText(mainText);
doModal("Main text box contents<br><br>" + mainText + "<br><br> saved to clipboard.");
}

function xOver(action) {
    //alert("In Overlay: " + action);
    return;
    let workArray = okLetters; // Ensure this is properly defined
    const cells = document.querySelectorAll(".cell");

    // Add the "x-overlay" class to all .cell elements
    cells.forEach(cell => {
        if (cell) { // Ensure cell is valid before modifying
            cell.classList.add("x-overlay");
        }
    });

    // Remove "x-overlay" from specific cells based on ID
    workArray.forEach(item => {
        let cellDivID = item + "Div";
        let cellDiv = document.getElementById(cellDivID);
        
        if (cellDiv) { // Ensure cellDiv exists
            cellDiv.classList.remove("x-overlay");
        }
    });

 // Remove "x-overlay" from blank cells 
  const cells2 = document.querySelectorAll(".nullClass");

    // remove the "x-overlay" class from null cells
    cells2.forEach(cell => {
        if (cell) { // Ensure cell is valid before modifying
            cell.classList.remove("x-overlay");
        }
    });

    dummy = -1;
}
async function resetAll() {

    // Nothing was recovered when the page loaded,
    // so there is nothing for Reset to restore.
    if (!backupText || backupText.trim() === "") {
        return;
    }

    let answer;

    answer = await doModal(
        "Do you want to start over with the following, previously recovered text?  This choice cannot be undone.",
        backupText,
        "YES"
    );

    if (answer === "YES") {
        mainText.textContent = backupText;

        await doModal(
            "To start over close this alert and refresh the page in the browser to reload the file."
        );
    }
}