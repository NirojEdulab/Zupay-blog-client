import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HomeBanner = ({ postData = [] }) => {
  const latestPost = postData.slice(0, 3);

  if (postData.length === 0) {
    return;
  }

  return (
    <div className="mb-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {latestPost.map((blog, index) => (
            <CarouselItem key={index}>
              <div className="relative max-w-full overflow-hidden rounded-2xl shadow-lg group">
                <img
                  src={blog.image}
                  loading="lazy"
                  alt={`${blog.title} image`}
                  className="transition-transform group-hover:scale-105 duration-200 w-full max-h-[650px] min-h-[450px] object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                  <div className="p-4 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {blog.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-end justify-end">
                  <div className="p-4 text-primary">
                    <Link to={`/posts/${blog._id}`}>
                      <Button variant="outline">See Blog</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeBanner;
