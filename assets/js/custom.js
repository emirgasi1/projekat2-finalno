$(document).ready(function() {
  // Initialize SPApp
  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({pageNotFound : 'error_404'}); // initialize

// Define routes
app.route({
  view: 'view_1',
  onCreate: function() {
    /* mera strength */
    document.getElementById("subject").addEventListener("input", function () {
      const strengthIndicator = document.getElementById("password-strength");
      const password = this.value;
      let strength = 0;

      if (password.match(/[a-z]/)) {
        strength += 1;
      }
      if (password.match(/[A-Z]/)) {
        strength += 1;
      }
      if (password.match(/[0-9]/)) {
        strength += 1;
      }
      if (password.match(/[$@#!%*?&]/)) {
        strength += 1;
      }

      strengthIndicator.style.width = strength * 25 + "%";

      if (strength === 0) {
        strengthIndicator.className = "";
        strengthIndicator.style.width = "0%";
      } else if (strength === 1) {
        strengthIndicator.className = "strength-weak";
      } else if (strength === 2) {
        strengthIndicator.className = "strength-medium";
      } else if (strength >= 3) {
        strengthIndicator.className = "strength-strong";
      }
    });

    $("#formacijela").validate({
      rules: {
        prvoime: "required",
        lastnejm: "required",
        email: {
          required: true,
          email: true
        },
        subject: "required",
        password: {
          required: true,
          minlength: 8
        }
      },
      messages: {
        prvoime: "Please enter your first name",
        lastnejm: "Please enter your last name",
        email: {
          required: "Please enter your email address",
          email: "Please enter a valid email address"
        },
        subject: "Please enter a subject",
        password: {
          required: "Please enter a password",
          minlength: "Your password must be at least 8 characters long"
        }
      },
      submitHandler: function(form) {
        // Simulating form submission
        toastr.success('Form submitted successfully!');
        form.reset(); // Reset the form
      },
      invalidHandler: function(event, validator) {
        // Show an error toastr message
        toastr.error('Form contains errors. Please fix them.');
      }
    });

    // Fetch weather data
    const apiKey = '5331a1a4e6e3f511efb75ef5f86dc1d3';
    const city = 'London'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
          <p>Temperature: ${data.main.temp} K</p>
          <p>Description: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity} %</p>
        `;
      })
      .catch(error => {
        // Handle any errors
        console.error('There was a problem with the fetch operation:', error);
      });

    // jQuery document ready
    $(document).ready(function() {
      $('#togglebutton').click(function() {
        $(this).toggleClass('active');
      });
    });
  }
});

  app.route({
    view: 'view_2',
    load: 'view_2.html',
    onCreate: function() {
      $(document).ready(function() {
        // Get the modal
        var modal = document.getElementById("myModal");
    
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
    
        // Get all thumbnail images
        var images = document.querySelectorAll('.hranakanta .thumbnail');
    
        // Loop through each thumbnail image
        images.forEach(image => {
            // Add click event listener to open modal
            image.onclick = function() {
                modal.style.display = "block"; // Display modal
                modalImg.src = this.src; // Set modal image src to clicked image src
                captionText.innerHTML = this.alt; // Set caption to clicked image alt text
            }
        });
    
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none"; // Hide modal
        }
    });
       // Fetch weather data for London
       document.addEventListener('DOMContentLoaded', function() {
        var apiKey = '5331a1a4e6e3f511efb75ef5f86dc1d3'; 
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=' + apiKey;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                var weatherData = document.getElementById('weatherData');
                weatherData.innerHTML = `
                    <p>Location: ${data.name}</p>
                    <p>Weather: ${data.weather[0].main}</p>
                    <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                var weatherData = document.getElementById('weatherData');
                weatherData.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
            });
    });
    }
  });
  app.route({
    view: 'view_3',
    load: 'view_3.html',
    onCreate: function() {
      // Fetch and display data in view_3
      const sektor2 = document.getElementById('sektor2');

      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          data.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'container';

            const izborDiv = document.createElement('div');
            izborDiv.className = 'izbor';
            izborDiv.innerHTML = `<h2>${category.category}</h2>`;
            categoryDiv.appendChild(izborDiv);

            const hranakantaDiv = document.createElement('div');
            hranakantaDiv.className = 'hranakanta';
            categoryDiv.appendChild(hranakantaDiv);

            category.items.forEach(item => {
              const itemDiv = document.createElement('div');
              itemDiv.className = 'slike2';
              itemDiv.innerHTML = `
                <img src="${item.image}">
                <div class="narudzbatekst1">
                  <a href="#"><p>Dodaj u Narudzbu</p></a>
                </div>
                <div class="cijena1">
                  <p>${item.price}</p>
                </div>
                <div class="narudzbatekst11">
                  <p>${item.description}</p>
                </div>
                <div class="actions">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
                </div>
              `;
              hranakantaDiv.appendChild(itemDiv);

              itemDiv.querySelector('.edit-btn').addEventListener('click', function() {
                const newText = window.prompt('Enter new text:', item.description);
                if (newText !== null) {
                  item.description = newText;
                  itemDiv.querySelector('.narudzbatekst11 p').textContent = newText;
                }
              });

              itemDiv.querySelector('.delete-btn').addEventListener('click', function() {
                const confirmDelete = window.confirm('Are you sure you want to delete this item?');
                if (confirmDelete) {
                  hranakantaDiv.removeChild(itemDiv);
                }
              });
            });

            sektor2.appendChild(categoryDiv);
          });
        });

      // Toggle short and full text functionality
      const shortText = document.getElementById('shortText');
      const fullText = document.getElementById('fullText');
      const viewMoreBtn = document.getElementById('viewMoreBtn');

      viewMoreBtn.addEventListener('click', function() {
        if (shortText.style.display === 'none') {
          shortText.style.display = 'inline';
          fullText.style.display = 'none';
          viewMoreBtn.textContent = 'View More';
        } else {
          shortText.style.display = 'none';
          fullText.style.display = 'inline';
          viewMoreBtn.textContent = 'View Less';
        }
      });
    }
  });

  app.route({
    view: 'view_4',
    load: 'view_4.html',
    onCreate: function() {
      // Get all accordion items
      const accordionItems = document.querySelectorAll('.accordion-item');

      // Loop through each accordion item
      accordionItems.forEach(item => {
        // Add click event listener to the header of each accordion item
        item.querySelector('.accordion-item-header').addEventListener('click', function() {
          // Toggle the active class to show/hide the content
          this.nextElementSibling.classList.toggle('active');
        });
      });
    }
  });


  // Run app
  app.run();

  // Theme switcher functionality
  const body = document.body;
  const themeSwitcher = document.getElementById('themeSwitcher');

  themeSwitcher.addEventListener('click', function() {
      if (body.classList.contains('default-theme')) {
          body.classList.remove('default-theme');
          body.classList.add('dark-theme');
          themeSwitcher.textContent = 'White Mode';
      } else {
          body.classList.remove('dark-theme');
          body.classList.add('default-theme');
          themeSwitcher.textContent = 'Dark Mode';
      }
  });
});
