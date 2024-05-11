import axios from "axios";

function validation(form) {
  let result = true;

  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains("error")) {
      parent.classList.remove("error");
    }
  }

  function createError(input) {
    const parent = input.parentNode;
    parent.classList.add("error");
  }

  form.querySelectorAll("input").forEach((input) => {
    removeError(input);
    if (input.dataset.required == "true") {
      if (input.value == "") {
        createError(input);
        result = false;
      }
    }
  });

  return result;
}

async function getData(data) {
  try {
    await axios.post("/", data);
  } catch (e) {
    console.log(e);
  }
}

const form = document.getElementById("form-request");
const goToForm = document.getElementById("go-to-form");

goToForm.addEventListener("click", () => {
  document.querySelector('#form-request').scrollIntoView()
})

function getValue(e) {

  e.preventDefault();
  const firstName = form.querySelector('[name="firstName"]'),
    secondName = form.querySelector('[name="secondName"]'),
    surname = form.querySelector('[name="surname"]'),
    formRequest = form.querySelector('.main__form-request-container'),
    formRequestSucces = form.querySelector('.main__form-request-succes')

  const values = {
    firstName: firstName.value,
    secondName: secondName.value,
    surname: surname.value,
  };

  if (validation(form) == true) {
    setTimeout(() => {
      formRequest.classList.add("hidden");
      formRequestSucces.classList.add('visible');
      getData(values);
    }, 600);
  }
}

form.addEventListener("submit", getValue);
