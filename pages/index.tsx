import { useState, useEffect, ReactElement } from "react"
import useFetch from "../hooks/useFetch"
import documentData from "../data/documentData"
import b64toBlob from "b64-to-blob"

console.log(JSON.stringify(documentData, null, 2))

const buttonClassName = "relative block w-full sm:w-auto border border-transparent px-6 py-3 text-base leading-6 font-semibold leading-snug bg-gray-900 text-white rounded-md shadow-md transition ease-in-out duration-150"

export default function Home() {
	const [data, loading, performFetch] = useFetch("https://letspdf.vercel.app/api/make")
	const [pdf, setPdf] = useState<Blob>()

	useEffect(() => {
		if (data?.message) {
			const blob = b64toBlob(data.message, "application/pdf")
			setPdf(blob)
		}
	}, [data, setPdf])

	const generatePDF = async (): Promise<void> => {
		setPdf(undefined)
		const headers = new Headers()
		headers.append("Content-Type", "application/json")
		const json = JSON.stringify({
			document: documentData,
		})

		await performFetch({
			method: "POST",
			headers,
			body: json
		})
	}

  return (
    <div className="flex flex-auto items-center flex-col">
      <div className="bg-gray-100 border border-gray-400 rounded px-5 py-4 w-full max-w-5xl">
        <p>&#123;</p>
        <p>&nbsp;&nbsp;content: [</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;...</p>
        <p>&nbsp;&nbsp;]</p>
        <p>&#125;</p>
      </div>
      <p className="mt-2 italics text-gray-500">For the full object, see the console</p>
      <div className="mt-5">
        <Button
					disabled={loading}
					onClick={generatePDF}
					type="button"
				>{loading ? "Loading..." : "Generate PDF"}</Button>
				{
					pdf && (
						<a
							download
							href={URL.createObjectURL(pdf)}
							target="_blank"
							rel="noopener noreferrer"
							className={`${buttonClassName} bg-blue-600 mt-3`}
						>
							Download PDF
						</a>
					)
				}
			</div>
    </div>
  )
}

const Button = ({children, ...rest}: any): ReactElement => (
	<button
		className={buttonClassName}
		{...rest}
	>{children}</button>
)
