import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";

const Home: NextPage = () => {
  const [newDate, onNewDate] = useState<Date | null>(new Date());
  const [now, onUpdateNow] = useState<number>(Date.now());
  const [appActive, onActiveApp] = useState<boolean>(false);
  const [refreshCount, setFreshCount] = useState<number>(0);
  const [pastOrFuture, onPastOrFuture] = useState<string>("");
  const [seconds, OnUpdateSeconds] = useState<number>(0);
  const [minutes, OnUpdateMinutes] = useState<number>(0);
  const [hours, OnUpdateHours] = useState<number>(0);
  const [days, OnUpdateDays] = useState<number>(0);
  const [months, OnUpdateMonths] = useState<number>(0);
  const [years, OnUpdateYears] = useState<number>(0);

  const onChangeDate = (pickedDate: Date | null) => {
    if (pickedDate) {
      onNewDate(pickedDate);
      onActiveApp(true);
    }
  };

  function refresh() {
    onUpdateNow(Date.now());
    setFreshCount(refreshCount + 1);
  }

  if (appActive) {
    setTimeout(() => {
      refresh(), 1000;
    });
  }

  useEffect(() => {
    calculateCountdown();
  }, [newDate, refreshCount]);

  const calculateCountdown = () => {
    let pickedDate = newDate?.valueOf();
    if (pickedDate) {
      let dateDiff = pickedDate - now;
      if (dateDiff < 0) {
        onPastOrFuture("Past");
      } else {
        onPastOrFuture("Future");
      }

      let newSeconds = Math.floor(dateDiff / 1000) % 60;
      let newMinutes = Math.floor(dateDiff / (1000 * 60)) % 60;
      let newHours = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
      let newDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
      let newMonths = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30)) % 12;
      let newYears = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365)) % 365;

      if (dateDiff < 0) {
        newYears++;
        newMonths++;
        newDays++;
        newHours++;
        newMinutes++;
        newSeconds++;
      }

      if (newSeconds) {
        OnUpdateSeconds(Math.abs(newSeconds));
      } else {
        OnUpdateSeconds(0);
      }
      if (newMinutes) {
        OnUpdateMinutes(Math.abs(newMinutes));
      } else {
        OnUpdateMinutes(0);
      }
      if (newHours) {
        OnUpdateHours(Math.abs(newHours));
      } else {
        OnUpdateHours(0);
      }
      if (newDays) {
        OnUpdateDays(Math.abs(newDays));
      } else {
        OnUpdateDays(0);
      }
      if (newMonths) {
        OnUpdateMonths(Math.abs(newMonths));
      } else {
        OnUpdateMonths(0);
      }
      if (newYears) {
        OnUpdateYears(Math.abs(newYears));
      } else {
        OnUpdateYears(0);
      }
    }
  };

  return (
    <main>
      <section className="date-picker-container">
        <DatePicker
          value={newDate}
          onChange={(e) => {
            onChangeDate(e);
          }}
          placeholder="Pick date"
          icon={<IconCalendar size={16} />}
        />
      </section>
      <p className="note">
        {pastOrFuture === "Past"
          ? "That was this long ago!"
          : "Here's how long to go!"}
      </p>
      <section className="time-until-container">
        <div className="datetime-box">
          <div className="years">{years}</div>
          <p className="datetime-label">Years</p>
        </div>
        <div className="datetime-box">
          <div className="months">{months}</div>
          <p className="datetime-label">Months</p>
        </div>
        <div className="datetime-box">
          <div className="days">{days}</div>
          <p className="datetime-label">Days</p>
        </div>
        <div className="datetime-box">
          <div className="hours">{hours}</div>
          <p className="datetime-label">Hours</p>
        </div>
        <div className="datetime-box">
          <div className="minutes">{minutes}</div>
          <p className="datetime-label">Minutes</p>
        </div>
        <div className="datetime-box">
          <div className="seconds">{seconds}</div>
          <p className="datetime-label">Seconds</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
