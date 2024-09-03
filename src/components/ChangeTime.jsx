function handleTimeCalculate(time) {
  const getDate = new Date(time);
  const nowDate = new Date();
  const CalculateDate = nowDate - getDate;
  const calcSeconds = Math.floor(CalculateDate / 1000);
  const calcMinutes = Math.floor(calcSeconds / 60);
  const calcHours = Math.floor(calcMinutes / 60);
  const calcDays = Math.floor(calcHours / 24);
  if (calcSeconds < 60) {
    return "방금";
  } else if (calcMinutes < 60) {
    return `${calcMinutes}분 전`;
  } else if (calcHours < 24) {
    return `${calcHours}시간 전`;
  }
  return `${calcDays}일 전`;
}

export default handleTimeCalculate;
