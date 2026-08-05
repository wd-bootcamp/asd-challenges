import type { Request, Response } from "express";
import * as blogModel from "../models/blogModel";
import allBlogsResponse from "../views/api/allBlogsResponse";
import { BlogPostingPayload } from "../models/blogModel";

export async function getAllBlogs(req: Request, res: Response) {
  const blogs = await blogModel.getAllBlogsPostings();

  res.json(allBlogsResponse(blogs));
}

export async function getBlogById(req: Request<{ id: string }>, res: Response) {
  const blog = await blogModel.getBlogPostingById(Number(req.params.id));

  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }

  res.json(blog);
}

export async function createBlog(
  req: Request<any, any, BlogPostingPayload>,
  res: Response,
) {
  const blog = await blogModel.createBlogPosting(req.body);
  res.status(201).json(blog);
}

export async function updateBlog(
  req: Request<{ id: string }, any, BlogPostingPayload>,
  res: Response,
) {
  const blog = await blogModel.updateBlogPosting(
    Number(req.params.id),
    req.body,
  );

  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }

  res.json(blog);
}

export async function deleteBlog(req: Request<{ id: string }>, res: Response) {
  const deleted = await blogModel.deleteBlogPosting(Number(req.params.id));

  if (!deleted) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }

  res.status(204).send();
}
