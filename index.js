const WARNING_MESSAGE_DURATION = 5000;

function handleCalculateHacorScore() {
  const heartRateElement = document.getElementById('heartRate');
  const heartRatePoints = Number(heartRateElement.selectedIndex === 0 ? 0 : heartRateElement.querySelectorAll('option')[heartRateElement.selectedIndex].value);

  const pHElement = document.getElementById('pH');
  const pHPoints = Number(pHElement.selectedIndex === 0 ? 0 : pHElement.querySelectorAll('option')[pHElement.selectedIndex].value);

  const glasgowElement = document.getElementById('glasgow');
  const glasgowPoints = Number(glasgowElement.selectedIndex === 0 ? 0 : glasgowElement.querySelectorAll('option')[glasgowElement.selectedIndex].value);

  const pao2Fio2Element = document.getElementById('pao2Fio2');
  const pao2Fio2Points = Number(pao2Fio2Element.selectedIndex === 0 ? 0 : pao2Fio2Element.querySelectorAll('option')[pao2Fio2Element.selectedIndex].value);

  const rrElement = document.getElementById('rr');
  const rrPoints = Number(rrElement.selectedIndex === 0 ? 0 : rrElement.querySelectorAll('option')[rrElement.selectedIndex].value);

  // Extract values from input boxes for SOFA score, Diagnosis of Pneumonia, Diagnosis of CPE, Pulmonary ARDS, Immunosuppression, and Septic Shock
  const sofaPoints = parseFloat(document.getElementById('sofa').value) || 0;
  const pneumoniaPoints = document.getElementById('pneumonia').checked ? 2.5 : 0;
  const cpePoints = document.getElementById('cpe').checked ? -4 : 0;
  const ardsPoints = document.getElementById('ards').checked ? 3 : 0;
  const immunosuppressionPoints = document.getElementById('immunosuppression').checked ? 1.5 : 0;
  const septicShockPoints = document.getElementById('septicShock').checked ? 2.5 : 0;

  // Calculate the updated HACOR score
  const updatedHacorScore = heartRatePoints + pHPoints + glasgowPoints + pao2Fio2Points + rrPoints + sofaPoints + pneumoniaPoints + cpePoints + ardsPoints + immunosuppressionPoints + septicShockPoints;

  // Display the updated HACOR score
  document.getElementById('hacorScore').innerHTML = updatedHacorScore;
}

