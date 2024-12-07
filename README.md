# SimuladorAlgoritmoMiniMax
# Visualizador de Árbol con Minimax y Poda Alfa-Beta

Este proyecto es un visualizador interactivo para el algoritmo Minimax con poda alfa-beta, implementado con **D3.js**. Permite explorar cómo funciona el algoritmo de manera gráfica e intuitiva.

## Requisitos previos

Antes de ejecutar el programa, asegúrate de tener:

1. **Visual Studio Code (VS Code)**  

2. **Extensión Live Server**  
   Instálala en VS Code siguiendo estos pasos:
   - Abre la pestaña de extensiones (`Ctrl+Shift+X` o `Cmd+Shift+X` en macOS).
   - Busca "Live Server" e instálala.

3. **Navegador web actualizado**  
   Usa Chrome, Edge o Firefox para asegurar compatibilidad.

## Estructura del proyecto

- **`main.html`**: Archivo principal del proyecto. Carga el árbol visualizador y el código necesario.
- **`styles/styles.css`**: Archivo de estilos para definir la apariencia de la interfaz.
- **`scripts/minimax.js`**: Implementa la lógica del algoritmo Minimax con poda alfa-beta.
- **`scripts/render.js`**: Maneja la renderización gráfica del árbol.
- **`scripts/script.js`**: Archivo principal que coordina los eventos y las funcionalidades.

## Instrucciones para ejecutar el programa

1. **Descarga o clona este repositorio**
   - Usa el siguiente comando en la terminal:
     ```bash
     git clone https://github.com/KarlaAns/SimuladorAlgoritmoMiniMax
     ```
   - O descarga el archivo ZIP y extráelo.

2. **Abre el proyecto en VS Code**
   - Ve a **Archivo > Abrir carpeta** y selecciona la carpeta del proyecto.

3. **Inicia Live Server**
   - Haz clic derecho sobre el archivo `main.html` en VS Code.
   - Selecciona **"Open with Live Server"**.

4. **Abre el programa en tu navegador**
   - Se abrirá automáticamente una pestaña en tu navegador con el programa.
   - Si no sucede, accede manualmente a `http://127.0.0.1:5500/main.html` (el puerto puede variar).

## Funcionalidades principales

- Creación y edición dinámica de nodos en el árbol.
- Asignación de valores alfa y beta.
- Ejecución visual del algoritmo Minimax con poda alfa-beta.
- Representación gráfica interactiva del proceso.
