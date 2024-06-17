// Write your script here
const currUser = JSON.parse(localStorage.getItem('currUser'));
if(!currUser){
    window.location.href = "/login";
}

const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const oldPassword = document.getElementById('old');
const newPassword = document.getElementById('new');
const confirmPassword = document.getElementById('confirm');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');

error1.style.display = 'none';
error2.style.display = 'none';

const users = JSON.parse(localStorage.getItem('users'));
const user = users.filter(v=>v.email===currUser.email)[0];
const index = users.indexOf(user);

document.getElementById('save').addEventListener('click', ()=>{
    if (fname.value === "" || lname.value === "") {
        error1.textContent = "Please enter all required fields!";
        error1.style.color = '#FF0000';
        error1.style.display = 'block';
    }else{
        currUser.fname = fname.value;
        currUser.lname = lname.value;
        localStorage.setItem('currUser', JSON.stringify(currUser));
        users[index].fname = fname.value;
        users[index].lname = lname.value;
        localStorage.setItem('users', JSON.stringify(users));
        error1.textContent = "Update successfully!";
        error1.style.color = '#00FF00';
        error1.style.display = 'block';
        fname.value = '';
        lname.value = '';
    }
});

document.getElementById('changePassword').addEventListener('click', ()=>{
    if (oldPassword.value === "" || newPassword.value === "" || confirmPassword.value === "") {
        error2.textContent = "Please enter all required fields!";
        error2.style.color = '#FF0000';
        error2.style.display = 'block';
    } else {
        if (newPassword.value !== confirmPassword.value) {
            error2.textContent = "Please make sure password and confirm password are equal!";
            error2.style.color = '#FF0000';
            error2.style.display = 'block';
        } else {
            if (currUser.password !== oldPassword.value) {
                error2.textContent = "Please make sure old password is correct!";
                error2.style.color = '#FF0000';
                error2.style.display = 'block';
            } else {
                currUser.password = newPassword.value;
                localStorage.setItem('currUser', JSON.stringify(currUser));
                users[index].password = newPassword.value;
                localStorage.setItem('users', JSON.stringify(users));
                error2.textContent = "Update successfully!";
                error2.style.color = '#00FF00';
                error2.style.display = 'block';
                oldPassword.value = '';
                newPassword.value = '';
                confirmPassword.value = '';
            }
        }
    }
});


document.getElementById('logout').addEventListener('click', ()=>{
    localStorage.removeItem('currUser');
    window.location.href = "/login";
})