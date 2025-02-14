"use client"
import {FC} from "react";
import Link from "next/link";
import {Github} from "lucide-react"

const Footer: FC = () => {
    const thisYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-inner">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">GPX Plotter App</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {thisYear} Powered by Bertons
                            ❤️</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Connect With Us</h3>
                        <div className="flex justify-center md:justify-end space-x-4 mt-2">
                            <Link
                                href="https://github.com/Bert0ns/gpx-plotter-react.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <div className="flex flex-row">
                                    Github
                                    <Github className="h-6 w-6"/>
                                </div>
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>)
}

export default Footer