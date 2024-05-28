'use client';

import { useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const { id } = useAppSelector((state) => state.user);

  const router = useRouter();

  const dispactch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    dispactch(logoutAction());
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div className=" flex items-center justify-between py-2">
          <h1>LOGO</h1>

          {Boolean(id) ? (
            <div className="flex items-center gap-8">
              <h2 onClick={() => router.push('/')}>Home</h2>
              <h2 onClick={() => router.push('/write')}>Write</h2>
              <h2 onClick={() => router.push('/profile')}>Profile</h2>
              <h2 onClick={logout}>Logout</h2>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <h2 onClick={() => router.push('/')}>Home</h2>
              <h2 onClick={() => router.push('/login')}>Login</h2>
              <h2 onClick={() => router.push('/register')}>Register</h2>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
