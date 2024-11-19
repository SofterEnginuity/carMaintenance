

var trash = document.getElementsByClassName("fa-trash-o");


document.querySelector('.filter').addEventListener('click', function(){
let type = document.querySelector('#filter-dropdown').value  
        const filter = document.querySelector('.filter')
//  if(document.querySelector('#filter-dropdown').value === 'tires'){
Array.from(document.querySelectorAll('.well')).forEach(well =>{
console.log(type)
  if(type == "services"){
    well.classList.remove('hidden')
    
  }
  else if(!well.classList.contains(type)){
  well.classList.add('hidden')
}else{
  well.classList.remove('hidden')
} 

}) 
//  }

      });
//process form

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById("name-dropdown");
  const locationInput = document.querySelector('[name="location"]');
  const dateInput = document.querySelector('[name="date"]');
  const mileageInput = document.querySelector('[name="mileage"]');
  const form = document.getElementById("form");


});





// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Add click event listeners to all edit icons
  document.querySelectorAll('.edit-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const id = this.dataset.id;
      const field = this.dataset.field;
      const span = document.querySelector(`.editable[data-id="${id}"][data-field="${field}"]`);

      // Toggle edit mode by replacing span content with an input
      if (!span.querySelector('input')) {
        const currentValue = span.innerText;
        span.innerHTML = `<input type="text" value="${currentValue}" />`;
        const input = span.querySelector('input');

        // Focus on the input and handle saving changes
        input.focus();
        input.addEventListener('blur', () => {
          const newValue = input.value;
          span.innerHTML = newValue; // Update UI

          // Send PUT request to update the field in the database
          fetch('/messages', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id, [field]: newValue })
          })
          .then(response => response.json())
          .then(data => console.log('Updated:', data))
          .catch(error => console.error('Error:', error));
        });
      }
    });
  });
});



//photo upload

document.querySelectorAll('.photo-upload-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    const id = this.dataset.id;
    const fileInput = this.querySelector('input[type="file"]');

    if (fileInput.files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }

    formData.append('photo', fileInput.files[0]);
    formData.append('_id', id);

    fetch('/uploadPhoto', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.reload(); // Reload to display the uploaded image
      } else {
        console.error('Upload failed:', data.error);
      }
    })
    .catch(error => console.error('Error:', error));
  });
});


document.querySelectorAll('.delete-icon').forEach(element => {
  element.addEventListener('click', function() {
    const itemId = this.dataset.id;

    fetch('/messages', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: itemId })
    })
    .then(response => {
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to delete the item.');
      }
    });
  });
});


Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});