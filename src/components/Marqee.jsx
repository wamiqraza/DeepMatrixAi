import React from 'react'
import bannerdata from '../assets/images/bannerdata.png'
import Marquee from "react-fast-marquee";
import { Sparkle } from 'lucide-react';

const Marqee = () => {
  return(
    <div style={{ backgroundImage: `url(${bannerdata})` }} className='relative w-full h-30 bottom-10 z-1 bg-cover bg-center flex items-center justify-center text-white text-2xl font-bold'>
        <Marquee className='-rotate-1 font-medium text-2xl overflow-y-hidden'> <Sparkle className='mx-5' /> AI DEVELOPMENT <Sparkle className='mx-5' />  MACHINE LEARNING <Sparkle className='mx-5' /> DEEP LEARNING <Sparkle className='mx-5' /> VOICE BOT <Sparkle className='mx-5' /> CHATBOT <Sparkle className='mx-5' /> AI INTEGRATION <Sparkle className='mx-5' /> COMPUTER VISION </Marquee>
    </div>
  )
}

export default Marqee