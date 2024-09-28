import React, { useState, useEffect } from 'react';

const Timebar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 300));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1>Nächster Corndex in</h1>
      <div className="w-3/4 bg-gray-200 h-9 relative rounded-full">
        <div
          className="rounded-full h-7 m-1 overflow-hidden"
        >
            <div className='h-full bg-purple-700 rounded-full'
                style={{ width: `${(300 - timeLeft) / 300 * 100}%`}}/>
            </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-white">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default Timebar;
