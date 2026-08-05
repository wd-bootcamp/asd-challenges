import { getDatabase } from "../db/database";

export type BlogPosting = {
  id: number;
  title: string;
  content: string;
};

export type BlogPostingPayload = Omit<BlogPosting, "id">;

export async function getAllBlogsPostings(): Promise<BlogPosting[]> {
  const db = getDatabase();

  const result = await db.all<BlogPosting[]>("SELECT * FROM posting");
  console.log("Retrieved blog postings from database:", result);
  return result;
}

export async function getBlogPostingById(
  id: number,
): Promise<BlogPosting | undefined> {
  const db = getDatabase();
  return await db.get<BlogPosting>("SELECT * FROM posting WHERE id = ?", id);
}

export async function createBlogPosting(
  blogPosting: Omit<BlogPosting, "id">,
): Promise<BlogPosting> {
  const db = getDatabase();

  const result = await db.run(
    "INSERT INTO posting (title, content) VALUES (?, ?)",
    blogPosting.title,
    blogPosting.content,
  );
  if (result.lastID === undefined) {
    throw new Error("Failed to create blog posting");
  }
  return { id: result.lastID, ...blogPosting };
}

export async function updateBlogPosting(
  id: number,
  blogPosting: Omit<BlogPosting, "id">,
): Promise<BlogPosting | undefined> {
  const db = getDatabase();

  const result = await db.run(
    "UPDATE posting SET title = ?, content = ? WHERE id = ?",
    blogPosting.title,
    blogPosting.content,
    id,
  );

  if (!result.changes) {
    return undefined;
  }
  return { id, ...blogPosting };
}

export async function deleteBlogPosting(id: number): Promise<boolean> {
  const db = getDatabase();

  const result = await db.run("DELETE FROM posting WHERE id = ?", id);
  return Boolean(result.changes);
}
