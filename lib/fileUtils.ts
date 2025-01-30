/**
 * Returns the file read as a string
 * @param inputFile
 */
export function readFile(inputFile: File): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const fileContent: string | null = e.target?.result as string | null
            resolve(fileContent)
        }
        reader.onerror = (error) => {
            console.error(error)
            reject(error)
        }
        reader.readAsText(inputFile)
    })
}