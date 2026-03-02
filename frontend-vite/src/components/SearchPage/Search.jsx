import { Header } from "./Header"
import { SearchBox } from "./SearchBox"
import { Bottom } from "./Bottom"
import { useState, useEffect } from "react"

export const Search = () => {
  const [dataa, setData] = useState([])

  // 🔹 Function to fetch real flight data
  const fetchFlights = async (from, to) => {
    try {
      // 🧩 Using AllOrigins to safely wrap the HTTP API
      const apiURL = `http://api.aviationstack.com/v1/flights?limit=20&dep_iata=${from}&arr_iata=${to}&access_key=d66eceee76701fb256a382e2402fc43b`
      const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(
        apiURL
      )}`

      const response = await fetch(proxyURL)
      const wrappedData = await response.json()
      const actualData = JSON.parse(wrappedData.contents)

      if (!actualData.data || actualData.data.length === 0) {
        alert("No flights found for this route 😕")
        return
      }

      setData(actualData.data)
    } catch (error) {
      console.error("Error fetching flights:", error)
      alert("Failed to fetch flights. Please try again.")
    }
  }

  // 🔹 When user selects FROM and TO airports manually
  const handleSelect = (select) => {
    fetchFlights(select.from, select.to)
  }

  // 🔹 On page load, fetch based on localStorage data (like MMT does)
  useEffect(() => {
    const saved = localStorage.getItem("myKey")
    if (saved) {
      const route = JSON.parse(saved)
      fetchFlights(route.from, route.to)
    }
  }, [])

  // 🔹 Sort: Low → High (delay time)
  const handleSort = (lowToHigh) => {
    if (lowToHigh) {
      const sorted = [...dataa].sort(
        (a, b) => +a.departure.delay - +b.departure.delay
      )
      setData(sorted)
    }
  }

  // 🔹 Sort: High → Low
  const handleHigh = (highToLow) => {
    if (highToLow) {
      const sorted = [...dataa]
        .sort((a, b) => +a.departure.delay - +b.departure.delay)
        .reverse()
      setData(sorted)
    }
  }

  // 🔹 Store booking details
  const bookData = (flight) => {
    localStorage.setItem("buy", JSON.stringify(flight))
  }

  return (
    <>
      <Header />
      <SearchBox handle={handleSelect} />
      <Bottom
        data={dataa}
        bookData={bookData}
        sorthigh={handleHigh}
        sorting={handleSort}
      />
    </>
  )
}
