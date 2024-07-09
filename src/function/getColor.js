export const getColor = (number) => {
    if (number <= 10) return '#e4a815'; // 노란색
    if (number <= 20) return '#1c91d8'; // 파란색
    if (number <= 30) return '#e66355'; // 빨간색
    if (number <= 40) return '#8f8f8f'; // 회색
    return '#5bb448'; // 초록색
};