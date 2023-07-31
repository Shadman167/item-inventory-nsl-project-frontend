import moment from "moment";
import React, { useEffect, useState } from "react";

const EditModalDate = (props) => {
  // debugger;
  const [day, setDay] = useState(moment().format("DD"));
  const [month, setMonth] = useState(moment().format("MM"));
  const [year, setYear] = useState(moment().format("YYYY"));
  //Fills the options for days
  const optionsDay = [];

  // Loop to generate options dynamically

  if (month == "02" && year % 4 == 0) {
    for (let i = 1; i < 30; i++) {
      optionsDay.push(<option value={i}>{`${i}`}</option>);
    }
  } else if (
    month == "01" ||
    month == "03" ||
    month == "05" ||
    month == "07" ||
    month == "08" ||
    month == "10" ||
    month == "12"
  ) {
    for (let i = 1; i < 32; i++) {
      optionsDay.push(<option value={i}>{`${i}`}</option>);
    }
  } else if (month == "02") {
    for (let i = 1; i < 29; i++) {
      optionsDay.push(<option value={i}>{`${i}`}</option>);
    }
  } else {
    for (let i = 1; i < 31; i++) {
      optionsDay.push(<option value={i}>{`${i}`}</option>);
    }
  }
  // Fills the options for years
  const optionsYear = [];

  // Loop to generate options dynamically
  for (let i = year; i < 2051; i++) {
    optionsYear.push(<option value={i}>{`${i}`}</option>);
  }

  useEffect(() => {
    if (props?.selectedDate) {
      setDay(moment(props?.selectedDate).format("DD"));
      setMonth(moment(props?.selectedDate).format("MM"));
      setYear(moment(props?.selectedDate).format("YYYY"));
    }
  }, [props]);

  useEffect(() => {
    props?.updateDate(`${year}-${month}-${day}`);
  }, [day, month, year]);

  return (
    <>
      <>
        <select
          style={{
            boxSizing: "border-box",
            border: "1px solid #E0E0E0",

            background: "#FFFFFF",
            height: 40,
          }}
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {optionsDay}
        </select>
      </>

      <select
        style={{
          boxSizing: "border-box",
          border: "1px solid #E0E0E0",

          background: "#FFFFFF",
          height: 40,
        }}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jun</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>
      <>
        <select
          style={{
            boxSizing: "border-box",
            border: "1px solid #E0E0E0",

            background: "#FFFFFF",
            height: 40,
          }}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {optionsYear}
        </select>
      </>
    </>
  );
};

export default EditModalDate;
