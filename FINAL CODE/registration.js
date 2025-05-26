
//student registration page
const users = [];

// Function to create a user and store the data in the users array
function createUser(username, password, email, schoolName, schoolCode) {
    const user = { username, password, email, schoolName, schoolCode };
    users.push(user); //puts the thing in the array
    console.log(users); //this is just for me to check its in the array
    localStorage.setItem('logins', JSON.stringify(users) ) //puts it in local storage
    console.log(JSON.parse(localStorage.getItem('logins')))
}


function getUser(username, password, email, schoolName, schoolCode) {
    const inputUser = { username, password, email, schoolName, schoolCode }; //puts the new input into an array
    const storedLogins = JSON.parse(localStorage.getItem('logins')); // getting the stored logins
    
    if (Array.isArray(storedLogins)) {
        let found = false;
        for (const storedUser of storedLogins) { //goes through each item to see if its there
            if (
                storedUser.username === inputUser.username &&
                storedUser.password === inputUser.password &&
                storedUser.email === inputUser.email &&
                storedUser.schoolName === inputUser.schoolName &&
                storedUser.schoolCode === inputUser.schoolCode
            ) {
                found = true;
                break;
            }
        }

        if (found) {
            //console.log("User found in the list."); 
            alert("Welcome Student!")
            window.location.href = 'StudentDashboard.html';
            
        } else {
            //console.log("User not found in the list.");
            alert("Your details are incorrect")
        }
    }
}

// Add an event listener to the registration form for adding it to the array
// This uses the StudentRegistration.html
  try{  document.getElementById('registerButton').addEventListener('click', function () {
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;
     const email = document.getElementById('email').value;
     const schoolName = document.getElementById('schoolName').value;
     const schoolCode = document.getElementById('schoolCode').value;

    // Call the createUser function with input values
    createUser(username, password, email, schoolName, schoolCode);
}); } catch(error) {
    console.log(error);
}

// Add an event listener to the registration form for confirmation its a student account
// This uses the studentLogin.html
try { document.getElementById('submitButton').addEventListener('click', function () { //the try/catch thing is there because otherwise you get this error: TypeError: document.getElementById(...) is null for lines 43 and 56
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    const email = document.getElementById('Email').value;
    const schoolName = document.getElementById('SchoolName').value;
    const schoolCode = document.getElementById('subscriptionCode').value;
    
    getUser(username, password, email, schoolName, schoolCode);
 }); }  catch (error) {
        // in the event of an error in anything inside the "try" statement, this will catch the error
        // this will prevent the code from halting when there is an error
        console.log(error);
    }