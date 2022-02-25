

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if(!validateEmail(email)){
      return $.notify('Please enter valid email', {
        className: 'error',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
    }
    if (password.length === 0) {
      return $.notify('Please enter valid password', {
        className: 'error',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
    }
  await fetch(`${CONSTANT.API}auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        throw res;
      }
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('token', res.token);
        window.location.href='/admin/dashboard';

    })
    .catch((err) => {
        err.json().then(res=>{
            if (res.message) alert(res.message);
        });
        console.log(err);
    
    });
}
async function logout() {
    localStorage.clear();
    window.location.href='/admin';
}
async function userLogout() {
    localStorage.clear();
    window.location.href='/signin';
}