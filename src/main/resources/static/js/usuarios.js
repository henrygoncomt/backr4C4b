//var urlBaseUser = "http://168.138.142.158:8080/api/user";
var urlBaseUser = "/api/user";

var consultarAd = function(){
    $.ajax({
        url: urlBaseUser + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTablaAd(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTablaAd = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID</th>
                    <th>IDENTIFICACION</th>
                    <th>NOMBRE</th>
                    <th>DIRECCION</th>
                    <th>CELULAR</th>
                    <th>CORREO</th>
                    <th>ZONA</th>
                    <th>TIPO</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].identification}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].address}</td>
                   <td>${items[i].cellPhone}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].zone}</td>
                   <td>${items[i].type}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].id}, '${items[i].identification}', '${items[i].name}', '${items[i].address}', '${items[i].cellPhone}', '${items[i].email}', '${items[i].password}', '${items[i].zone}', '${items[i].type}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].id})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarAd();
});

var nuevoAd = function () {
    $("#tituloModalAdministrador").html('Nuevo Usuario');
    $("#id").val('');
    $("#identification").val('');
    $("#name").val('');
    $("#address").val('');
    $("#cellPhone").val('');
    $("#email").val('');
    $("#password").val('');
    $("#zone").val('');
    $("#type").val('');

    $('#modalAdministrador').modal('show');
}

var cerrarModal = function () {
    $('#modalAdministrador').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}



async function consultarUser() {
    var idu = $("#id").val();
    
    try {
        console.log("Entro")
        const url = urlBaseUser + "/" + idu
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        if (json == null){
            alert('No lo encontro')
        }else {
            alert('Lo encontro')

        }
    } catch (error) {
        console.log("error:", error)
    }
}

async function guardarCambiosAd() {
    var id = $("#id").val();
    var idt = $("#identification").val()
    var nm = $("#name").val();
    var dr = $("#address").val();
    var cp = $("#cellPhone").val();
    var em = $("#email").val();
    var pw = $("#password").val();
    var zn = $("#zone").val();
    var tp = $("#type").val();

    try {
        //console.log("Entro")
        const url = urlBaseUser + "/" + id
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        if (json == null){
            //alert('Id No lo encontro')
            const url = urlBaseUser + "/emailexist/" + em
            const response = await fetch(url);
            const jsonB = await response.json();
            console.log(jsonB);
            if (!jsonB == null){
                var payload;
                var method;
                var msg;
                var ruta;

                if (nm.length == 0 || em == null ) {
                    alert('Revisar los campos ...!')
                }else {    
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
                                alert("Se ha Creado un Usuario ...!");
                                cerrarModal();
                                window.location.href = "/usuarios.html";
                                //consultarAd();
                                }
                            },
                        });  
                }
            } else {
                alert('Email ya esta registrado ...!')
            }
    
        }else {
            
            try {
                const urlUpdate = urlBaseUser + '/update'

                const fetchOptions = {
                    method: "PUT",
                    body: JSON.stringify({
                        id: +$("#id").val(),
                        identification: $("#identification").val(),
                        name: $("#name").val(),
                        address: $("#address").val(),
                        cellPhone: $("#cellPhone").val(),
                        email: $("#email").val(),
                        password: $("#password").val(),
                        zone: $("#zone").val(),
                        type: $("#type").val()
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
                const responseUpdate = await fetch(urlUpdate, fetchOptions);
                const responseConvertedUpdate = await responseUpdate.json();
                
                alert("Registro Actualizado ...!");
                cerrarModal();
                //window.location.href = "/usuarios.html";
                consultarAd();

            } catch {
                window.location.reload()
                alert("No saved correctly, try again");
            }
        }
    } catch (error) {
        console.log("error:", error)
    }
}



var editar = function (id, identification, name, address, cellPhone, email, password, zone, type) {
    $("#tituloModalAdministrador").html('Actualizar Usuario');
    $("#id").val(id);
    $("#identification").val(identification);
    $("#name").val(name);
    $("#address").val(address);
    $("#cellPhone").val(cellPhone);
    $("#email").val(email);
    $("#password").val(password);
    $("#zone").val(zone);
    $("#type").val(type);

    $('#modalAdministrador').modal('show');
}

var eliminar = function (id) {
    console.log("Eliminando id: " + id)
    $.ajax({
        url: urlBaseUser + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                alert('Se ha Eliminado el Usuario');
                cerrarModalMensaje();
                consultarAd();
            }
        },
    });
}
