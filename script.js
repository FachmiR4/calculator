let jumlahBerjalan = 0;
let penyangga = '0';
let sebelumOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = penyangga;
}
function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            penyangga = '0';
            jumlahBerjalan = 0;
            break;
        case '=':
            if(jumlahBerjalan === null){
                return
            }
            flushOperator(parseInt(penyangga));
            sebelumOperator = null;
            penyangga = jumlahBerjalan;
            jumlahBerjalan = 0;
            break;
        case "←":
            if(penyangga.length === 1){
                penyangga = "0";
            }else{
                penyangga = penyangga.substring(0, penyangga.length - 1 );
            }
            break;
        case "+":
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol){
    if(penyangga === 0){
        return;
    }
    const intBuffer = parseInt(penyangga);
    if(jumlahBerjalan === 0){
        jumlahBerjalan = intBuffer;
    }else{
        flushOperator(intBuffer)
    }
    sebelumOperator = symbol;
    penyangga = '0';
}
function flushOperator(intBuffer){
    if(sebelumOperator === "+"){
        jumlahBerjalan += intBuffer;
    }else if(sebelumOperator === '−'){
        jumlahBerjalan -= intBuffer;
    }else if(sebelumOperator === '×'){
        jumlahBerjalan *= intBuffer;
    }else if(sebelumOperator === '÷'){
        jumlahBerjalan /= intBuffer;
    }
}
function handleNumber(numberString){
    if(penyangga === '0'){
        penyangga = numberString;
    }else{
        penyangga += numberString;
    }
}
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init()