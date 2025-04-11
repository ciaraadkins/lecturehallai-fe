import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Skeleton className="h-8 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-10 w-[120px] rounded-md" />
          <Skeleton className="h-10 w-[120px] rounded-md" />
          <Skeleton className="h-10 w-[120px] rounded-md" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-[200px] w-full" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-[80%] mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <Skeleton className="h-2 w-full mb-2" />
                  <div className="flex justify-between mt-1">
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-3 w-[40px]" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-4 w-[140px]" />
                  <Skeleton className="h-9 w-[100px] rounded-md" />
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
