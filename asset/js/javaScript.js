// Definición de la clase Tarea
class Tarea {
    constructor(id, descripcion, realizada) {
        this.id = id;
        this.descripcion = descripcion;
        this.realizada = realizada;
    }
    // Genera el template HTML para una tarea
    getTemplate() {
        return `
        <tr>
            <td>${this.id}</td>
            <td>${this.descripcion}</td>
            <td><input type="checkbox" ${this.realizada ? "checked" : ""}></td>
            <td><button> X </button></td>
        </tr>`;
    }
    // Cambia el estado "realizada" de una tarea
    toggleRealizada() {
        this.realizada = !this.realizada;
    }
}
// Array de tareas inicial
const tareas = [];
// Variable para llevar el conteo de las tareas
let contador = 1;
// Genera las tareas y actualiza la tabla
const generarTareas = () => {
    // Genera un template HTML para cada tarea utilizando el método getTemplate()
    const template = tareas.map(tarea => tarea.getTemplate()).join('');
    // Actualiza el contenido de la tabla en el DOM
    actualizarTabla(template);
    borrar();
    estadoDeLaTarea();
    contarLasTareas();
};
// Actualiza el contenido de la tabla en el DOM
const actualizarTabla = (template) => {
    const tableBody = document.querySelector('#listaDeTareas tbody');
    tableBody.innerHTML = template;
};
// Agrega el evento de eliminar tarea a los botones
const borrar = () => {
    const eliminar = document.querySelectorAll('#listaDeTareas button');
    eliminar.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Elimina la tarea correspondiente al índice del botón seleccionado
            tareas.splice(index, 1);
            generarTareas();
        });
    });
};
// Agrega eventos a los checkboxes para cambiar el estado de las tareas
const estadoDeLaTarea = () => {
    const checks = document.querySelectorAll("#listaDeTareas input[type='checkbox']");
    checks.forEach((check, index) => {
        const fila = document.querySelector(`#listaDeTareas tbody tr:nth-child(${index + 1})`);
        if (check.checked) {
            fila.classList.add('bold');
        }
        check.addEventListener('click', () => {
            // Cambia el estado "realizada" de la tarea correspondiente al índice del checkbox seleccionado
            fila.classList.toggle('bold');
            tareas[index].toggleRealizada();
            contarLasTareas();
        });
    });
};
// Actualiza los contadores de tareas
const contarLasTareas = () => {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(tarea => tarea.realizada).length;
    const total = document.getElementById('total');
    const realizada = document.getElementById('realizadas');
    total.innerHTML = totalTareas;
    realizada.innerHTML = tareasRealizadas;
};
// Agrega el evento de agregar tarea al botón
const btn = document.getElementById('boton');
btn.addEventListener('click', () => {
    // Obtiene el valor del input de la nueva tarea
    const tareaInput = document.getElementById('agregarTarea');
    const descripcion = tareaInput.value.trim();
    if (descripcion !== "") {
        // Crea una nueva instancia de Tarea y la agrega al array de tareas
        const nuevaTarea = new Tarea(contador, descripcion, false);
        tareas.push(nuevaTarea);
        // Incrementa el contador de tareas
        contador++;
        // Limpia el input
        tareaInput.value = "";
        generarTareas();
    } else {
        // Muestra una alerta o realiza otra acción para indicar que la tarea está en blanco
        alert("Por favor, ingresa una descripción para la tarea.");
    }
});
// Genera las tareas iniciales y muestra la tabla en el DOM
generarTareas();