// JavaScript Document
$( document ).ready(function () {
  if (
    !localStorage.getItem('token') ||
     localStorage.getItem('token') === 'undefined' 
  ) {
    if (window.location.pathname !== '/admin/login')
      window.location.href = '/admin/login';
  }
});
