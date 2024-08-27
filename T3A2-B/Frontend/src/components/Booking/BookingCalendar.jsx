import React, { useEffect, useLayoutEffect, useState } from "react";
import { alignPropType } from "react-bootstrap/esm/types";

const BookingCalendar = ({ vetArray, vetSelect, setTimeSelect }) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timesList = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const today = new Date();
  const todayDay = today.toString().slice(0, 3);
  const todayMonth = today.toString().slice(4, 7);
  const thisYear = today.getFullYear();
  const yearList = [thisYear, thisYear + 1];

  const [selectedYear, setSelectedYear] = useState("");
  const [displayMonths, setDisplayMonths] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [displayDays, setDisplayDays] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [displayTimes, setDisplayTimes] = useState("");

  // Handles clicks on year buttons
  const yearClick = (year) => {
    if (year != selectedYear) {
      // Resets display values so all displayed buttons besides year are reset
      setDisplayDays("");
      setDisplayMonths("");
      setSelectedMonth("");
      setSelectedYear(year);
    }
  };

  // Generates list of months for buttons to be generated from
  const genMonths = () => {
    if (selectedYear) {
      if (selectedYear == thisYear) {
        for (let month in monthList) {
          if (monthList[month] == todayMonth) {
            setDisplayMonths(monthList.slice(month));
            break;
          }
        }
      } else {
        setDisplayMonths(monthList);
      }
    }
  };

  // Makes genMonths() dependent on selected year changing
  useLayoutEffect(() => {
    genMonths();
  }, [selectedYear]);

  // Handles month button selection
  const monthClick = (month) => {
    setSelectedMonth(month);
  };

  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  // Generates list of days to be generated as buttons
  const genDays = () => {
    if (selectedMonth) {
      let daysList = [];
      let refDay
      let monthIndex = monthList.indexOf(selectedMonth);
      // If present month, days generated states from current date
      if (selectedMonth == todayMonth) {
        refDay = new Date(today);
      } else {
        // If not present month, days generate from the 1st
        refDay = new Date(selectedYear, monthIndex, 1);
      }

      // Increments day count until month value ticks over to next month
      while (refDay.getMonth() === monthIndex) {
        daysList.push(new Date(refDay));
        refDay.setDate(refDay.getDate() + 1);
      }
      setDisplayDays(daysList);
    }
  };

  // Makes genDays() dependent on selecting a month
  useLayoutEffect(() => {
    genDays();
  }, [selectedMonth]);

  // Handles day button selection
  const dayClick = (dateObj) => {
    setSelectedDay(dateObj.getDate());
  };

  const genTimes = () => {
    let genTimeObjs = [];
    if (selectedDay) {
      for (let timeSlot of timesList) {
        genTimeObjs.push(
          new Date(
            `${selectedDay} ${selectedMonth} ${selectedYear} ${timeSlot}`
          ).toString()
        );
      }
      // Iterate through vets in vetArray
      for (let vet of vetArray) {
        // Check if the vet being considered is the select vet
        if (vet.vetName == vetSelect) {
          // Iterate through array of appointments in vet
          for (let appt of vet.appointments) {
            // Generate date string for individual appointment
            let apptDateString = new Date(appt.date).toString()
            // Check if appt date string is present in list of dates
            if (genTimeObjs.includes(apptDateString)) {
              // Remove booked appointment time from generated times
              genTimeObjs.splice(genTimeObjs.indexOf(apptDateString), 1);
            }
          }
        }
      }
      setDisplayTimes(genTimeObjs)
    }
  };

  // Handles time button selection
  const timeClick = (time) => {
    console.log(new Date(time))
    setTimeSelect(new Date(time));
  };

  useLayoutEffect(() => {
    genTimes();
  }, [selectedDay, vetSelect]);

  return (
    <div>
      <div id="year-buttons">
        {yearList.map((year) => (
          <button
            onClick={() => {
              yearClick(`${year}`);
            }}
            key={year}
          >
            {year}
          </button>
        ))}
      </div>
      <div id="month-buttons">
        {displayMonths ? (
          displayMonths.map((month) => (
            <button
              onClick={() => {
                monthClick(`${month}`);
              }}
              key={month}
            >
              {month}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
      <div id="day-buttons">
        {displayDays ? (
          displayDays.map((day) => (
            <button
              onClick={() => {
                dayClick(day);
              }}
              key={day.getDate()}
            >
              {day.getDate()}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
      <div id="time-buttons">
        {displayTimes ? (
          displayTimes.map((time) => (
            <button
              onClick={() => {
                timeClick(time);
              }}
              key={time.slice(0, 24)}
            >
              {time.slice(15, 24)}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;

