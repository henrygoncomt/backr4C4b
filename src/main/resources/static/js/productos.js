//var urlBaseProducto = "http://168.138.142.158:8080/api/accessory";
var urlBaseProducto = "/api/accessory";

var consultarO = function () {
    $.ajax({
        url: urlBaseProducto + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTablaO(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTablaO = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>REFERENCIA</th>
                    <th>MARCA</th>
                    <th>CATEEGORIA</th>
                    <th>MATERIAL</th>
                    <th>GENERO</th>         
                    <th>TAMAÑO</th>
                    <th>DESCRIPCION</th>
                    <th>DISPONIBILIDAD</th>
                    <th>PRECIO</th>
                    <th>CANTIDAD</th>
                    <th>FOTO</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].reference}</td>
                   <td>${items[i].brand}</td>
                   <td>${items[i].category}</td>
                   <td>${items[i].material}</td>
                   <td>${items[i].gender}</td>
                   <td>${items[i].size}</td>
                   <td>${items[i].description}</td>
                   <td>${items[i].availability}</td>
                   <td>${items[i].price}</td>
                   <td>${items[i].quantity}</td>
                   <td>${items[i].photography}</td>
                   
                   <td style="margin:0">
                        <button type="button" class="btn btn-sm btn-primary" onclick="editarP('${items[i].reference}', '${items[i].brand}', '${items[i].category}', '${items[i].material}', '${items[i].gender}', '${items[i].size}', '${items[i].description}', '${items[i].availability}', '${items[i].price}', '${items[i].quantity}', '${items[i].photography}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminarP('${items[i].reference}')">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tablaProducto").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarO();
});

var nuevoProducto = function () {
    $("#tituloModalProducto").html('Nuevo Producto');
    $("#reference").val('');
    $("#brand").val('');
    $("#category").val('');
    $("#material").val('');
    $("#gender").val('');
    $("#size").val('');
    $("#description").val('');
    $("#price").val('');
    $("#quantity").val('');
    $("#photography").val('');

    $('#modalProducto').modal('show');
}

var cerrarModal = function () {
    $('#modalProducto').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}


async function guardarCambiosO() {
    var payload;
    var method;

    var rf = $("#reference").val();
    var br = $("#brand").val();
    var ct = $("#category").val();
    var mt = $("#material").val();
    var gn = $("#gender").val();
    var sz = $("#size").val();
    var ds = $("#description").val();
    var av = $("#availability").val();
    var pc = +$("#price").val();
    var qt = +$("#quantity").val();
    var ph = $("#photography").val();

    var msg;
    var ruta;
    var payload;
    var method;

    if (rf == '' || rf == null ) {
        alert('Revisar los campos ...!')
    }else {
        try {
            //console.log("Entro")
            const url = urlBaseProducto + "/" + rf
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            if (json == null){
                //alert('Reference No la encontro')
                
                ruta = urlBaseProducto + "/new";
                payload = {
                    reference: $("#reference").val(),
                    brand: $("#brand").val(),
                    category: $("#category").val(),
                    material: $("#material").val(),
                    gender: $("#gender").val(),
                    size: $("#size").val(),
                    description: $("#description").val(),
                    availability: $("#availability").val(),
                    price: $("#price").val(),
                    quantity: $("#quantity").val(),
                    photography: $("#photography").val()
                };
                method = "POST";
                msg = "Se ha Creado un Producto ...!"
                console.log("Guardando ", payload)
                console.log("ruta ", ruta)
                console.log("method ", method)

            }else {     
                ruta = urlBaseProducto + "/update";
                payload = {
                    reference: $("#reference").val(),
                    brand: $("#brand").val(),
                    category: $("#category").val(),
                    material: $("#material").val(),
                    gender: $("#gender").val(),
                    size: $("#size").val(),
                    description: $("#description").val(),
                    availability: $("#availability").val(),
                    price: $("#price").val(),
                    quantity: $("#quantity").val(),
                    photography: $("#photography").val()
                };
                method = "PUT";
                msg = "Se ha Actualizado un Producto ...!"
                console.log("Actualizando ", payload)
                console.log("ruta ", ruta)
                console.log("method ", method)
            }
        } catch (error) {
            console.log("error:", error)
        }

        console.log("Guardando ", payload)
        console.log("Metodo ", method, "a", ruta)

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
                    mostrarMensaje(msg);
                    cerrarModal();
                    consultarO();
                }
            },
        });
    }    
}

var editarP = function (reference, brand, category, material, gender, size, description, availability, price, quantity, photography) {
    console.log(reference, brand, category, gender, size, description, availability, price, quantity, photography);
    
    $("#tituloModalProducto").html('Actualizar Producto');
    $("#reference").val(reference);
    $("#brand").val(brand);
    $("#category").val(category);
    $("#material").val(material);
    $("#gender").val(gender);
    $("#size").val(size);
    $("#description").val(description);
    $("#availability").val(availability);
    $("#price").val(price);
    $("#quantity").val(quantity);
    $("#photography").val(photography);
    $('#modalProducto').modal('show');
}

var eliminarP = function (reference) {
    console.log("Eliminando id: " + reference)
    $.ajax({
        url: urlBaseProducto + "/" + reference,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha Eliminado el Producto');
                cerrarModal();
                consultarO();
            }
        },
    });
}
