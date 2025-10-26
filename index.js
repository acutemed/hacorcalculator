// Updated HACOR Score Calculator
// Based on Duan et al. 2022 - Critical Care 26:196

// Calculate Updated HACOR Score
function handleCalculate() {
  // Clear previous warnings
  hideWarning();
  
  // Get Original HACOR Components
  const heartRateElement = document.getElementById('heartRate');
  const pHElement = document.getElementById('pH');
  const glasgowElement = document.getElementById('glasgow');
  const pao2Fio2Element = document.getElementById('pao2Fio2');
  const rrElement = document.getElementById('rr');
  
  // Validate that all fields are filled
  if (!heartRateElement.value || !pHElement.value || !glasgowElement.value || 
      !pao2Fio2Element.value || !rrElement.value) {
    showWarning('Please fill in all the original HACOR components (Heart Rate, pH, Glasgow, PaO₂/FiO₂, and Respiratory Rate).');
    return;
  }
  
  // Get points from select dropdowns
  const heartRatePoints = Number(heartRateElement.value);
  const pHPoints = Number(pHElement.value);
  const glasgowPoints = Number(glasgowElement.value);
  const pao2Fio2Points = Number(pao2Fio2Element.value);
  const rrPoints = Number(rrElement.value);
  
  // Calculate Original HACOR Score
  const originalHacorScore = heartRatePoints + pHPoints + glasgowPoints + pao2Fio2Points + rrPoints;
  
  // Get Baseline Variables
  const sofaValue = parseFloat(document.getElementById('sofa').value) || 0;
  const pneumoniaChecked = document.getElementById('pneumonia').checked;
  const cpeChecked = document.getElementById('cpe').checked;
  const ardsChecked = document.getElementById('ards').checked;
  const immunosuppressionChecked = document.getElementById('immunosuppression').checked;
  const septicShockChecked = document.getElementById('septicShock').checked;
  
  // Calculate Baseline Score Components
  // Formula: Original HACOR + 0.5 × SOFA + 2.5 (pneumonia) - 4 (CPE) + 3 (ARDS) + 1.5 (immunosuppression) + 2.5 (septic shock)
  const sofaPoints = sofaValue * 0.5;
  const pneumoniaPoints = pneumoniaChecked ? 2.5 : 0;
  const cpePoints = cpeChecked ? -4 : 0;
  const ardsPoints = ardsChecked ? 3 : 0;
  const immunosuppressionPoints = immunosuppressionChecked ? 1.5 : 0;
  const septicShockPoints = septicShockChecked ? 2.5 : 0;
  
  // Calculate Updated HACOR Score
  const updatedHacorScore = originalHacorScore + sofaPoints + pneumoniaPoints + cpePoints + 
                            ardsPoints + immunosuppressionPoints + septicShockPoints;
  
  // Round to 1 decimal place
  const finalScore = Math.round(updatedHacorScore * 10) / 10;
  
  // Display Result
  displayResult(finalScore);
}

// Display Result with Risk Stratification
function displayResult(score) {
  const resultSection = document.getElementById('resultSection');
  const scoreElement = document.getElementById('hacorScore');
  const riskElement = document.getElementById('riskLevel');
  
  scoreElement.textContent = score.toFixed(1);
  
  // Determine Risk Level based on score
  let riskText = '';
  let riskPercentage = '';
  
  if (score <= 7) {
    riskText = 'Low Risk';
    riskPercentage = '12.4% NIV Failure Rate';
  } else if (score <= 10.5) {
    riskText = 'Moderate Risk';
    riskPercentage = '38.2% NIV Failure Rate';
  } else if (score <= 14) {
    riskText = 'High Risk';
    riskPercentage = '67.1% NIV Failure Rate';
  } else {
    riskText = 'Very High Risk';
    riskPercentage = '83.7% NIV Failure Rate';
  }
  
  riskElement.innerHTML = `<strong>${riskText}</strong> • ${riskPercentage}`;
  
  // Show result section with animation
  resultSection.style.display = 'block';
  
  // Scroll to result
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Clear All Fields
function handleClear() {
  // Clear Original HACOR Components
  document.getElementById('heartRate').selectedIndex = 0;
  document.getElementById('pH').selectedIndex = 0;
  document.getElementById('glasgow').selectedIndex = 0;
  document.getElementById('pao2Fio2').selectedIndex = 0;
  document.getElementById('rr').selectedIndex = 0;
  
  // Clear Baseline Variables
  document.getElementById('sofa').value = '';
  document.getElementById('pneumonia').checked = false;
  document.getElementById('cpe').checked = false;
  document.getElementById('ards').checked = false;
  document.getElementById('immunosuppression').checked = false;
  document.getElementById('septicShock').checked = false;
  
  // Hide result and warning
  document.getElementById('resultSection').style.display = 'none';
  hideWarning();
}

// Warning Message Functions
function showWarning(message) {
  const warningElement = document.getElementById('warningMessage');
  warningElement.textContent = message;
  warningElement.style.display = 'block';
  
  // Scroll to warning
  warningElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideWarning() {
  const warningElement = document.getElementById('warningMessage');
  warningElement.style.display = 'none';
}

// SOFA Score Calculator Modal Functions
function openSofaModal() {
  const modal = document.getElementById('sofaModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Reset SOFA fields to current SOFA value if exists
  const currentSofa = document.getElementById('sofa').value;
  if (!currentSofa) {
    resetSofaCalculator();
  }
  
  // Calculate initial SOFA score
  calculateSofaScore();
}

function closeSofaModal() {
  const modal = document.getElementById('sofaModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function resetSofaCalculator() {
  document.getElementById('sofaResp').selectedIndex = 0;
  document.getElementById('sofaCoag').selectedIndex = 0;
  document.getElementById('sofaLiver').selectedIndex = 0;
  document.getElementById('sofaCardio').selectedIndex = 0;
  document.getElementById('sofaCns').selectedIndex = 0;
  document.getElementById('sofaRenal').selectedIndex = 0;
  calculateSofaScore();
}

function calculateSofaScore() {
  const respScore = Number(document.getElementById('sofaResp').value);
  const coagScore = Number(document.getElementById('sofaCoag').value);
  const liverScore = Number(document.getElementById('sofaLiver').value);
  const cardioScore = Number(document.getElementById('sofaCardio').value);
  const cnsScore = Number(document.getElementById('sofaCns').value);
  const renalScore = Number(document.getElementById('sofaRenal').value);
  
  const totalSofa = respScore + coagScore + liverScore + cardioScore + cnsScore + renalScore;
  
  document.getElementById('sofaResult').textContent = totalSofa;
  
  return totalSofa;
}

function applySofaScore() {
  const sofaScore = calculateSofaScore();
  document.getElementById('sofa').value = sofaScore;
  closeSofaModal();
}

// Add event listeners for SOFA calculator real-time updates
document.addEventListener('DOMContentLoaded', function() {
  // SOFA calculator inputs
  const sofaInputs = [
    'sofaResp', 'sofaCoag', 'sofaLiver', 
    'sofaCardio', 'sofaCns', 'sofaRenal'
  ];
  
  sofaInputs.forEach(inputId => {
    const element = document.getElementById(inputId);
    if (element) {
      element.addEventListener('change', calculateSofaScore);
    }
  });
  
  // Close modal when clicking outside
  const modal = document.getElementById('sofaModal');
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeSofaModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeSofaModal();
    }
  });
});

// Prevent form submission on Enter key
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
    event.preventDefault();
    handleCalculate();
  }
});

// Add input validation for SOFA score field
document.addEventListener('DOMContentLoaded', function() {
  const sofaInput = document.getElementById('sofa');
  if (sofaInput) {
    sofaInput.addEventListener('input', function() {
      let value = parseFloat(this.value);
      if (value < 0) this.value = 0;
      if (value > 24) this.value = 24;
    });
  }
});
