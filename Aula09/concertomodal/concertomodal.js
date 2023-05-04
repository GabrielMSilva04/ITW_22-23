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


///
$(document).ready(function() {
    $('#signupForm')
        .formValidation({
            framework: 'bootstrap',
            err: {
                container: '#errors'
            },
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                firstName: {
                    row: '.col-xs-4',
                    validators: {
                        notEmpty: {
                            message: 'The first name is required'
                        }
                    }
                },
                lastName: {
                    row: '.col-xs-4',
                    validators: {
                        notEmpty: {
                            message: 'The last name is required'
                        }
                    }
                },
                username: {
                    validators: {
                        notEmpty: {
                            message: 'The username is required'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 5 and less than 31 characters long'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The email address is required'
                        },
                        emailAddress: {
                            message: 'The email address is not valid'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        different: {
                            field: 'username',
                            message: 'The password cannot be the same as username'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: 'The gender is required'
                        }
                    }
                },
                bio: {
                    validators: {
                        stringLength: {
                            max: 300,
                            message: 'The bio must be less than 300 characters long'
                        }
                    }
                }
            }
        })
        .on('err.form.fv', function(e) {
            // Show the message modal
            $('#messageModal').modal('show');
        });
});