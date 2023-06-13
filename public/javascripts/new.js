const form = document.querySelector('form')
const submitBtn = document.querySelector('#submit-btn')
form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault() // 不要submit
    event.stopPropagation() // event不要bubble
  }
})
submitBtn.addEventListener('click', (event) => {
  form.classList.add('was-validated')
})

// 限制input時最大值只能是今天
const dateInput = document.querySelector('#date')
const today = new Date()
dateInput.max = today.toISOString().split('T')[0]
