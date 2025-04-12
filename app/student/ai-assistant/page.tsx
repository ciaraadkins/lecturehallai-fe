import { Suspense } from "react"
import AIAssistantContent from "./AIAssistantContent"

export default function AIAssistantPage() {
  return (
    <Suspense fallback={<div className="p-6 flex items-center justify-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-64 bg-muted rounded mb-4"></div>
        <div className="h-4 w-48 bg-muted rounded mb-8"></div>
        <div className="h-[500px] w-full max-w-3xl bg-muted rounded"></div>
      </div>
    </div>}>
      <AIAssistantContent />
    </Suspense>
  )
}