'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useCreateBlog from '@/hooks/api/blog/useCreateBlog';
import { useAppSelector } from '@/redux/hooks';
import { IFormBlog } from '@/types/blog.type';

import { useFormik } from 'formik';

const Write = () => {
  const { createBlog } = useCreateBlog();
  const { id } = useAppSelector((state) => state.user);

  const {
    values,
    setFieldValue,
    handleSubmit,
    errors,
    handleBlur,
    handleChange,
    touched,
  } = useFormik<IFormBlog>({
    initialValues: {
      title: '',
      category: '',
      thumbnail: [],
      description: '',
      content: '',
    },
    onSubmit: (value) => {
      createBlog({ ...value, userId: id });
    },
  });
  return (
    <main className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-5">
          <FormInput
            name="title"
            label="Title"
            error={errors.title}
            isError={!!touched.title && !!errors.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
            placeholder="Title"
            type="text"
            value={values.title}
          />
          <FormInput
            name="category"
            label="Category"
            error={errors.category}
            isError={!!touched.category && !!errors.category}
            handleBlur={handleBlur}
            handleChange={handleChange}
            placeholder="Category"
            type="text"
            value={values.category}
          />

          <FormTextArea
            name="description"
            label="Description"
            error={errors.description}
            isError={!!touched.description && !!errors.description}
            handleBlur={handleBlur}
            handleChange={handleChange}
            placeholder="Description"
            value={values.description}
          />

          <PreviewImages
            fileImages={values.thumbnail}
            onRemoveImage={(idx: number) =>
              setFieldValue('thumbnail', values.thumbnail.toSpliced(idx, 1))
            }
          />

          <Dropzone
            isError={Boolean(errors.thumbnail)}
            label="Thumbnail"
            onDrop={(files) =>
              setFieldValue('thumbnail', [
                ...values.thumbnail,
                ...files.map((file) => file),
              ])
            }
          />

          <RichTextEditor
            onChange={(html: string) => setFieldValue('content', html)}
            label="Content"
            value={values.content}
            isError={Boolean(errors.content)}
          />

          <div className="mb-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AuthGuard(Write);
