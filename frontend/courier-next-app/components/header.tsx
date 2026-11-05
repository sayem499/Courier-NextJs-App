
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    Menu,
    X,
    Sun,
    Moon,
    MapPinned,
    PackagePlus,
    LogIn,
    LogOut,
} from "lucide-react";

import Dropdownmenu from "./dropdownmenu";
import Login from "./login";
import Nav from "./nav_options";
import Track from "./track_parcel";

import { useLogoutMutation } from "@/redux/users/userApiSlice";
import { logout } from "@/redux/users/userSlice";
import { useLogoutAdminMutation } from "@/redux/admin/adminApiSlice";
import { logoutAdmin } from "@/redux/admin/adminSlice";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRouter, usePathname } from "next/navigation";

const Header: React.FC = () => {
    const [appMode, setAppMode] = useState<"light" | "dark">("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showTrack, setShowTrack] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const path = usePathname();

    const [logoutApi] = useLogoutMutation();
    const [logoutAdminApi] = useLogoutAdminMutation();

    const { user } = useAppSelector((state) => state.userState);
    const { admin } = useAppSelector((state) => state.adminState);

    // Initialize theme from saved preference or system setting
    useEffect(() => {
        const savedTheme = localStorage.getItem("nextcourier-theme");

        const initialTheme =
            savedTheme === "dark" || savedTheme === "light"
                ? savedTheme
                : window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light";

        setAppMode(initialTheme);
    }, []);

    // Apply theme
    useEffect(() => {
        document.documentElement.classList.toggle("dark", appMode === "dark");
    }, [appMode]);

    const changeMode = () => {
        const newMode = appMode === "dark" ? "light" : "dark";
        setAppMode(newMode);
        localStorage.setItem("nextcourier-theme", newMode);
    };

    const logoutFunction = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            setIsMenuOpen(false);
            router.push("/");
        } catch {
            // Keep the current session if logout fails
        }
    };

    const logoutAdminFunction = async () => {
        try {
            await logoutAdminApi().unwrap();
            dispatch(logoutAdmin());
            setIsMenuOpen(false);
            router.push("/admin");
        } catch {
            // Keep the current session if logout fails
        }
    };

    const openLogin = () => {
        setShowLogin(true);
        setIsMenuOpen(false);
    };

    const openTrack = () => {
        setShowTrack(true);
        setIsMenuOpen(false);
    };

    const routeNewParcel = () => {
        setIsMenuOpen(false);
        router.push("/new_parcel");
    };

    const closeLogin = () => setShowLogin(false);
    const closeTrack = () => setShowTrack(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl transition-colors dark:border-slate-700 dark:bg-slate-950/90">
                <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

                    {/* Logo */}
                    <button
                        onClick={() => router.push("/")}
                        className="group flex shrink-0 items-center gap-2"
                        aria-label="NextCourier home"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/20 transition-transform group-hover:scale-105">
                            <Image
                                src="/fast-delivery-truck.png"
                                alt="NextCourier truck"
                                width={32}
                                height={32}
                                className="object-contain"
                                priority
                                unoptimized
                            />
                        </div>

                        <div className="flex flex-col items-start">
                            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                                Next<span className="text-blue-600">Courier</span>
                            </span>
                            <span className="hidden text-[10px] font-medium uppercase tracking-[2px] text-slate-500 dark:text-slate-400 sm:block">
                                Delivering with care
                            </span>
                        </div>
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden flex-1 items-center justify-center gap-3 xl:flex">
                        <Nav user={user} admin={admin} />

                        {user && (
                            <>
                                <button
                                    onClick={openTrack}
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                >
                                    <MapPinned size={17} />
                                    Track Parcel
                                </button>

                                <button
                                    onClick={routeNewParcel}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                                >
                                    <PackagePlus size={17} />
                                    Create Parcel
                                </button>
                            </>
                        )}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden shrink-0 items-center gap-3 xl:flex">
                        <button
                            onClick={changeMode}
                            aria-label="Toggle color theme"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            {appMode === "dark" ? <Sun size={19} /> : <Moon size={19} />}
                        </button>

                        {user && (
                            <button
                                onClick={logoutFunction}
                                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/40"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        )}

                        {admin && (
                            <button
                                onClick={logoutAdminFunction}
                                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/40"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        )}

                        {!user && !admin && path !== "/admin" && (
                            <button
                                onClick={openLogin}
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                            >
                                <LogIn size={16} />
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-2 xl:hidden">
                        <button
                            onClick={changeMode}
                            aria-label="Toggle color theme"
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            {appMode === "dark" ? <Sun size={19} /> : <Moon size={19} />}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                        >
                            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown */}
                {isMenuOpen && (
                    <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-xl dark:border-slate-800 dark:bg-slate-950 xl:hidden">
                        <div className="mx-auto flex max-w-[1440px] flex-col gap-3">
                            <Nav user={user} admin={admin} />

                            {user && (
                                <>
                                    <button
                                        onClick={openTrack}
                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        <MapPinned size={18} />
                                        Track Parcel
                                    </button>

                                    <button
                                        onClick={routeNewParcel}
                                        className="flex w-full items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                    >
                                        <PackagePlus size={18} />
                                        Create Parcel
                                    </button>
                                </>
                            )}

                            {user && (
                                <button
                                    onClick={logoutFunction}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            )}

                            {admin && (
                                <button
                                    onClick={logoutAdminFunction}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                                >
                                    <LogOut size={18} />
                                    Admin Logout
                                </button>
                            )}

                            {!user && !admin && path !== "/admin" && (
                                <button
                                    onClick={openLogin}
                                    className="flex w-full items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                >
                                    <LogIn size={18} />
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {showLogin && <Login closeLogin={closeLogin} />}
            {showTrack && <Track closeTrack={closeTrack} trackerID={null} />}
        </>
    );
};

export default Header;
