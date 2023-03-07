/* Variables y Selectores */

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
let presupuesto;
/* Eventos */
eventListeners ();

function eventListeners (){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );
}

/* Clases */

class Presupuesto {
    constructor (presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos=  []; 
    }
}

class UI {
   
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
}