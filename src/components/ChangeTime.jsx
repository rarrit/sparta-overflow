function handleTimeCalculate(time) {
  const getDate = new Date(time); // 시간
  const nowDate = new Date(); // ?뭐더라
  const CalculateDate = nowDate - getDate; // 암튼 이거 하면 됨
  const calcSeconds = Math.floor(CalculateDate / 1000); // 이게 하루를 / 1000으로나눠서 어쨋든 뭐가
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
