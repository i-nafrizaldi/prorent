'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { IFormBlog } from '@/types/blog.type';
import { useFormikContext } from 'formik';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface BlogEditFormProps {
  isLoading: boolean;
}

const BlogEditForm: FC<BlogEditFormProps> = ({ isLoading }) => {
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormikContext<IFormBlog>();
  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <FormInput
          name="title"
          type="text"
          label="Title"
          placeholder="Title"
          value={values.title}
          error={errors.title}
          isError={!!touched.title && !!errors.title}
          handleChange={handleChange}
          handleBlur={handleBlur}
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
          <Button
            type="submit"
            className=" mt-6 w-full text-white"
            disabled={isLoading}
          >
            {isLoading ?? <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Email sent' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogEditForm;
