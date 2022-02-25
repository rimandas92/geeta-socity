// JavaScript Document
$(document).ready(function () {
  console.log(localStorage.getItem('token'));
  if (
    !localStorage.getItem('token') ||
    localStorage.getItem('token') === 'undefined'
  ) {
    if (window.location.pathname !== '/admin/login')
      window.location.href = '/admin';
  } else {
    getLocation();
    navigator.geolocation.getCurrentPosition(async (location) =>{
      if (localStorage.getItem('token')) {
        await fetch(`${CONSTANT.API}users/location`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                latitude:location.coords.latitude,
                longitude:location.coords.longitude
            }),
          });
      }
     
    },null,{maximumAge:1000, timeout:5000, enableHighAccuracy:true});
  }
});

function getLocation() {
  console.log('getLocation was called');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, positionError);
  } else {
    hideLoadingDiv();
    console.log('Geolocation is not supported by this device');
  }
}

function positionError() {
  console.log('Geolocation is not enabled. Please enable to use this feature');

  if (allowGeoRecall) getLocation();
}

function showPosition() {
  console.log('posiiton accepted');
  allowGeoRecall = false;
}
