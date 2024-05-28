import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useDeleteBlog = () => {
  const router = useRouter();

  const deleteBlog = async (id: number) => {
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
      }
      console.log(error);
    }
  };
  return { deleteBlog };
};

export default useDeleteBlog;
