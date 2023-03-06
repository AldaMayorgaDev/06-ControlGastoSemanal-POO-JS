/* Variables y Selectores */

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

/* Eventos */
eventListeners ();

function eventListeners (){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );
}

/* Clases */

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
}