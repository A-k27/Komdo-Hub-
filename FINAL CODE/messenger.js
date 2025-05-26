try {
    function getUser() {
        let storedLogins = JSON.parse(localStorage.getItem('logins')); //this is getting all the stuff u registered
        console.log(storedLogins); 

        // Assuming the first user in the array has the username you want
        var user1 = storedLogins[0].username; //getting JUST the username
        console.log("javascript" + user1);
        return user1; //RETURNS THE USER 
    }

    getUser(); // this is just to catch the type error i get 
} catch (error) {
    // Handle any exceptions that might occur in the try block
    console.log("error");
}
