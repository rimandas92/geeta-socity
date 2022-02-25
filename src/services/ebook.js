import { BAD_REQUEST, CREATED, OK } from "http-status";
import {
  addReviewBooks,
  createEbooks,
  deleteEbook,
  fetchEbookList,
  editEbook,
  getCategory
  // updatePriorityController,
} from "../controller/ebook";
import ebook from "../models/ebook";
import Ebook from "../models/ebook";
// const fs = require("fs");
const { promisify } = require("util");
const scissors = require('scissors');
const pdftk = require('node-pdftk');
const fs = require('fs');
// const unlinkAsync = promisify(fs.unlink);
const PDFExtract = require("pdf.js-extract").PDFExtract;


export const createEbook = async (req, res, next) => {
  try {
    if (req.body.type === "PDF") {
      let ebook = req.files.filter((file) => file.fieldname === "ebook")[0];
      let pdfFile = "./public/uploads/ebooks/" + ebook.filename;
      console.log("check path", fs.existsSync( pdfFile ));
      // var pdfFile = "/var/www/html/nodeserver.brainiuminfotech.com/public_html/projects/pranay/geeta-mvp/geeta-mvp/public/uploads/ebooks/splitpdf/output.pdf";
        var chapterListArray = [];
        req.body.chapterList.forEach((itemChapterList, indexChapterList) => {
        var pageNumber = req.body.chapterList[indexChapterList].pages.map(itemNumber => itemNumber.number);
        console.log(ebook.filename);
        console.log(pageNumber); 
        console.log(pdfFile);
        console.log('Path of file in parent dir:', require('path').resolve(__dirname, '../app.js'));
        //const pdfpath = await pdftk.input(pdfFile);
        var pdf = scissors(pdfFile)
        //.range(1,3) // pages 1-2
        .pages(pageNumber);
        
        // pdf.pdfStream()
        // .pipe(fs.createWriteStream('./public/uploads/ebooks/splitpdf/'+itemChapterList.chapter+'.pdf'))
        // console.log("We're done ", itemChapterList.chapter);
        // let path = '/uploads/ebooks/splitpdf/'+itemChapterList.chapter+'.pdf';
        var pagesObj = { "number": pageNumber, "pdflink": "NA" };
        chapterListArray.push({ "chapter": itemChapterList.chapter, "pages": pagesObj});
    });
      // let totalEbook=await Ebook.find();
      // let totalEbookCount=totalEbook.length;
      // console.log("================totalEbookCount",totalEbookCount);
      const previousPriority = await Ebook.find({},{orderPriority:1, _id:0}).sort({orderPriority: -1}).limit(1).exec();
      const orderPriority = (previousPriority.length > 0)? (previousPriority[0]. orderPriority+ 1) : 1;
      const newBook = {
        title: req.body.title,
        shortNote: req.body.shortNote,
        chapterList: chapterListArray,
        image: `/uploads/ebooks/${
          req.files.filter((file) => file.fieldname === "image")[0].filename
        }`,

        synopsis: req.body.synopsis,
        author: req.body.author,
        originalpdflink: "/uploads/ebooks/" + ebook.filename,
        startpage: req.body.chapterList[0].pages[0].number[0],
        orderPriority:orderPriority
      };
      const ebookcreate = await createEbooks(newBook);
      return res.status(CREATED).send({
        message: "Ebook created successfully",
        status: true,
        book: ebookcreate,
      });
    } else {
      const newBook = {
        title: req.body.title,
        shortNote: req.body.shortNote,
        chapterList: req.body.chapterList,
        image: `/uploads/ebooks/${
          req.files.filter((file) => file.fieldname === "image")[0].filename
        }`,
        synopsis: req.body.synopsis,
        author: req.body.author,
      };
      const ebook = await createEbooks(newBook);
      return res.status(CREATED).send({
        message: "Ebook created successfully",
        status: true,
        book: ebook,
      });
    }
  } catch (error) {
    next(error);
    return "Error";
  }
};

export const getEbookList = async (req, res, next) => {
  try {
    const ebookList = await fetchEbookList();
    return res.status(CREATED).send({
      message: "Ebook Fetch successfully",
      status: true,
      books: ebookList,
    });
  } catch (error) {
    next(error);
    return "Error";
  }
};

export const updateEbook = async (req, res, next) => {
  try {
    const ebookExit = await Ebook.findById(req.params.id);
    // await unlinkAsync(req.files[0].path).catch((err) => {
    //   console.log(err);
    // });
    // const newBook = {
    //   title: req.body.title,
    //   shortNote: req.body.shortNote,
    //   chapter: req.body.chapter,
    //   image: `/uploads/ebooks/${
    //     req.files.filter((file) => file.fieldname === "image")[0].filename
    //   }`,
    //   book_URL: `/uploads/ebooks/${
    //     req.files.filter((file) => file.fieldname === "ebook")[0].filename
    //   }`,
    // };

    const ebook = await editEbook(req, req.params.id);
    return res.status(OK).send({
      message: "Ebook created successfully",
      status: true,
      book: ebook,
    });
  } catch (error) {
    next(error);
    return "Error";
  }
};
export const deleteEbooks = async (req, res, next) => {
  try {
    const ebookExit = await Ebook.findById(req.params.id);
    if (!ebookExit) {
      res.status(BAD_REQUEST).send({
        message: "Ebook not exit",
        status: false,
      });
    }
    // await unlinkAsync(`..\\${ebookExit.book_URL}`).catch((err) => {
    //   console.log(err);
    // });
    // await unlinkAsync(`..\\${ebookExit.image}`).catch((err) => {
    //   console.log(err);
    // });
    const ebook = await deleteEbook(req.params.id);
    return res.status(OK).send({
      message: "Ebook Deleted successfully",
      status: true,
      book: ebook,
    });
  } catch (error) {
    next(error);
    return "Error";
  }
};
export const geteBookById = async (req, res, next) => {
  try {
    const ebookData = await ebook.findById(req.params.id);
    if (!ebookData) {
      return res.status(BAD_REQUEST).send({
        message: "Ebook book not exit",
        status: false,
      });
    }
    return res.status(OK).send({
      message: "Ebook Fetch successfully",
      status: true,
      book: ebookData,
    });
  } catch (error) {
    next(error);
    return "Error";
  }
};
export const createReview = async (req, res, next) => {
  try {
    const ebookExit = await Ebook.findById(req.body.ebookId);
    if (!ebookExit) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "No ebook found", status: false, books: null });
    }
    const review = await addReviewBooks(req.body);
    return res.status(CREATED).send({
      message: "Ebook Review created successfully",
      status: true,
      review: review,
    });
  } catch (error) {
    next(error);
    return "Error";
  }
};

// export const updatePriority  = async (req,res,next) => {
//     try {
    
//       var priorityArray = req.body;
//       const notUpdatedPiorities = [];
//       var loop = 1;
//       priorityArray.forEach(async (item)=> {
//         await Ebook.find({orderPriority: item.value},{orderPriority:1}, (erros, isPriorityExistInDB) => {
//           if(isPriorityExistInDB.length > 0){
//             var isDBExistInInputArray = priorityArray.filter(function(item1)  {
//               return isPriorityExistInDB[0]._id == item1.id;
//             });
//             console.log("isDBExistInInputArray =>", isDBExistInInputArray)
//             if(isDBExistInInputArray.length > 0){
//               let checkedID = priorityArray.filter(function(item2){
//                 return (item2.value === isPriorityExistInDB[0].orderPriority) && (item2.id === isPriorityExistInDB[0]._id)
//               });
//               console.log("checkedID =>", checkedID);
//               if(checkedID.length == 0){
//                 console.log("finalInsideL2 : execute update");
//                 Ebook.findByIdAndUpdate(item.id, { orderPriority: item.value }).exec(); 
//               }else{
//                 console.log("finalInsideL2 : not execute update", item.value);
//                 notUpdatedPiorities.push(item.value);
                
//               }
//             }else{
//               console.log("finalInsideL1 : not execute update", item.value, typeof item.value);
//               notUpdatedPiorities.push(item.value);       }
//         }else{
//           console.log("final : execute update");
//           Ebook.findByIdAndUpdate(item.id, { orderPriority: item.value }).exec();
//         }
//         });
//         // console.log(`===============START STEP====================`)
//         // console.log("isPriorityExistInDB =>", isPriorityExistInDB)
//         console.log("notUpdatedPiorities ====>", notUpdatedPiorities);
//         if(priorityArray.length == loop){
//           console.log("notUpdatedPiorities =>", notUpdatedPiorities);
//           var extraMessage = (notUpdatedPiorities.length > 0) ? `Priority ${notUpdatedPiorities.toString()} Cannot be updated due to already exist`: ``;
//           var message = `Order Priority updated. ${extraMessage}`;
  
//           return res.status(CREATED).send({
//             message: message,
//             status: true
//           });
//         }
//         loop++;
//       });
//     } catch (error) {
//       next(error);
//       return "Error";
//     }
// }


export const updatePriority = async (req,res,next) => {
  console.log("audioBook priority update req.body ===>", req.body)
  try {
    const highestPriority = await Ebook.find({},{orderPriority:1, _id:0}).sort({orderPriority: -1}).limit(1).exec();
    const id = req.body.id;
    const originalPriority = req.body.originalPriority;
    const changePriority = req.body.changePriority;
    if(parseInt(highestPriority[0].orderPriority) > parseInt(changePriority)){
      await Ebook.findOne({orderPriority: changePriority},{orderPriority:1}).exec(async function(err1, result1){
        if(err1){
          return res.status(CREATED).send({
            message: "DB Error",
            status: 'error'
          });
        }else{
          let getDBId = result1._id;
          let getDBPriority = result1.orderPriority;
          await Ebook.findByIdAndUpdate({_id: id},{$set:{orderPriority : changePriority}}).exec(async function(err2, result){
            if(err2){
              return res.status(CREATED).send({
                message: "DB Error",
                status: 'error'
              });
            }else{
              await Ebook.findByIdAndUpdate({_id: getDBId},{$set:{orderPriority : originalPriority}}).exec(async function(err3){
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

export const getCategoryList = async (req, res, next) => {
  try {
    const categoryList = await getCategory();
    return res.status(CREATED).send({
      message: "Category Fetch successfully",
      status: true,
      category: categoryList,
    });
  } catch (error) {
    next(error);
    return "Error";
  }
};

