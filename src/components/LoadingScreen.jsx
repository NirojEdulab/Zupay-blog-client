import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <Loader2 size={64} className="mr-2 animate-spin" />
    </div>
  );
};

export default LoadingScreen;
