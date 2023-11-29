const readline = require('readline-sync');
const Tarea = require('./Tarea');
const kleur = require('kleur');///cambia de color texto en terminal 
const emoji = require('node-emoji');///poner emojis
let lista = []; // Lista que contendrá las tareas de la agenda
function mostrar_encontrados(lista) {

    if (lista.length>0) {
        lista.forEach((elemento, index) => {
            console.log(`${index + 1}. ${elemento.titulo}`);
        });
    } else {
        console.clear();
        console.log("No se encontro un elemento");
        
    }
}
// Función para ver la lista de tareas en estado "Todo".
function verLista_todo(lista) {
    if (lista.length > 0) {
        lista.forEach((elemento, index) => {
            console.log(`${index + 1}. ${elemento.titulo}`);
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver la lista de tareas en estado "Pendiente".
function verLista_pendiente(lista) {
    if (lista.length > 0) {
        lista.forEach((elemento, index) => {
            if (elemento.estado === 1) {
                console.log(`${index + 1}. ${elemento.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver la lista de tareas en estado "En Curso".
function verLista_curso(lista) {
    if (lista.length > 0) {
        lista.forEach((elemento, index) => {
            if (elemento.estado === 2) {
                console.log(`${index + 1}. ${elemento.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver la lista de tareas en estado "Finalizado".
function verLista_terminado(lista) {
    if (lista.length > 0) {
        lista.forEach((elemento, index) => {
            if (elemento.estado === 3) {
                console.log(`${index + 1}. ${elemento.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda esta vacia");
    }
}

// Función para ver los detalles de una tarea, retorna índice de la tarea seleccionada, es un complemento para la función editar_detalle
function detalle_tarea(lista) {
    let seleccion = readline.question("Si deseas ver en detalle una de estas tareas selecciona su indice, si no, presiona 0 u otra tecla distinta de los indices existentes\n");

    let seleccion2 = parseInt(seleccion, 10);
    if (!isNaN(seleccion2) && seleccion2 > 0 && seleccion2 <= lista.length) {
        detalle_tarea_complemento(lista, seleccion2);
        return seleccion2;
    } else {
        // No hace nada, se presionó una tecla distinta a las opciones existentes
        return -1; // El -1 indica que la lista no tiene nada
    }
}

// Función para editar los detalles de una tarea.
function editar_detalle(lista, indice) {
    if (indice !== -1) {
        let seleccion = readline.question(`Si deseas modificar esta tarea ${kleur.blue('presiona e')}. Si no, presiona cualquier otra tecla.\n`);
        if (seleccion.toLowerCase() === "e") {
            Tarea.editar(lista[indice - 1]);
        }
    }
}

// Función para mostrar los detalles de una tarea.
function detalle_tarea_complemento(lista, indice) {
    const elemento = lista[indice - 1];
    //separadorLength obtiene l longitud de la terminal, si no lo deja en 80
    const separadorLength = process.stdout.columns || 80; 
    ///uso separadorLength para saber la cantidad de veses que voy a repetir '-', para adaptarse a cuaquier teminal
    const separador = "-".repeat(separadorLength);
     // Función para obtener el texto correspondiente al estado
     function obtenerTextoEstado(estado) {
        switch (estado) {
            case 1:
                return kleur.red(`Pendiente ${emoji.get('tada')}`);
            case 2:
                return kleur.yellow(`En curso  ${emoji.get('hourglass')}`);
            case 3:
                return kleur.green(`Finalizado ${emoji.get('white_check_mark')}`);
            default:
                return 'Desconocido';
        }
    }
    console.log(separador);
    console.log("Detalles de la tarea:");
    console.log(`Título: ${elemento.titulo}`);
    console.log(`Descripción: ${elemento.descripcion}`);
    console.log(`Estado: ${obtenerTextoEstado(elemento.estado)}`);
    console.log(`Dificultad: ${obtenerTextoDificultad(elemento.dificultad)}`);
    console.log(`Fecha de Creación: ${formatDate(elemento.creacion)}`);
    console.log(`Última Edición: ${formatDate(elemento.ultima_edicion)}`);
    console.log(`Fecha de Vencimiento: ${formatDate(elemento.vencimiento) || 'No especificada'}`);
    console.log(separador);
}
// Función para obtener el texto correspondiente a la dificultad
function obtenerTextoDificultad(dificultad) {
    switch (dificultad) {
        case 1:
            return kleur.green(`Facil ${emoji.get('smile')}`);
        case 2:
            return kleur.yellow(`Medio ${emoji.get('neutral_face')}`);
             
        case 3:
            return kleur.red(`Dificil ${emoji.get('rage')}`);
        default:
            return 'Desconocido';
    }
}
// Función para formatear una fecha.
function formatDate(dateString) {
    if (!dateString) {
        return '';
    }
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

module.exports = {
    lista,
    verLista_todo,
    verLista_pendiente,
    verLista_curso,
    verLista_terminado,
    detalle_tarea,
    editar_detalle,
    detalle_tarea_complemento,
    formatDate,
    mostrar_encontrados
};
