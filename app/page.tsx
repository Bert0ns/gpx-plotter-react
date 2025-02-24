import {Button} from "@/app/components/ui/button"
import {ArrowRight, BarChart2, Download, Sliders} from "lucide-react"
import Link from "next/link";
import {HowItWorks} from "@/app/components/atoms/HowItWorks";

export default function LandingPage() {
    return (
        <main>
            <section className="relative flex flex-col items-center w-full py-4 md:py-24 lg:py-32 xl:py-44 text-center container mx-auto max-w-7xl px-4 md:px-6">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/LandingPage_background.jpeg')" }}
                />
                <div className="relative z-10 space-y-4 ">
                    <div className="space-y-2 text-gray-50">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Visualize Your Adventures with GPX Plotter
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
                            Transform your .gpx files into beautiful, interactive elevation charts. Perfect for
                            hikers, cyclists,
                            and outdoor enthusiasts.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link href={"/plot"}>
                            <Button size={"lg"}>
                                Get Started <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                        <Link href={"/about"}>
                            <Button variant="outline" size={"lg"}>Learn More</Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <BarChart2 className="h-12 w-12 mb-4 text-primary"/>
                            <h3 className="text-xl font-bold mb-2">Interactive Charts</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Create beautiful, responsive elevation charts from your .gpx files.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Sliders className="h-12 w-12 mb-4 text-primary"/>
                            <h3 className="text-xl font-bold mb-2">Customizable</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Adjust colors, line thickness, and add custom data labels to your charts.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Download className="h-12 w-12 mb-4 text-primary"/>
                            <h3 className="text-xl font-bold mb-2">Easy Export</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Download your charts as high-quality images for sharing or printing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <HowItWorks/>
            <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Visualize Your
                                Adventures?</h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Start plotting your .gpx files and create stunning elevation charts in minutes.
                            </p>
                        </div>
                        <Link href={"/plot"}>
                            <Button size="lg">
                                Try GPX Plotter Now
                                <ArrowRight className="ml-2 h-5 w-5"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}



