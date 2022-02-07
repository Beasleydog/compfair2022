import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div className="bg-blue font-bold w-full h-[100px] flex items-center" >
        <div className='flex items-center justify-center w-[50vw]'>
          <div className="font-main text-white text-[40px]">
            Debuggers
          </div>
        </div>
        <div className='flex items-center justify-center w-[50vw]'>
        </div>
      </div >
    );
  }
}
export default Home;