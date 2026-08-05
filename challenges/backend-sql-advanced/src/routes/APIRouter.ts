import express from "express";
import * as APIController from "../controller/APIController";

const APIRouter = express.Router();

APIRouter.get("/blogs", APIController.getAllBlogs);
APIRouter.get("/blogs/:id", APIController.getBlogById);
APIRouter.post("/blogs", APIController.createBlog);
APIRouter.put("/blogs/:id", APIController.updateBlog);
APIRouter.delete("/blogs/:id", APIController.deleteBlog);

export default APIRouter;
