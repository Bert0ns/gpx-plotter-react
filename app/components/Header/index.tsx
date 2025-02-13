import Link from "next/link";
import {Map} from "lucide-react";
import {FC} from "react";

const Header: FC = () => {
    return(
        <header className="w-full px-4 lg:px-6 h-14 flex items-center justify-between max-w-7xl mx-auto">
            <Link href="/" className="flex items-center justify-center">
                <Map className="h-6 w-6 mr-2" />
                <span className="font-bold">GPX Plotter</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href="/plot" className="text-sm font-medium hover:underline underline-offset-4">
                    Plot
                </Link>
                <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                    Home
                </Link>
                <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                    About
                </Link>
            </nav>
        </header>
    )
}

export default Header;