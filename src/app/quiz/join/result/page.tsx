"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GuessMeColor from "@/styles/foundation/color";

const QuizResult = () => {
  const router = useRouter();

  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const end = 60;
    const duration = 3000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentTemp = progress * end;
      setTemperature(currentTemp);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);
  }, []);

  const handleGoHome = () => {
    router.push("/quiz");
  };

  const handleGoCreate = () => {
    router.push("/quiz/create/q1");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => router.push("/quiz")}>{"<"}</BackButton>
      </Header>

      <Content>
        <Title>
          OLSM 님과 최미래 님의
          <br />
          우정 온도는 ...
        </Title>

        <TempWrapper>
          <TempText left={`${temperature}%`}>
            {Math.round(temperature)}℃
          </TempText>
          <ProgressBar>
            <Progress width={`${temperature}%`} />
          </ProgressBar>
          <Triangle left={`${temperature}%`} />
        </TempWrapper>

        <AnswerSummary>
          <AnswerTitle>오답 내역</AnswerTitle>

          <AnswerItem>
            <Question>Q1. 남녀 사이의 친구는 존재한다</Question>
            <Correct>정답 : O</Correct>
          </AnswerItem>

          <AnswerItem>
            <Question>Q5. 게임을 하루에 15시간 이상 해본 적이 있다</Question>
            <Correct>정답 : X</Correct>
          </AnswerItem>
        </AnswerSummary>

        <ButtonWrapper>
          <HomeButton onClick={handleGoHome}>홈으로</HomeButton>
          <CreateLink onClick={handleGoCreate}>내 퀴즈 만들러 가기</CreateLink>
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default QuizResult;

// ===== 스타일 =====

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${GuessMeColor.White};
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
`;

const Title = styled.h1`
  color: ${GuessMeColor.White};
  font-size: 20px;
  text-align: left;
  line-height: 1.5;
`;

const TempWrapper = styled.div`
  margin-top: 40px;
  position: relative;
  width: 100%;
  height: 80px;
`;

const TempText = styled.div<{ left: string }>`
  position: absolute;
  top: 0;
  left: ${({ left }) => left};
  transform: translateX(-50%);
  color: ${GuessMeColor.Yellow200};
  font-size: 24px;
  font-weight: bold;
  transition: left 0.3s ease;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 12px;
  background-color: ${GuessMeColor.Gray700};
  border-radius: 6px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${GuessMeColor.Yellow200};
  transition: width 0.3s ease;
`;

const Triangle = styled.div<{ left: string }>`
  position: absolute;
  top: 40px;
  left: ${({ left }) => left};
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid ${GuessMeColor.Yellow200};
  transition: left 0.3s ease;
`;

const AnswerSummary = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const AnswerTitle = styled.div`
  color: ${GuessMeColor.White};
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;

const AnswerItem = styled.div`
  margin-bottom: 30px;
`;

const Question = styled.div`
  color: ${GuessMeColor.White};
  font-size: 16px;
  margin-bottom: 8px;
  white-space: pre-wrap;
`;

const Correct = styled.div`
  color: ${GuessMeColor.Red};
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeButton = styled.button`
  width: 100%;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  font-size: 18px;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const CreateLink = styled.div`
  color: ${GuessMeColor.White};
  font-size: 14px;
  cursor: pointer;
`;
