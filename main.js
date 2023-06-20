"use strict";

fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    let indicePreguntasActual = 0;
    let contadorAciertos = 0;
    let respuestaSeleccionada = false;

    function mostrarPregunta(index) {
      let pregunta = objetosJson[index].question;
      let respuestas = objetosJson[index].answers;
      let respuestaCorrecta = objetosJson[index].correct;

      let elementoPregunta = document.getElementById("pregunta");
      elementoPregunta.textContent = pregunta;

      let listaRespuestas = document.getElementById("respuestas");
      listaRespuestas.innerHTML = "";

      for (let i = 0; i < respuestas.length; i++) {
        let answerItem = document.createElement("li");
        answerItem.textContent = respuestas[i];

        listaRespuestas.appendChild(answerItem);

        answerItem.addEventListener("click", () => {
          if (!respuestaSeleccionada) {
            respuestaSeleccionada = true;
            if (respuestas[i] === respuestaCorrecta) {
              contadorAciertos++;
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent = "¡Respuesta correcta!";
              answerItem.style.backgroundColor = "green";
            } else {
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent =
                "La respuesta correcta es: " + respuestaCorrecta;
              answerItem.style.backgroundColor = "red";
            }
            mostrarBotonSiguiente();
          }
        });
      }

      let contadorPreguntas = document.getElementById("contadorPreguntas");
      contadorPreguntas.textContent =
        "Pregunta " + (index + 1) + " de " + objetosJson.length;

      let respuestaCorrectaElement =
        document.getElementById("respuestaCorrecta");
      respuestaCorrectaElement.textContent = "";

      let contadorAciertosElement = document.getElementById("contadorAciertos");
      contadorAciertosElement.textContent = "Aciertos: " + contadorAciertos;

      mostrarBotonSiguiente();
    }

    function mostrarBotonSiguiente() {
      let btnSiguiente = document.getElementById("btnSiguiente");
      btnSiguiente.style.display = respuestaSeleccionada ? "block" : "none";
    }

    function preguntaSiguiente() {
      respuestaSeleccionada = false;
      indicePreguntasActual++;
      if (indicePreguntasActual >= objetosJson.length) {
        indicePreguntasActual = 0;
        let contenedorQuiz = document.getElementById("contenedor-quiz");
        contenedorQuiz.innerHTML =
          "<h2>¡Has finalizado!</h2><p>Aciertos: " +
          contadorAciertos +
          " de " +
          objetosJson.length +
          "</p>";
        return;
      }

      mostrarPregunta(indicePreguntasActual);
    }

    let contadorPreguntas = document.getElementById("contadorPreguntas");
    contadorPreguntas.textContent =
      "Pregunta " + (indicePreguntasActual + 1) + " de " + objetosJson.length;

    let contadorAciertosElement = document.getElementById("contadorAciertos");
    contadorAciertosElement.textContent = "Aciertos: " + contadorAciertos;

    let btnSiguiente = document.getElementById("btnSiguiente");
    btnSiguiente.addEventListener("click", preguntaSiguiente);

    mostrarPregunta(indicePreguntasActual);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });
