const newPropertyButton = document.getElementById("add-property");
const keys = document.getElementById("keys");
const values = document.getElementById("values");
let count = keys.childElementCount - 2;

newPropertyButton.onclick = _ => {
  let keyInput = document.createElement("input");
  keyInput.type = "text";
  keyInput.placeholder = "Color";
  keyInput.name = "key" + ++count;
  keyInput.className = "form-control mb-3";
  keys.append(keyInput);
  let valueInput = document.createElement("input");
  valueInput.type = "text";
  valueInput.placeholder = "Red";
  valueInput.name = "value" + count;
  valueInput.className = "form-control mb-3";
  values.append(valueInput);
}
