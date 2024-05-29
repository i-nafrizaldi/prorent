'use client';

import { useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import logo from '../../public/logo1.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { id } = useAppSelector((state) => state.user);

  const router = useRouter();

  const dispactch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    dispactch(logoutAction());
  };

  return (
    <>
      <nav className="container mx-auto px-6 py-3 flex justify-between">
        <div className=" place-content-center flex items-center">
          <Image
            alt="seua."
            src={logo}
            className="object-contain cursor-pointer"
            width={120}
            height={100}
          />
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center w-[90px] justify-between border rounded-full py-2 px-2 hover:shadow-md hover:duration-300 ">
              <Menu size={20} />
              <Avatar className="" style={{ width: 34, height: 34 }}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute -right-20 w-80 gap-3 rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
