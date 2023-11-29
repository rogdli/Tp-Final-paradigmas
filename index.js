const readline = require('readline-sync');
const Tarea = require('./Tarea');
const Lista = require('./Lista');
const kleur = require('kleur');///cambia de color texto en terminal 
const emoji = require('node-emoji');///poner emojis

///validacion pide un dato tipo entero y lo devuelve 
function ingresoOpcion() {
    try {
        const x = readline.question("Ingresa una de estas opciones:\n");
        
        if (isNaN(x)) {
            console.log("Error, el valor ingresado no es un numero");
            return ingresoOpcion();  // Llamada recursiva
        } else {
            const z = parseInt(x);
            return z;
        }
        
    } catch (error) {
        console.log("Ha surgido un error, inténtalo de nuevo");
        return ingresoOpcion();  // Llamada recursiva en caso de error
    }
}
///Funcion procesar opcion, esta funcion va a servir como menu utilizando recursividad
function procesarOpcion(opcion) {
    switch (opcion) {
        case 1:
            do {
                CasoUno();
                boton = readline.questionInt("Dime Cual de estas opciones deseas:\n");
                console.clear();
                switch (boton) {
                    case 1:
                        Lista.verLista_todo(Lista.lista);
                        if (Lista.lista.length > 0) {
                            Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
                        }
                        break;
                    case 2:
                        Lista.verLista_pendiente(Lista.lista);
                        if (Lista.lista.length > 0) {
                            Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
                        }
                        break;
                    case 3:
                        Lista.verLista_curso(Lista.lista);
                        if (Lista.lista.length > 0) {
                            Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
                        }
                        break;
                    case 4:
                        Lista.verLista_terminado(Lista.lista);
                        if (Lista.lista.length > 0) {
                            Lista.editar_detalle(Lista.lista, Lista.detalle_tarea(Lista.lista));
                        }
                        break;
                    case 5:
                        condicion_caso_uno = 1;
                        break;
                    default:
                        console.log("El valor Ingresado es incorrecto, inténtelo de nuevo \n");
                        break;
                }
            } while (condicion_caso_uno === 0);
            break;
        case 2:
                const encontrados = Tarea.buscar(Lista.lista); // buscar crea una sub lista con los objetos encontrados
                Lista.mostrar_encontrados(encontrados); // mostrar_encontrados muestra los elementos de este sublista
    
                if (encontrados.length > 0) { // verifica que la sublista no esté vacía para poder ver en detalle un elemento de la sublista
                    Lista.detalle_tarea(encontrados); // detalle_tarea muestra los detalles de la tarea que selecciona el usuario, si es que selecciona
                }
             break;
        case 3:
             Lista.lista.push(Tarea.ingresar());
            break;
        case 4:
                console.log('\x1b[36mGracias por usar \x1b[35mAgenda\x1b[0m: no olvides organizar tus tareas \u2764️');
                condicion = 1;
                break;
        default:
                console.log("Opcion incorrecta");
                break;
        }
    }
  

function menu(){

    introduccion();
    const opcion= ingresoOpcion()
    procesarOpcion(opcion);
    if(opcion!==4){
        menu();
    }

}
function introduccion() {
    console.log(`${kleur.green('1')} Ver tarea `);
    console.log(`${kleur.green('2')} Buscar Tarea`);
    console.log(`${kleur.green('3')} Agregar Tarea`);
    console.log(`${kleur.green('4')} Cerrar `);
}

function CasoUno() {
    console.log(`${kleur.bgMagenta('1')} todo `);
    console.log(`${kleur.bgMagenta('2')} Pendientes`);
    console.log(`${kleur.bgMagenta('3')} Tareas en Curso`);
    console.log(`${kleur.bgMagenta('4')} Tareas Finalizadas`);
    console.log(`${kleur.bgMagenta('5')} Volver`);
}

let botonS;
let boton = 0;
let condicion = 2;
let condicion_caso_uno = 0;
console.log('\x1b[36mBienvenido al proyecto \x1b[35mAgenda\x1b[0m: aquí podrás organizar tus tareas \u2764️');
menu();

