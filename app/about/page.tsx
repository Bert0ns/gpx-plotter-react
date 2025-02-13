import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Github } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen items-center">

            <main className="flex-1 w-full">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto max-w-3xl px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-center">
                            About GPX Plotter
                        </h1>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
                            GPX Plotter is a powerful tool designed to help outdoor enthusiasts visualize their adventures.
                        </p>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Our mission is to provide hikers, cyclists, and explorers with an easy-to-use platform to transform
                                    their GPS data into meaningful and beautiful visualizations. We believe that every adventure has a
                                    story, and we&#39;re here to help you tell it through data.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    GPX Plotter takes your .gpx files and turns them into interactive elevation charts. Whether you&#39;re
                                    analyzing your performance, reliving your journey, or planning your next trip, our tool provides
                                    valuable insights into your outdoor activities.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We&#39;re a small team of outdoor enthusiasts and tech lovers. Our diverse backgrounds in software
                                    development, data visualization, and adventure sports come together to create a tool that we&#39;re truly
                                    passionate about.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We believe in the power of community and open source. That&#39;s why GPX Plotter is freely available on
                                    GitHub. We welcome contributions, feedback, and collaboration from fellow developers and outdoor
                                    enthusiasts.
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href="https://github.com/Bert0ns/gpx-plotter-react.git"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline">
                                            View on GitHub
                                            <Github className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

