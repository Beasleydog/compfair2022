import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div>
    <div> {/* top */}
      <div className="bg-blue font-bold w-full h-[100px] flex items-center">
        <div className='flex items-center -left-px p-6 w-[50vw]'>
          <div className="font-main text-white text-[40px]">
            Debuggers
          </div>
          <button className="absolute right-12 font-main text-white text-[20px] hover:underline">Sign In</button>
          <button className="absolute right-40 no-underline font-main text-white text-[20px] hover:underline">About</button>
        </div>
      </div>
    </div>
    <div> {/* mid */}
    <img src="/images/homeBlurBackground.svg" className = "w-full h-full z-0"></img>
    <div className="w-full font-bold flex justify-center items-center">
          <div className="absolute top-72 h-32 w-[55rem] break-words font-main text-white text-[50px] text-center">
            The Free, Fun, And Effective Way To Learn Web Design
          </div>
          <button type="button" className="absolute top-1/2 border-4 border-blue hover:bg-blue2 text-white font-bold py-6 px-24 rounded-boxed">GET STARTED</button>
        </div>
    </div>
    </div>
  )
}
export default Home;
