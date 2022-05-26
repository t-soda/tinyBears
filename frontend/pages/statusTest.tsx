import { useEffect, useState } from 'react'

type statusProps = {
  success: boolean
  message: string
}
const Mint = () => {
  const [statuses, setStatuses] = useState<statusProps[]>([])

  const addStatus = () => {
    setStatuses([{ success: false, message: 'aa' }, ...statuses])
  }

  const RenderStatus = ({ status }: { status: statusProps }) => {
    return (
      <div
        className={`border ${
          status.success ? 'border-green-500' : 'border-red-400 '
        } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-4`}
      >
        <p className="flex flex-col space-y-2 text-gray-500 text-sm md:text-base break-words ...">
          {status.message}
        </p>
      </div>
    )
  }
  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-white">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full w-full p-2 md:p-10">
          <button onClick={addStatus}>add</button>
          {/* status */}
          {statuses.length > 0 &&
            statuses.map((status) => {
              return <RenderStatus status={status} />
            })}
        </div>
      </div>
    </div>
  )
}

export default Mint
