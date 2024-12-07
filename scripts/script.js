import { ContenedorArbol,actualizar } from "./render.js";
import { minimax } from "./minimax.js";
import { actualizarAlfaBeta } from "./minimax.js";

const datosArbol = { id: 0, value: null, alpha: -Infinity, beta: Infinity, children: [] };
let animacionPaso = 0;
let nodoId = 1;

const panelAlfaBeta = d3.select("body").append("div")
  .attr("id", "alpha-beta-panel")
  .html(`
      <p>Alfa: <span id="alpha-value">-∞</span></p>
      <p>Beta: <span id="beta-value">∞</span></p>
    `);

actualizar(datosArbol);

document.getElementById("ejecutar-algoritmo").addEventListener("click", () => {
  animacionPaso = 0;
  const pasos = [];
  const resultado = minimax(datosArbol, 0, -Infinity, Infinity, true, pasos);
  animarPasos(pasos);
  alert(`Resultado del algoritmo Minimax: ${resultado}`);
});

function agregarNodo(nodo) {
  if (!nodo.data.children) nodo.data.children = [];
  nodo.data.children.push({ id: nodoId++, value: null, alpha: -Infinity, beta: Infinity, children: [] });
  actualizar(datosArbol);
}

function eliminarNodo(nodo) {
  if (nodo.parent) {
    const index = nodo.parent.data.children.indexOf(nodo.data);
    nodo.parent.data.children.splice(index, 1);
  }
  if (nodo.data.children && nodo.data.children.length > 0) {
    nodo.data.children.forEach(child => eliminarNodo({ data: child, parent: nodo }));
  }
  actualizar(datosArbol);
}

function asignarValor(nodo) {
  const value = parseInt(prompt("Introduce un valor para el nodo:"), 10);
  if (!isNaN(value)) {
    nodo.data.value = value;
    actualizar(datosArbol);
  }
}
export function mostrarOpciones(nodo, event) {
  const esHoja = !nodo.children || nodo.children.length === 0;

  const opciones = [
    { text: "Añadir Nodo", action: () => agregarNodo(nodo) },
    { text: "Eliminar Nodo", action: () => eliminarNodo(nodo) }
  ];

  if (esHoja) {
    opciones.push({ text: "Asignar Valor", action: () => asignarValor(nodo) });
  }

  d3.select(".menu").remove();

  const menu = d3.select("body").append("div")
    .attr("class", "menu show")
    .style("width", "120px")
    .style("height", "80px")
    .style("left", `${event.pageX}px`)
    .style("top", `${event.pageY}px`);


  opciones.forEach(option => {
    menu.append("div")
      .text(option.text)
      .on("click", () => {
        option.action();
        menu.remove();
      });
  });
}

function animarPasos(pasos) {
  if (animacionPaso < pasos.length) {
    const step = pasos[animacionPaso];
    const { node, alpha, beta, value, stepType, child } = step;

    ContenedorArbol.selectAll(".node-shape")
      .filter(d => d.data === node)
      .transition()
      .duration(500)
      .style("fill", stepType === "max" ? "red" : stepType === "min" ? "blue" : "orange");

    if (value !== undefined) {
      ContenedorArbol.selectAll(".text")
        .filter(d => d.data === node)
        .transition()
        .duration(500)
        .text(value);
    }
    ContenedorArbol.selectAll(".alfa-text")
    .filter(d => d.data === node)
    .transition()
    .duration(500)
    .text(alpha === -Infinity ? "a=-∞" : `a=${alpha}`);
  
  ContenedorArbol.selectAll(".beta-text")
    .filter(d => d.data === node)
    .transition()
    .duration(500)
    .text(beta === Infinity ? "b=∞" : `b=${beta}`);

    if (stepType === "prune" && child) {
      ContenedorArbol.selectAll(".link")
        .filter(d => d.source.data === node && d.target.data === child)
        .transition()
        .duration(500);

      const childIndex = node.children.indexOf(child);
      for (let i = childIndex + 1; i < node.children.length; i++) {
        const unvisitedChild = node.children[i];
        ContenedorArbol.selectAll(".link")
          .filter(d => d.source.data === node && d.target.data === unvisitedChild)
          .transition()
          .duration(500)
          .style("stroke", "red")
          .style("stroke-dasharray", "5,5");
      }
    }

    actualizarAlfaBeta(alpha, beta);

    animacionPaso++;
    setTimeout(() => animarPasos(pasos), 1000);
  } else {
    ContenedorArbol.selectAll("circle")
      .transition()
      .duration(500)
      .style("fill", "green");
  }
}