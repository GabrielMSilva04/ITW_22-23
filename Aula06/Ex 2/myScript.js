function calcula() {
    var op1 = document.getElementById("op1");
    var op2 = document.getElementById("op2");
    var res = document.getElementById("res");
    var operacao = op.options[op.selectedIndex].value;
    var x = parseFloat(op1.value);
    var y = parseFloat(op2.value);
        switch (operacao){
            case "1":
                res.value = x + y;
                break;
            case "2":
                res.value = x - y;
                break;
            case "3":
                res.value = x * y;
                break;
            case "4":
                if (y == 0) {
                    res.value = "Erro: Divisão por zero!"
                }
                else{
                    res.value = x / y;
                }
                break;
            default:
                res.value = "ERRO!"
        }
}