import NavigationHeader from "@/components/NavigationHeader";

function SnippetLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Skeleton Header */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] animate-pulse" />
                <div>
                  <div className="h-8 w-48 bg-[#ffffff08] rounded-lg animate-pulse mb-2" />
                  <div className="flex gap-4">
                    <div className="h-5 w-24 bg-[#ffffff08] rounded animate-pulse" />
                    <div className="h-5 w-24 bg-[#ffffff08] rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            {/* Skeleton Code Editor */}
            <div className="h-[400px] bg-[#ffffff08] rounded-xl animate-pulse" />
          </div>
          {/* Skeleton Comments Section */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="h-6 w-32 bg-[#ffffff08] rounded animate-pulse mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#ffffff08] animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-[#ffffff08] rounded animate-pulse mb-2" />
                    <div className="h-16 bg-[#ffffff08] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default SnippetLoadingSkeleton;
