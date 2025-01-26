// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


  function confirmDelete() {
            // Show confirmation box
            const isConfirmed = confirm("Are you sure you want to delete this listing?");
            
            // If user clicks "OK", submit the form to delete
            if (isConfirmed) {
                document.getElementById("delete-form").submit();
            } else {
                // If user clicks "Cancel", do nothing (listing stays there)
                console.log("Listing was not deleted.");
            }
        }


        //<!-- Rating star  -->
        // Select all elements with the "i" tag inside the "stars" div
        const stars = document.querySelectorAll(".stars i");
        const ratingInput = document.getElementById("rating-input"); // Hidden input element
        let selectedRating = 0; // Variable to store the selected rating

        // Loop through the "stars" NodeList
        stars.forEach((star, index1) => {
            // Add an event listener that runs a function when the "click" event is triggered
        star.addEventListener("click", () => {
        // Loop through the "stars" NodeList again
        stars.forEach((star, index2) => {
            // Add the "active" class to the clicked star and any stars with a lower index
            // Remove the "active" class from any stars with a higher index
            if (index1 >= index2) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        });

        // Update the selected rating based on the clicked star's data-value
        selectedRating = parseInt(star.getAttribute("data-value"));
        ratingInput.value = selectedRating; // Set the value of the hidden input
        console.log(`Selected Rating: ${selectedRating}`);
    });
});


// Function to confirm and display the selected star count
/*
function confirmstars() {
    if (selectedRating > 0) {
        alert(`You selected a rating of ${selectedRating} stars.`);
    } else {
        alert("Please select a star rating before submitting.");
    }
}
    */