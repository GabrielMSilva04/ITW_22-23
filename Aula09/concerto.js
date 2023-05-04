(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            var twoPlaces = checkPlaces();
            console.log('--- formValidation');
            if (!form.checkValidity() || !twoPlaces) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

function checkPlaces() {
    console.log('--- function checkPlace()');

    var max = 0;
    var checked = $('input[name=local]:checked').length;
    //--- Se checked!=2 coloca o required=true em todos; senão, coloca o required=false em todos
    $('input[name=local]').each(function () {
        if ($(this).prop("checked") && $(this).val() * 1.0 > max) {
            max = $(this).val() * 1.0;
        }
        $(this).prop("required", checked < 2);
    });
    $("#preco").val(max);
    //--- Se checked == 2 retorna true ; senão, retorna false
    return checked >= 2;
}