'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog, IFormBlog } from '@/types/blog.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'sonner';

const useCreateBlog = () => {
  const router = useRouter();
  const createBlog = async (payload: IFormBlog) => {
    try {
      const { category, content, description, thumbnail, title, userId } =
        payload;

      //form data hanya bisa string.
      const createBlogForm = new FormData();

      createBlogForm.append('title', title);
      createBlogForm.append('category', category);
      createBlogForm.append('content', content);
      createBlogForm.append('description', description);
      createBlogForm.append('userId', String(userId)); // di back end dirubah lagi ke number

      thumbnail.forEach((file: FileWithPath) => {
        createBlogForm.append('thumbnail', file);
      });

      await axiosInstance.post<Blog>('/blogs', createBlogForm);
      //toast success here
      router.push('/');
      toast.success;
    } catch (error) {
      if (error instanceof AxiosError) {
        //put toast here
        toast.error(error.response?.data);
      }
    }
  };
  return { createBlog };
};

export default useCreateBlog;
