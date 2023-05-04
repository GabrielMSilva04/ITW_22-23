// antes de selecionar operação, os números vão para op1, depois para op2
function operation(val) {
    if (typeof opr === 'undefined'){
        next()
        dis(val)
        op()
    }
    else{
        res = "Erro: Dois sinais usados!"
        document.getElementById("ecra").value = res
        setTimeout(clr, 1000);
    }
}
    
function op() {
    var a = document.getElementById("ecra").value;
    const myArray = a.split("");
    opr = myArray.pop()

    return opr
}


function dis(val) {
    document.getElementById("ecra").value += val
}


function next() {
    op1 = document.getElementById("ecra").value;
    if (typeof res === 'undefined'){
        x = parseFloat(op1)
    }
    else{x=res}

    return x
}



function clr() {
    document.getElementById("ecra").value = ""
    op1= undefined
    op2= undefined
    x= undefined
    y= undefined
    res= undefined
    opr= undefined
}



function calcula() {
    //document.getElementById("ecra").value += "="
    b = document.getElementById("ecra").value;
    op2 = b.substring(op1.length+1,b.length);
    y = parseFloat(op2)
    res=0
            if (opr == "+"){
                res = x + y;
            }
            if (opr == "-"){
                res = x - y;
            }
            if (opr == "*"){
                res = x * y;
            }
            if (opr == "/"){
                if (y == 0) {
                    res = "Erro: Divisão por zero!"
                    setTimeout(clr, 1000);

                }
                else{
                    res = x / y;
                }
            } 
    document.getElementById("ecra").value = res
    opr=undefined
    return res
}