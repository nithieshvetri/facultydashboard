import React, { useState, useEffect } from "react";

export default function Select(props) {
  // console.log(props)
  const [options, setOptions] = useState([]);
  const [val,setVal]=useState('')
  useEffect(()=>{
    setVal('')
  }, [props])
  useEffect(() => {
    // props.onChange(props.id, "");
    const fetchList = async () => {
      const resp = await fetch(
        `${props.base}api/faculty${props.url}/`
        );
        const data = await resp.json();
        setOptions(data);
    };
    fetchList();
    console.log("nithiesh",props);
  }, [props.url,props.reset]);

// useEffect(()=>{
//   setOption(["SELECT",...options])
// },[options])

  const changeHandler = (e) => {
console.log(e.target.value)

    setVal(e.target.value)
    if(e.target.value==='SELECT')props.onChange(props.id, "")
  // else if(props.reset===1){
  //   props.onChange(props.id,e.target.value="")
  //   // setVaa("")
  // }
else
props.onChange(props.id, e.target.value)
};
// console.log("vanakkam",vaa)
let option=['SELECT',...options]
useEffect(()=>{
  option=['SELECT',...options]
},[props.reset])


  return (
    <div className="search-input-groups">
      <label>{props.label}</label>
      <select 
      value={props.value}
      onChange={(e)=>changeHandler(e)
      // setVaa(e.target.value)
      
      // value=e.target.value
    }
      >
        {option.length > 0 &&
          option.map((x) => (
            <option  key={x}>
              {x}
            </option>
          ))}
      </select>
    </div>
  );
}
