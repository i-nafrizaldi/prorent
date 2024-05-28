import React, { FC } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface ModalConfirmationDeleteBlogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onDeleteBlog: () => void;
}

const ModalConfirmationDeleteBlog: FC<ModalConfirmationDeleteBlogProps> = ({
  open,
  setOpen,
  onDeleteBlog,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be iundone. This will permanently delete your
            account and remove your data from our servers
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Continue
          </AlertDialogCancel>
          <AlertDialogCancel onClick={onDeleteBlog}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ModalConfirmationDeleteBlog;
