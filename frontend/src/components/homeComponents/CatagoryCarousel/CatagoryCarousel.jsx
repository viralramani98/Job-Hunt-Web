import React from "react";
import { Button } from "../../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

const CategoryCarousel = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full-Stack Developer",
    "Mobile Developer",
    "UI/UX Designer",
  ];

  return (
    <div className="my-20">
      <h2 className="text-center text-3xl font-bold mb-10">
        🌟 Explore Job Categories
      </h2>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 shadow-sm hover:shadow-md transition font-medium border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-3rem]" />
        <CarouselNext className="right-[-3rem]" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
