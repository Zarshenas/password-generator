import toastifyJs from "./toastify.js";


const passwordLength = document.getElementById("length");
const elUppercase = document.getElementById("Uppercase");
const elLowercase = document.getElementById("Lowercase");
const elNumbers = document.getElementById("Numbers");
const elSymbols = document.getElementById("Symbols");
const allInputEl = document.querySelectorAll("input");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");
const clipBoardBtn = document.getElementById("clipboard");

const charackters = {
    uppercaseLetters:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    lowercaseLetters:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numbers:[0,1,2,3,4,5,6,7,8,9],
    symbols:["!","@","#","$","%","^","&","*","(",")","=","+","[","]","{","}",":",",",".","/","<",">","?"]
}

const Properties = {
    passwordLength:10,
    includeUppercaseLetters:false,
    includeLowercaseLetters:false,
    includeNumbers:false,
    includeSymbols:false
}

const setProperties = (properties) => {
    
    properties.passwordLength=passwordLength.value;
    properties.includeUppercaseLetters=elUppercase.checked;
    properties.includeLowercaseLetters=elLowercase.checked;
    properties.includeNumbers=elNumbers.checked;
    properties.includeSymbols=elSymbols.checked;

    return properties;

}

allInputEl.forEach(function(element) {
    element.addEventListener("change", function() {
        setProperties(Properties);
    });
});

passwordLength.addEventListener("change" , function(){
    if(passwordLength.value >= 21 ||passwordLength.value <= 3){
        passwordLength.value= 10;
        toastifyJs("The length must be between 4 and 20 !",3000 ,"#333333" , "#dd1818" );
    }
});

const manageSettings = (upper,lower,number,symbol,length) => {
    const {uppercaseLetters , lowercaseLetters , numbers , symbols} = charackters;
    const includes = [upper,lower,number,symbol];
    let counter=0;
    includes.forEach(element => {
        element && counter++;
    });

    let randomString = "";
    let finalPassword = "";

    if (!upper && !lower && !number && !symbol){
        toastifyJs("Select at least one of the settings below",3000 ,"#cc2b5e" , "#753a88" );
        return finalPassword = "";
    }else{
        if (upper) {
            for( let i=0 ; i<length/counter; i++){
                randomString += uppercaseLetters[Math.floor(Math.random()*uppercaseLetters.length)];
            }
        }
        if (lower) {
            for( let i=0 ; i<length/counter; i++){
                randomString += lowercaseLetters[Math.floor(Math.random()*lowercaseLetters.length)];
            }
        }
        if (number) {
            for( let i=0 ; i<length/counter; i++){
                randomString += numbers[Math.floor(Math.random()*numbers.length)];
            }
        }
        if (symbol) {
            for( let i=0 ; i<length/counter; i++){
                randomString += symbols[Math.floor(Math.random()*symbols.length)];
            }
        }
        for( let i=0 ; i<length; i++){
            finalPassword += randomString[Math.floor(Math.random()*randomString.length)];
        }
        return finalPassword;
    }

    function newFunction() {
        return "3000";
    }
}

generateBtn.addEventListener("click", function () {
    const {passwordLength,includeUppercaseLetters , includeLowercaseLetters,includeNumbers , includeSymbols} = Properties;
        result.innerText = manageSettings(includeUppercaseLetters,includeLowercaseLetters,includeNumbers,includeSymbols,passwordLength);
})

clipBoardBtn.addEventListener("click" , function (){  
    if(result.innerText){

        navigator.clipboard.writeText(result.innerText);
        
        toastifyJs(`The Password Copied: " ${result.innerText}`,3000 ,"#654ea3" , "#eaafc8" );
    }else{
        toastifyJs("There is nothing to copy :)",3000 ,"#333333" , "#dd1818" );
    }
})