import React, { useEffect, useState } from 'react';
import { generateLotto } from '../function/generateLotto';
import { getTodayDate } from '../function/getTodayDate';
import styled from 'styled-components';
import { getColor } from '../function/getColor';
import { celebrationComment } from '../function/celebrationComment';

const Home = () => {
    const [lottoNumbers, setLottoNumbers] = useState(generateLotto());
    const [rowNumbers, setRowNumbers] = useState(Array.from({ length: 5 }, () => generateLotto()));
    const [count, setCount] = useState(1);
    const [comment, setComment] = useState('');
    const mainNumbers = lottoNumbers.slice(0, 6);
    const bonusNumber = lottoNumbers[6];
    const today = getTodayDate();

    useEffect(() => {
      setLottoNumbers(generateLotto());
      handleDraw();
    }, []);

    const handleDraw = () => {
        setCount(count + 1);  
        const newRowNumbers = Array.from({ length: 5 }, () => generateLotto());
        setRowNumbers(newRowNumbers);
        
        let maxCount = 0; 
        let hasBonus = false;

      console.log(newRowNumbers);
        newRowNumbers.forEach((numbers) => {
          let lineCount = 0;
          let bonusIncluded = false;

          numbers.forEach((num) => {
            if (mainNumbers.includes(num)) {
              lineCount += 1;
            }
            if (num === bonusNumber) {
              bonusIncluded = true;
            }
    
            if (lineCount > maxCount || (lineCount === maxCount && bonusIncluded))
              maxCount = lineCount;
              hasBonus = bonusIncluded;
          });
        });
        console.log(maxCount, hasBonus);
      setComment(celebrationComment(maxCount, hasBonus));
      console.log(comment);
    };

  
    const parseComment = (comment) => {
      const parsedComments = comment.split('|');
      return (
        <CommentWrapper>
          <div>{parsedComments[0]}</div>
          <BoldText>{parsedComments[1]}</BoldText>
        </CommentWrapper>
      );
    };

    return (
        <>
            <Wrapper>
                <Title>로또 6/45 <ColoredText>제 1127회</ColoredText></Title>
                <SmallText>{today} 추첨</SmallText>
                <div><b>당첨번호</b></div>
                <NumberWrapper>
                    {mainNumbers.map((number) => (
                        <Number key={number} number={number}>{number}</Number>
                    ))}
                    <BonusNumber>+</BonusNumber>
                    <Number number={bonusNumber}>{bonusNumber}</Number>
                </NumberWrapper>
                <TextWrapper>{parseComment(comment)}</TextWrapper>
                <UnderWrapper>
                    <Table>
                        {['A', 'B', 'C', 'D', 'E'].map((label, index) => (
                            <TableRow key={label}>
                                <LabelCell>{label}</LabelCell>
                                {rowNumbers[index].map((number) => (
                                    <NumberCell key={number} number={number} lottoNumbers={lottoNumbers}>
                                        {number}
                                    </NumberCell>
                                ))}
                            </TableRow>
                        ))}
                    </Table>
                    <Footer>- QR 당첨확인은 보조 확인수단이므로 반드시 실물과 대조하시길 바라며, 당첨금은 실물 복권소지자에게 지급합니다.</Footer>
                    <Button onClick={handleDraw}>5천원 더!</Button>
                    <p>누적 금액: {count * 5000}원</p>
                </UnderWrapper>
            </Wrapper>
        </>
    );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8faff;
  padding: 20px;
  margin: 0 auto;
`;

const UnderWrapper = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 24px;
  color: #4f4f4f;
  font-family: SUITE;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 10px;
`;

const ColoredText = styled.span`
  color: #2989ff;
`;

const SmallText = styled.span`
  font-size: 14px;
  color: #9a9a9a;
  margin-bottom: 20px;
`;

const NumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Number = styled.span`
  background-color: ${({ number }) => getColor(number)};
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const BonusNumber = styled.span`
  font-size: 24px;
  display: flex;
  align-items: center;
  margin: 0 5px 0 5px;
  
`;

const TextWrapper = styled.div`
  width: 93.5%;
  font-size: 18px;
  text-align: center;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const CommentWrapper = styled.div`
  font-size: 18px;
  text-align: center;
`;

const BoldText = styled.b`
  display: block;
  margin-top: 10px;
`;

const Table = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  border-collapse: collapse;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0.5px solid #ddd;
`;

const LabelCell = styled.div`
  background-color: #efefef;
  border: 0.5px solid #ddd;
  width: 60px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #616161;
`;

const NumberCell = styled.div`
  background-color: ${({ number, lottoNumbers }) => lottoNumbers.includes(number) ? getColor(number) : '#fff'};
  color: ${({ lottoNumbers, number }) => lottoNumbers.includes(number) ? '#fff' : '#000'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  margin: 8px 10px 8px 10px;
`;

const Footer = styled.footer`
  font-size: 12px;
  color: #808080;
  text-align: left;
  margin: 12px 0 12px 0;
`;

const Button = styled.button`
  margin-top: 5px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2989ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1e7ae5;
  }
`;
