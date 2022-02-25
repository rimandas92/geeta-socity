async function savePages() {
  let loader = document.getElementById('loader');
  loader.classList.add('is-active');
  //display current HTML
  let title = document.getElementById('title').value;
  let body = quill.container.firstChild.innerHTML;
  if (title.length===0) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please enter valid title', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
  if (body.length===0) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please enter valid content', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
  title = String(title).toLowerCase();
  await fetch(`${CONSTANT.API}pages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw await res.text().then((text) => new Error(text));
    }
  })
    .then((res) => {
      setTimeout(() => {
        $.notify('Page Created successfully', {
          className: 'success',
          clickToHide: true,
          autoHide: true,
          globalPosition: 'top center',
        });
        location.href = '/admin/dashboard/pages';
      }, 2000);
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
async function editPages(id) {
  location.href = `pages/${id}/edit`;
}
async function updatePage(id) {
  console.log(id);
  let title = document.getElementById('title').value;
  let body = quill.container.firstChild.innerHTML;
  if (!title || !body) {
    return $.notify('Please enter valid input', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
  title = String(title).toLowerCase();
  await fetch(`${CONSTANT.API}pages/edit/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  })
    .then((res) => {
      setTimeout(() => {
        $.notify('Page Updated successfully', {
          className: 'success',
          clickToHide: true,
          autoHide: true,
          globalPosition: 'top center',
        });
        location.href = '/admin/dashboard/pages';
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deletePages(_id) {
  let select_id = document.getElementById('_idDelete');
  select_id.value = _id;
}

async function confirmDeletePages() {
    console.log('confirmDeletePages');
  let _id = document.getElementById('_idDelete').value;
  await fetch(`${CONSTANT.API}pages/${_id}/delete`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => {
      $.notify('Page Deleted successfully', {
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
