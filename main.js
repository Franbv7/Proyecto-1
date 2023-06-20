"use strict";

//  PRUEBA 1

/* fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    for (let i = 0; i < objetosJson.length; i++) {
      let question = objetosJson[i].question;
      let answers = objetosJson[i].answers;
      let correctAnswer = objetosJson[i].correct;

      let container = document.createElement("section");

      let questionElement = document.createElement("p");
      questionElement.textContent = question;
      container.appendChild(questionElement);

      let answersList = document.createElement("ul");
      for (let j = 0; j < answers.length; j++) {
        let answerItem = document.createElement("li");
        answerItem.textContent = answers[j];
        answersList.appendChild(answerItem);
      }
      container.appendChild(answersList);

      let correctAnswerElement = document.createElement("p");
      correctAnswerElement.textContent = "Correct answer: " + correctAnswer;
      container.appendChild(correctAnswerElement);

      document.body.appendChild(container);
    }
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  }); */

//  PRUEBA 2

/* fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    let indicePreguntasActual = 0;

    function mostrarPregunta(index) {
      let pregunta = objetosJson[index].question;
      let respuestas = objetosJson[index].answers;

      let elementoPregunta = document.getElementById("pregunta");
      elementoPregunta.textContent = pregunta;

      let listaRespuestas = document.getElementById("respuestas");
      listaRespuestas.innerHTML = "";

      for (let i = 0; i < respuestas.length; i++) {
        let answerItem = document.createElement("li");
        answerItem.textContent = respuestas[i];
        listaRespuestas.appendChild(answerItem);
      }
      let contadorPreguntas = document.getElementById("contadorPreguntas");
      contadorPreguntas.textContent = index + 1 + " de " + objetosJson.length;

      let btnSiguiente = document.getElementById("btnSiguiente");
      btnSiguiente.disabled = index === 49;
    }

    function preguntaSiguiente() {
      indicePreguntasActual++;
      if (indicePreguntasActual >= objetosJson.length) {
        indicePreguntasActual = 0;
      }
      mostrarPregunta(indicePreguntasActual);
    }

    // Mostrar la primera pregunta al cargar la página
    mostrarPregunta(indicePreguntasActual);

    // Agregar eventos a los botones de navegación
    document
      .getElementById("btnSiguiente")
      .addEventListener("click", preguntaSiguiente);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  }); */

//  PRUEBA 3 (fallida)

/* fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    let indicePreguntasActual = 0;
    let respuestaSeleccionada = null;

    // Función para mostrar una pregunta en la página
    function mostrarPregunta(index) {
      let elementoPregunta = document.getElementById("pregunta");
      let elementoRespuesta = document.getElementById("respuestas");

      // Obtener la pregunta y las respuestas del JSON
      let pregunta = objetosJson[index].question;
      let respuestas = objetosJson[index].answers;

      // Actualizar el elemento de la pregunta en la página
      elementoPregunta.textContent = pregunta;

      // Limpiar las respuestas anteriores
      elementoRespuesta.innerHTML = "";

      // Crear elementos de respuesta para cada respuesta en el JSON
      for (let i = 0; i < respuestas.length; i++) {
        let respuesta = respuestas[i];
        let li = document.createElement("li");

        // Agregar una clase adicional para la respuesta correcta
        if (respuesta === objetosJson[index].correct) {
          li.classList.add("correct");
        }

        li.textContent = respuesta;

        // Agregar un evento de clic para manejar la selección de respuesta
        li.addEventListener("click", function () {
          // Limpiar la selección anterior
          let seleccionAnterior = elementoRespuesta.querySelector(".selected");
          if (seleccionAnterior) {
            seleccionAnterior.classList.remove("selected");
          }

          // Marcar la respuesta seleccionada
          this.classList.add("selected");
          respuestaSeleccionada = this.textContent;
        });

        // Agregar la respuesta al elemento de respuestas en la página
        elementoRespuesta.appendChild(li);
      }
    }

    // Función para mostrar la pregunta actual y actualizar el contador de preguntas
    function mostrarPreguntaActual() {
      let questionCounterElement = document.getElementById("contadorPreguntas");

      // Actualizar el contador de preguntas en la página
      questionCounterElement.textContent =
        indicePreguntasActual + 1 + " de " + objetosJson.length;

      // Mostrar la pregunta actual
      mostrarPregunta(indicePreguntasActual);
    }

    // Función para pasar a la siguiente pregunta
    function goToNextQuestion() {
      if (respuestaSeleccionada !== null) {
        // Verificar si hay más preguntas
        if (indicePreguntasActual < objetosJson.length - 1) {
          indicePreguntasActual++;
          respuestaSeleccionada = null;
          mostrarPreguntaActual();
        } else {
          // El quiz ha terminado
          alert("¡Quiz completado!");
        }
      } else {
        alert(
          "Por favor, selecciona una respuesta antes de pasar a la siguiente pregunta."
        );
      }
    }

    // Función para volver a la pregunta anterior
    function goToPreviousQuestion() {
      if (indicePreguntasActual > 0) {
        indicePreguntasActual--;
        respuestaSeleccionada = null;
        mostrarPreguntaActual();
      }
    }

    // Asociar eventos a los botones de navegación
    document
      .getElementById("btnSiguiente")
      .addEventListener("click", goToNextQuestion);
    document
      .getElementById("btnAnterior")
      .addEventListener("click", goToPreviousQuestion);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  }); */

// PRUEBA XELA

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

//  <script src="https://gist.github.com/bertez/2528edb2ab7857dae29c39d1fb669d31.js"></script>;
