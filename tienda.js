// CLIENTE CREADO PREVIAMENTE:
// nombre: sandra
// contraseña: 1234

// CLASES
class Disco{
    constructor(nombre, artista, año, precio, cantidad){
        this.nombre = nombre;
        this.artista = artista;
        this.año = año;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    clase = 'disco';
}
class Cliente{
    constructor(nombre, contraseña, direccion){
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.direccion = direccion;
    }
    historialDeCompras = [];
}
class Carrito{
    discos = [];
    tocadiscos = [];
    revistas= [];
}
class Tocadiscos{
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    clase = 'tocadiscos'; 
}
class Inventario{
    discos = [];
    tocadiscos = [];
    revistas = [];
}
class Revista{
    constructor(nombre, edicion, precio, cantidad){
        this.nombre = nombre;
        this.edicion = edicion;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    clase = 'revista';
}
class Ticket{
    totalNeto = 0;
    precioFinal = 0;
    cuotas = 0;
    medioPago = '';
    envio = false;
    generarTicket(car, cli){
        let t = [];
        let compras = car.discos.concat(car.tocadiscos, car.revistas);
        compras.forEach((e)=>{console.log(console.log(e[0]));console.log(e[1]);});
        let x = compras.reduce((ac, cv)=>ac + cv[1].precio * cv[0], 0);
        t.push(`El total neto es: $${x}.`);
        if(this.cuotas > 12){
            x *= 1.05;
            t.push(`El total neto + interes: $${x}.`);
        }
        if(this.envio === true) {
            if(cli.direccion == 'buenos aires'){
                x += 1000;
            } else {
                x += 2000;
            }
            t.push(`El total neto + envío: $${x}.`);
        }
        x *= 1.21;
        t.push(`El total neto + IVA: $${x}.`);
        if(this.cuotas > 0){
            t.push(`En ${this.cuotas} cuotas de $${(x / this.cuotas).toFixed(2)} .`)
        }
        let fecha = new Date();
        return `Su ticket:\n\nCliente: ${cli.nombre}.\n${t.join('\n')}\n\n${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
    }
}
class Caja{
    constructor(dinero){
        this.dinero = dinero;
    }
    mostrarHistoria(){
        this.tickets.map((x) => console.log(x));
    };
    tickets = [];
}
// VARIABLES GLOBALES
let clienteActual;
const clientes = [];
const inventario = new Inventario;
const carrito = new Carrito;
const caja = new Caja(0);
// cliente para uso practico
clientes.push(new Cliente('sandra', '1234', 'buenos aires'));
// discos
inventario.discos.push(new Disco('invisible','invisible','1973',2000,12));
inventario.discos.push(new Disco('25','adele','2014',3000,24));
inventario.discos.push(new Disco('dark side of the moon','pink floyd','1970',4500,8));
inventario.discos.push(new Disco('my way','frank sinatra','1969',3000,10));
inventario.discos.push(new Disco('the marshall mathers lp', 'eminem', '2000', 2000, 30));
inventario.discos.push(new Disco('bicicleta', 'seru giran', '1980', 2500, 20));
// revistas
inventario.revistas.push(new Revista('rollings stones', '66th', 1500, 30));
inventario.revistas.push(new Revista('the source', '30th', 1000, 25));
inventario.revistas.push(new Revista('vibe', '20th', 20, 1250));
// tocadiscos
inventario.tocadiscos.push(new Tocadiscos('winco', 40000, 20));
inventario.tocadiscos.push(new Tocadiscos('spica', 30000, 15));
inventario.tocadiscos.push(new Tocadiscos('gadnic', 35000, 10));
// ALGORITMO
function inicio(){
    clienteActual = '';
    const opcion = prompt(`Bienvenido a la Disquería virtual. Para elegir una de las opciones ingrese el número que la precede:\n\n
    1- Crear una cuenta.\n
    2- Iniciar sesión.\n
    3- Entrar como administrador.`);
    switch(opcion){
        case '1':
            nuevoNombre();
        break;
        case '2':
            nombre();
        break;
        case '3':
            menuAdministrador();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            inicio();
            break;
        }
    }
// CREAR CUENTA
function nuevoNombre(){
    let nombre = prompt(`Ingrese su nombre de usuario con el cual podrá ingresa más tarde.`);
    if(nombre.length < 4){
        do{
            const error = prompt(`Debe ingresar al menos cuatro digitos!\n
            1- Intentar nuevamente.
            2- Salir.`);
            switch(error){
                case '1':
                    nombre = 'intentar';
                break;
                case '2':    
                    nombre = 'salir';
                break;
                default: 
                    window.alert('El dato ingresado no se corresponde con ninguna de las opciones!');
                break;
            } 
        }while(nombre.length < 4);
        if(nombre == 'intentar'){
            nuevoNombre();
        } else {
            inicio();
        } 
    } else {
        nuevaContraseña(nombre);
    }   
}
function nuevaContraseña(nombre){
    let contraseña = prompt(`Ingrese la contraseña que se le pedira luego cada vez que inicie sesión.`)
    if(contraseña.length < 4){
        do{
            const error = prompt(`Debe ingresar al menos cuatro digitos!\n
            1- Intentar nuevamente.
            3- Atrás.\n
            2- Salir.`);
            switch(error){
                case '1':
                    contraseña = 'intentar';
                break;
                case '2':
                    contraseña = 'atras';
                break;
                case '3':    
                    contraseña = 'salir';
                break;
                default: 
                    window.alert('El dato ingresado no se corresponde con ninguna de las opciones!');
                break;
            } 
        }while(contraseña.length < 4);
        if(contraseña == 'intentar'){
            nuevaContraseña(nombre);
        } else if(contraseña == 'atras'){
            nuevoNombre();
        } else {
            inicio();
        }
    } else{
        nuevaDireccion(nombre, contraseña);
    }
}
function nuevaDireccion(nombre, contraseña){
    let direccion = prompt(`Elija su lugar de residencia.\n\n
                            1- Provincia de Buenos Aires.\n
                            2- Interior de la Argentina.\n
                            3- Atrás.\n
                            4- Salir.`);
    switch(direccion){
        case '1':
            direccion = 'buenos aires';
            clientes.push(new Cliente(nombre, contraseña, direccion, ''));
            inicio();
        break;
        case '2':
            direccion = 'interior';
            clientes.push(new Cliente(nombre, contraseña, direccion, ''));
            inicio();;
        break;
        case '3':
            nuevaContraseña(nombre);    
        break;
        case '4':
            inicio();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna de las opciones!');
            nuevaDireccion(nombre, contraseña);
        break;
    }
}
// INICIAR SESIÓN
function nombre(){
    const usuario = prompt('Ingrese el nombre que figura en su cuenta de usuario.');
    for(let cliente of clientes) {
        if(cliente.nombre == usuario) {
            clienteActual = cliente;
            return contraseña();
        }
    }
    const opcion = prompt(`El nombre que ha ingresado no es correcto.\n
                           1- Volver a intentar.\n
                           2- Salir.`);
    switch(opcion){
        case '1':
            nombre();
        break;
        case '2':
            inicio();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            nombre();
        break; 
    }
}
function contraseña(){
    const clave = prompt('Ingrese su contraseña personal.');
    if(clienteActual.contraseña == clave) {
        return menuPrincipal();
    }
    const opcion = prompt(`La contraseña que ha ingresado no es la correcta.\n
                           1- Volver a intentar.\n
                           2- Salir.`);
    switch(opcion){
        case '1':
            contraseña();
        break;
        case '2':
            inicio();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            contraseña();
            break; 
        }
}
// USUARIO
function menuPrincipal(){
    const opcion = prompt(`Menu principal:\n
                         1- Mis datos personales.\n
                         2- Tienda virtual.\n
                         3- Salir.`);
    switch(opcion){
        case '1':
            datosPersonales();
        break;
        case '2':
            mercado();
        break;
        case '3':
            let alternativa = prompt(`Seguro que desea salir?\n
                                      1- Sí.\n
                                      2- No.`);
            switch(alternativa){
                case '1': 
                    vaciarCarrito();
                    inicio();
                break;
                default: 
                    menuPrincipal();
            }
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            contraseña();
        break;
    }
}
function datosPersonales(){
    const opcion = prompt(`Datos Personales.\n\n
                         Nombre: ${clienteActual.nombre} .\n
                         Contraseña: ${clienteActual.contraseña} .\n
                         Interior/Buenos Aires: ${clienteActual.direccion} .\n
                         Historial de compras: ${clienteActual.historialDeCompras} .\n\n
                         1- Cambiar nombre.
                         2- Cambiar contraseña.
                         3- Cambiar dirección.
                         4- Atrás.`);
    switch(opcion) {
        case '1':
            const usuarioNuevo = prompt('Ingrese su nuevo nombre de usuario.');
            clienteActual.nombre = usuarioNuevo;
            datosPersonales();
        break;
        case '2':
            const claveNueva = prompt('Ingrese su nueva contraseña.');
            clienteActual.contraseña = claveNueva;
            datosPersonales();
        break;
        case '3':
            const direccionNueva = prompt(`Ingrese la opción que coincida con su locación.\n\n
                                           1- Provincia de Buenos Aires.\n
                                           2- Interior de la Argentina.\n
                                           3- Atrás.`);
            switch(direccionNueva){
                case '1':
                    clienteActual.direccion = 'buenos aires';
                break;
                case '2':
                    clienteActual.direccion = 'interior';
                break;
                default:
                    datosPersonales();
                break;      
            }
        break;
        case '4':
            menuPrincipal();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            datosPersonales();
        break;
    }
}
function mercado(){
    const dato = prompt(`Tienda virtual.\n\n
                         1- Comprar discos de vinilo.\n
                         2- Comprar tocadiscos.\n
                         3- Comprar revistas de música.\n
                         4- Ir al carrito de compras.\n
                         5- Comprar.\n
                         6- Volver al menú principal.`);
    switch(dato){
        case '1':
            añadirAlCarrito('disco');
        break;
        case '2':
            añadirAlCarrito('tocadiscos');
        break;
        case '3':
            añadirAlCarrito('revista');
        break;
        case '4':
            verCarrito();
        break;
        case '5':
            caja.tickets.push(new Ticket());
            medioDePago();
        break;
        case '6':
            menuPrincipal();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            mercado();
        break; 
    }
}
function añadirAlCarrito(item){
    let claseItem;
    if(item == 'disco') {
        claseItem = inventario.discos;
    } else if(item == 'tocadiscos') {
        claseItem = inventario.tocadiscos;
    } else {
        claseItem = inventario.revistas;
    }
    const lista = prompt(`Stock de ${item}:\n\n${claseItem.map((x)=>{return '-'+x.nombre+' $'+x.precio+'.'}).join('\n')}\n\nIngrese el nombre del ${item} que desea llevar, tal como lo ve escrito.`);
    for(let producto of claseItem){
        if(lista == producto.nombre){
            const cantidad = prompt(`Ingrese la cantidad que desea comprar.`);
            if(cantidad > producto.cantidad && !isNaN(parseInt(cantidad))){
                const opcion = prompt(`Por el momento no tenemos suficiente stock para igualar tu orden, para poder continuar debes ingresar una cantidad menor.\n\n
                                     1- Intentar nuevamente.\n
                                     2- Volver a la tienda virtual.`);
                switch(opcion){
                    case '1':
                        if(claseItem == inventario.discos){
                            añadirAlCarrito('disco');
                        } else if(claseItem == inventario.tocadiscos) {
                            añadirAlCarrito('tocadiscos');
                        } else {
                            añadirAlCarrito('revista');
                        }
                    break;
                    case '2':
                        mercado();
                    break;
                }
            } else if(isNaN(parseInt(cantidad))) {
                window.alert('El dato ingresado no se corresponde con ninguna opción!');
                añadirAlCarrito();
            } else {
                if(claseItem == inventario.discos){
                    let articulo = carrito.discos.find(x => x[1] == producto)
                    if(articulo !== undefined) {
                        carrito.discos[carrito.discos.indexOf(articulo)][0] += parseInt(cantidad);
                    } else {
                        carrito.discos.push([parseInt(cantidad), producto]);
                    }
                } else if(claseItem == inventario.tocadiscos) {
                    let articulo = carrito.tocadiscos.find(x => x[1] == producto)
                    if(articulo !== undefined) {
                        carrito.tocadiscos[carrito.tocadiscos.indexOf(articulo)][0] += parseInt(cantidad);
                    } else {
                        carrito.tocadiscos.push([parseInt(cantidad), producto]);
                    }
                } else {
                    let articulo = carrito.revistas.find(x => x[1] == producto)
                    if(articulo !== undefined) {
                        carrito.revistas[carrito.revistas.indexOf(articulo)][0] += parseInt(cantidad);
                    } else {
                        carrito.revistas.push([parseInt(cantidad), producto]);
                    }
                }
            }
            break;
        }
    }
    mercado();
}
function verCarrito(){
    const dato = prompt(`Carrito de compras:\n\nDiscos:\n${carrito.discos.map((x)=>{return `${carrito.discos.indexOf(x)+1}) ${x[1].nombre} (${x[0]})`}).join('\n')}\ntocadiscos:\n${carrito.tocadiscos.map((x)=>{return `${carrito.tocadiscos.indexOf(x)+1}) ${x[1].nombre} (${x[0]})`}).join('\n')}\nRevistas:\n${carrito.revistas.map((x)=>{return `${carrito.revistas.indexOf(x)+1}) ${x[1].nombre} (${x[0]})`}).join('\n')}\n\n
                         1- Quitar un elemento del carrito.\n
                         2- Vaciar carrito.\n
                         3- Volver a la tienda virtual.`);
    switch(dato){
        case '1':
            eliminarDelCarrito();
        break;
        case '2':
            vaciarCarrito();
        break;
        case '3':
            mercado();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            verCarrito();
        break;
    }
}
function eliminarDelCarrito(){
    const elemento = prompt(`Elementos:\n\nDiscos:\n${carrito.discos.map((x)=>{return `${carrito.discos.indexOf(x)+1}) ${x[1].nombre} (${x[0]})`}).join('\n')}\ntocadiscos:\n${carrito.tocadiscos.map((x)=>{return `${carrito.tocadiscos.indexOf(x)+1}) ${x[1].nombre} (${x[0]})`}).join('\n')}\nRevistas:\n${carrito.revistas.map((x)=>{return `${carrito.revistas.indexOf(x)+1}) ${x[1].nombre} (${x[0]})`}).join('\n')}\n\nIngrese el nombre del elemento que desea quitar del carrito.`);
    let compras = carrito.discos.concat(carrito.tocadiscos, carrito.revistas);
    let remover = compras.find(x => x[1].nombre == elemento);
    if(remover !== undefined) {
        if (remover[1].clase == 'disco'){
            carrito.discos.splice(carrito.discos.indexOf(remover), 1);
        } else if (remover[1].clase == 'revista'){
            carrito.revistas.splice(carrito.discos.indexOf(remover), 1);
        } else {
            carrito.tocadiscos.splice(carrito.discos.indexOf(remover), 1);
        }
        const opcion = prompt(`${remover[1].nombre} ha sido eliminado.\n\n 
                               1- Volver a la tienda virtual.\n
                               2- Quitar otro elemento del carrito.`)
        switch(opcion){
            case '1':
                mercado();
            break;
            case '2':
                eliminarDelCarrito();
            break;
            default:
                window.alert('El dato ingresado no se corresponde con ninguna opción!');
                eliminarDelCarrito();
            break;
        }
    } else {
        const alternativa = prompt(`El nombre que ha ingresado no es correcto.\n\n
                               1- Intentar nuevamente.\n
                               2- Volver a la tienda virtual.`);
        switch(alternativa){
            case '1':
                eliminarDelCarrito();
            break;
            case '2':
                mercado();
            break;
            default:
                window.alert('El dato ingresado no se corresponde con ninguna opción!');
                eliminarDelCarrito();
            break;
        }
    }
}
function medioDePago(){
    const opciones = prompt(`Por favor elige tu medio de pago para la compra.\n\n
                         1- Tarjeta de crédito/débito.\n
                         2- Efectivo.\n
                         3- Volver a la tienda virtual.`);
    switch(opciones){
        case '1':
            caja.tickets[caja.tickets.length - 1].medioPago = 'tarjeta';        
            const cuotas = prompt('Ingrese en cuantas cuotas desea hacer el pago. Puede elegir entre 0 y 24 cuotas, con un interes del 5% si las cuotas son mayores a doce.');
            caja.tickets[caja.tickets.length - 1].cuotas = parseInt(cuotas);
            envio();
        break;
        case '2':
            caja.tickets[caja.tickets.length - 1].medioPago = 'efectivo';        
            envio();
        break;
        case '3':
            caja.tickets.pop();
            mercado();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            medioDePago();
        break;
    }
}
function envio(){
    const dato = prompt(`Ahora ingrese si desea que la compre sea enviada a su domicilio.\n\n
                         1- Con envio.\n
                         2- Sin envio.\n
                         3- Volver a la tienda virtual.`);
    switch(dato){
        case '1':
            caja.tickets[caja.tickets.length - 1].envio = true;
            finalCompra();
        break;
        case '2':
            caja.tickets[caja.tickets.length - 1].envio = false;
            finalCompra();
        break;
        case '3':
            caja.tickets.pop();
            mercado();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            envio();
        break;
    }
}
function finalCompra() {
    const dato = prompt(`Hora de confirmar su compra.\n\n
                         1- Pagar.\n
                         2- Volver a la tienda virtual\n
                         3- Ir al menú principal.`);
    switch(dato){
        case '1':
            pagar();
        break;
        case '2':
            mercado();    
        break;
        case '3':
            menuPrincipal();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción!');
            finalCompra();
        break;
    }
}
function pagar(){
    let ticketFinal = caja.tickets[caja.tickets.length - 1].generarTicket(carrito, clienteActual); 
    clienteActual.historialDeCompras.push(ticketFinal);
    caja.tickets.pop();
    caja.tickets.push(ticketFinal);
    const opcion = prompt(`Pago realizado:\n\n${ticketFinal}\n\nGracias por comprar con nosotros!\n\nIngrese cualquier tecla para volver al menú principal.`);
    switch(opcion){
        default:
            vaciarCarrito();
            menuPrincipal();
        break;
    }    
}
function vaciarCarrito(){
    for(let e of carrito.discos){
                carrito.discos.splice(carrito.discos.indexOf(e), 1);
            }
            for(let e of carrito.revistas){
                carrito.revistas.splice(carrito.revistas.indexOf(e), 1);
            }
            for(let e of carrito.tocadiscos){
                carrito.tocadiscos.splice(carrito.tocadiscos.indexOf(e), 1);
            }
}
// ADMINISTRADOR
function menuAdministrador(){
    let opcion = prompt(`Menu principal de administrador\n\n
                         1- Mostrar clientes.\n
                         2- Mostrar discos.\n
                         3- Mostrar revistas.\n
                         4- Mostrar tocadiscos.\n
                         5- Salir.`);
    switch(opcion){
        case '1':
            mostrarClientes();
        break;
        case '2':
            mostrarDiscos();
        break;
        case '3':
            mostrarRevistas();
        break;
        case '4':
            mostrarTocadiscos();
        break;
        case '5':
            inicio();
        break;
        default:
            menuAdministrador();
        break;
    }
}
// cambiar clientes
function mostrarClientes(){
    let opcion = prompt(`Clientes: \n${clientes.map((x)=>{return '- '+x.nombre+'.'}).join('\n')}\n
                         1- Elegir cliente.\n
                         2- Atrás.`);
    switch(opcion){
        case '1':
            let cliente = prompt(`Clientes: ${clientes.map((x)=>{return '- '+x.nombre+'.'}).join('\n')}\nIngrese el nombre del cliente que quiere configurar.`)
            mostrarDatosCliente(cliente);
        break;
        case '2':
            menuAdministrador();
        break;
    }
}
function mostrarDatosCliente(c){
    let cliente = clientes.find((x)=>{return x.nombre == c});
    let opcion = prompt(`${cliente.nombre}\n${cliente.contraseña}\n${cliente.direccion}\n${cliente.historialDeCompras}\n\n
            1- Eliminar cliente.
            2- Atrás.`);
    switch(opcion){
        case '1':
            clientes.splice(clientes.indexOf(cliente), 1);
            mostrarClientes();
        break;
        case '2':
            mostrarClientes();
        break;
        default:
            window.alert('Disculpe pero el dato ingresado no se corresponde con ninguna opción.')
            mostrarClientes();
        break;
    }
}
// cambiar disco
function mostrarDiscos(){
    let opcion = prompt(`${inventario.discos.map((x) => {return '-'+x.nombre+'.'}).join('\n')}\n\n
                         1- Para elegir un disco.\n
                         2- Agregar un nuevo disco.\n
                         3- Atrás.`);
    switch(opcion){
        case '1':
            let nombreDisco = prompt(`${inventario.discos.map((x) => {return '-'+x.nombre+'.'}).join('\n')}\nIngrese el nombre del disco que quiere ver.`)
            if(inventario.discos.find((x)=>{return x.nombre == nombreDisco}) !== undefined) {
                mostrarDatosDisco(nombreDisco);
            } else {
                mostrarDiscos();
            }
        break;
        case '2':
            ingresarNombre();
        break;
        case '3':
            menuAdministrador();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción.');
            mostrarDiscos();
        break;
    }
}
function mostrarDatosDisco(d){
    let disco = inventario.discos.find((x)=>{if(x.nombre == d){return x}});
    let opcion = prompt(`Nombre: ${disco.nombre}\nArtista: ${disco.artista}\nAño: ${disco.año}\nPrecio: $${disco.precio}\nCantidad: ${disco.cantidad}\n\n
                         1- Cambiar nombre.\n
                         2- Cambiar artista.\n
                         3- Cambiar dirección.\n
                         4- Cambiar precio.\n
                         5- Cambiar cantidad.\n
                         6- Eliminar disco.\n
                         7- Atrás.`);
    switch(opcion){
        case '1':
            let nuevoNombre = prompt('Ingrese el nombre por el cual reemplazar el anterior.');
            if(nuevoNombre == ''){
                do {
                    nuevoNombre = prompt('El nombre debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoNombre == '');
            } 
            disco.nombre = nuevoNombre;
            mostrarDatosDisco(nuevoNombre);
        break;
        case '2':
            let nuevoArtista = prompt('Ingrese el artista por el cual reemplazar el anterior.');
            if(nuevoArtista == ''){
                do {
                    nuevoArtista = prompt('El artista debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoArtista == '');
            } 
            disco.artista = nuevoArtista;
            mostrarDatosDisco(d);
        break;
        case '3':
            let nuevoAño = prompt('Ingrese el año por el cual reemplazar el anterior.');
            if(nuevoAño == ''){
                do {
                    nuevoAño = prompt('El año debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoAño == '');
            } 
            disco.año = nuevoAño;
            mostrarDatosDisco(d);
        break;
        case '4':
            let nuevoPrecio = prompt('Ingrese el precio por el cual reemplazar el anterior.');
            if(nuevoPrecio == ''){
                do {
                    nuevoPrecio = prompt('El precio debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoPrecio == '');
            } 
            disco.precio = nuevoPrecio;
            mostrarDatosDisco(d);
        break;
        case '5':
            let nuevaCantidad = prompt('Ingrese el cantidad por el cual reemplazar el anterior.');
            if(nuevaCantidad == ''){
                do {
                    nuevaCantidad = prompt('El cantidad debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevaCantidad == '');
            } 
            disco.cantidad = nuevaCantidad;
            mostrarDatosDisco(d);
        break;
        case '6':
            let alternativa = prompt(`¿Está seguro que desea eliminar el disco?\n\n
                                      1- Sí.\n
                                      2- No.`);
            switch(alternativa){
                case '1':
                    inventario.discos.splice(inventario.discos.indexOf(disco), 1);
                    mostrarDatosDisco(d);
                break;
                case '2':
                    mostrarDatosDisco(d);
                break;
                default:
                    do {
                        window.alert('El dato ingresado no se corresponde con ninguna de las opciones!');
                        alternativa = prompt(`¿Está seguro que desea eliminar el disco?\n\n
                                      1- Sí.\n
                                      2- No.`);
                        switch(alternativa){
                        case '1':
                            inventario.discos.splice(inventario.discos.indexOf(disco), 1);
                            mostrarDatosDisco(d);
                            break;
                        case '2':
                            mostrarDatosDisco(d);
                        break;                 
                        }
                    } while(alternativa !== '1' || alternativa !== '2');
                break;
            }
        case '7':
            mostrarDiscos();
        break;
    }
}
// cambiar revistas
function mostrarRevistas(){
    let opcion = prompt(`${inventario.revistas.map((x) => {return '-'+x.nombre+'.'}).join('\n')}\n\n
                         1- Para elegir una revista.\n
                         2- Agregar una nueva revista.\n
                         3- Atrás.`);
    switch(opcion){
        case '1':
            let nombreRevista = prompt(`${inventario.revistas.map((x) => {return '-'+x.nombre+'.'}).join('\n')}\nIngrese el nombre de la revista que quiere ver.`)
            if(inventario.revistas.find((x)=>{return x.nombre == nombreRevista}) !== undefined) {
                mostrarDatosRevista(nombreRevista);
            } else {
                mostrarRevistas();
            }
        break;
        case '2':
            ingresarNombreRevista();
        break;
        case '3':
            menuAdministrador();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción.');
            mostrarRevistas();
        break;
    }
}
function mostrarDatosRevista(r){
    let revista = inventario.revistas.find((x)=>{if(x.nombre == r){return x}})
    let opcion = prompt(`Nombre: ${revista.nombre}\nEdición: ${revista.edicion}\nPrecio: ${revista.precio}\nCantidad: $${revista.cantidad}\n\n
                         1- Cambiar nombre.\n
                         2- Cambiar edición.\n
                         3- Cambiar precio.\n
                         4- Cambiar cantidad.\n
                         5- Eliminar revista.\n
                         6- Atrás.`);
    switch(opcion){
        case '1':
            let nuevoNombre = prompt('Ingrese el nombre por el cual reemplazar el anterior.');
            if(nuevoNombre == ''){
                do {
                    nuevoNombre = prompt('El nombre debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoNombre == '');
            } 
            revista.nombre = nuevoNombre;
            mostrarDatosRevista(nuevoNombre);
        break;
        case '2':
            let nuevaEdicion = prompt('Ingrese la edición por la cual reemplazar la anterior.');
            if(nuevaEdicion == ''){
                do {
                    nuevaEdicion = prompt('La edición debe contener al menos un caracter, ingrese la edicion por la cual reemplazar el anterior.');
                } while(nuevaEdicion == '');
            } 
            revista.edicion = nuevaEdicion;
            mostrarDatosRevista(r);
        break;
        case '3':
            let nuevoPrecio = prompt('Ingrese el precio por el cual reemplazar el anterior.');
            if(nuevoPrecio == ''){
                do {
                    nuevoPrecio = prompt('El precio debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoPrecio == '');
            } 
            revista.precio = nuevoPrecio;
            mostrarDatosRevista(r);
        break;
        case '4':
            let nuevaCantidad = prompt('Ingrese el cantidad por el cual reemplazar el anterior.');
            if(nuevaCantidad == ''){
                do {
                    nuevaCantidad = prompt('El cantidad debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevaCantidad == '');
            } 
            revista.cantidad = nuevaCantidad;
            mostrarDatosRevista(r);
        break;
        case '5':
            let alternativa = prompt(`¿Está seguro que desea eliminar la revista?\n\n
                                      1- Sí.\n
                                      2- No.`);
            switch(alternativa){
                case '1':
                    inventario.revistas.splice(inventario.revistas.indexOf(revista), 1);
                    mostrarDatosRevista(r);
                break;
                case '2':
                    mostrarDatosRevista(r);
                break;
                default:
                    do {
                        window.alert('El dato ingresado no se corresponde con ninguna de las opciones!');
                        alternativa = prompt(`¿Está seguro que desea eliminar la revista?\n\n
                                      1- Sí.\n
                                      2- No.`);
                        switch(alternativa){
                        case '1':
                            inventario.revistas.splice(inventario.revistas.indexOf(revista), 1);
                            mostrarDatosRevista(r);
                            break;
                        case '2':
                            mostrarDatosRevista(r);
                        break;                 
                        }
                    } while(alternativa !== '1' || alternativa !== '2');
                break;
            }
        case '6':
            mostrarRevistas();
        break;
    }
}
// cambiar tocadiscos
function mostrarTocadiscos(){
    let opcion = prompt(`${inventario.tocadiscos.map((x) => {return '-'+x.nombre+'.'}).join('\n')}\n\n
                         1- Para elegir un tocadiscos.\n
                         2- Agregar un nuevo tocadiscos.\n
                         3- Atrás.`);
    switch(opcion){
        case '1':
            let nombreTocadiscos = prompt(`${inventario.tocadiscos.map((x) => {return '-'+x.nombre+'.'}).join('\n')}\nIngrese el nombre del tocadiscos que quiere ver.`)
            if(inventario.tocadiscos.find((x)=>{return x.nombre == nombreTocadiscos}) !== undefined) {
                mostrarDatosTocadiscos(nombreTocadiscos);
            } else {
                mostrarTocadiscos();
            }
        break;
        case '2':
            ingresarNombreTocadiscos();
        break;
        case '3':
            menuAdministrador();
        break;
        default:
            window.alert('El dato ingresado no se corresponde con ninguna opción.');
            mostrarTocadiscos();
        break;
    }
}
function mostrarDatosTocadiscos(t){
    let tocadiscos = inventario.tocadiscos.find((x)=>{if(x.nombre == t){return x}})
    console.log(tocadiscos);
    let opcion = prompt(`Nombre: ${tocadiscos.nombre}\nPrecio: $${tocadiscos.precio}\nCantidad: ${tocadiscos.cantidad}\n\n
                         1- Cambiar nombre.\n
                         2- Cambiar precio.\n
                         3- Cambiar cantidad.\n
                         4- Eliminar tocadiscos.\n
                         5- Atrás.`);
    switch(opcion){
        case '1':
            let nuevoNombre = prompt('Ingrese el nombre por el cual reemplazar el anterior.');
            if(nuevoNombre == ''){
                do {
                    nuevoNombre = prompt('El nombre debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoNombre == '');
            } 
            tocadiscos.nombre = nuevoNombre;
            mostrarDatosTocadiscos(nuevoNombre);
        break;
        case '2':
            let nuevoPrecio = prompt('Ingrese el precio por el cual reemplazar el anterior.');
            if(nuevoPrecio == ''){
                do {
                    nuevoPrecio = prompt('El precio debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevoPrecio == '');
            } 
            tocadiscos.precio = nuevoPrecio;
            mostrarDatosTocadiscos(t);
        break;
        case '3':
            let nuevaCantidad = prompt('Ingrese el cantidad por el cual reemplazar el anterior.');
            if(nuevaCantidad == ''){
                do {
                    nuevaCantidad = prompt('El cantidad debe contener al menos un caracter, ingrese el nombre por el cual reemplazar el anterior.');
                } while(nuevaCantidad == '');
            } 
            tocadiscos.cantidad = nuevaCantidad;
            mostrarDatosTocadiscos(t);
        break;
        case '4':
            let alternativa = prompt(`¿Está seguro que desea eliminar el tocadiscos?\n\n
                                      1- Sí.\n
                                      2- No.`);
            switch(alternativa){
                case '1':
                    inventario.tocadiscos.splice(inventario.tocadiscos.indexOf(tocadiscos), 1);
                    mostrarTocadiscos();
                break;
                case '2':
                    mostrarTocadiscos();
                break;
                default:
                    do {
                        window.alert('El dato ingresado no se corresponde con ninguna de las opciones!');
                        binario = prompt(`¿Está seguro que desea eliminar el tocadiscos?\n\n
                                      1- Sí.\n
                                      2- No.`);
                        switch(binario){
                        case '1':
                            inventario.tocadiscos.splice(inventario.tocadiscos.indexOf(tocadiscos), 1);
                            mostrarTocadiscos();
                            break;
                        case '2':
                            mostrarTocadiscos();
                        break;                 
                        }
                    } while(binario !== '1' || binario !== '2');
                break;
            }
        case '5':
            mostrarTocadiscos();
        break;
    }
}
// agregar disco
function ingresarNombre(){
    let nombre = prompt('Ingresar nombre del album que desea añadir al inventario.');
    if (nombre == ''){
        ingresarNombre();
    } else {
        ingresarArtista(nombre);
    }
}
function ingresarArtista(nombre){
    let artista = prompt('Ingresar artista.');
    if (nombre == ''){
        ingresarArtista(nombre);
    } else {
        ingresarAño(nombre, artista);
    }
}
function ingresarAño(nombre, artista){
    let año = prompt('Ingresar año de lanzamiento del album.');
    if (año == ''){
        ingresarAño(nombre, artista);
    } else {
        ingresarPrecio(nombre, artista, año);
    }
}
function ingresarPrecio(nombre, artista, año){
    let precio = parseInt(prompt('Ingresar precio del album.'));
    if (precio == NaN){
        ingresarPrecio(nombre, artista, año);
    } else {
        ingresarCantidad(nombre, artista, año, precio);
    }
}
function ingresarCantidad(nombre, artista, año, precio){
    let cantidad = parseInt(prompt('Ingresar cantidad de ejemplares disponibles en stock del album.'));
    if (cantidad == NaN){
        ingresarCantidad(nombre, artista, año, precio);
    } else {
        inventario.discos.push(new Disco(nombre, artista, año, precio, cantidad));
        window.alert('Disco añadido a la colección!');
    }
}
// agregar revista
function ingresarNombreRevista(){
    let nombre = prompt('Ingresar nombre de la revista que desea añadir al inventario.');
    if (nombre == ''){
        ingresarNombreRevista();
    } else {
        ingresarEdicion(nombre);
    }
}
function ingresarEdicion(nombre){
    let edicion = prompt('Ingresar edición.');
    if (edicion == ''){
        ingresarEdicion(nombre);
    } else {
        ingresarPrecioRevista(nombre, edicion);
    }
}
function ingresarPrecioRevista(nombre, edicion){
    let precio = parseInt(prompt('Ingresar precio de la revista.'));
    if (precio == NaN){
        ingresarPrecioRevista(nombre, edicion);
    } else {
        ingresarCantidadRevista(nombre, edicion, precio);
    }
}
function ingresarCantidadRevista(nombre, edicion, precio){
    let cantidad = parseInt(prompt('Ingresar cantidad de ejemplares disponibles en stock de la revista.'));
    if (cantidad == NaN){
        ingresarCantidadRevista(nombre, edicion, precio);
    } else {
        inventario.revistas.push(new Revista(nombre, edicion, precio, cantidad));
        window.alert('Revista añadido a la colección!');
    }
}
// agregar tocadiscos
function ingresarNombreTocadiscos(){
    let nombre = prompt('Ingresar nombre del tocadiscos que desea añadir al inventario.');
    if (nombre == ''){
        ingresarNombreTocadiscos();
    } else {
        ingresarPrecioTocadiscos(nombre);
    }
}
function ingresarPrecioTocadiscos(nombre){
    let precio = parseInt(prompt('Ingresar precio del tocadiscos.'));
    if (precio == NaN){
        ingresarPrecio(nombre);
    } else {
        ingresarCantidadTocadiscos(nombre, precio);
    }
}
function ingresarCantidadTocadiscos(nombre, precio){
    let cantidad = parseInt(prompt('Ingresar cantidad de ejemplares disponibles en stock del tocadiscos.'));
    if (cantidad == NaN){
        ingresarCantidad(nombre, precio);
    } else {
        inventario.tocadiscos.push(new Tocadiscos(nombre, precio, cantidad));
        window.alert('Tocadisco añadido a la colección!');
    }
}

