
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: 'The symptom checker was incredibly accurate! It correctly identified my condition and recommended a specialist who was able to help me. This app has saved me so much time and worry.The doctor recommendations were spot on! I found a specialist who understood my condition perfectly. The entire experience from symptom checking to appointment booking was smooth.',
      author: 'Hosea Mathews',
    },
    {
      id: 2,
      text: "I was skeptical at first, but this health app has been a game-changer for me. The appointment booking is seamless, and I love being able to see my medical history all in one place.I have recommended this app to all my family members. It's like having a personal health assistant in your pocket. The interface is clean and easy to use, even for someone not tech-savvy like me.",
      author: 'Michael Chen',
    },
    {
      id: 3,
      text: 'As someone with a chronic condition, keeping track of my symptoms and appointments used to be overwhelming. This app has made managing my health so much easier and more organized.The doctor recommendations were spot on! I found a specialist who understood my condition perfectly. The entire experience from symptom checking to appointment booking was smooth.',
      author: 'Sadie Adler',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div id="review" className="py-16 bg-white">
      <div className="custom-container">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1E40AF]">
          What Our Users Say
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-[-20px] md:left-[-80px] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={46} />
          </button>

          {/* Testimonial Card */}
          <div className="overflow-hidden h-[300px] rounded-lg bg-[#EFF6FF] shadow-custom">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-none w-full p-8">
                  <div className="mb-6">
                    <span className="text-4xl font-serif">"</span>
                    <p className="text-gray-800 leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                  <p className="font-medium text-[#1E40AF]">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-[-20px] md:right-[-80px] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={46} />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === slideIndex ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
