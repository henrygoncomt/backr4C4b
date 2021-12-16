var validaCuenta = function () {
    //var urlBaseLogin = "http://168.138.142.158:8080/api/user";
    var urlBaseLogin = "/api/user";

    console.log("ejecutando validacion de usuario")

    var email = $("#email").val();
    var clave = $("#password").val();

    if (email.length == 0) {
        alert("Ingrese el correo ...!")
        return 0;
    }

    if (clave.length == 0) {
        alert("Ingrese la contraseña ...!")
        return 0;  
    }

    let credentials = {
        email: $("#email").val(),
        clave: $("#password").val(),
    };


    $.ajax({
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',

        url: urlBaseLogin + "/emailexist/"  + credentials.email,

        success: function (response) {
        console.log(response);
        if (response == false) {
            alert("Usuario se va a registrar ...");
            guardarRegistro();
        }
            console.log(response);
            alert("Usuario ya registrado ...!");
            limpiarForm();
        }

        //error: function (jqXHR, textStatus, errorThrown) {
        //   alert("Usuario ya registrado ...!");
        //}
    });

}

var limpiarForm = function() {
    //$("#id").val('');
    $("#username").val('');
    $("#useremail").val('');
    $("#password").val('');
    $("#passwordrepeat").val('');
    
}

function validarEmail(em) {
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(em)){
    //alert("Email " + em + " es correcto");
    return true;
    } else {
        alert("Email es incorrecto");
        return false;
    }
}

var guardarRegistro = function () {
    console.log("ejecutando funcion guardar")
    //var urlBaseUser = "http://168.138.142.158:8080/api/user";
    var urlBaseUser = "/api/user";
    
    var payload;
    var method;
    
    var id = $("#id").val();
    var idt = $("#identification").val()
    var nm = $("#name").val();
    var dr = $("#address").val();
    var cp = $("#cellPhone").val();
    var em = $("#email").val();
    var pw = $("#password").val();
    var pwr = $("#passwordrepeat").val();
    var zn = $("#zone").val();
    var tp = $("#type").val();

    var msg;
    var ruta;
    if (nm.length == 0 || nm == null ) {
        alert('Revisar los campos ...!')
    }else { 
        if (validarEmail(em)){
            if (!pw !== null && pw.length > 3 && !pwr !== null && pwr.length > 3) {
                if (pw == pwr) {
                    ruta = urlBaseUser + "/new";
                    payload = {
                        id: +$("#id").val(),
                        identification: $("#identification").val(),
                        name: $("#name").val(),
                        address: $("#address").val(),
                        cellPhone: $("#cellPhone").val(),
                        email: $("#email").val(),
                        password: $("#password").val(),
                        zone: $("#zone").val(),
                        type: $("#type").val()
                    };
                    method = "POST";
                    //msg = "Registro Existoso ...!";
                    
                    console.log("Guardando ", payload)
                    console.log("ruta ", ruta)
                    console.log("method ", method)

                    $.ajax({
                        url: ruta,
                        type: method,
                        dataType: 'json',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(payload),
                        statusCode: {
                          201: function () {
                            alert('Registro Existoso ...!');
                            limpiarForm();    
                            }
                        }
                    });  
                } else {
                    alert('Verifique datos de password ...!');
                }
            } else {
                    alert('Verifique datos de password ...!');
            }
        } else {
            alert('Verifique datos de correo ...!');
        }
    }
}