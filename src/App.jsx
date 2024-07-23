import { useCallback, useState, useEffect, useRef } from 'react'

function App() {

  const[legnth , setLength] = useState(8);
  const[numAllowed , setNumAllowed] = useState(false);
  const[charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState(""); 

 //  use of useRef HOOK

const passRef = useRef(null);

  const passwordGenerator = useCallback( ()=>{
    let pass = "";
    //str from where we create pass
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed)
       {str+= "0123456789"}
    if(charAllowed) 
      {str+= "`~!@#$%^&*()_+=-{}[]"}

    for(let i = 0 ; i < legnth ; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  } , [legnth , numAllowed , charAllowed ]);

// we canot call this method directly becz of tooo many re- renders
  // passwordGenerator();

  useEffect(()=>{
    passwordGenerator();
  } , [numAllowed , charAllowed ,passwordGenerator , legnth]);

  const copyPassToClipBoard = useCallback(()=>{
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  } , [password]);


  /* NOTE: we can create this project without thw use of useCallback Hook  becz the use useCallback mainly optmize and memoise the code 
  but on the other hand the useEffect Dependencies directly re runs the code or method written in it if we do change(ched chhad)
  in the dependencies of the use Effect Hook*/



  return (
    <>
     <div id='mainOuterBox'
     className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-800">
      
      <h1 className='text-white text-center my-5'>
        PASSWORD GENERATOR
      </h1>
    
      <div id='inputBox'
       className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password}
        placeholder='Password'
        className='outline-none w-full py-1 px-3'
        readOnly
        ref={passRef} />

        <button
        onClick={copyPassToClipBoard}
        className='outline-none bg-sky-500 hover:bg-sky-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
        <input type="range" name="length" id="length"
        min={6}
        max={100} 
       
        className='cursor-pointer'
        onChange={(e)=>{
          setLength(e.target.value)
          // e.target.value = 70;
        }}  />
        <label htmlFor="length">Length: {legnth} </label>

        </div>
      <div className="flex items-center gap-x-1"><input type="checkbox" name="" id="characterInput" 
      defaultChecked={charAllowed}
      onChange={()=>{

        // we cant do here like  setCharAllowed(true)  because it only work once 
        setCharAllowed((prev) => !prev);
      }}/>
      <label htmlFor="characterInput">Letters</label></div>

      <div className="flex items-center gap-x-1">
        <input type="checkbox" name="numbers" id="numbers" 
        defaultChecked={numAllowed}
        onChange={()=>{
         setNumAllowed( (counter) => !counter );
        }
        }/>
      <label htmlFor="numbers">Numbers</label>
      </div>



      </div>

      
    </div>
 
    </>
  )
}

export default App
