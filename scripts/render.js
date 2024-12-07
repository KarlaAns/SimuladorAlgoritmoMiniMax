import { mostrarOpciones } from "./script.js";
export const ancho = 800;
export const alto = 550;

export const datosArbol = { id: 0, value: null, alpha: -Infinity, beta: Infinity, children: [] };
export const ContenedorArbol = d3.select("#tree-container")
  .append("svg")
  .attr("width", ancho)
  .attr("height", alto);

export function actualizar(data) {
    const treeLayout = d3.tree().size([ancho - 100, alto - 100]);
    const raiz = d3.hierarchy(data);
    treeLayout(raiz);
  
    ContenedorArbol.selectAll("*").remove();
  
  
    ContenedorArbol.selectAll(".link")
      .data(raiz.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3.linkVertical()
        .x(d => d.x + 50)
        .y(d => d.y + 50));
        
  
    const nodos = ContenedorArbol.selectAll(".node")
      .data(raiz.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x + 50},${d.y + 50})`)
      .on("click", function (event, d) {
        event.stopPropagation();
        mostrarOpciones(d, event);
      });
      nodos.append("path")
      .attr("class", "node-shape")
      .attr("d", d => {
        if (d.depth % 2 === 0) {
          
          const size = 20; 
          return `M${-size},${-size} L${size},${-size} L${size},${size} L${-size},${size} Z`;
        } else {
          
          return d3.symbol().type(d3.symbolCircle).size(1200)();
        }
      });
  
    nodos.append("text")
      .attr("class", "text")
      .attr("dy", 5)
      .attr("x", -8)
      .text(d => (d.data.value !== null ? d.data.value : ""));
  
    nodos.append("text")
      .attr("class", "alfa-text")
      .attr("dy", 35) 
      .attr("x", -10)
      .text(d => `a=${d.data.alpha === -Infinity ? "-∞" : d.data.alpha}`);
  
    nodos.append("text")
      .attr("class", "beta-text")
      .attr("dy", 50) 
      .attr("x", -14)
      .text(d => `b=${d.data.beta === Infinity ? "∞" : d.data.beta}`);
  
  
    d3.select("body").on("click", () => d3.select(".menu").remove());
  }
  
  