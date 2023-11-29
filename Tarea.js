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

///esta funcion devuelve un objeto tipo tarea y pide los valores que completaran al nuevo objeto tipo tarea 
function ingresar() {
    let titulo, descripcion, vencimiento, dificultad;

    titulo = readline.question("Titulo: \n");
    descripcion = readline.question("Descripcion: \n");

    function ingresarFechaVencimiento() {
        const fechaTexto = readline.question('Ingresa fecha de vencimiento (YYYY-MM-DD):\n');
        vencimiento = new Date(fechaTexto);

        if (isNaN(vencimiento.getTime())) {
            console.log('Fecha no válida. Por favor, ingresa una fecha en el formato correcto.');
            return ingresarFechaVencimiento();
        }

        return vencimiento;
    }

    vencimiento = ingresarFechaVencimiento();

    function ingresarDificultad() {
        console.log(`${kleur.green(`1.Facil ${emoji.get('smile')}`)}\n${kleur.yellow(`2.Medio ${emoji.get('neutral_face')}`)}\n${kleur.red(`3.Dificil ${emoji.get('rage')}`)}`);
        dificultad = readline.questionInt();

        if (![1, 2, 3].includes(dificultad)) {
            console.log('Opción no válida. Por favor, elige una dificultad válida.');
            return ingresarDificultad();
        }

        return dificultad;
    }

    return crearTarea(titulo, descripcion, vencimiento, ingresarDificultad());
}

function editar(x) {
    function leerTitulo() {
        x.titulo = readline.question("Titulo: \n");
        leerDescripcion();
    }

    function leerDescripcion() {
        x.descripcion = readline.question("Descripcion: \n");
        x.estado = leerEstado();
    }

    function leerEstado() {
        console.log(`${kleur.red(`1. Pendiente ${emoji.get('tada')}`)}\n${kleur.yellow(`2. En curso  ${emoji.get('hourglass')}`)}\n${kleur.green(`3. Finalizado ${emoji.get('white_check_mark')}`)}`);
        const estado = readline.questionInt();
        return (estado === 1 || estado === 2 || estado === 3) ? estado : leerEstado();
    }

    function leerFecha() {
        const fechaTexto = readline.question('Ingresa fecha limite (YYYY-MM-DD): ');
        const fecha = new Date(fechaTexto);
        return isNaN(fecha.getTime()) ? leerFecha() : fecha;
    }

    function leerDificultad() {
        console.log(`${kleur.green(`1. Facil ${emoji.get('smile')}`)}\n${kleur.yellow(`2. Medio ${emoji.get('neutral_face')}`)}\n${kleur.red(`3. Dificil ${emoji.get('rage')}`)}`);
        const dificultad = readline.questionInt();
        return (dificultad === 1 || dificultad === 2 || dificultad === 3) ? dificultad : leerDificultad();
    }

    x.descripcion = leerTitulo();
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
