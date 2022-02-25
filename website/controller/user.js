// var findFileExtIcon = require('filetypeicons');
// const { default: user } = require('../../src/models/user');
// const { default: make } = require('../../src/models/make');
// const { default: model } = require('../../src/models/model');
// const { isEmpty } = require('../../src/utils/condition');
// const { default: pullover } = require('../../src/models/pullover');
// const utils = require('../utils');
// exports.userDashboard = async (req, res) => {
//   const id = req.cookies['id'];
//   const pull = await pullover.find({
//     userId: id,
//   })
//     .populate({
//       path: 'createdBy',
//       model: 'User',
//       select: { _id: 1, role: 1, email: 1 },
//     })
//     .populate({
//       path: 'userId',
//       model: 'User',
//       select: { _id: 1, role: 1, email: 1, carDetails: 1 },
//       populate: [
//         {
//           path: 'carDetails.modelId',
//           select: { _id: 1, name: 1 },
//           model: 'Model',
//         },
//         {
//           path: 'carDetails.makeId',
//           select: { _id: 1, name: 1 },
//           model: 'Make',
//         },
//       ],
//     })
//     .lean();
//   res.render('pages/users/dashboard', {
//     path: './dashboard',
//     pullOver : pull,
//     utils:utils,
//     pageTitle: 'dashboard',
//     errorMessage: 'errorMessage',
//   });
// };

// exports.editAccount = (req, res) => {
//   res.render('pages/users/edit', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     errorMessage: 'errorMessage',
//   });
// };
// exports.driving = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   let document = [];
//   let documentType = ['driverLicense'];
//   if (users.PersonalDocuments.length > 0) {
//     const doc = users.PersonalDocuments.map((item) => {
//       if (documentType.indexOf(item.fileName) > -1) {
//         return {
//           file: item.fileName,
//           location: req.protocol + '://' + req.headers.host + item.location,
//           icon: findFileExtIcon(
//             req.protocol + '://' + req.headers.host + item.location
//           ),
//         };
//       }
//     });
//     doc.filter((item) => !!item);
//     document = doc.filter((item) => item);
//   }
//   const documentList = document.length !== 0 ? document[0] : [];
//   res.render('pages/users/drivingDocument', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     document: documentList,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.gunPrimit = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   let document = [];
//   let documentType = ['gunPermit'];
//   if (users.PersonalDocuments.length > 0) {
//     const doc = users.PersonalDocuments.map((item) => {
//       if (documentType.indexOf(item.fileName) > -1) {
//         return {
//           file: item.fileName,
//           location: req.protocol + '://' + req.headers.host + item.location,
//           icon: findFileExtIcon(
//             req.protocol + '://' + req.headers.host + item.location
//           ),
//         };
//       }
//     });
//     doc.filter((item) => !!item);
//     document = doc.filter((item) => item);
//   }
//   const documentList = document.length !== 0 ? document[0] : [];
//   console.log(documentList);
//   res.render('pages/users/gunPermit', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     document: documentList,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.social = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   users.socilaSecurity ? users.socilaSecurity : '';
//   res.render('pages/users/social', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     socialSecurity: users.socilaSecurity,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.licenceNumber = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);

//   res.render('pages/users/licensePlateNumber', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     licensePlateNumber: users.licensePlateNumber
//       ? users.licensePlateNumber
//       : '',
//     state: users.state,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.gunPrimit = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   let document = [];
//   let documentType = ['gunPermit'];
//   if (users.PersonalDocuments.length > 0) {
//     const doc = users.PersonalDocuments.map((item) => {
//       if (documentType.indexOf(item.fileName) > -1) {
//         return {
//           file: item.fileName,
//           location: req.protocol + '://' + req.headers.host + item.location,
//           icon: findFileExtIcon(
//             req.protocol + '://' + req.headers.host + item.location
//           ),
//         };
//       }
//     });
//     doc.filter((item) => !!item);
//     document = doc.filter((item) => item);
//   }
//   const documentList = document.length !== 0 ? document[0] : [];
//   console.log(documentList);
//   res.render('pages/users/gunPermit', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     document: documentList,
//     errorMessage: 'errorMessage',
//   });
// };

// exports.registration = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   let document = [];
//   let documentType = ['registration'];
//   if (users.VehicleDocuments.length > 0) {
//     const doc = users.VehicleDocuments.map((item) => {
//       if (documentType.indexOf(item.fileName) > -1) {
//         return {
//           file: item.fileName,
//           location: req.protocol + '://' + req.headers.host + item.location,
//           icon: findFileExtIcon(
//             req.protocol + '://' + req.headers.host + item.location
//           ),
//         };
//       }
//     });
//     doc.filter((item) => !!item);
//     document = doc.filter((item) => item);
//   }
//   const documentList = document.length !== 0 ? document[0] : [];
//   res.render('pages/users/registration', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     document: documentList,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.insurance = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   let document = [];
//   let documentType = ['insurance'];
//   if (users.VehicleDocuments.length > 0) {
//     const doc = users.VehicleDocuments.map((item) => {
//       if (documentType.indexOf(item.fileName) > -1) {
//         return {
//           file: item.fileName,
//           location: req.protocol + '://' + req.headers.host + item.location,
//           icon: findFileExtIcon(
//             req.protocol + '://' + req.headers.host + item.location
//           ),
//         };
//       }
//     });
//     doc.filter((item) => !!item);
//     document = doc.filter((item) => item);
//   }
//   const documentList = document.length !== 0 ? document[0] : [];
//   res.render('pages/users/insurance', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     document: documentList,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.inspection = async (req, res) => {
//   const id = req.params.id;
//   const users = await user.findById(id);
//   let document = [];
//   let documentType = ['inspection'];
//   if (users.VehicleDocuments.length > 0) {
//     const doc = users.VehicleDocuments.map((item) => {
//       if (documentType.indexOf(item.fileName) > -1) {
//         return {
//           file: item.fileName,
//           location: req.protocol + '://' + req.headers.host + item.location,
//           icon: findFileExtIcon(
//             req.protocol + '://' + req.headers.host + item.location
//           ),
//         };
//       }
//     });
//     doc.filter((item) => !!item);
//     document = doc.filter((item) => item);
//   }
//   const documentList = document.length !== 0 ? document[0] : [];
//   res.render('pages/users/inspection', {
//     path: './dashboard',
//     pageTitle: 'dashboard',
//     document: documentList,
//     errorMessage: 'errorMessage',
//   });
// };
// exports.make_model = async (req, res) => {
//   console.log(req.query.makeId);
//   if (req.query.makeId) {
//     const id = req.params.id;
//     const users = await user.findById(id);
//     // console.log(users)
//     let makeData = await make
//       .find({})
//       .lean()
//       .then((doc) => {
//         return doc.map((docs) => {
//           let make = {};
//           console.log(
//             String(docs._id).trim() === String(req.query.makeId).trim()
//           );
//           if (String(docs._id).trim() === String(req.query.makeId).trim()) {
//             make = {
//               name: docs.name,
//               abbreviation: docs._id,
//               selected: 'selected',
//             };
//           } else {
//             make = {
//               name: docs.name,
//               abbreviation: docs._id,
//               selected: '',
//             };
//           }
//           return make;
//         });
//       });
//     let modelData = await model
//       .find({
//         makeId: req.query.makeId,
//       })
//       .lean()
//       .then((doc) => {
//         return doc.map((docs) => {
//           let model = {};
//           model = {
//             name: docs.name,
//             abbreviation: docs._id,
//             selected: '',
//           };
//           return model;
//         });
//       });

//     const color = users.carDetails.color ? users.carDetails.color : null;
//     res.render('pages/users/make-model', {
//       path: './dashboard',
//       pageTitle: 'dashboard',
//       make: makeData,
//       model: modelData,
//       color: color,
//       errorMessage: 'errorMessage',
//     });
//   } else {
//     const id = req.params.id;
//     const users = await user.findById(id);
//     // console.log(users)
//     let makeData = await make
//       .find({})
//       .lean()
//       .then((doc) => {
//         return doc.map((docs) => {
//           let make = {};
//           if (users.carDetails) {
//             if (
//               String(users.carDetails.makeId).trim() === String(docs._id).trim()
//             ) {
//               make = {
//                 name: docs.name,
//                 abbreviation: docs._id,
//                 selected: 'selected',
//               };
//             } else {
//               make = {
//                 name: docs.name,
//                 abbreviation: docs._id,
//                 selected: '',
//               };
//             }
//           }
//           return make;
//         });
//       });
//     let modelData = await model
//       .find({})
//       .lean()
//       .then((doc) => {
//         return doc.map((docs) => {
//           let model = {};
//           if (users.carDetails) {
//             if (
//               String(users.carDetails.modelId).trim() ===
//               String(docs._id).trim()
//             ) {
//               model = {
//                 name: docs.name,
//                 abbreviation: docs._id,
//                 selected: 'selected',
//               };
//             } else {
//               model = {
//                 name: docs.name,
//                 abbreviation: docs._id,
//                 selected: '',
//               };
//             }
//           }
//           return model;
//         });
//       });
//     console.log(modelData);
//     // if(!isEmpty(users.carDetails))
//     // {
//     //   makeData = makeData.map((el) => {
//     //     if (el.abbreviation.trim()===users.carDetails.make.trim()) {
//     //       el.selected = 'selected';
//     //     } else {
//     //       el.selected = '';
//     //     }
//     //     return el;
//     //   });
//     //   model = model.map((el) => {
//     //     if (el.abbreviation.trim()===users.carDetails.model.trim()) {
//     //       el.selected = 'selected';
//     //     } else {
//     //       el.selected = '';
//     //     }
//     //     return el;
//     //   });
//     // }
//     const color = users.carDetails.color ? users.carDetails.color : null;
//     res.render('pages/users/make-model', {
//       path: './dashboard',
//       pageTitle: 'dashboard',
//       make: makeData,
//       model: modelData,
//       color: color,
//       errorMessage: 'errorMessage',
//     });
//   }
// };
