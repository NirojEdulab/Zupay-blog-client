import { Skeleton } from "./ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 rounded-lg w-full border-2 p-2">
      <Skeleton className="h-[230px] rounded-lg" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
