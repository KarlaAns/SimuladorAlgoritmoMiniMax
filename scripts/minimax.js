
import { ContenedorArbol } from "./render.js";

export function minimax(nodo, profundidad, alfa, beta, jugadorMaximado, pasos) {
    pasos.push({ node: nodo, alpha: alfa, beta, stepType: jugadorMaximado ? "max" : "min" });
  
    if (!nodo.children || nodo.children.length === 0) {
      pasos.push({ node: nodo, value: nodo.value, alpha: alfa, beta, stepType: "leaf" });
      return nodo.value;
    }
  
    let value;
    if (jugadorMaximado) {
      value = -Infinity;
      for (const child of nodo.children) {
        const childValue = minimax(child, profundidad + 1, alfa, beta, false, pasos);
        value = Math.max(value, childValue);
        alfa = Math.max(alfa, value);
        if (alfa >= beta) {
          pasos.push({ node: nodo, alpha: alfa, beta, stepType: "prune", child });
          break; // Poda
        }
      }
    } else {
      value = Infinity;
      for (const child of nodo.children) {
        const childValue = minimax(child, profundidad + 1, alfa, beta, true, pasos);
        value = Math.min(value, childValue);
        beta = Math.min(beta, value);
        if (alfa >= beta) {
          pasos.push({ node: nodo, alpha: alfa, beta, stepType: "prune", child });
          break; // Poda
        }
      }
    }
  
    nodo.value = value;
    pasos.push({ node: nodo, value, alpha: alfa, beta, stepType: "update" });
  
    return value;
  }
  
  export function actualizarAlfaBeta(alfa, beta) {
    d3.select("#alpha-value").text(alfa === -Infinity ? "-∞" : alfa);
    d3.select("#beta-value").text(beta === Infinity ? "∞" : beta);
  }
  