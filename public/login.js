document.getElementById("userform").addEventListener('submit', async (event) => {
    console.log('flag');
    event.preventDefault(); //Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try{
        const res = await fetch('/login', {
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

        
        if(data.loggedIn) {
            console.log('Login successful!');
            window.location.href = '/list';
        }
        else{
            alert('Failed to login');
            preventDefault = false;
        }

    }catch (error){
        console.log("error");
    }
});
