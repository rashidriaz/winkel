const imageInput = document.getElementById('image-input');
imageInput.onchange = _ => {
  const files = Array.from(imageInput.files);
  if (files) {
    const imageDiv = document.getElementById('image-display');
    imageDiv.innerHTML = "";
    files.forEach(file => {
      imageDiv.innerHTML += `<img src="${URL.createObjectURL(file)}" id="selected-image" HEIGHT="200" WIDTH="200" class="m-2 rounded">`;
    });
  }
}
