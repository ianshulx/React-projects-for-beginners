import TipCalculator from './components/TipCalculator'

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Tip Calculator</h1>
        <TipCalculator />
      </div>
    </>
  )
}

export default App
