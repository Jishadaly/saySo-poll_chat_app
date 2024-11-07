import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-white" aria-live="polite" aria-busy="true">
        <Loader2 className="h-12 w-12 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}