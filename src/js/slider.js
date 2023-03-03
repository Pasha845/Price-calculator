function calc() {
  var sliderPrice = document.getElementById("slider-price").value;
  document.getElementById("input-price").value = sliderPrice;
}

function fee() {
  var sliderPrice = document.getElementById("slider-price").value;
  var inputFee = document.getElementById("input-fee-1").value;
  var sliderMonth = document.getElementById("slider-month").value;
  var input = document.getElementById("input-fee").value;
  input = inputFee * sliderPrice / 100;
  var inputLast = document.getElementById("input-last").value;
  inputLast = Math.round((sliderPrice - input) * (0.05 * Math.pow((1 + 0.05), sliderMonth) / (Math.pow((1 + 0.05), sliderMonth) - 1)));
  document.getElementById("input-first").value = input + sliderMonth * inputLast;
}

function leasing() {
  var sliderMonth = document.getElementById("slider-month").value;
  document.getElementById("input-month").value = sliderMonth;
}
