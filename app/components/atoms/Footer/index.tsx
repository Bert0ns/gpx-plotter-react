"use client"
import React, { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
    const thisYear = new Date().getFullYear();
    return (
        <footer className="bg-white dark:bg-gray-800 shadow mt-12">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-300">
                <p>&copy; {thisYear} GPX Plotter App</p>
                <p>Powered by Bertons</p>
                <p>Find this project on <Link className={"underline"} href={""} onClick={() => window.open('https://github.com/Bert0ns/gpx-plotter-react.git', '_blank')}>
                        Github
                    </Link>
                </p>
            </div>
        </footer>
  )
}

export default Footer