import { useEffect, useState } from 'react';
import bannerBg from '../assets/images/banner.jpg';
import bannerImg from '../assets/images/banner-img.png';
import animtedCircle from '../assets/images/animated-circle.png';
import './Banner.css'; 
import { MoveUpRight, Star  } from 'lucide-react';
import Typewriter from 'typewriter-effect'



const Banner = () => {


  const [dots, setDots] = useState([]);

  useEffect(() => {

    // Generate initial dots
    const newDots = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      opacity: Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));
    setDots(newDots);

    // Animation loop
    const animate = () => {
      setDots(prev => prev.map(dot => {
        // Update position
        let newX = dot.x + dot.vx;
        let newY = dot.y + dot.vy;
        
        // Bounce off edges
        if (newX <= 0 || newX >= 100) dot.vx *= -1;
        if (newY <= 0 || newY >= 100) dot.vy *= -1;
        
        // Keep in bounds
        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));
        
        // Update opacity
        let newOpacity = dot.opacity + (dot.opacityDir * 0.01);
        let newOpacityDir = dot.opacityDir;
        
        if (newOpacity <= 0.1) {
          newOpacity = 0.1;
          newOpacityDir = 1;
        } else if (newOpacity >= 0.9) {
          newOpacity = 0.9;
          newOpacityDir = -1;
        }
        
        return {
          ...dot,
          x: newX,
          y: newY,
          opacity: newOpacity,
          opacityDir: newOpacityDir,
        };
      }));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);

  }, []);



  return (

    <div style={{ backgroundImage: `url(${bannerBg})` }} className="bg-cover bg-center h-full w-full lg:pt-45 lg:pb-30 pt-35 lg:px-20 px-6 flex flex-col lg:flex-row items-center justify-between overflow-hidden relative">

      {/* Moving Dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {dots.map(dot => (
          <div
            key={dot.id}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              opacity: dot.opacity,
              boxShadow: `0 0 6px rgba(255, 255, 255, ${dot.opacity})`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="lg:max-w-1/2 w-full text-left text-white lg:pr-8 pr-0" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="lg:text-4xl text-3xl font-light mb-2">Elevating Your</h2>
        <h1 className="lg:text-5xl text-4xl font-bold mb-2 flex gap-2">
          AI <span className="gradient-stroke-text bg-clip-text text-transparent"> <Typewriter options={{strings: ['Development', 'Integration'], autoStart: true, loop: true }}  /></span>
        </h1>
        <h1 className="lg:text-5xl text-4xl font-bold mb-2">Skills A Comprehensive Guide</h1>
        <p className="lg:text-lg text-md font-light">Artificial Intelligence (AI) is transforming industries with its ability to automate processes and deliver advanced analytics.</p>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full mt-4 flex items-center gap-2 cursor-pointer">Explore Now! <MoveUpRight className='w-5 h-5' /></button>
        <div className="flex gap-8 mt-8">
          <h2 className='lg:text-4xl text-3xl font-bold leading-6'>100+<br /><span className="lg:text-xl text-sm font-light leading-0">Project Complete</span></h2>
          <h2 className='lg:text-4xl text-3xl font-bold border border-r-gray-500 border-l-gray-500 border-t-0 border-b-0 px-4 leading-6'>50+ <br/><span className="lg:text-xl text-sm font-light leading-0">Client Reviews</span></h2>
          <h2 className='lg:text-4xl text-3xl font-bold leading-6'>90+<span className="lg:text-xl text-sm font-light flex pt-2"><Star className='w-5 h-5 fill-amber-300 stroke-amber-300' />5 Star Rating </span></h2>
        </div>
      </div>
      <div className="relative lg:max-w-1/2 w-full lg:my-0 my-16 flex items-center">
        <img src={bannerImg} alt="" className='lg:w-[550px]' /> 
        <img src={animtedCircle} alt="" style={{animationDuration: `5s`}} className='animate-spin lg:w-45 w-32 absolute lg:top-90 top-50'/> 
      </div>
    </div>
  );
};

export default Banner;