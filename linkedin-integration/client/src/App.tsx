import { useKeetLink } from "@keet-tech/react-keet-link"
import { useEffect, useState } from "react"

function App() {
  const [linkToken, setLinkToken] = useState<string>("")

  const { open, isReady } = useKeetLink({
    onSuccess: (publicToken: string) => {
      fetch("http://localhost:8000/get-account-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicToken,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
        })
    },
    onValidationError: (errors) => {
      console.error("Keet link validation errors", errors)
    },
    linkToken,
  })

  useEffect(() => {
    fetch("http://localhost:8000/create-link-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        integration: "Venmo",
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setLinkToken(data.linkToken)
      })
  }, [])

  return (
    <div className="flex w-screen h-screen flex-col bg-gray-50 justify-center items-center">
      {isReady ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium" onClick={() => open()}>
          Integrate with LinkedIn
        </button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
