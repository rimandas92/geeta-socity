import { BAD_REQUEST, CREATED } from "http-status";
import Category from "../models/category";

exports.getCategoryList = async(req, res) => {
    try{
        await Category.find().sort({_id: -1}).exec(function(err, result){
            if(err){
                return res.status(CREATED).send({
                    status: false,
                    message: "some problem occurs to get the category list",
                    resp: "error",
                    result : err
                })
            }else{
                return res.status(CREATED).send({
                    status: true,
                    message: "",
                    resp: "success",
                    result : result
                })
            }
        });
    }catch(err){
        return res.status(BAD_REQUEST).send({
            status: false,
            message: "some problem occurs to get the category list",
            resp: "error",
        })
    }
  }

  exports.getCategoryById = async(req, res) => {
      console.log("Categoryyy updateee",req.body);
    try{
        await Category.find({_id:req.body.id}, function(err, result){
            if(err){
                return res.status(CREATED).send({
                status: false,
                result : err
                })
            }else{
                return res.status(CREATED).send({
                status: true,
                result : result
                })
            }
        });
    }catch(err){
        return res.status(BAD_REQUEST).send({
            status: false,
            result : "server Error"
        })
    }
  }


exports.addUpdateCategory = async(req, res) => {
    if(req.body.id != ''){
        try{
            await Category.findByIdAndUpdate({_id:req.body.id},{$set: {title: req.body.title}}).exec((err, result) =>{
                if(err){
                    return res.status(CREATED).send({
                        status: false,
                        message: "Fail to update category",
                        resp: "error",
                        result : err
                    })
                }else{
                    return res.status(CREATED).send({
                        status: true,
                        message: "successfuly update category",
                        resp: "success",
                        result : result
                    })
                }
            });
        }catch(err){
            return res.status(BAD_REQUEST).send({
                status: false,
                message: "Occur DB error to perform category update",
                resp: "error",
            })
        }
    }else{
        let newData=new Category({
            title : req.body.title,
            isActive: 'true'
        });
        try{
            await newData.save(function(err){

                if(err){
                    return res.status(CREATED).send({
                        status: false,
                        message: "Fail to add category",
                        resp: "error",
                        result : err
                    })
                }else{
                    return res.status(CREATED).send({
                        status: true,
                        message: "successfuly add category",
                        resp: "success",
                    })
                }
            });
        }catch(err){
            return res.status(BAD_REQUEST).send({
                status: false,
                message: "Occur DB error to perform add category",
                resp: "error",
            })
        }  
    }
 
}

exports.deleteCategory = async (req, res) => {
    try {
      await Category.findByIdAndDelete(
        { _id: req.body.id },
        function (err, result) {
          if (err) {
            return res.status(CREATED).send({
              status: false,
              message: "Fail to delete category",
              resp: "error",
              result: err,
            });
          } else {
            return res.status(CREATED).send({
              status: true,
              message: "successfuly delete category",
              resp: "success",
              result: result,
            });
          }
        }
      );
    } catch (err) {
      return res.status(BAD_REQUEST).send({
        status: false,
        message: "Occur DB error to perform category delete",
        resp: "error",
      });
    }
  };
  
  exports.updateStatusCategory = async (req, res) => {
    try {
      await Category.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: { isActive: req.body.status } },
        function (err, result) {
          if (err) {
            return res.status(CREATED).send({
              status: false,
              message: "Status has not been updated.",
              resp: "error",
              result: err,
            });
          } else {
            return res.status(CREATED).send({
              status: true,
              message: "Status has been updated successfully.",
              resp: "success",
              result: result,
            });
          }
        }
      );
    } catch (err){
      return res.status(BAD_REQUEST).send({
        status: false,
        message: "Occur DB error to perform category status update",
        resp: "error",
      });
    }
  };
  