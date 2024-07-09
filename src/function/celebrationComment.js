export const celebrationComment = (count, hasBonus) => {
    if (count <= 2) return '아쉽게도,|낙첨되었습니다.';
    if (count >= 3) {
        let prize = '';
        if (count === 3) prize = '5,000';
        if (count === 4) prize = '50,000';
        if (count === 5) prize = '1,508,409';
        if (count === 5 && hasBonus) prize = '53,997,428';
        if (count === 6) prize = '2,267,891,969';
        return `축하합니다!|총 ${prize}원 당첨`;
    }
    return '';
};
