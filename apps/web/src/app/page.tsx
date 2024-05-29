'use client';
import AutoComplete from '@/components/AutoComplete';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { appConfig } from '@/utils/config';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { data: blogs, meta } = useGetBlogs({
    page,
    take: 3,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) =>
    setPage(selected + 1);

  return (
    <main>
      {/*JUMBOTRON*/}
      <section className="text-center bg-[url('../../public/hero.jpg')] text-white h-[500px] bg-cover bg-no-repeat bg-center w-full">
        <div className="container mx-auto ">
          <h1 className="text-4xl font-bold">Discover your next adventure!</h1>
          <p className="text-xl">
            Unearth amazing deals on hotels, cozy homes, and beyond...
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 ">
        <AutoComplete />

        {/* CARD */}
        <section className=" grid grid-cols-3 gap-5">
          {blogs.map((blog, index) => {
            return (
              <BlogCard
                key={index}
                title={blog.title}
                author={blog.user.fullName}
                category={blog.category}
                description={blog.description}
                createdAt={new Date(blog.createdAt)}
                imageUrl={appConfig.baseUrl + `/assets${blog.thumbnail}`}
                blogId={blog.id}
              />
            );
          })}
        </section>
        <div>
          <Pagination
            total={meta?.total || 0}
            take={meta?.take || 0}
            onChangePage={handleChangePaginate}
          />
        </div>
      </div>
    </main>
  );
}
