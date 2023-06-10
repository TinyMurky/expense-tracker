function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const numbers = document.querySelectorAll('.number')
for (const number of numbers) {
  number.textContent = numberWithCommas(number.textContent)
}
