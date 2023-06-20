"use strict";

fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    let indicePreguntasActual = 0;
    let contadorAciertos = 0;
    let respuestaSeleccionada = false;
    let curiosidadMostrada = false; //Si se muestra o no la curiosidad
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
            } else {
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent =
                "La respuesta correcta es: " + respuestaCorrecta;
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
      btnSiguiente.disabled = !respuestaSeleccionada;
    }

    function preguntaSiguiente() {
      if (!respuestaSeleccionada) {
        return; //Si no selecciona ninguna respuesta
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
        "Chris Pratt apparently stole his Star-Lord costume from the set of Guardians of the Galaxy. He plans to wear it to children's hospitals to entertain sick children.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "During the filming of the scene where Hulk grabs Loki and smashes him on the ground in The Avengers, Tom Hiddleston's head was swapped with a stuntman's head to achieve the effect.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Tom Holland found out he got the role of Spider-Man through Instagram. He saw Marvel's post about it and thought it was a joke at first.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "The Spider-Man suit in Spider-Man: Homecoming has 26 web wings under the arms, paying homage to the character's iconic comic book design.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Dave Bautista had to sit in a sauna for 45 minutes to put on the Drax makeup and prosthetics for Guardians of the Galaxy. The process took about 4 hours in total.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Scarlett Johansson's fight scenes as Black Widow are so intense that she sometimes mistakenly hits her co-stars during filming.",
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
