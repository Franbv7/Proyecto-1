"use strict";

fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    let indicePreguntasActual = 0;
    let contadorAciertos = 0;
    let respuestaSeleccionada = false;
    let curiosidadMostrada = false;
    let curiosidadIndex = -1;

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
        let answerButton = document.createElement("button");
        answerButton.textContent = respuestas[i];
        answerItem.appendChild(answerButton);
        listaRespuestas.appendChild(answerItem);

        answerButton.addEventListener("click", () => {
          if (!respuestaSeleccionada) {
            respuestaSeleccionada = true;
            if (respuestas[i] === respuestaCorrecta) {
              contadorAciertos++;
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent = "¡Respuesta correcta!";
              answerItem.style.backgroundColor = "#598e39";
            } else {
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent =
                "La respuesta correcta es: " + respuestaCorrecta;
              answerItem.style.backgroundColor = "#a93232";
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
      respuestaCorrectaElement.textContent = ""; // Limpiar respuesta correcta previa

      let contadorAciertosElement = document.getElementById("contadorAciertos");
      contadorAciertosElement.textContent = "Aciertos: " + contadorAciertos;

      mostrarBotonSiguiente();
      mostrarCuriosidad(index);
    }

    function mostrarBotonSiguiente() {
      let btnSiguiente = document.getElementById("btnSiguiente");
      // btnSiguiente.style.display = respuestaSeleccionada ? "block" : "none";
      btnSiguiente.disabled = !respuestaSeleccionada;
    }

    function preguntaSiguiente() {
      if (!respuestaSeleccionada) {
        return;
      }
      respuestaSeleccionada = false;
      indicePreguntasActual++;
      if (indicePreguntasActual >= objetosJson.length) {
        indicePreguntasActual = 0;
        // Si se alcanza el final de las preguntas
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

    function mostrarCuriosidad(preguntaIndex) {
      let curiosidades = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Tom Berenger’s lifelike scar required three hours of makeup work every day of shooting.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Although BB-8 is a machine, he has masculine programming, which means he is referred to with he/him pronouns.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "George Lucas gave his (conditional) blessing",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Spielberg directed all Indiana Jones films but the original concept was from George Lucas.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "V was played by four different actors.",
      ];

      let btnCuriosidad = document.getElementById("btnCuriosidad");
      let curiosidadElemento = document.getElementById("curiosidad");

      if (
        preguntaIndex === 9 ||
        preguntaIndex === 19 ||
        preguntaIndex === 29 ||
        preguntaIndex === 39 ||
        preguntaIndex === 49
      ) {
        btnCuriosidad.style.display = "block";
      } else {
        btnCuriosidad.style.display = "none";
      }

      if (curiosidadIndex === preguntaIndex && curiosidadMostrada) {
        curiosidadElemento.textContent = curiosidades[preguntaIndex] || "";
        curiosidadElemento.style.display = "block";
      } else {
        curiosidadElemento.style.display = "none";
        curiosidadElemento.textContent = "";
      }
    }

    mostrarPregunta(indicePreguntasActual);

    let btnSiguiente = document.getElementById("btnSiguiente");
    btnSiguiente.addEventListener("click", preguntaSiguiente);

    let btnCuriosidad = document.getElementById("btnCuriosidad");
    btnCuriosidad.addEventListener("click", () => {
      curiosidadIndex = indicePreguntasActual;
      curiosidadMostrada = !curiosidadMostrada;
      mostrarCuriosidad(indicePreguntasActual);
    });
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });
