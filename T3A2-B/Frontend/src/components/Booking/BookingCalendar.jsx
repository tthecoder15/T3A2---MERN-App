import React, { useLayoutEffect, useState } from "react";
import "./booking.css";

const BookingCalendar = ({
  vetArray,
  vetSelect,
  setTimeSelect,
  submitSuccess,
  setSubmitSuccess,
}) => {
  // Local states/arrays for quick reference/comparison throughout
  // Hard coded for processing speed
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
  const todayYear = today.getFullYear();
  const todayDay = today.getDate();
  const todayMonth = today.toString().slice(4, 7);
  const thisYear = today.getFullYear();
  const yearList = [thisYear, thisYear + 1];

  // Dynamic states for handling button selections
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
      // If the selected year is the current year
      if (selectedYear == thisYear) {
        // Iterates through months in monthList
        for (let month in monthList) {
          // Finds the month that is equal to today's month
          if (monthList[month] == todayMonth) {
            // Removes all months before the current month
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
      if (selectedMonth == todayMonth && selectedYear == todayYear) {
        refDay = new Date(today);
      } else {
        // If not present month, days generate from the 1st
        refDay = new Date(selectedYear, monthIndex, 1);
      }

      // Increments day count until month value ticks over to next month
      while (refDay.getMonth() === monthIndex) {
        // Generates date object including date and day to represent each day in a month
        let dayObj = new Date(refDay);
        daysList.push(dayObj);
        refDay.setDate(refDay.getDate() + 1);
      }

      // Filter Saturdays and Sundays out
      daysList = daysList.filter((date) => {
        let day = date.toString().slice(0, 3);
        return day !== "Sat" && day !== "Sun";
      });

      // Finalise list of days to display
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
      // If selected day is today, remove times that are in the past (in an hour before the present hour)
      if (
        selectedDay == todayDay &&
        selectedMonth == todayMonth &&
        selectedYear == todayYear
      ) {
        timeBlocksArr = timeBlocksArr.filter((time) => {
          return new Date(time) > today;
        });
      }

      // Iterate through vets in vetArray
      for (let vet of vetArray) {
        // Check if the vet being considered is the select vet
        if (vet.vetName == vetSelect.vetName) {
          // Iterate through array of appointments in vet
          for (let appt of vet.appointments) {
            // Generate date string for individual appointment
            let apptDateString = new Date(appt.date).toString();
            // Filter all times that are already taken by that vet
            timeBlocksArr = timeBlocksArr.filter((time) => {
              return time != apptDateString;
            });
          }
        }
      }
      setDisplayTimes(timeBlocksArr);
    }
  };

  // Generates time buttons when selected day/vetSelect changes or a new appointment is selected
  useLayoutEffect(() => {
    genTimes();
  }, [selectedDay, vetSelect, submitSuccess]);

  // Handles time button selection
  const timeClick = (time) => {
    setTimeSelect(new Date(time));
    setTimeButton(time.slice(0, 24));
  };

  return (
    <div className="dates">
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
              {day.toString().slice(0, 3) + " " + day.toString().slice(7, 10)}
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
