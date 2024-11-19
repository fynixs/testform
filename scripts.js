// Object to store form data
const formData = {};

function showStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll(".form-step").forEach(step => {
    step.style.display = "none";
  });
  // Show the selected step
  document.getElementById(`step${stepNumber}`).style.display = "block";
}

function nextStep(stepNumber) {
  captureData(stepNumber - 1); // Capture data from the previous step
  showStep(stepNumber);
}

function previousStep(stepNumber) {
  showStep(stepNumber);
}

function captureData(stepNumber) {
  const step = document.getElementById(`step${stepNumber}`);
  const inputs = step.querySelectorAll("input, select");

  inputs.forEach(input => {
    if (input.type === "radio") {
      // Only capture the selected radio button
      if (input.checked) {
        formData[input.name] = input.value;
      }
    } else {
      formData[input.name] = input.value;
    }
  });
}
console.log("Employment Role:", formData.employmentRole); // Check selected role



function submitForm() {
  captureData(3); // Capture final step data

  console.log("Form Data:", formData); // Log formData to verify values

  const url = "https://hooks.zapier.com/hooks/catch/20714053/25ji51n/";
  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    streetAddress: formData.streetAddress,
    mobilePhone: formData.mobilePhone,
    age: formData.age,
    dob: formData.dob,
    businessType: formData.businessType,
    referralSource: formData.referralSource,
    employmentRole: formData.employmentRole
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(response => {
      if (response.ok) {
          window.location.href = "submit.html";
      } else {
          throw new Error("Network response was not ok.");
      }
  })
  .catch(error => {
      console.error("Error submitting form:", error);
});

  
}



// Initially show the first step
showStep(1);
