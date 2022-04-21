import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Input(props) {
  // const id = props.label.split(" ").join("_").toLowerCase();
  let id = props.id;
  const [Value, setValue] = useState("");
  const [datas, setdatas] = useState([]);
  const base="https://facultydashboard.bitsathy.ac.in/"

useEffect(()=>{
  if(props.reset===1){
    setValue("")
  }
},[props.reset])
  const HandleInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    // alert(e.target.value);
    let value =
      e.target["type"] === "range" ? Number(e.target.value) : e.target.value;
    props.onChange(e.target.id, value);
    if (props.type !== "range") {
      return;
    }
    // let min = props.min,
    //   max = props.max,
    //   sliderPosition;
    // const sliderValueElement = document.querySelector(
    //   `#form-groups-range-value-${id}`
    // );
    // sliderPosition =
    //   Math.abs(min) !== Math.abs(max)
    //     ? (Value / Math.abs(max - min)) * 100
    //     : 50 + (Value / (max - min)) * 100;
    // console.log(50 + (Value / (max - min)) * 100);
    // console.log(sliderPosition);

    // if (sliderPosition > 3 && sliderPosition < 97) {
    //   sliderValueElement.style.display = "block";
    //   // sliderValueElement.style.left = `calc(${sliderPosition}%  -10px)`;
    // } else {
    //   sliderValueElement.style.display = "none";
    // }
  };

  useEffect(() => {
    if (Value === "") return;
    const response = async () => {
      const { data } = await axios.get(
        `${base}api/faculty/lists/`
      );
      setdatas(data);
      // JSON.stringify(data);
    };
    response();
  }, [Value]);

  return (
    <div className="search-input-groups">
      <label htmlFor={id}>{props.label}</label>

      {datas && props.type === "range" ? (
        <div className="form-range-container">
          <span
            className={`form-groups-range-min`}
            id={`form-groups-range-min-${id}`}
          >
            {props.min}
          </span>
          <input
            type={props.type}
            placeholder={props.label}
            name={id}
            id={id}
            onInput={HandleInput}
            value={props.value}
            className={`form-groups-${props.type}`}
            step={props.type === "range" ? props.step : ""}
            min={props.min}
            max={props.max}
          />
          <span
            className={`form-groups-range-value`}
            id={`form-groups-range-value-${id}`}
          >
            {Value === "" ? (Number(props.min) + Number(props.max)) / 2 : Value}
          </span>
          <span
            className={`form-groups-range-max form-groups-range-max-${id}`}
            id={`form-groups-range-max-${id}`}
          >
            {props.max}
          </span>
        </div>
      ) : (
        <input
          type={props.type}
          placeholder={props.label}
          name={id}
          id={id}
          onInput={HandleInput}
          value={Value}
          className={`form-groups-${props.type}`}
        />
      )}
    </div>
  );
}
