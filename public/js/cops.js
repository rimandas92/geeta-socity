function edit(_id, firstName, email, lastName) {
    let select_id = document.getElementById('_id');
    let select_firstName = document.getElementById('firstName');
    let select_email = document.getElementById('email');
    let select_lastName = document.getElementById('lastName');
    select_id.value = _id;
    select_firstName.value = firstName;
    select_email.value = email;
    select_lastName.value = lastName;
  }
  async function updateUser() {
    let _id = document.getElementById('_id').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    const updateUser = {
      firstName: firstName,
      lastName: lastName,
    };
    if (firstName.length === 0 || lastName.length === 0) {
      return $.notify('Please enter valid input', {
        className: 'error',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
    }
    await fetch(`${CONSTANT.API}users/${_id}/edit`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => {
        $.notify('User updated successfully', {
          className: 'success',
          clickToHide: true,
          autoHide: true,
          globalPosition: 'top center',
        });
        $('#edit').modal('hide');
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        $('#edit').modal('hide');
      });
  }
  async function deleteUser(_id) {
    let select_id = document.getElementById('_idDelete');
    select_id.value = _id;
  }
  async function confirmDelete() {
    let _id = document.getElementById('_idDelete').value;
    await fetch(`${CONSTANT.API}users/${_id}/delete`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => {
        $.notify('User Deleted successfully', {
          className: 'success',
          clickToHide: true,
          autoHide: true,
          globalPosition: 'top center',
        });
        $('#delete').modal('hide');
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        $('#delete').modal('hide');
      });
  }
  async function addUser() {
    let firstName = document.getElementById('add_firstName').value;
    let lastName = document.getElementById('add_lastName').value;
    let email = document.getElementById('add_email').value;
    let password = document.getElementById('password').value;
  
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
      return $.notify('Please enter valid input', {
        className: 'error',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
    }
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role:'cops'
    };
    try {
      await fetch(`${CONSTANT.API}auth/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(async(res) => {
          if (res.ok) {
            return res.json();
          } else {
          throw  await res.text().then(text => new Error(text));
          }
        })
        .then((res) => {
          $.notify('User Added successfully', {
            className: 'success',
            clickToHide: true,
            autoHide: true,
            globalPosition: 'top center',
          });
          $('#add').modal('hide');
          location.reload();
        });
    } catch (err) {
      $.notify(err, {
        className: 'error',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      $('#add').modal('hide');
    }
  }
  