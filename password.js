const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const btnEL = document.getElementById("btn");
const lengthEl = document.getElementById("pdlengt");
const passwordEL = document.getElementById("pd");
const clipboardEl = document.getElementById("clip");

const randomFunc = {
  lower: getrandomLowercase,
  upper: getrandomUppercase,
  symbol: getrandomsymbols,
  number: getrandomnumbers,
};

function getrandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

function getrandomsymbols() {
  return String.fromCharCode(Math.floor(Math.random() * 15 + 33));
}

function getrandomnumbers() {
  return Math.ceil(Math.random() * 8);
}
function getrandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

btnEL.addEventListener("click", () => {
  const length = +lengthEl.value;
  let hasupper = upperEl.checked; //boolean
  let haslower = lowerEl.checked;
  let hasnumber = numberEl.checked;
  let hassymbol = symbolEl.checked;

  passwordEL.value = generatepd(
    haslower,
    hasnumber,
    hassymbol,
    hasupper,
    length
  );
});

function generatepd(lower, number, symbol, upper, length) {
  let generatedpd = "";

  let checkedEl = lower + number + symbol + upper; // true 1 false 0
  let typesArr = [{ lower }, { number }, { symbol }, { upper }].filter(
    (item) => Object.values(item)[0]
  );
  console.log(typesArr);
  if (checkedEl === 0) {
    return "";
  }

  for (let index = 0; index < length; index += checkedEl) {
    typesArr.forEach((i) => {
      const funcName = Object.keys(i);

      generatedpd += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedpd.slice(0, length);
  return finalPassword;
}

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");

  textarea.value = passwordEL.value;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("password copied to clipboard");
});
lengthEl.addEventListener("click", () => {
  passwordEL.value = "";
  lengthEl.value = "";
});
