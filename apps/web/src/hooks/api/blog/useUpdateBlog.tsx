'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog, IFormBlog } from '@/types/blog.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';

const useUpdateBlog = (blogId: number) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateBlog = async (payload: Partial<IFormBlog>) => {
    setIsLoading(true);
    try {
      const { category, content, description, thumbnail, title } = payload;

      const updateBlogForm = new FormData();

      if (title) updateBlogForm.append('title', title);
      if (category) updateBlogForm.append('category', category);
      if (content) updateBlogForm.append('content', content);
      if (description) updateBlogForm.append('description', description);
      if (thumbnail)
        thumbnail.forEach((file: FileWithPath) => {
          updateBlogForm.append('thumbnail', file);
        });

      await axiosInstance.patch<Blog>(`/blogs/${blogId}`, updateBlogForm);
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateBlog, isLoading };
};

export default useUpdateBlog;
