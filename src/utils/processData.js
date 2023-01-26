export function processData(csvData) {
  try {
    if (!Array.isArray(csvData)) {
      throw new Error("Invalid CSV Format");
    }

    /**
     * Your custom function for processing the CSV data goes underneath
     */

    const processedCSVData = csvData.map((row) => {
      // In this example the CSV data is returned with the first column capitalised
      const newRow = [row[0].toUpperCase(), ...row.slice(1)];
      return newRow;
    });

    /**
     * Your custom function for processing the CSV data goes above
     */

    return processedCSVData;
  } catch (error) {
    return {
      error: `${error.message}`,
    };
  }
}
