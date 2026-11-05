"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRegisterMutation } from '@/redux/users/userApiSlice';
import { setUserData } from '@/redux/users/userSlice';

import { toast } from 'react-toastify';
import Track from './track_parcel';

import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  PackageSearch,
  ArrowRight,
  Truck,
} from 'lucide-react';

const Signup: React.FC = () => {
  const [id] = useState(() => uuidv4());

  const [user_firstname, setFirstName] = useState('');
  const [user_lastname, setLastName] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user_phonenumber, setPhonenumber] = useState('');

  const [showTrack, setShowTrack] = useState(false);
  const [trackerId, setTrackerId] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector(state => state.userState);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user_password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await register({
        _id: id,
        user_firstname,
        user_lastname,
        user_email,
        user_password,
        user_phonenumber,
      }).unwrap();

      dispatch(setUserData({ ...res }));
      router.push('/home');

    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || 'Registration failed');
    }
  };

  const inputStyle = `
    w-full rounded-xl border border-slate-200
    bg-slate-50 px-4 py-3 text-sm text-slate-800
    outline-none transition-all duration-200
    placeholder:text-slate-400
    focus:border-blue-500 focus:bg-white
    focus:ring-4 focus:ring-blue-500/10
    dark:border-slate-700 dark:bg-slate-800
    dark:text-white dark:placeholder:text-slate-500
    dark:focus:bg-slate-800
  `;

  const closeTrack = () => {
    setShowTrack(false);
  };

  return (
    <>
      <div className="relative flex w-full max-w-md flex-col
        rounded-2xl border border-slate-100 bg-white
        p-5 shadow-lg shadow-slate-200/50
        dark:border-slate-700 dark:bg-slate-800
        dark:shadow-black/20
        sm:p-7">

        {/* Header */}
        <div className="mb-6 text-center">

          <div className="mx-auto mb-3 flex h-12 w-12
            items-center justify-center rounded-2xl
            bg-blue-100 text-blue-600
            dark:bg-blue-500/15 dark:text-blue-400">

            <Truck size={25} />

          </div>

          <h2 className="text-2xl font-bold tracking-tight
            text-slate-900 dark:text-white">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Join NextCourier and experience smarter delivery.
          </p>

        </div>

        {/* Signup Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-3">

          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="mb-1.5 block text-xs font-semibold
                text-slate-600 dark:text-slate-300">
                First Name
              </label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2
                  -translate-y-1/2 text-slate-400" size={17} />

                <input
                  required
                  value={user_firstname}
                  onChange={e => setFirstName(e.target.value)}
                  className={`${inputStyle} pl-10`}
                  placeholder="First name"
                  type="text"
                  name="user_firstname"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold
                text-slate-600 dark:text-slate-300">
                Last Name
              </label>

              <input
                required
                value={user_lastname}
                onChange={e => setLastName(e.target.value)}
                className={inputStyle}
                placeholder="Last name"
                type="text"
                name="user_lastname"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold
              text-slate-600 dark:text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2
                -translate-y-1/2 text-slate-400" size={17} />

              <input
                required
                value={user_email}
                onChange={e => setEmail(e.target.value)}
                className={`${inputStyle} pl-10`}
                placeholder="example@email.com"
                type="email"
                name="user_email"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold
              text-slate-600 dark:text-slate-300">
              Phone Number
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2
                -translate-y-1/2 text-slate-400" size={17} />

              <input
                required
                value={user_phonenumber}
                onChange={e => setPhonenumber(e.target.value)}
                className={`${inputStyle} pl-10`}
                placeholder="01XXXXXXXXX"
                type="tel"
                name="user_phonenumber"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold
              text-slate-600 dark:text-slate-300">
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2
                -translate-y-1/2 text-slate-400" size={17} />

              <input
                required
                minLength={8}
                value={user_password}
                onChange={e => setPassword(e.target.value)}
                className={`${inputStyle} pl-10`}
                placeholder="Create password"
                type="password"
                name="user_password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold
              text-slate-600 dark:text-slate-300">
              Confirm Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2
                -translate-y-1/2 text-slate-400" size={17} />

              <input
                required
                minLength={8}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`${inputStyle} pl-10`}
                placeholder="Confirm password"
                type="password"
                name="confirm_password"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group mt-3 flex w-full items-center
              justify-center gap-2 rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              py-3.5 text-sm font-semibold text-white
              shadow-lg shadow-blue-500/20
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-xl
              hover:shadow-blue-500/30
              disabled:cursor-not-allowed disabled:opacity-60">

            {isLoading ? 'Creating account...' : 'Create Account'}

            {!isLoading && (
              <ArrowRight
                size={17}
                className="transition-transform duration-300
                  group-hover:translate-x-1"
              />
            )}

          </button>

        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

          <span className="text-xs font-medium text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Tracking Section */}
        <div className="rounded-xl border border-blue-100
          bg-blue-50/70 p-4 dark:border-blue-500/20
          dark:bg-blue-500/5">

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center
              rounded-lg bg-blue-100 text-blue-600
              dark:bg-blue-500/20 dark:text-blue-400">

              <PackageSearch size={19} />

            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800
                dark:text-white">
                Track Your Parcel
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your tracking ID below.
              </p>
            </div>

          </div>

          <div className="flex gap-2">

            <input
              value={trackerId}
              onChange={e => setTrackerId(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (trackerId.trim()) setShowTrack(true);
                }
              }}
              className="min-w-0 flex-1 rounded-lg border
                border-slate-200 bg-white px-3 py-2.5
                text-sm text-slate-800 outline-none
                transition-all focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/10
                dark:border-slate-700 dark:bg-slate-800
                dark:text-white"
              placeholder="Tracking ID"
              type="text"
            />

            <button
              type="button"
              disabled={!trackerId.trim()}
              onClick={() => setShowTrack(true)}
              className="rounded-lg bg-slate-900 px-4
                text-sm font-semibold text-white
                transition-all hover:bg-blue-600
                disabled:cursor-not-allowed disabled:opacity-40
                dark:bg-blue-600 dark:hover:bg-blue-500">

              Track

            </button>

          </div>

        </div>

      </div>

      {showTrack && (
        <Track
          closeTrack={closeTrack}
          trackerID={trackerId}
        />
      )}
    </>
  );
};

export default Signup;