async function uploadToServer() {
  var loader = document.getElementById('loader');
  loader.classList.add('is-active');
  const fileInput = document.getElementById('drivingDocument');
  if (!fileInput.files[0]) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please select the valid document', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
    const formData = new FormData();
    formData.append('driverLicense', fileInput.files[0]);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    await fetch(
      `${CONSTANT.API}users/document/personal/${
        JSON.parse(localStorage.getItem('user'))._id
      }`,
      options
    ).then(async(res) => {
      document.getElementById('loader').classList.remove('is-active');
      $.notify('Document Uploaded successfully', {
        className: 'success',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      await delay(5000);
      location.reload();
    }).catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}
async function gunPermitUploadToServer() {
  var loader = document.getElementById('loader');
  loader.classList.add('is-active');
  const fileInput = document.getElementById('drivingDocument');
  if (!fileInput.files[0]) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please select the valid document', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
    const formData = new FormData();
    formData.append('gunPermit', fileInput.files[0]);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    await fetch(
      `${CONSTANT.API}users/document/personal/${
        JSON.parse(localStorage.getItem('user'))._id
      }`,
      options
    ).then(async(res) => {
      document.getElementById('loader').classList.remove('is-active');
      $.notify('Document Uploaded successfully', {
        className: 'success',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      await delay(5000);
      location.reload();
    }).catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}
async function uploadToServerRegistration() {
  var loader = document.getElementById('loader');
  loader.classList.add('is-active');
  const fileInput = document.getElementById('drivingDocument');
  if (!fileInput.files[0]) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please select the valid document', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
    const formData = new FormData();
    formData.append('registration', fileInput.files[0]);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    await fetch(
      `${CONSTANT.API}users/document/vehicle/${
        JSON.parse(localStorage.getItem('user'))._id
      }`,
      options
    ).then(async(res) => {
      document.getElementById('loader').classList.remove('is-active');
      $.notify('Document Uploaded successfully', {
        className: 'success',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      await delay(5000);
      location.reload();
    }).catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}
async function uploadToServerInsurance() {
  var loader = document.getElementById('loader');
  loader.classList.add('is-active');
  const fileInput = document.getElementById('drivingDocument');
  if (!fileInput.files[0]) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please select the valid document', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
    const formData = new FormData();
    formData.append('insurance', fileInput.files[0]);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    await fetch(
      `${CONSTANT.API}users/document/vehicle/${
        JSON.parse(localStorage.getItem('user'))._id
      }`,
      options
    ).then(async(res) => {
      document.getElementById('loader').classList.remove('is-active');
      $.notify('Document Uploaded successfully', {
        className: 'success',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      await delay(5000);
      location.reload();
    }).catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}
async function uploadToServerInspection() {
  var loader = document.getElementById('loader');
  loader.classList.add('is-active');
  const fileInput = document.getElementById('drivingDocument');
  if (!fileInput.files[0]) {
    document.getElementById('loader').classList.remove('is-active');
    return $.notify('Please select the valid document', {
      className: 'error',
      clickToHide: true,
      autoHide: true,
      globalPosition: 'top center',
    });
  }
    const formData = new FormData();
    formData.append('inspection', fileInput.files[0]);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    await fetch(
      `${CONSTANT.API}users/document/vehicle/${
        JSON.parse(localStorage.getItem('user'))._id
      }`,
      options
    ).then(async(res) => {
      document.getElementById('loader').classList.remove('is-active');
      $.notify('Document Uploaded successfully', {
        className: 'success',
        clickToHide: true,
        autoHide: true,
        globalPosition: 'top center',
      });
      await delay(5000);
      location.reload();
    }).catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}

