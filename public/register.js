document.getElementById("userform").addEventListener('submit', async (event) => {
    console.log('flag');
    event.preventDefault(); //Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try{
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username, password: password})
        });
        console.log('flag2');
        console.log(res);
        const data = await res.json();
        console.log(data);

        
        if(data.registered) {
            alert("Registered Successfully");
            window.location.href = '/login';
        }
        else{
            alert("Failed to register, username may be taken");
            preventDefault = false;
        }

    }catch (error){
        console.log("error");
    }
});
