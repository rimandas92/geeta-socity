import { Router } from "express";
import {
  getCategoryList,
  getCategoryById,
  addUpdateCategory,
  deleteCategory,
  updateStatusCategory
} from "../../services/category";
export default (app) => {
  const router = Router();
  app.use("/category", router);
  
  router.route("/get-category-list").get(getCategoryList);
  router.route("/get-category-by-id").post(getCategoryById);
  router.route("/add-update-category").post(addUpdateCategory);
  router.route("/delete-category").post(deleteCategory);
  router.route("/update-status-category").post(updateStatusCategory);
  router.route("/").get(getCategoryList);
};
