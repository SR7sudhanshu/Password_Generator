import { useCallback, useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import NotificationBar from './components/notification';

function App() {
  //all the use states are here
  const [password,setpassword]=useState("password");
  const [allownums,setallownums]=useState(false);
  const [allowchar,setallowchar]=useState(false);
  const [length,setlength]=useState(16);
  const [ShowNotification,setShowNotification]=useState(false);
   
  //password generating functions are here
  const passwordgenerator=useCallback(()=>{
    let pass="";
      const string="ABCDEFGGHIJKLMNOPQRSTUVQXYZ";
      const string2="abcdefghijklmnoopqrstuvwxyz";
      const string3="1234567890";
      const string4="~!@#$%^&*()_+{}|:?<";
      let finalstring=string+string2;
      if(allowchar) finalstring+=string4;
      if(allownums) finalstring+=string3;

      for(let i=0;i<length;i++){
        const index=Math.floor(Math.random()*finalstring.length);
        pass+=finalstring.charAt(index);
      }

      setpassword(pass);
  },[allowchar,allownums,setpassword,length]);

  useEffect(()=>{
    passwordgenerator()
  },[length,allowchar,allownums,setpassword])
      
  const passwordref=useRef(null);

  const copypassword=useCallback(()=>{
    const copiedpassword=password;
    console.log(copiedpassword);
    passwordref.current?.select;
    window.navigator.clipboard.writeText(copiedpassword);

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);


  },[password])
  
  return (
    <>
      <div className="
      container text-gray-300 flex bg-transparent h-screen max-w-screen-2xl justify-center items-center">
          <div className="bg-gray-800 h-60 w-3/4 flex-row justify-center rounded-3xl" id="passwordgegnerator">
          <h2 className='m-4 text-3xl text-gray-50'>PASSWORD_GENERATOR</h2>
          
          <div className='w-full h-10 rounded-xl '>
            <input  type="text"
            ref={passwordref}
            value={password}
            readOnly
            className='outline-none p-3 rounded-xl mt-8 w-3/4 h-10 text-2xl text-gray-300 bg-gray-600'/>
            <button className='rounded-xl bg-blue-300 h-10 w-16 p-1 text-blue-900' 
            onClick={copypassword}
            >copy</button>
          </div>
          
          <div className='mt-9 p-4 '>
            <input className='mr-1 cursor-pointer' type="range" name="length" id="length"
            min={8} max={16} 
            onChange={(e)=>{setlength(e.target.value)}}/>

            <label htmlFor="length">length({length})</label>
            
            <input className='ml-4' type="checkbox" name="symbols" id="symbol" 
            defaultChecked={allowchar}
            onChange={()=>{setallowchar((allowchar)=>!allowchar )}} />
            
            <label htmlFor="symbols">symbols</label>
            
            <input className='ml-4' type="checkbox" name="numbers" id="numbers" 
            defaultChecked={allownums} 
            onChange={()=>{setallownums((allownums)=>!allownums)}}/>
            
            <label htmlFor="numbers">numbers</label>
          </div>
          
          </div>
        <NotificationBar message="password copied" isVisible={ShowNotification}/>
      </div>
      
    </>
  )
}

export default App
