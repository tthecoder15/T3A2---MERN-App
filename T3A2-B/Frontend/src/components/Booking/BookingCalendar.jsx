import React, { useEffect, useLayoutEffect, useState } from "react";
import { alignPropType } from "react-bootstrap/esm/types";

const BookingCalendar = ({
  vetArray,
  vetSelect,
  setTimeSelect,
  submitSuccess,
  setSubmitSuccess,
}) => {
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
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.toString().slice(4, 7);
  const thisYear = today.getFullYear();
  const yearList = [thisYear, thisYear + 1];

  const [selectedYear, setSelectedYear] = useState("");
  const [displayMonths, setDisplayMonths] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [displayDays, setDisplayDays] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [displayTimes, setDisplayTimes] = useState("");
  const [timeButton, setTimeButton] = useState("");

  // Handles clicks on year buttons
  const yearClick = (year) => {
    if (year != selectedYear) {
      // Resets display values so all displayed buttons besides year are reset
      setDisplayMonths("");
      setDisplayDays("");
      setDisplayTimes("");
      setSelectedMonth("");
      setSelectedDay("");
      // Selected time for form, passed in
      setTimeSelect("");
      // Selected time button
      setTimeButton("");
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
    setDisplayTimes("");
    setSelectedDay("");
    // Selected time for form, passed in
    setTimeSelect("");
    // Selected time button
    setTimeButton("");
    setSelectedMonth(month);
  };

  // Generates list of days to be generated as buttons
  const genDays = () => {
    if (selectedMonth) {
      let daysList = [];
      let refDay;
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
    // Selected time for form, passed in
    setTimeSelect("");
    // Selected time button
    setTimeButton("");
    setSelectedDay(dateObj.getDate());
  };

  const genTimes = () => {
    let timeBlocksArr = [];
    // Generate time objects for each time listed in available time list constant
    if (selectedDay) {
      for (let timeSlot of timesList) {
        timeBlocksArr.push(
          new Date(
            `${selectedDay} ${selectedMonth} ${selectedYear} ${timeSlot}`
          ).toString()
        );
      }

      // If selected day is today, remove times that are in the past
      if (selectedDay == todayDay) {
        for (let i in timeBlocksArr) {
          if (new Date(timeBlocksArr[i]) > today) {
            timeBlocksArr.splice(0, i - 1);
            break;
          }
        }
      }

      // Iterate through vets in vetArray
      for (let vet of vetArray) {
        // Check if the vet being considered is the select vet
        if (vet.vetName == vetSelect.vetName) {
          // Iterate through array of appointments in vet
          for (let appt of vet.appointments) {
            // Generate date string for individual appointment
            let apptDateString = new Date(appt.date).toString();
            // Check if appt date string is present in list of dates
            console.log(
              "included in? ",
              timeBlocksArr.includes(apptDateString)
            );
            console.log(timeBlocksArr.indexOf(apptDateString));
            if (timeBlocksArr.includes(apptDateString)) {
              // Remove booked appointment time from generated times
              timeBlocksArr.splice(timeBlocksArr.indexOf(apptDateString), 1);
            }
          }
        }
      }
      setDisplayTimes(timeBlocksArr);
    }
  };

  useLayoutEffect(() => {
    genTimes();
  }, [selectedDay, vetSelect, submitSuccess]);

  // Handles time button selection
  const timeClick = (time) => {
    setTimeSelect(new Date(time));
    setTimeButton(time.slice(0, 24));
  };

  return (
    <div>
      <div id="year-buttons">
        {yearList.map((year) => (
          <button
            onClick={() => {
              yearClick(year);
              setSubmitSuccess(false);
            }}
            key={year}
            className={
              selectedYear == year ? "selected-button" : "not-selected-button"
            }
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
                monthClick(month);
                setSubmitSuccess(false);
              }}
              key={month}
              className={
                selectedMonth == month
                  ? "selected-button"
                  : "not-selected-button"
              }
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
                setSubmitSuccess(false);
              }}
              key={day.getDate()}
              className={
                selectedDay == day.getDate()
                  ? "selected-button"
                  : "not-selected-button"
              }
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
                setSubmitSuccess(false);
              }}
              key={time.slice(0, 24)}
              className={
                timeButton == time.slice(0, 24)
                  ? "selected-button"
                  : "not-selected-button"
              }
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
