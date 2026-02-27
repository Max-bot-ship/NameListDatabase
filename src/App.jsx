import { useEffect, useState } from 'react'
import { getNames } from './api.js'

function App() {
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        await getNames()
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load names')
      }
    }

    load()
  }, [])

  return (
    <main>
      <h1>Peery Hall Makerspace Database</h1>
      {error && <p>{error}</p>}
    </main>
  )
}

export default App
