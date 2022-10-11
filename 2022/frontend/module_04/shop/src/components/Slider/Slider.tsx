import * as React from 'react';
import { useKeenSlider } from 'keen-slider/react';

type SliderProps = {
  children: React.ReactNode;
};

function Slider({ children }: SliderProps) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 48,
      },
    },
    []
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {React.Children.map(children, (child) => (
        <div className="keen-slider__slide">{child}</div>
      ))}
    </div>
  );
}

export default Slider;
