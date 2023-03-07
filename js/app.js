/* Variables y Selectores */

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
let presupuesto;
/* Eventos */
eventListeners ();

function eventListeners (){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );

    /* Escuchar los eventos en el formulario */
    formulario.addEventListener('submit', agregarGasto );
}

/* Clases */

class Presupuesto {
    constructor (presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos=  []; 
    }

    /* Método para nuevo gasto */

    nuevoGasto(gasto){
        this.gastos=  [...this.gastos, gasto]; 
        console.log('this.gastos', this.gastos)
    }
}

class UI {
   /* Metodo para insertar Presupuesto en HTML */
   insertarPresupuesto(cantidad){
        console.log('cantidad :>> ', cantidad);

        //Se destructura el objeto presupuesto que llega como cantidad
        const {presupuesto, restante} = cantidad;

        //Se selecciona el elemento HTML para insertar presupuesto y restante en el DOM
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
   }

   /* Método para mostrar Alerta en Interfaz */

   mostrarAlerta(mensaje, tipo){

        //Crear div para mostrar alerta
        const divAlerta = document.createElement('div');
        
        divAlerta.classList.add('text-center', 'alert');

            //Se valida el tipo de alerta para agregar una clase que mostrara estilos difetentes en el div

            if(tipo === 'error'){
               divAlerta.classList.add('alert-danger');
            }else{
                divAlerta.classList.add('alert-success');
            }
        
        //Se añade mensaje a divAlerta
        divAlerta.textContent = mensaje;

        //Se inserta divAlerta a HTML
        document.querySelector('.primario').insertBefore(divAlerta, formulario);

        //Quitar Mensaje Alerta despues de 2s
        setTimeout(() => {
            divAlerta.remove();
        }, 2000);
   }
}

/* Instanciar  UI */
const ui = new UI();



/* Funciones */

//preguntarPresupuesto

function preguntarPresupuesto(){
    const presupuestoUsuario = Number(prompt('¿Cuál es tu presupuesto?'));
    console.log('presupuesto:', presupuestoUsuario);
    console.log('presupuesto:', typeof (presupuestoUsuario));

    /* 
    Validación  de que se ingrese un presupuesto: 
    - No sea un string vacio ---> presupuestoUsuario === ''
    - No sea null o que se de clic en cancelar ---> presupuestoUsuario === null
    - Que no sea una letra o simbolo ---> isNaN(presupuestoUsuario)
    - Que No sea menor o igual a 0  ---> presupuestoUsuario <= 0
    */
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload(); //Recarga la pagina y vuelve a enviar el prompt
    }

    /* Presupuesto valido se instancia la clase Presupuesto */
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log('Objetopresupuesto :>> ', presupuesto);


    /* Se llama metodo isnertarPresupuesto, asignandole el objeto presupuesto */
    ui.insertarPresupuesto(presupuesto);
};


//Agregar /añade gastos

function agregarGasto(e){
    e.preventDefault();

    //Leer los inputs del formulario

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = Number(document.querySelector('#cantidad').value);

    /* Validación formulario: 

        1.- Inputs no esten vacios ---> nombreGasto === '' || cantidadGasto === ''
        2.- Validar que la cantidad del gasto sea > 0 y/o que sea un numero;
    */

        if(nombreGasto === '' || cantidadGasto === ''){

            //Se manda llmar meotodo mostrarAlerta y se le da como parametros un mensaje y un tipo de alerta.
            ui.mostrarAlerta('Ambos campos son obligatorios', 'error');
            return;
        }else if (cantidadGasto <= 0 || isNaN(cantidadGasto)){
            //Se manda llmar meotodo mostrarAlerta y se le da como parametros un mensaje y un tipo de alerta.
            ui.mostrarAlerta('Cantidad no válida', 'error');
            return;
        }

    //Generar un objeto con el gasto

    const gasto = {
        nombreGasto, 
        cantidadGasto, 
        id: Date.now()
    };

    /* Añade nuevogasto */
    presupuesto.nuevoGasto(gasto);

    //Se manda llmar meotodo mostrarAlerta y se le da como parametros un mensaje y un tipo de alerta para mostrar cuando se agrega un gasto correctamente.
    ui.mostrarAlerta('Gasto Agregado Correctamente', 'exito');

    //Reinicia formulario cada que se añade un gasto
    formulario.reset();
}
