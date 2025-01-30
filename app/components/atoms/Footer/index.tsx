import React, { FC } from "react";
import FooterProps from "./index.types"

const Footer: FC<FooterProps> = ({ }) => {
    const thisYear = new Date().getFullYear();
    return (
        <footer className="bg-white dark:bg-gray-800 shadow mt-12">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-300">
                <p>&copy; {thisYear} GPX Plotter App. Project for University.</p>
                <p>Powered by Bertons</p>
            </div>
        </footer>
  )
}

export default Footer