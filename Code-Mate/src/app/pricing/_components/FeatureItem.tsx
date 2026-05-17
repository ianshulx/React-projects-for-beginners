import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 group">
    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 group-hover:bg-blue-500/20 transition-colors">
      <Check className="w-3 h-3 text-blue-400" />
    </div>
    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{children}</span>
  </div>
);

export default FeatureItem;
