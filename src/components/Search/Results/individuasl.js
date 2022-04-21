import React, { useEffect, useState } from "react";
// import axios from "axios";
import {RiFileDownloadFill} from 'react-icons/ri';
import {FcDownload} from 'react-icons/fc';
// import Individual from './individuasl';
import jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default function Individual({ data,list ,year,vals,setData,individualIndex,setIndividualindex}) {
  const [fieldGroup, setFieldGroup ] = useState([])

  

  useEffect(()=>{
    // setIndividualindex(0)
    setFieldGroup(Object.keys(data).filter((a)=>a.includes('CAY')))

    // setFieldGroup(Object.keys(data).filter((a)=>a.includes('Feedback') || a.includes('FRP') || a.includes('FAP')|| a.includes('FRS')))
  }, [data])
  const changeHandler=(e)=>{
    let operation = e.target.getAttribute("data-operation");
    if (operation === "+"){

      if(individualIndex>=17 || individualIndex>=vals.length-1){
        setIndividualindex(0)
        setData(vals[0])
      }
else{
  setIndividualindex(individualIndex+1)


  setData(vals[individualIndex+1])

}    
}
if (operation === "-"){
  if(individualIndex<=0){
    setIndividualindex(vals.length-1)
    setData(vals[vals.length-1])
  }
else{
setIndividualindex(individualIndex-1)


setData(vals[individualIndex-1])

}    
   
}
  }

  const generatePdf=()=>{
    var doc = new jsPDF('landscape','px','a4');
    
    doc.autoTable({
      styles: {halign:'center',valign:"middle" },
      theme:'grid',
      headStyle:{fillColor:(165,42,42)
      },
      
      head: [['FACULTY_ID','FACULTY_NAME','DEPARTMENT','DESIGNATION','FAP_2021','FRS_2021','FRP_2021','FEEDBACK_2021']],
        
        body:list.map(list=>[[list.faculty_id],[list.name],[list.department],[list.designation],[list.CAY_FAP_Score],[list.CAY_FRS],[list.CAY_FRP_Score],[list.CAY_Feedback_Score]]),
       
        
      })
    

    doc.save('table.pdf'); 

  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName="download"

    const exportToCSV = (list, fileName) => {
        const ws = XLSX.utils.json_to_sheet(list);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    
console.log(year)
  return (
      
    <div className="results-data-container">
            <div className="results-list-page-nav">

      <button data-operation="-" onClick={changeHandler}>
          &lt; {individualIndex+1}
        </button>{" "}
        <button data-operation="+" onClick={changeHandler}>
         - {vals.length}&gt;
        </button>{" "}
        </div>
      <center><img src="https://upload.wikimedia.org/wikipedia/en/7/77/Bannari_Amman_Institute_of_Technology_logo.png"  alt="BANNARI AMMAN INSTITUTE OF TECHNOLOGY" style={{width:'120px',height:'70px',textAlign:'center',borderRadius:'50%',objectFit:'contain'}}/></center>
      <span className="result-data-name">{data.name}</span>
      <span className="result-data-department">{data.department}</span>
      <span className="particular" style={{color:"blue"}}><strong>FACULTY INFORMATION</strong></span>
      {  Object.keys(data).map((x,faculty_id) => {
        return(
          //  typeof data[x] === 'string' && data[x].toLowerCase().includes('nan') ? '':
          
          fieldGroup.indexOf(x) > 0 ? '' :
          <div key={faculty_id}>
{x.includes("CAY")?"":
        <p>
        <span className="results-data-title" style={{padding:'10px'}}><strong>{x}</strong> </span>
        <span className="results-data-value" style={{padding:'10px'}}> :{ data[x]}</span>
      </p>}
      </div>
      )})}
<span className="details">DETAILS</span>
<div className="tab" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr' ,gridGap:'1rem'}}>
<span className="particulars" style={{color:'blue',fontWeight:'bold'}}>PARTICULARS

    <  div>Faculty Action Plan</ div>
    < div >Faculty FeedBack Score</  div>
    < div >Faculty Reward Points</ div>
    < div >Faculty Reliability Score</ div>
  </span>


<div><h4>{year[0].caym2}</h4>
<br/>
{<div className="task">
{
  Object.keys(fieldGroup).length>0 && fieldGroup.filter((x)=>x.includes('CAYM2')).map((x,index)=> <div key={index} style={{display:'flex', flexDirection:'column'}}>{data[x]}</div>)
}
</div>}
</div>
<div><h4>{year[0].caym1}</h4><br/>
{<div className="task">
{
  Object.keys(fieldGroup).length>0 && fieldGroup.filter((x)=>x.includes('CAYM1')).map((x,index)=> <div key={index} style={{display:'flex', flexDirection:'column'}}>{data[x]}</div>)
}
</div>}
</div>
<div><h4>{year[0].cay}</h4><br/>
<div className="task">
{
  Object.keys(fieldGroup).length>0 && fieldGroup.filter((x)=>x.includes('CAY_')).map((x,index)=> <div key={index} style={{display:'flex', flexDirection:'column'}}>{data[x]===null?"NAN":data[x]}</div>)
}
</div>
</div>





    </div>
    <div className="align">
    <button onClick={generatePdf}style={{padding:'7px 10px',margin:'auto',marginBottom:'10px',textAlign:"center",backgroundColor:'lightgreen',fontSize:'17px',width:"140px",height:"45px",borderRadius:"20px"}}>      <RiFileDownloadFill size="20px"/>
PDF FILE</button><br/>
      <button className="button" onClick={(e)=>exportToCSV(list,fileName)}style={{padding:'7px 10px',margin:'auto',textAlign:"center",backgroundColor:'lightblue',fontSize:'17px',height:"45px",width:"140px",borderRadius:"20px"}}><FcDownload size="25px"/>
EXCEL</button></div>
    </div>
  );
}
