import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div id="container">
        <div id="top">
          <div className="bg-blue font-bold w-full h-[100px] flex items-center">
            <div className='flex items-center justify-center w-[50vw]'>
              <div className="font-main text-white text-[40px]">
                Debuggers
              </div>
              <button type="button" className="absolute no-underline -right-px p-6 font-main text-white text-[20px] hover:underline">Menu</button>
            </div>
            <div className='flex items-center justify-center w-[50vw]'>
            </div>
          </div>
        </div>
        <div id="mid">
          <div className="bg-blue2 font-bold w-full h-[800px] flex items-center">
              <div className="relative box-border h-32 w-[60rem] p-4 left-[60rem] -top-24 break-words font-main text-white text-[50px] text-center">
                The free and easy way to learn HTML and CSS
              </div>
              <button type="button" className="relative bg-green hover:bg-green2 text-white font-bold py-6 px-24 top-12 left-[22rem] rounded-full">GET STARTED</button>
              <button type="button" className="relative bg-blue2 hover:bg-blue3 border-4 border-blue text-white font-bold py-6 px-[2rem]  top-32 left-[3.5rem] rounded-full">I ALREADY HAVE AN ACCOUNT</button>
            </div>
        </div>
      </div>
      
    );
  }
}
export default Home;