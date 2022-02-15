import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className='font-main bg-black'>

      {/* top */}
      <div className="sticky top-0 left-0 backdrop-blur shadow font-bold w-full h-[100px] flex items-center z-50">
        <div className='flex items-center -left-px p-6 w-[50vw]'>
          <div className="font-main text-white text-[40px]">
            Debuggers
          </div>
          <button className="absolute right-12 font-main text-white text-[20px] hover:underline">Sign In</button>
          <button className="absolute right-40 no-underline font-main text-white text-[20px] hover:underline">About</button>
        </div>
      </div>


      <div className='top-0 left-0 w-screen overflow-auto'>
        {/* content */}

        <Section glowx="-50%" content={
          <div className='flex flex-col gap-6 items-center'>
            <div className="break-normal text-white text-[40px] text-center">
              The Free, Fun, And Effective Way To Learn Web Design
            </div>
            <button type="button" className="text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max">
              Get started
            </button>
          </div>
        } height="h-[calc(100vh-100px)]" />
        <Section content={
          <div className="w-screen h-screen font-bold flex justify-center items-center">
            <div className='flex flex-col gap-6 items-center'>
              <div className="break-normal text-white text-[40px] text-center">
                The Free, Fun, And Effective Way To Learn Web Design
              </div>
              <button type="button" className="text-white text-[25px] rounded-[10px] font-bold py-3 px-6 rounded-boxed border-white border-2 w-max">
                Get started
              </button>
            </div>
          </div>
        } />
      </div >
    </div>
  )
}
function Section(props) {
  let classString;
  if (props.height) {
    classString = `w-screen ${props.height} font-bold flex justify-center items-center`
  } else {
    classString = "w-screen h-screen font-bold flex justify-center items-center";
  }
  return (
    <div>
      <div className={classString} >
        <div className='z-10'>
          {props.content}
        </div>
        <div className="w-screen h-screen absolute blur-2xl" style={{
          backgroundImage: `radial-gradient(circle, rgba(64,164,244,0.6786064767703957) 0%, rgba(1,11,19,0) 50%)`,
          backgroundPositionX: `${props.glowx ? props.glowx : 0}`,
          backgroundPositionY: `${props.glowy ? props.glowy : 0}`
        }}>

        </div>
      </div >
    </div>
  )
}
export default Home;
