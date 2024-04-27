"use client";

import msToDisplayTime from "@/function/ms-to-display-time";
import { useEffect, useState } from "react";

export default function StatusBar({
  budgetInfo,
  playtimeEndTimeEpoch,
}: {
  budgetInfo: {
    budget: number;
    expireTimeEpoch: number;
  };
  playtimeEndTimeEpoch: number;
}) {
  const [currenTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currenTime) {
    return null;
  }

  const displayTime = currenTime
    .toString()
    .replace(" GMT+0700 (Indochina Time)", "");

  let timeTillBudgetExpire = budgetInfo.expireTimeEpoch - currenTime.getTime();
  const budget = timeTillBudgetExpire > 0 ? budgetInfo.budget : 0;

  let timeTillPlaytimeEnd = playtimeEndTimeEpoch - currenTime.getTime();
  if (timeTillPlaytimeEnd < 0) {
    timeTillPlaytimeEnd = 0;
  }

  return (
    <div className="fixed left-64 top-0 flex h-11 w-[calc(100vw-16rem)] items-center justify-end gap-10 border border-gray-200 bg-gray-50 px-11 py-1 text-center">
      <div className="min-w-56">
        Playtime: {msToDisplayTime(timeTillPlaytimeEnd)} left
      </div>
      <div className="flex min-w-56 items-baseline gap-2">
        <div>Budget: {budget}</div>
        {budget > 0 && (
          <div className="text-sm font-light">
            expire in: {msToDisplayTime(timeTillBudgetExpire)}
          </div>
        )}
      </div>
      {currenTime && <div className="min-w-56">{displayTime}</div>}
    </div>
  );
}
