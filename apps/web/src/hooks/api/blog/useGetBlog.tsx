'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGetBlog = (id: number) => {
  const [data, setData] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBlog = async () => {
    try {
      const { data } = await axiosInstance.get(`/blogs/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBlog();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { blog: data, isLoading, refetch: getBlog };
};

export default useGetBlog;
