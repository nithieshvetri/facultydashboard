import React, { useState,useEffect } from "react";

import Individual from './individuasl';
import axios from 'axios';


export default function ResultsList({ list,base, updateId, updateIndex, Index }) {
  const [sorting,setsort]=useState(0)
  let vals;
  vals=list.slice(Index.start, Index.end)
  const [data,setData]=useState(vals[0])
  const [individualIndex,setIndividualindex]=useState(0)
  
  const [year,setyear]=useState([{cay:2013,caym1:213,caym2:145}])
  useEffect(() => {
    const response = async () => {
      const { data } = await axios.get(
        `${base}api/faculty/academic/`
      );
      JSON.stringify(data);
      setyear(data);
      // console.log("Liost",data)
      // setPersonData(data);
    };
    response();
  }, []);
  useEffect(()=>{
    updateIndex({
      start:0,
      end:18
    })
  },[list])

useEffect(()=>{
  vals=list.slice(Index.start, Index.end)
  setData(vals[0])
  setIndividualindex(0)
  
},[list,Index.start,sorting])  
  
  if(!sorting){
    list.sort((a, b) => a.faculty_id.localeCompare(b.faculty_id))

  }
  if(sorting){
    list.sort((a, b) => b.faculty_id.localeCompare(a.faculty_id))

  }


  const changeIndexHandler = (e) => {
    setIndividualindex(0)
    
    let operation = e.target.getAttribute("data-operation");
    if (operation === "-")
      if (Index.start > 0)
        updateIndex({
          start: Index.start - 18,
          end: Index.end - 18,
        });
      else if (Index.end <= list.length)
        updateIndex({
          start: 0,
          end: 18,
        });
      else
        updateIndex({
          start: Index.start,
          end: Index.end,
        });
    else if (Index.end <= list.length)
      updateIndex({
        start: Index.start + 18,
        end: Index.end + 18,
      });
      
  };

 
  list=list.map(list=>{
   delete list.id;
  //  delete list.central_responsibility;
   delete list.About;
   delete list.status;
   delete list.Faculty_list;
   delete list.picture;
   delete list.Search;
   return list
  })

  

  
  return (
    <div className="display">
    <div className="results-list-container">
      <div className="results-list-page-nav">
        <p>Results </p>
        <button data-operation="-" onClick={changeIndexHandler}>
          &lt;
        </button>{" "}
        {Index.start} - {Index.end}
        <button data-operation="+" onClick={changeIndexHandler}>
          &gt;
        </button>{" "}
      </div>
      <h3 style={{backgroundColor:'rgb(25, 140, 255)',
    color:'white',
    textAlign:'center',
    padding:'10px'}}onClick={()=>setsort(!sorting)}>FACULTY LIST</h3>

      {list.length > 0 ? (
        <div className="results">
        
        <ul>
          {vals.map((x,index) => (
          
            <li key={index}onClick={()=>{setData(x)
              setIndividualindex(index)
            }}>
              <p>
              <img src="https://upload.wikimedia.org/wikipedia/en/7/77/Bannari_Amman_Institute_of_Technology_logo.png"  alt="BANNARI AMMAN INSTITUTE OF TECHNOLOGY" style={{height:'30px',width:'50px',padding:'0px'}}/>
              <span style={{textAlign:'center',margin:'10px',height:'44px'}}> {`${x.faculty_id} - ${x.name}`}</span></p>
            </li>
           
          ))}
        </ul>
        </div>
      ) : (
        <span>No Data Found</span>
        
      )}


    </div><br/>

    {data===undefined?'':<Individual data={data} year={year} list={list} vals={vals} setData={setData} individualIndex={individualIndex} setIndividualindex={setIndividualindex}/>}

    </div>
  );
}
