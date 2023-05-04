prod1=0
prod2=0
prod3=0
prod4=0
quant1=0
quant2=0
quant3=0
quant4=0
price1=0
price2=0
price3=0
price4=0
total=0
//--- TODO
function limpar() {
    //--- TODO: escrever o código em falta aqui...
    document.getElementById("quantidades").value = ""
    document.getElementById("total").value = ""
    prod1=0
    prod2=0
    prod3=0
    prod4=0
    quant=0
    total=0
}

function validar() {
    //--- TODO: escrever o código em falta aqui...
    //--- Se a função retornar true o formulário será enviado; 
    //--- Se a função retornar false, o formulário não será enviaddo.
    if(quant==0){
        failde=true
    }
    if (failed == true) {
        event.preventDefault();
        event.stopPropagation();
    }
}

function comprar(number) {
 
    if (number==1){
        prod1 = parseFloat(prod1) + 1
    }
    if (number==2){
        prod2 = parseFloat(prod2) + 1
    }
    if (number==3){
        prod3 = parseFloat(prod3) + 1
    }
    if (number==4){
        prod4 = parseFloat(prod4) + 1
    }
    quant= prod1+prod2+prod3+prod4
    document.getElementById("quantidades").value = quant
    calcular(number)
}

function calcular(number){
    
    document.getElementById("produto1").value = prod1
    document.getElementById("produto2").value = prod2
    document.getElementById("produto3").value = prod3
    document.getElementById("produto4").value = prod4


    if (number==1){
        var price1= parseFloat(1.95)
        quant1 = parseFloat(quant1) + 1
        total= total +price1
    }
    if (number==2){
        var price2= parseFloat(2.49)
        quant2 = parseFloat(quant2) + 1
        total= total +price2
    }
    if (number==3){
        var price3= parseFloat(2.99)
        quant3 = parseFloat(quant3) + 1
        total= total +price3
    }
    if (number==4){
        var price4= parseFloat(0.99)
        quant4 = parseFloat(quant4) + 1
        total= total +price4
    }
     

    document.getElementById("total").value = parseFloat(total)
}