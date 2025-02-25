
export function HowItWorks() {
    return (
        <section className="w-full py-12 md:py-20 lg:py-28">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                            1
                        </div>
                        <h3 className="text-xl font-bold mb-2">Upload GPX Files</h3>
                        <p className="text-gray-500 dark:text-gray-400">Select one or more .gpx files from your
                            device.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                            2
                        </div>
                        <h3 className="text-xl font-bold mb-2">Generate Chart</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Our app processes your files and creates an elevation chart.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                            3
                        </div>
                        <h3 className="text-xl font-bold mb-2">Customize & Export</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Adjust the chart to your liking and download the result.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}