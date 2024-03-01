function LoadingDots() {
  return (
    <>
      <div className="animate-pulse delay-0">
        <Dot />
      </div>
      <div className="animate-pulse delay-500">
        <Dot />
      </div>
      <div className="animate-pulse delay-1000">
        <Dot />
      </div>
    </>
  )
}

function Dot() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#8b8ea2" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-4 h-4`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export default LoadingDots
