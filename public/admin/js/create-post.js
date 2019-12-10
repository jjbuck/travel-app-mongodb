let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let createCountry = document.querySelector('#create-country');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');
let createImageFile = document.querySelector('#create-image-file');

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let text = createText.value;
    let data = new FormData();
    data.append('title', createTitle.value);
    data.append('country', createCountry.value);
    data.append('text', text);
    data.append('description', text.substring(0, text.indexOf('.') + 1));
    data.append('imageUrl', createImageUrl.value);
    data.append('imageFile', createImageFile.files[0]);

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
        /*
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: createTitle.value,
            country: createCountry.value,
            imageUrl: createImageUrl.value,
            text: text,
            description: text.substring(0, text.indexOf('.') + 1)
        })
        */
    }).then((response) => response.text()).then((data) => window.history.go());
})

function disablePairedInput(input1, input2) {
    if (input1.value) {
        input1.disabled = false;
        input2.disabled = true;
    } else {
        input1.disabled = true;
        input2.disabled = false;
    }
}

createImageUrl.addEventListener('change', function() {
    disablePairedInput(this, createImageFile);
})

createImageFile.addEventListener('change', function() {
    disablePairedInput(this, createImageUrl);
})