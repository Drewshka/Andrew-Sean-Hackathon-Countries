const countryContainer = document.querySelector(".country__container");

let countries = [
  {
    name: "Kuala Lumpur",
  },
];

function displayCountry(cName, currency, capital, language, flag) {
  countryContainer.innerHTML = "";
  // Single for country details to be displayed
  let countrySingle = document.createElement("section");
  countrySingle.classList.add("country__single");
  countryContainer.prepend(countrySingle);

  // create country flag for each single
  let countryFlag = document.createElement("img");
  countryFlag.classList.add("country__flag");
  countryFlag.setAttribute("src", `${flag}`);
  countrySingle.appendChild(countryFlag);

  // create country name for each single
  let countryName = document.createElement("h1");
  countryName.classList.add("country__name");
  countryName.innerHTML = `Country: <span class="country__value">${cName}</span>`;
  countrySingle.appendChild(countryName);

  // create country currency for each single
  let countryCurrency = document.createElement("h1");
  countryCurrency.classList.add("country__currency");
  countryCurrency.innerHTML = `Currency: <span class="country__value">${currency}</span>`;
  countrySingle.appendChild(countryCurrency);
  // create country capital for each single
  let countryCapital = document.createElement("h1");
  countryCapital.classList.add("country__capital");
  countryCapital.innerHTML = `Capital: <span class="country__value">${capital}</span>`;
  countrySingle.appendChild(countryCapital);
  // create country language for each single
  let countryLanguage = document.createElement("h1");
  countryLanguage.classList.add("country__language");
  countryLanguage.innerHTML = `Language: <span class="country__value">${language}</span>`;
  countrySingle.appendChild(countryLanguage);
}

const formEl = document.getElementById("form");
const nameInput = document.getElementById("name");
const submitButton = document.getElementById("searchcountry");
// checking form
console.log(formEl);

const apiURL = `https://restcountries.com/v3.1/all`;

const axiosResponse = axios.get(apiURL).then((response) => {
  console.log(response.data[0].name);

  response.data.forEach((i) => {
    console.log(i.name);
  });
});
console.log(axiosResponse);

const callingAxios = async () => {
  await axios
    .get(apiURL)
    .then((result) => {
      console.log(result.data[0]);
      console.log(result.data[0].capital[0]); // country capital
      console.log(result.data[0].name.common); // country name
      console.log(Object.values(result.data[0].currencies)[0].name); // country currency
      console.log(Object.values(result.data[0].languages)[0]); // country english
      console.log(result.data[0].flags.svg); // country flag

      formEl.addEventListener("submit", async (event) => {
        event.preventDefault();

        result.data.forEach((c) => {
          if (nameInput.value == c.name.common) {
            let currency = Object.values(c.currencies)[0].name;
            let capital = c.capital[0];
            let language = Object.values(c.languages)[0];
            let flag = c.flags.svg;
            displayCountry(c.name.common, currency, capital, language, flag);
            nameInput.style.border = "1px solid green";
          }
        });

        callingAxios();
        formEl.reset();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
callingAxios();

// function validate() {
//   const nameInput = document.getElementById("name");
//   let submitButton = document.forms["form"]["name"].value;

//   if (submitButton == "" || submitButton != i.name.common) {
//     nameInput.style.border = "1px solid red";
//     alert("Country must be filled out");
//     return false;
//   } else {
//     nameInput.style.border = "1px solid black";
//     return true;
//   }
// }

// function validate() {
//   const nameInput = document.getElementById("name");
//   let submitButton = document.forms["form"]["name"].value;

//   if (submitButton == "" || submitButton != c.name.common) {
//     nameInput.style.border = "1px solid red";
//     alert("Country must be filled out");
//     return false;
//   } else {
//     nameInput.style.border = "1px solid black";
//     return true;
//   }
// }
