'use client';
import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { appConfig } from '@/utils/config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';

interface BlogOption {
  value: number;
  label: string;
}

const AutoComplete = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading } = useGetBlogs({ search });
  const loadOptions = (
    inputValue: string,
    callback: (options: BlogOption[]) => void,
  ) => {
    try {
      const options = data.map((blog) => {
        return {
          label: blog.title,
          value: blog.id,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debounceLoadOption = debounce(loadOptions, 750);
  return (
    <AsyncSelect
      placeholder="Search for articles"
      className="mx-auto my-4 max-w[650px]"
      loadOptions={debounceLoadOption}
      isLoading={isLoading}
      onChange={(blog) => {
        router.push(appConfig.baseUrlNext + `/${blog?.value}`);
      }}
    />
  );
};
export default AutoComplete;
