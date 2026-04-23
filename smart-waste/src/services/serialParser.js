export const parseSerialData = (line) => {
  const result = {
    moisture: null,
    proximity: null,
    raw: line,
    timestamp: new Date()
  };

  const moistureMatch = line.match(/moisture=(\d+)/);
  const proximityMatch = line.match(/proximity=(\d+)/);

  if (moistureMatch) {
    result.moisture = parseInt(moistureMatch[1], 10);
  }

  if (proximityMatch) {
    result.proximity = parseInt(proximityMatch[1], 10);
  }

  return result;
};
