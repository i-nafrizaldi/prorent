import { BlogController } from '@/controllers/blog.controller';
import { uploader } from '@/lib/uploader';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class BlogRouter {
  private blogController: BlogController;
  private router: Router;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.intializeRouters();
  }

  private intializeRouters(): void {
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', '/images').array('thumbnail', 1),
      this.blogController.createBlogController,
    );
    this.router.get('/', this.blogController.getBlogsController);
    this.router.get('/:id', this.blogController.getBlogController);
    this.router.patch(
      '/:id',
      verifyToken,
      uploader('IMG', '/images').array('thumbnail', 1),
      this.blogController.updateBlogController,
    );
    this.router.delete(
      '/:id',
      verifyToken,
      this.blogController.deleteBlogController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
