import { CSVLink } from "react-csv"
import { useState } from "react"
import { processData } from "../utils/processData"

function CSVProcessor() {
  // State to store the CSV data
  const [csvData, setCsvData] = useState([])
  // State to store the processed CSV data
  const [processedCsvData, setProcessedCsvData] = useState([])
  // State to store the uploaded file
  const [file, setFile] = useState(null)
  // State to handle the loading state
  const [isLoading, setIsLoading] = useState(false)
  // State to handle the error state
  const [isError, setIsError] = useState(false)
  // State to store the error message
  const [errorMessage, setErrorMessage] = useState("")
  // State to handle displaying the download button
  const [isProcessed, setIsProcessed] = useState(false)

  /**
   * Handle file upload
   * @param {FileList} files - The list of files the user selected
   */

  function handleOnFileLoad(files) {
    // reset error state
    setIsError(false)
    setErrorMessage("")
    setIsProcessed(false)

    // check if the file is a csv
    if (!files[0].name.endsWith(".csv")) {
      setIsError(true)
      setErrorMessage("Invalid file format, please upload a CSV file.")
      return
    }

    setFile(files[0])
    setIsLoading(true)

    const reader = new FileReader()

    reader.onload = (e) => {
      const csv = e.target.result
      try {
        // Split the CSV into rows and columns
        const data = csv.split(/\r\n|\n/)
        const csvData = data.map((row) => row.split(","))
        setCsvData(csvData)
        setIsLoading(false)
      } catch (err) {
        setIsProcessed(false)
        setIsError(true)
        setErrorMessage(
          "Error parsing the CSV file, please upload a valid CSV file."
        )
        setIsLoading(false)
      }
    }

    reader.readAsText(files[0])
  }

  /**
   * Handle data processing
   */
  function handleProcessData() {
    // Process the data here
    if (isError || !csvData?.length) {
      return
    }
    const processedData = processData(csvData)
    if (processedData.error) {
      setIsProcessed(false)
      setIsError(true)
      setErrorMessage(processedData.error)
    } else {
      setIsError(false)
      setErrorMessage("")
      setProcessedCsvData(processedData)
      setIsProcessed(true)
    }
  }

  return (
    <>
      <div className="container">
        {isError && <p className="error-message">{errorMessage}</p>}
        <input
          type="file"
          onChange={(e) => handleOnFileLoad(e.target.files)}
          className={`input-file ${isError} ? 'input-file-error : ''}`}
        />
        {isLoading && file ? (
          <p>Loading...</p>
        ) : (
          <>
            <button className="process-data-button" onClick={handleProcessData}>
              Process Data
            </button>
            {isProcessed && csvData.length && file ? (
              <>
                <div className="success-text">
                  Your CSV file has been processed and is ready to download.
                </div>
                {Array.isArray(processedCsvData) ? (
                  <CSVLink
                    data={processedCsvData}
                    filename={`${file?.name}`}
                    className="csv-link"
                  >
                    Download
                  </CSVLink>
                ) : null}
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  )
}

export default CSVProcessor
