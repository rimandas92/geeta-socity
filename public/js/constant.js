const CONSTANT = {
  API: 'http://nodeserver.mydevfactory.com:8082/api/v1/',
  IMAGE:'http://nodeserver.mydevfactory.com:8082'
};
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}
async function generatePassword(){
  let loader = document.getElementById('loader');
  loader.classList.add('is-active');
  let email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please enter valid email', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
  await fetch(`${CONSTANT.API}auth/forget`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw await res.text().then((text) => new Error(text));
      }
    })
    .then(async (res) => {
      document.getElementById('loader').classList.remove('is-active');
      $.notify(`Password successfully send to ${email}`, {
        className: 'success',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      // await delay(5000);
      // window.location.href = "/signin";
    })
    .catch((err) => {
      document.getElementById('loader').classList.remove('is-active');
      const error = JSON.parse(err.message);
      if (error)
        return $.notify(error.error, {
          className: 'error',
          clickToHide: true,
          autoHide: true,
          globalPosition: 'top center',
        });
      console.log(err);
    });
}
