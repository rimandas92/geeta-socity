import { pathToRegexp } from 'path-to-regexp';

export const CONSTANT = {
  JWT_ALLOWED_URLS: [
    '/api/v1/auth/login',
    '/api/v1/auth/social/login/google',
    '/api/v1/auth/social/signup/google',
    '/api/v1/auth/social/signup/apple',
    '/api/v1/auth/social/login/apple',
    '/api/v1/auth/signup',
    '/api/v1/auth/forget',
    '/api/v1/auth/password/forgot',
    '/api/v1/auth/password/reset',
    '/api/v1/auth/social/facebook',
    '/api/v1/auth/social/google',
    '/api/v1/auth/social/apple',
    '/api/v1/users',
    '/api/v1/users/',
    '/api/v1/ebook/',
    '/api/v1/ebook',
    '/api/v1/category/',
    '/api/v1/category',
    '/api/v1/books/audio/bhajans',
    '/api/v1/books/audio/lecture',
    '/api/v1/books/audio/meditation',
    '/api/v1/books/audio/bhagawad',
    '/api/v1/auth/social/v1/google/signup',
    '/api/v1/auth/social/v1/google/signin',
    '/api/v1/auth/social/signin/v1/apple',
    '/api/v1/auth/social/signup/v1/apple',
    '/api/v1/pages/about',
    '/api/v1/banner/',
    new RegExp('api/v1/books/audio.*/', 'i'),
    new RegExp('api/v1/ebook/get.*/', 'i'),
  ],
};
