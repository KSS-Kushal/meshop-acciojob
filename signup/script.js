// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const error = document.getElementById('error');
error.style.color = '#f00';

document.getElementById('signUp').addEventListener('click', ()=>{
    if (fname.value === '' || lname.value === '' || email.value === '' || password.value === '' || confirmPassword.value === '') {
        error.textContent = "Please enter all required fields!"
    }else if (password.value === confirmPassword.value) {
        let users = JSON.parse(localStorage.getItem('users') ?? "[]");
        let filteredUser = users.filter((user)=>user.email === email.value);
        if (filteredUser.length > 0) {
            error.textContent = "User already exist!s";
        }else{
            users.push({
                email: email.value,
                password: password.value,
                fname: fname.value,
                lname: lname.value,
                createdAt: new Date()
            });
            localStorage.setItem('users', JSON.stringify(users));
            error.textContent = "Successfully sign up! please go to login page and login!";
            error.style.color = "#00FF00";
            fname.value = '';
            lname.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
            setTimeout(()=>{
                alert('Successfully sign up! please go to login page and login!');
                window.location.href = "/login";
            },500);
        }
    } else {
        error.textContent = "Please make sure password and confirm password are equal!"
    }
})