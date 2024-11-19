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

function nextStep(step) {
  // Get the current step element
  const currentStep = document.getElementById(`step${step - 1}`);
  
  // Log the current step for debugging
  console.log('Current Step:', currentStep);

  // Get all input fields in the current step
  const inputs = currentStep.querySelectorAll("input, select");

  // Check if all inputs are valid
  let allValid = true;
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      allValid = false;
      input.reportValidity(); // Show validation message
    }
  });

  // If all inputs are valid, proceed to the next step
  if (allValid) {
    console.log(`Step ${step - 1} is valid. Proceeding to step ${step}`);
    // Capture data from the current step
    captureData(step - 1);
    // Move to the next step
    showStep(step);
  } else {
    console.log(`Step ${step - 1} is not valid.`);
  }
}

function previousStep(stepNumber) {
  showStep(stepNumber);
}

function captureData(stepNumber) {
  // Capture data from the current step inputs
  const step = document.getElementById(`step${stepNumber}`);
  const inputs = step.querySelectorAll("input, select"); // Ensure we include select
  inputs.forEach(input => {
    formData[input.name] = input.value;
  });
}

function submitForm() {
    // Capture data from the final step
    captureData(3);

    // Define your Zapier webhook URL
    const url = "https://hooks.zapier.com/hooks/catch/20714053/25ji51n/"

    // Prepare the data for submission
    const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        streetAddress: formData.streetAddress,
        mobilePhone: formData.mobilePhone,
        age: formData.age,
        dob: formData.dob,
        businessType: formData.businessType,
        referralSource: formData.referralSource,
        employmentRole: formData.employmentRole
    };

    // Send the data via fetch
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Redirect to submit.html upon successful submission
            window.location.href = "submit.html";
        } else {
            throw new Error("Network response was not ok.");
        }
    })
    .catch(error => {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form. Please try again.");
    });
}



// Initially show the first step
showStep(1);
