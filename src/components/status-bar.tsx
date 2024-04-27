"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [currenTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed left-64 top-0 flex h-11 w-[calc(100vw-16rem)] items-center justify-end border border-gray-200 bg-gray-50 px-4 py-1 text-center">
      {currenTime && currenTime.toString()}
    </div>
  );
}
