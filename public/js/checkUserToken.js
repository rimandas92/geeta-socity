// JavaScript Document
$( document ).ready(function () {
    console.log(localStorage.getItem('token'));
    if (
      !localStorage.getItem('token') ||
       localStorage.getItem('token') === 'undefined' 
    ) {
      if (window.location.pathname !== '/admmin/login')
      window.location.href = '/admmin/login';
    }
  });