const readline = require('readline-sync');
const kleur = require('kleur');///cambia de color texto en terminal 
const emoji = require('node-emoji');///poner emojis

///Objeto prototipo 
var Tarea ={
        titulo:"",
        descripcion:"",
        estado: 1,
        creacion:new Date(),
        ultima_edicion: new Date(),
        vencimiento:new Date(),
        dificultad:0
}
///funcion para crear objeto tarea (como si fuera un constructor)
function crearTarea(titulo, descripcion, vencimiento, dificultad) {
    var nuevo=Object.create(Tarea);///nuevo va a ser una copia de Tarea 
    ///asigno los valores ingresados atraves de parametros al objeto
    nuevo.titulo=titulo;
    nuevo.descripcion=descripcion;
    nuevo.vencimiento=vencimiento;
    nuevo.dificultad=dificultad;
    nuevo.creacion=new Date();
    nuevo.ultima_edicion=new Date();
    return nuevo;///Devuelvo objeto nuevo
}
///complemento de la funcion ingreso, el usuario ingresa el vencimiento y la funcion retorna el valor ingresado
function ingresarFechaVencimiento() {
    const fechaTexto = readline.question('Ingresa fecha de vencimiento (YYYY-MM-DD):\n');
    vencimiento = new Date(fechaTexto);

    if (isNaN(vencimiento.getTime())) {
        console.log('Fecha no válida. Por favor, ingresa una fecha en el formato correcto.');
        return ingresarFechaVencimiento();
    }

    return vencimiento;
}
///complemento de la funcion ingreso, el usuario ingresa la difucultad y la funcion retorna la dificultad ingresada 
function ingresarDificultad() {
    console.log(`${kleur.green(`1.Facil ${emoji.get('smile')}`)}\n${kleur.yellow(`2.Medio ${emoji.get('neutral_face')}`)}\n${kleur.red(`3.Dificil ${emoji.get('rage')}`)}`);
    dificultad = readline.questionInt();

    if (![1, 2, 3].includes(dificultad)) {
        console.log('Opción no válida. Por favor, elige una dificultad válida.');
        return ingresarDificultad();
    }

    return dificultad;
}
///esta funcion devuelve un objeto tipo tarea y pide los valores que completaran al nuevo objeto tipo tarea 
function ingresar() {
    const titulo = readline.question("Titulo: \n");
    const descripcion = readline.question("Descripcion: \n");
    return crearTarea(titulo, descripcion, ingresarFechaVencimiento(), ingresarDificultad());
}
///funcion complemento para la funcion editar, sirve para mostrar en pantalla los estados elegibles y retorna el valor elegido
function leerEstado() {
    console.log(`${kleur.red(`1. Pendiente ${emoji.get('tada')}`)}\n${kleur.yellow(`2. En curso  ${emoji.get('hourglass')}`)}\n${kleur.green(`3. Finalizado ${emoji.get('white_check_mark')}`)}`);
    const estado = readline.questionInt();
    return (estado === 1 || estado === 2 || estado === 3) ? estado : leerEstado();
}
///funcion complemento para la funcion editar, sirve para mostrar en pantalla las dificultades elegibles y retorna el valor elegido
function leerDificultad() {
    console.log(`${kleur.green(`1. Facil ${emoji.get('smile')}`)}\n${kleur.yellow(`2. Medio ${emoji.get('neutral_face')}`)}\n${kleur.red(`3. Dificil ${emoji.get('rage')}`)}`);
    const dificultad = readline.questionInt();
    return (dificultad === 1 || dificultad === 2 || dificultad === 3) ? dificultad : leerDificultad();
}
///funcion complemento para la funcion editar, sirve para mostrar en pantalla las fechas elegibles y retorna el valor elegido
function leerFecha() {
    const fechaTexto = readline.question('Ingresa fecha limite (YYYY-MM-DD): ');
    const fecha = new Date(fechaTexto);
    return isNaN(fecha.getTime()) ? leerFecha() : fecha;
}
///esta funcion sirve para la modificacion de un objeto tarea x
///aclaracion: la funcion no cumple con el paradigma funcional porque esta modificando x, aun asi lo consideramos la forma mas eficiente 
function editar(x) {
    x.titulo = readline.question("Titulo: \n");
    x.descripcion = readline.question("Descripcion: \n");
    x.estado = leerEstado();
    x.ultima_edicion = new Date();
    x.vencimiento = leerFecha();
    x.dificultad = leerDificultad();

    console.log("Datos guardados!\n");
}

function buscar(lista) {
    const cadenaABuscar = readline.question("Dime el titulo de la tarea que deseas buscar: ").toLowerCase();

    const tareasEncontradas = lista.filter((object) => {
        return object.titulo.toLowerCase().includes(cadenaABuscar);
    });

    return tareasEncontradas;
}

module.exports = {
    crearTarea,
    ingresar,
    editar,
    buscar
};
