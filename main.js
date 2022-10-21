import './style.css'

let mainComponent = document.querySelector("#app");
let totalRespuestas = 0;
let arrayLoc = [];

const getAnswers = () => {
  let getCurrentAnswers = document.querySelectorAll(".input-normal");
  let currentAnswers = [].map.call(getCurrentAnswers, element => `${element.value}`);
  return currentAnswers;
}

const firstStep = () => {
  mainComponent.innerHTML =
    `
  <label class="large-label" for="cant-resp">
    Cantidad de respuestas:
    <input class="input-normal" type="number" placeholder="Ej: 20" required name="cant-resp">
  </label>
  <div class="d-flex justify-content-end mt-3">
    <button class="btn btn-back">Volver</button>
    <button class="btn btn-submit ms-3">Siguiente</button>
  </div>
  `

  document.querySelector(".btn-submit").addEventListener("click", () => {
    totalRespuestas = getAnswers();
    secondStep();
  });
  // document.querySelector(".btn-submit").addEventListener("keydown", (e) => {
  //   if (e.key == "Enter") {
  //     totalRespuestas = getAnswers();
  //     secondStep();
  //   }
  // });
}

const secondStep = () => {
  mainComponent.innerHTML = "";
  mainComponent.innerHTML =
    `
  <p class="title-label">Localizacion: (Tipo aperceptivo)</p>
  <label class="large-label" for="cant-resp">
    G
    <input class="input-normal" type="number" placeholder="Ej: Cantidad de respuestas" required name="loc-gral">
    D
    <input class="input-normal" type="number" placeholder="Ej: Cantidad de respuestas" required name="loc-det-us">
    Dd
    <input class="input-normal" type="number" placeholder="Ej: Cantidad de respuestas" required name="loc-det-in-us">
    S
    <input class="input-normal" type="number" placeholder="Ej: Cantidad de respuestas" required name="loc-esp-blan">
  </label>
  <div class="d-flex justify-content-end mt-3">
    <button class="btn btn-back">Volver</button>
    <button class="btn btn-submit ms-3">Siguiente</button>
  </div>
  `

  document.querySelector(".btn-submit").addEventListener("click", () => {
    arrayLoc = getAnswers();
    let totalLocs = Number(arrayLoc[0]) + Number(arrayLoc[1]) + Number(arrayLoc[2]) + Number(arrayLoc[3]);
    if (totalLocs != totalRespuestas) {
      console.log("Total respuestas no coinciden");
    } else {
      let porcG = (Number(arrayLoc[0]) / totalRespuestas * 100).toFixed(1);
      let porcD = (Number(arrayLoc[1]) / totalRespuestas * 100).toFixed(1);
      let porcDd = (Number(arrayLoc[2]) / totalRespuestas * 100).toFixed(1);
      let porcS = (Number(arrayLoc[3]) / totalRespuestas * 100).toFixed(1);
      console.log(`G: ${arrayLoc[0]}, D:${arrayLoc[1]}, Dd:${arrayLoc[2]}, S:${arrayLoc[3]}`);
      console.log(`Los porcentajes son: G: ${porcG}%, D: ${porcD}%, Dd: ${porcDd}%, S: ${porcS}%`);
      thirdStep(porcG, porcD, porcDd, porcS);
    }
  })
}

const thirdStep = (porcG, porcD, porcDd, porcS) => {
  mainComponent.innerHTML = "";
  mainComponent.innerHTML = '<p>Resultados: </p>';
  mainComponent.innerHTML += '<div class="d-flex flex-column">'
  // let testVar = 22.5;
  // Calculo G
  if (porcG >= 20 && porcG <= 30) {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">G:</b> ${porcG}% (Esperado)</div>`;
  } else {
    if (porcG < 20) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">G:</b> ${porcG}% (Disminuido)</div>`;
    } else if (porcG > 30) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">G:</b> ${porcG}% (Aumentado)</div>`;
    }
  }
  // Calculo D
  if (porcD >= 60 && porcD <= 70) {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">D:</b> ${porcD}% (Esperado)</div>`;
  } else {
    if (porcD < 60) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">D:</b> ${porcD}% (Disminuido)</div>`;
    } else if (porcD > 70) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">D:</b> ${porcD}% (Aumentado)</div>`;
    }
  }
  // Calculo Dd
  if (porcDd >= 0 && porcDd <= 10) {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">Dd:</b> ${porcDd}% (Esperado)</div>`;
  } else {
    if (porcDd > 10) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">Dd:</b> ${porcDd}% (Aumentado)</div>`;
    }
  }
  // Calculo S
  if (porcS <= 4) {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">S:</b> ${porcS}% (Esperado)</div>`;
  } else {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">S:</b> ${porcS}% (Aumentado)</div>`;
  }
  mainComponent.innerHTML += '</div>'
}


window.onload = firstStep;