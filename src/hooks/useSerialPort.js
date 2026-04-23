import { useState, useRef, useCallback } from 'react';
import { parseSerialData } from '../services/serialParser';

export const useSerialPort = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [sensorData, setSensorData] = useState({ moisture: null, proximity: null });
  const [serialLog, setSerialLog] = useState([]);
  const [dataLog, setDataLog] = useState([]);
  
  const portRef = useRef(null);
  const readerRef = useRef(null);

  const connect = useCallback(async () => {
    try {
      setError('');
      if (!('serial' in navigator)) {
        throw new Error('Web Serial API not supported in this browser.');
      }

      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      
      portRef.current = port;
      setIsConnected(true);

      const textDecoder = new TextDecoderStream();
      const readableStream = port.readable.pipeThrough(textDecoder);
      readerRef.current = readableStream.getReader();

      readSerialData();
    } catch (err) {
      console.error('Serial Connection Error:', err);
      setError(err.message || 'Connection failed');
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current = null;
      }
      if (portRef.current) {
        await portRef.current.close();
        portRef.current = null;
      }
      setIsConnected(false);
      setError('');
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  }, []);

  const readSerialData = async () => {
    let buffer = '';
    try {
      while (true) {
        const { value, done } = await readerRef.current.read();
        if (done) {
          break;
        }
        if (value) {
          buffer += value;
          const lines = buffer.split('\n');
          
          if (lines.length > 1) {
            buffer = lines.pop(); // Keep incomplete line in buffer
            
            lines.forEach((line) => {
              const trimmedLine = line.trim();
              if (trimmedLine) {
                processLine(trimmedLine);
              }
            });
          }
        }
      }
    } catch (err) {
      console.error('Error reading serial data:', err);
      setIsConnected(false);
      setError('Connection lost');
    } finally {
      readerRef.current?.releaseLock();
    }
  };

  const processLine = (line) => {
    setSerialLog((prev) => [...prev, line]);
    
    const parsedData = parseSerialData(line);
    
    let isDataUpdated = false;
    let newMoisture = null;
    let newProximity = null;

    if (parsedData.moisture !== null) {
      newMoisture = parsedData.moisture;
      isDataUpdated = true;
    }
    
    if (parsedData.proximity !== null) {
      newProximity = parsedData.proximity;
      isDataUpdated = true;
    }

    if (isDataUpdated) {
      setSensorData((prev) => {
        const nextMoisture = newMoisture !== null ? newMoisture : prev.moisture;
        const nextProximity = newProximity !== null ? newProximity : prev.proximity;
        
        // Log to data table only if moisture is <= 900
        if (nextMoisture !== null && nextMoisture <= 900) {
           setDataLog((prevLog) => {
             const newLog = [...prevLog, {
                moisture: nextMoisture,
                proximity: nextProximity,
                timestamp: new Date().toLocaleTimeString()
             }];
             return newLog.length > 10 ? newLog.slice(newLog.length - 10) : newLog;
           });
        }
        
        return { moisture: nextMoisture, proximity: nextProximity };
      });
    }
  };

  return {
    connect,
    disconnect,
    isConnected,
    error,
    sensorData,
    serialLog,
    dataLog,
  };
};
