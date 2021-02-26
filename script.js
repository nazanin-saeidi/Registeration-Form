const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

//show success outline
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

//show error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

//get filed name with a capital initial letter
function getFiledName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//check element length
function checkLength(input, min, max) {
    if(input.value.length > max) {
        showError(input, `${getFiledName(input)} must be less than ${max} characters`)
    } else if(input.value.length < min) {
        showError(input, `${getFiledName(input)} must be at least ${min} characters`)
    }
}

//check validations
function checkRequired(inputArray) {
    inputArray.forEach((input) => {
        if(input.value === '') {
            showError(input, `${getFiledName(input)} is required!`)
        } else {
            showSuccess(input)
        }
    })

}

//check email with regex
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Invalid Email')
    }
}

//check password and confirm password match
function checkPassword(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Confirm Password do not match with Password')
    }
}

//add event listener
form.addEventListener('submit', function(event) {
    event.preventDefault()
    
    checkRequired([username, email, password, password2])
    checkEmail(email)
    checkLength(username, 3, 20)
    checkLength(password, 6, 25)
    checkPassword(password, password2)
})