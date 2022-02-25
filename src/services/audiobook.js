import { BAD_REQUEST, CREATED, OK } from 'http-status';
import {
  creatAudioBooks,
  fetchAudioBookList,
  fetchAudioBookAll,
  deleteAudioBook,
  editAudiobook,
  fetchAudioBookListByCategoryId
} from '../controller/audioBook';
import { createEbooks, fetchEbookList } from '../controller/ebook';
import audiobook from '../models/audiobook';
import Ebook from '../models/ebook';
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
export const createAudioBooks = async (req, res, next) => {
 
  try {
    const track = req.body.track.map((res, index) => {
      let tracks = [];
      if(req.files.filter((file) => file.fieldname === `track[${index}]`)){
        tracks.push({
          track: res.track,
          audio: `/uploads/audio/${
            req.files.filter((file) => file.fieldname === `track[${index}]`)[0]
              .filename
          }`,
        });
      }
      return tracks;
    });
    const previousPriority = await audiobook.find({},{orderPriority:1, _id:0}).sort({orderPriority: -1}).limit(1).exec();
    console.log("audioBook Heighest Priority ===========>", previousPriority);
      const orderPriority = (previousPriority.length > 0)? (previousPriority[0]. orderPriority+ 1) : 1;
    const newBook = {
      title: req.body.title,
      shortNote: req.body.shortNote,
      track: track,
      category: req.body.category,
      author: req.body.author,
      image: `/uploads/audio/${
        req.files.filter((file) => file.fieldname === 'image')[0].filename
      }`,
      orderPriority:orderPriority
    };

    const ebook = await creatAudioBooks(newBook);
    return res
      .status(CREATED)
      .send({
        message: 'Audio book created successfully',
        status: true,
        book: ebook,
      });
  } catch (error) {
    next(error);
    return 'Error';
  }
};

export const getAudioBook = async (req, res, next) => {
  try {
    console.log();
    const ebookList = await fetchAudioBookList(req.params.category);
    return res
      .status(OK)
      .send({
        message: 'Audio Fetch successfully',
        status: true,
        books: ebookList,
      });
  } catch (error) {
    next(error);
    return 'Error';
  }
};
export const deleteAudioBooks = async (req, res, next) => {
  try {
    const audioBookExit = await audiobook.findById(req.params.id);
    if (!audioBookExit) {
      return res
        .status(BAD_REQUEST)
        .send({ message: 'No audio book found', status: false, books: null });
    }
    const audioBook = await deleteAudioBook(req.params.id);
    return res
      .status(OK)
      .send({
        message: 'Audio Book deleted successfully',
        status: true,
        books: audioBook,
      });
  } catch (error) {
    next(error);
    return 'Error';
  }
};
export const getAudioBookById = async (req, res, next) => {
  try {
    const AudioBook = await audiobook.findById(req.params.id);
    if (!AudioBook) {
      return res.status(BAD_REQUEST).send({
        message: 'Audio book not exit',
        status: false,
      });
    }
    return res.status(OK).send({
      message: 'Ebook Fetch successfully',
      status: true,
      book: AudioBook,
    });
  } catch (error) {
    next(error);
    return 'Error';
  }
};
export const getAudioBookAll = async (req, res, next) => {
  try {
    const audioList = await fetchAudioBookAll(req.params.category);
    return res
      .status(OK)
      .send({
        message: 'Audio Fetch successfully',
        status: true,
        books: audioList,
      });
  } catch (error) {
    next(error);
    return 'Error';
  }
};

export const editAudiobooks = async (req, res, next) => {
  try {
    const audioBookExit = await audiobook.findById(req.params.id);
    if (!audioBookExit) {
      return res
        .status(BAD_REQUEST)
        .send({ message: 'Audio book not found', status: false, book: null });
    }
    const newBook = {
      title: req.body.title,
      shortNote: req.body.shortNote,
      category: req.body.category,
      author: req.body.author,
      image: `/uploads/audio/${
        req.files.filter((file) => file.fieldname === 'image')[0].filename
      }`,
    };
    const audioBooks = await editAudiobook(req.params.id,newBook);
    return res
      .status(OK)
      .send({
        message: 'Audio book fetch successfully',
        status: true,
        book: audioBooks,
      });
  } catch (error) {
    next(error);
    return 'Error';
  }
};

// export const updateAudioBookPriority = async (req,res,next) => {
//   console.log("audioBook priority update req.body ===>", req.body)
//   try {
  
//     var priorityArray = req.body;
//     const notUpdatedPiorities = [];
//     var loop = 1;
//     priorityArray.forEach(async (item)=> {
//       await audiobook.find({orderPriority: item.value},{orderPriority:1}, (erros, isPriorityExistInDB) => {
//         if(isPriorityExistInDB.length > 0){
//           var isDBExistInInputArray = priorityArray.filter(function(item1)  {
//             return isPriorityExistInDB[0]._id == item1.id;
//           });
//           console.log("isDBExistInInputArray =>", isDBExistInInputArray)
//           if(isDBExistInInputArray.length > 0){
//             let checkedID = priorityArray.filter(function(item2){
//               return (item2.value === isPriorityExistInDB[0].orderPriority) && (item2.id === isPriorityExistInDB[0]._id)
//             });
//             console.log("checkedID =>", checkedID);
//             if(checkedID.length == 0){
//               console.log("finalInsideL2 : execute update");
//               audiobook.findByIdAndUpdate(item.id, { orderPriority: item.value }).exec(); 
//             }else{
//               console.log("finalInsideL2 : not execute update", item.value);
//               notUpdatedPiorities.push(item.value);
              
//             }
//           }else{
//             console.log("finalInsideL1 : not execute update", item.value, typeof item.value);
//             notUpdatedPiorities.push(item.value);       }
//       }else{
//         console.log("final : execute update");
//         audiobook.findByIdAndUpdate(item.id, { orderPriority: item.value }).exec();
//       }
//       });
//       // console.log(`===============START STEP====================`)
//       // console.log("isPriorityExistInDB =>", isPriorityExistInDB)
//       console.log("notUpdatedPiorities ====>", notUpdatedPiorities);
//       if(priorityArray.length == loop){
//         console.log("notUpdatedPiorities =>", notUpdatedPiorities);
//         var extraMessage = (notUpdatedPiorities.length > 0) ? `Priority ${notUpdatedPiorities.toString()} Cannot be updated due to already exist`: ``;
//         var message = `Order Priority updated. ${extraMessage}`;

//         return res.status(CREATED).send({
//           message: message,
//           status: true
//         });
//       }
//       loop++;
      
//     });
   
    
  

//   } catch (error) {
//     next(error);
//     return "Error";
//   }
// }



export const updateAudioBookPriority = async (req,res,next) => {
  console.log("audioBook priority update req.body ===>", req.body)
  try {
    const highestPriority = await audiobook.find({},{orderPriority:1, _id:0}).sort({orderPriority: -1}).limit(1).exec();
    const id = req.body.id;
    const originalPriority = req.body.originalPriority;
    const changePriority = req.body.changePriority;
    // console.log("heightPriority ===>", highestPriority[0].orderPriority, typeof highestPriority[0].orderPriority);
    // console.log("priority ===>", priority, typeof priority);
    // console.log("condition ===>", parseInt(highestPriority[0].orderPriority) > parseInt(priority))
    if(parseInt(highestPriority[0].orderPriority) > parseInt(changePriority)){
      await audiobook.findOne({orderPriority: changePriority},{orderPriority:1}).exec(async function(err1, result1){
        if(err1){
          return res.status(CREATED).send({
            message: "DB Error",
            status: 'error'
          });
        }else{
          let getDBId = result1._id;
          let getDBPriority = result1.orderPriority;
          await audiobook.findByIdAndUpdate({_id: id},{$set:{orderPriority : changePriority}}).exec(async function(err2, result){
            if(err2){
              return res.status(CREATED).send({
                message: "DB Error",
                status: 'error'
              });
            }else{
              await audiobook.findByIdAndUpdate({_id: getDBId},{$set:{orderPriority : originalPriority}}).exec(async function(err3){
                if(err3){
                  return res.status(CREATED).send({
                    message: "DB Error",
                    status: 'error'
                  });
                }else{
                  return res.status(CREATED).send({
                    message: "Priority change succesfully",
                    status: 'success'
                  });
                }
              })
            }
          })
        }
      })
    }else{
      return res.status(CREATED).send({
        message: "It exceeds the Highest priority",
        status: 'error'
      });
    }
  
  }catch (error) {
    next(error);
    return "Error";
  }
}

export const getAudioListByCategoryId = async (req, res, next) => {
  try {
    console.log();
    const audioList = await fetchAudioBookListByCategoryId(req.params.id);
    return res
      .status(OK)
      .send({
        message: 'Audio Fetch successfully', 
        status: true,
        books: audioList,
      });
  } catch (error) {
    next(error);
    return 'Error';
  }
};
  

