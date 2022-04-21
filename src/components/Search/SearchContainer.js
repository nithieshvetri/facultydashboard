import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import ResultsList from "./Results/ResultsList";
import MultiRangeSlider from "./MultiRangeSlider";
import Select from "./Select";
export default function SearchContainer(props) {
  const base="https://facultydashboard.bitsathy.ac.in/"
  // console.log("welcome",aa);
  
  const [query, setQuery] = useState({});
  const [reset,setReset]=useState(0);
  const [List, setList] = useState([]);
  const [PersonData, setPersonData] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [valuesList, setValuesList] = useState({});
  const [Index, setIndex] = useState({
    start: 0,
    end: 18,
  });
  const [fieldValues, setFieldValues] = useState({})
  // Updating State when input values change
  const [thamz,setthamz]=useState([{"CAY_FAP_Score__min": "0.00"}, {"CAY_FAP_Score__max": "11.00"}, {"CAY_Feedback_Score__min": "0.00"}, {"CAY_Feedback_Score__max": "1.00"}, {"CAY_FRP_Score__min": "0.08"}, {"CAY_FRP_Score__max": "8.10"}, {"CAY_FRS__min": "-706"}, {"CAY_FRS__max": "8201"}])

  useEffect(()=>{
    const response = async () => {
      const { data } = await axios.get(
       `${base}api/faculty/minmax/`
       );
      JSON.stringify(data);
      setthamz(data);
  };
  response();
},[])
console.log(parseInt(thamz[1].CAY_FAP_Score__max),'niawsf')
let a2=parseInt(thamz[1].CAY_FAP_Score__max)
let a1=parseInt(thamz[0].CAY_FAP_Score__min)
// let
  const facultyData = [
    {
      label: "Faculty Id",
      type: "text",
      "data-element": "input",
      id: "faculty_id",
    },
    {
      label: "Faculty Name",
      type: "text",
      "data-element": "input",
      id: "name",
    },
    {
      label: "Designation",
      "data-element": "select",
      id: "designation",
      url: "/designation",
    },
    {
      label: "Department",
      "data-element": "select",
      id: "department",
      url: "/dept",
    },
    {
      label: "Central Responsibility",
      "data-element": "select",
      id: "central_responsibility",
      url: "/cr",
    },
    // {
    //   label: "Email Id",
    //   type: "text",
    //   "data-element": "input",
    //   id: "email",
    // },
    // {
    //   label: "Date of joining",
    //   type: "date",
    //   "data-element": "input",
    //   id: "date_of_joining",
    // },
    {
      label: "FAP Score",
      type: "range",
      min: parseInt(thamz[0].CAY_FAP_Score__min),
      max: parseInt(thamz[1].CAY_FAP_Score__max),
      step: 0.1,
      "data-element": "input",
      id: "CAY_FAP_Score",
    },
    {
      label: "Feedback Score",
      type: "range",
      min: parseInt(thamz[2].CAY_Feedback_Score__min),
      max: parseInt(thamz[3].CAY_Feedback_Score__max),
      step: 0.1,
      "data-element": "input",
      id: "CAY_Feedback_Score",
    },
    {
      label: "FRP Score",
      type: "range",
      min: parseInt(thamz[4].CAY_FRP_Score__min),
      max: parseInt(thamz[5].CAY_FRP_Score__max),
      step: 0.1,
      "data-element": "input",
      id: "CAY_FRP_Score",
    },
    {
      label: "FRS Score",
      type: "range",
      min:parseInt(thamz[6].CAY_FRS__min),
      max:parseInt(thamz[7].CAY_FRS__max),
      // min: parseInt(thamz[0].min),
      // max: parseInt(thamz[0].CAY_FAP_Score__max),
      step: 25,
      "data-element": "input",
      id: "CAY_FRS",
    },
  ];
  
  const resetValues = (a) => {
    facultyData.map(x => setFieldValues( prev => ({
      ...prev,
      [x.id] : ''
    })))
  }

  useEffect(()=>{
    resetValues(0)
  }, [])
  useEffect(()=>{

    console.log("fie;ld",fieldValues)
  }, [fieldValues])
  const changeHandler = (key, val) => {
    console.log("key and val" ,key, val )
    // console.log("Test", valuesList[key].min.current)
    // setIndex({
    //   start: 0,
    //   end: 18,
    // });
    // if (Object.keys(query).length <= 0) return;
    Object.keys(valuesList).indexOf(key) >= 0 ? 
    setQuery((prevState)=>({
      ...prevState,
      [key]: {min: valuesList[key].min.current, max: valuesList[key].max.current}
    }))
    :
    setQuery((prevState) => ({
      ...prevState,
      [key]: val,

    }));
    
    setFieldValues(prev => ({
      ...prev,
      [key]: val
    }))
  };

  
console.log(thamz[0],'gcbudjs')
  // fetching list of faculties
let ni=thamz[0]
// console.log("minin",ni.CAY_FAP_Score__min)
  useEffect(() => {
    const response = async () => {
      const { data } = await axios.get(
        `${base}api/faculty/lists/`
      );
      JSON.stringify(data);
      setList(data);
      // console.log("Liost",data)
      setPersonData(data);
    };
    response();
  }, []);

  // Displaying Faculty Details by their Id

  useEffect(() => {
    if (searchID === "") return;
    // console.log(searchID);
    const fetchPerson = async () => {
      const response = fetch(
        `${base}api/faculty/lists/?faculty_id__icontains=${searchID}`
      );
      const person = await (await response).json();
      // console.log("faculty", person);
      setPersonData(person);
    };
    fetchPerson();
  }, [searchID]);
  // console.log(PersonData,'nnk')

  // request based on Input values

  useEffect(() => {
    let url = "api/faculty/lists/?";
    // console.log("QQQQQQQuery", query)
    if (!Object.keys(query)) return;
    Object.keys(query).forEach((x) => {
      url +=
        Object.keys(valuesList).indexOf(x) >=0
          ? `${x}__lte=${valuesList[x].max.current}&${x}__gte=${valuesList[x].min.current}&`
          : `${x}__icontains=${query[x]}&`;
    });
    const fetchData = async (url) => {
      const resp = await fetch(`${base}${url}`);
      const response = await resp.json();
      setPersonData(response);
      setList(response);
      
    };
    fetchData(url);
    // console.warn("urlll",url)
    // console.warn("urlll",query)
  }, [query,valuesList]);
  //console.log("vaa",query)
  useEffect(()=>{
    setReset(0)
    console.log("Queryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",query)
  }, [query])

  useEffect(()=>{
  }, [valuesList])

  useEffect(()=>{
    if(reset==1){

    setQuery({})}
  },[reset])



  
  return (
    <>
      <div className="search-container">
        {facultyData.map((field,index) =>
          field["data-element"] === "input" ? (
           field['type'] === 'range' ?   <MultiRangeSlider key={index} reset={reset}
           {...field} list = {setValuesList}
           onChange={changeHandler}
         /> : <Input  key={index} value={fieldValues[field.id]}  reset={reset} {...field} onChange={changeHandler} />
          ) : (
            // <Input label={field.label} type={field.type} />
            <Select key={index}  base={base} reset={reset} {...field} value={query[field.id] === undefined ? '' : query[field.id]} onChange={changeHandler} />
          )
        )}
      </div>
      

      <button  className="reset" onClick={(e)=>{
        // window.location.reload(false)
        resetValues(2);
        console.log("field" ,fieldValues['name'] )

        setReset(1);
        // setQuery({})
      }
        }>Reset</button>
      <div className="search-results-container">
        <hr />
        <div className="search-results">
          <h5>TOTAL LIST OF FACULTIES:{List.length}</h5>
          
          {/* checking whether the states have same length before rendering */}
          {PersonData.length === List.length || PersonData.length > 0 ? (
            <>
              <ResultsList
              base={base}
                list={List}
                updateId={setSearchID}
                updateIndex={setIndex}
                Index={Index}
              />
              
            </>
          ) : (
            <>
              {/* This element will render when there is no match found by checking the length of state variable ie, PersonData */}
              <span>No Match Found</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

