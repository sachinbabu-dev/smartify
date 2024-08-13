import React, { useEffect, useState } from 'react';

function App() {
  const [ws, setWs] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = () => {
      const socket = new WebSocket('ws://192.168.29.208:8080');
      socket.onopen = () => setIsConnected(true);
      socket.onclose = () => setIsConnected(false);
      socket.onmessage = (message) => console.log('Received:', message.data);
      setWs(socket);
    };
    connect();  // Automatically connect on component mount
  }, []);

  const handleToggle = () => {
    const command = isPlaying ? 'pause' : 'play';
    sendCommand(command);
    setIsPlaying(!isPlaying);
  };

  const sendCommand = (command) => {
    if (ws) ws.send(command);
  };

  const connectionShadow = isConnected ? 'shadow-green-500' : 'shadow-red-500';

  return (
    <div className='w-full h-[96vh] md:h-screen flex flex-col justify-between bg-black items-center'>
      {/* Logo at the top */}
      <div className="mt-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
          className="w-56 h-auto"
        />
      </div>

      {/* Media controls */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          {/* Skip Backward */}
          <div onClick={() => sendCommand('rewind')} className="bg-gray-950 rounded-full p-4 hover:scale-105 cursor-pointer shadow-lg shadow-gray-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
            </svg>
          </div>

          {/* Play/Pause Toggle */}
          <div onClick={handleToggle} className='bg-gray-950 rounded-full p-4 mx-20 hover:scale-105 cursor-pointer shadow-lg shadow-gray-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out'>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            )}
          </div>

          {/* Skip Forward */}
          <div onClick={() => sendCommand('fast-forward')} className="bg-gray-950 rounded-full p-4 hover:scale-105 cursor-pointer shadow-lg shadow-gray-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>

          </div>
        </div>

        {/* Volume controls */}
        <div className="flex mt-16 pl-10">
          <div onClick={() => sendCommand('volume-down')} className="bg-gray-950 rounded-full p-4 hover:scale-105 cursor-pointer shadow-lg shadow-gray-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>

          </div>
          <div onClick={() => sendCommand('volume-up')} className="bg-gray-950 rounded-full p-4 mx-10 hover:scale-105 cursor-pointer shadow-lg shadow-gray-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>

          </div>
        </div>
      </div>

      {/* Connect button at the bottom */}
      <div onClick={() => sendCommand('connect')} className={`bg-gray-950 rounded-full p-4 mb-16 shadow-lg ${connectionShadow} transition-shadow duration-300 ease-in-out`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>
      </div>
    </div>
  );
}

export default App;
