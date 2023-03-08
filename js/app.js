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
        console.log('this.gastos', this.gastos);
        this.calcularRestante();
    }
    
    /* Método para  calcular restante */
    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto)=> total + gasto.cantidadGasto, 0);
        this.restante = this.presupuesto - gastado;
    }

     /* Método para  eliminar gasto y rembolzarlo  */
     eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();

        console.log('this.gastos :>> ', this.gastos);
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
   };

    /* Método para agregar listado de gastos en Interfaz */
   agregarGastoListado(gastos){

        //Se manda llamar metodo limpiarHTML
        this.limpiarHTML();

        //Iterar sobre gastos
        gastos.forEach(gasto =>{
            console.log('gasto :>> ', gasto);

            const {cantidadGasto, nombreGasto, id} = gasto;


            //Crear un LI
            const nuevoGasto = document.createElement('LI');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id; //Agrega el atributo data-id = "id";

            //Se agrega el html del gasto
            nuevoGasto.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill"> $${cantidadGasto} </span>`;

            //Se añade boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
            btnBorrar.onclick = ()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            //Se agrega al html
            gastoListado.appendChild(nuevoGasto);
        })
   };
    /* Método para limpiar listado de gastos en Interfaz */
   limpiarHTML(){
    while (gastoListado.firstChild){
        gastoListado.removeChild(gastoListado.firstChild);
    }
   };

    /* Método para ctualizar la cantidad restante en Interfaz */
   actualizarRestante(restante){
    document.querySelector('#restante').textContent = restante;
   }
/* Método para comprobar presupuesto en Interfaz */
   comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        //Validacion del porcentaje del presupuesto gastado
        if((presupuesto / 4) > restante) {//comprobar 25% de gasto
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2) > restante){//comprobar 50% de gasto
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{//Rembolsp
            restanteDiv.classList.remove('alert-danger','alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        //Si el total es 0 o menor
        if(restante<=0){
            ui.mostrarAlerta('El presupuesto se ha agotado', 'error');

            //Desactiva el boton agregar-gasto

            formulario.querySelector('button[type="submit"]').disabled = true;
        }
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


    //Se manda llamar metodo AgregarGastoListado para agregar el gasto a la interfaz en forma de listado

    const {gastos, restante} = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante (restante);

    //Se manda llamar metodo ComprobarPresupuesto para validarlo
    ui.comprobarPresupuesto (presupuesto);


    //Reinicia formulario cada que se añade un gasto
    formulario.reset();
}


    //Eliminar Gasto
function eliminarGasto(id){
    //Elimina gastos del objeto
    presupuesto.eliminarGasto(id);


    //Elimina gastos de la interfaz
    const {gastos, restante} = presupuesto
    ui.agregarGastoListado(gastos);


    ui.actualizarRestante (restante);

    //Se manda llamar metodo ComprobarPresupuesto para validarlo
    ui.comprobarPresupuesto (presupuesto);
}    