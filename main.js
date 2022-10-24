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
    // fourthStep();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      totalRespuestas = getAnswers();
      secondStep();
      // fourthStep();
    }
  });
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
  mainComponent.innerHTML += `
  <div class="d-flex justify-content-end mt-3">
    <button class="btn btn-back">Volver</button>
    <button class="btn btn-submit ms-3">Siguiente</button>
  </div>`
  document.querySelector(".btn-submit").addEventListener("click", () => {
    totalRespuestas = getAnswers();
    fourthStep();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      totalRespuestas = getAnswers();
      fourthStep();
    }
  });
}

let fPorciento, fPorcientoExt = 0;
const fourthStep = () => {
  mainComponent.innerHTML = "";
  mainComponent.innerHTML =
    `
  <p class="title-label">Determinantes: <span></span></p>
  <label class="large-label" for="cant-resp">
    Forma (F pura):
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="F" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Movimiento:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="M" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="FM" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="Fm" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="Mf" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="m" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Color:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="FC" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="CF" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="C" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Color acromatico:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="FC'" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="C'F" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="C'" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Claroscuro:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="c" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="K" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="k" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Claroscuro de superficie o textura:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="Fc" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="cF" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Claroscuro de tridimensionalidad o profundidad:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="FK" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="KF" name="">
      </div>
    </div>
  </label>
  <label class="large-label" for="cant-resp">
    Claroscuro de tridimensionalidad proyectada en un plano bidimensional:
    <div class="row">
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="Fk" name="">
      </div>
      <div class="col-3">
        <input class="input-normal" type="number" placeholder="kF" name="">
      </div>
    </div>
  </label>
  <div class="d-flex justify-content-end mt-3">
    <button class="btn btn-back">Volver</button>
    <button class="btn btn-submit ms-3">Siguiente</button>
  </div>
  `
  let getTitle = document.querySelector(".title-label span");

  let auxArray = [];

  const SumaDeterminantes = () => {
    let totalSum = 0;
    let saveArray = getAnswers();
    let modifiedArr = saveArray.map(function (el) {
      return Number(el);
    });
    auxArray = modifiedArr;
    modifiedArr = modifiedArr.filter(function (val) {
      return val !== 0;
    });
    modifiedArr.forEach(element => {
      totalSum = (totalSum + element);
    });
    getTitle.innerHTML = totalSum;
    setTimeout(function(){
      if (confirm('Estas seguro que deseas continuar con estos valores?')) {
        // Save it!
        console.log(auxArray);
        fPorciento = ((auxArray[0]/totalSum)*100).toFixed(1);
        fPorcientoExt = (((auxArray[0])+(auxArray[2]+auxArray[3]+auxArray[6]+auxArray[9]+auxArray[15]+auxArray[17]+auxArray[19]))/totalSum*100).toFixed(1);
        fifthStep();
      } else {
        // Do nothing!
      }
    }, 2000);
  }

  document.querySelector(".btn-submit").addEventListener("click", () => {
    SumaDeterminantes();
  });
  // document.addEventListener("keydown", (e) => {
  //   if (e.key == "Enter") {

  //   }
  // });
}

const fifthStep = () => {
  mainComponent.innerHTML = "";
  mainComponent.innerHTML = '<p>Resultados: </p>';
  mainComponent.innerHTML += '<div class="d-flex flex-column">';
  if (fPorciento >= 35 && fPorciento <= 50) {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">F%:</b> ${fPorciento}% (Esperado)</div>`;
  } else {
    if (fPorciento < 35) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">F%:</b> ${fPorciento}% (Impulsividad)</div>`;
    } else if (fPorciento > 50) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">F%:</b> ${fPorciento}% (Inhibicion y Rigidez)</div>`;
    }
  }
  if (fPorcientoExt >= 80 && fPorcientoExt <= 95) {
    mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">Fext%:</b> ${fPorcientoExt}% (Esperado)</div>`;
  } else {
    if (fPorcientoExt < 80) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">Fext%:</b> ${fPorcientoExt}% (Control de los impulsos menor de lo esperado)</div>`;
    } else if (fPorcientoExt > 95) {
      mainComponent.innerHTML += `<div class="d-flex"><b class="me-1">Fext%:</b> ${fPorcientoExt}% (Control de los impulsos superior a lo esperado)</div>`;
    }
  }
}


window.onload = firstStep;