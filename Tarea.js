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
    x.titulo = readline.question("Titulo: \n");
    x.descripcion = readline.question("Descripcion: \n");
    x.estado=5;
    while (x.estado != 1 && x.estado != 2 && x.estado != 3) {
        ///utilizo un console.log en vez de poner la descripcion en el questionInt, porque si no no muestra los emojis
        console.log(`${kleur.red(`1. Pendiente ${emoji.get('tada')}`)}\n${ kleur.yellow(`2. En curso  ${emoji.get('hourglass')}`)}\n${kleur.green(`3. Finalizado ${emoji.get('white_check_mark')}`)}`);
        x.estado = readline.questionInt();
    }
    x.ultima_edicion = new Date();
    do {
        const fechaTexto = readline.question('Ingresa fecha limite (YYYY-MM-DD): ');
        x.vencimiento = new Date(fechaTexto);
    } while (isNaN(x.vencimiento.getTime()));
    ///utilizo un console.log en vez de poner la descripcion en el questionInt, porque si no no muestra los emojis
    x.dificultad=5;
    while (x.dificultad != 1 && x.dificultad != 2 && x.dificultad != 3) {
        ///utilizo un console.log en vez de poner la descripcion en el questionInt, porque si no no muestra los emojis
        console.log(`${kleur.green(`1.Facil ${emoji.get('smile')}`)}\n${kleur.yellow(`2.Medio ${emoji.get('neutral_face')}`)}\n${kleur.red(`3.Dificil ${emoji.get('rage')}`)}`);
        x.dificultad = readline.questionInt();
    }
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
