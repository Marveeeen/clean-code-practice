/* sample code */

function createUser(email, password) {
    if (!email || !email.includes('@') || !password || password.trim() === '') {
        console.log('Invalid Input');
        return
    }

    const user = {
        email,
        password
    }

    database.insert(user)
}

/* Clean code */
function handleCreateUser(email, password) {
    try {
        createUser(email, password)
    } catch (error) {
        showErrorMessage(error)
    }
}

function createUser(email, password) {
    validateUserInput(email, password)

    saveUser(email,password)
}

function saveUser(email, password) {
    const user = {
        email,
        password
    }

    database.insert(user)
}

function validateUserInput(email, password) {
    if (isUserInputInvalid(email,password)){
        throw new Error('Invalid input')
    }
}

function isUserInputInvalid(email, password) {
    return isEmailInvalid(email) && isPasswordInvalid(password)
}

function isEmailInvalid(email) {
    return !email || !email.includes('@')
}

function isPasswordInvalid(password){
    return !password || password.trim() === ''
}

function showErrorMessage(message) {
    console.log(message)
}
