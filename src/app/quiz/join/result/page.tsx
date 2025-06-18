"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useQuizStore } from "@/store/quiz";
import customAxios from "@/libs/axios/customAxios";

interface QuizResult {
  nickname: string;
  score: number;
  wrongAnswers: {
    number: number;
    correctAnswer: "O" | "X";
  }[];
}

const QuizJoinResultPage = () => {
  const router = useRouter();
  const { quizCode, participantNickname, participantAnswers } = useQuizStore();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (!quizCode || !participantNickname || !participantAnswers) {
          router.push("/quiz/join");
          return;
        }

        const formattedAnswers = participantAnswers.map((answer, index) => ({
          number: index + 1,
          answer: answer ? "O" : "X"
        }));

        const response = await customAxios.post(`/quiz/${quizCode}/submit`, {
          nickname: participantNickname,
          answers: formattedAnswers
        });

        if (response.data.status === 200) {
          setResult(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("결과를 가져오는데 실패했습니다:", error);
        setIsLoading(false);
      }
    };

    if (quizCode) {
      fetchResult();
    } else {
      console.log("필수 데이터 누락:", {
        quizCode,
        participantNickname,
        participantAnswers
      });
      router.push("/quiz/join");
    }
  }, [quizCode, participantNickname, participantAnswers, router, retryCount]);

  const goToHome = () => {
    router.push("/quiz");
  };

  if (isLoading) {
    return <div>결과를 불러오는 중...</div>;
  }

  if (!result) {
    return (
      <Container>
        <Content>
          <Title>결과를 불러올 수 없습니다.</Title>
          <HomeButton onClick={goToHome}>홈으로</HomeButton>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HomeButton onClick={goToHome}>홈으로</HomeButton>
        <ProfileIcon src="/icons/profileIcon.svg" alt="프로필 아이콘" />
      </Header>

      <Content>
        <Title>
          {result.nickname}님의
          <br />
          우정 온도는?
        </Title>

        <TemperatureSection>
          <TemperatureGraph>
            <TemperatureBar temperature={result.score} />
          </TemperatureGraph>
          <TemperatureText>{result.score}°C</TemperatureText>
        </TemperatureSection>

        <AnswerSummary>
          <SummaryTitle>오답 내역</SummaryTitle>
          {result.wrongAnswers.map((wrong) => (
            <WrongAnswerItem key={wrong.number}>
              <QuestionNumber>Q{wrong.number}.</QuestionNumber>
              <AnswerInfo>
                <CorrectAnswer>정답: {wrong.correctAnswer}</CorrectAnswer>
              </AnswerInfo>
            </WrongAnswerItem>
          ))}
        </AnswerSummary>
      </Content>
    </Container>
  );
};

export default QuizJoinResultPage;

// ===== 스타일 =====
const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeButton = styled.button`
  background: none;
  border: none;
  color: ${GuessMeColor.White};
  font-size: 16px;
  cursor: pointer;
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${GuessMeColor.Gray700};
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${GuessMeColor.White};
  text-align: center;
  line-height: 1.4;
  margin-bottom: 40px;
`;

const TemperatureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const TemperatureGraph = styled.div`
  width: 200px;
  height: 20px;
  background-color: ${GuessMeColor.Gray700};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const TemperatureBar = styled.div<{ temperature: number }>`
  width: ${({ temperature }) => (temperature / 100) * 100}%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${GuessMeColor.Yellow200} 0%,
    ${GuessMeColor.Yellow300} 100%
  );
  transition: width 1s ease-in-out;
`;

const TemperatureText = styled.div`
  font-size: 36px;
  color: ${GuessMeColor.White};
  font-weight: bold;
`;

const AnswerSummary = styled.div`
  width: 100%;
  max-width: 600px;
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  color: ${GuessMeColor.White};
  margin-bottom: 20px;
`;

const WrongAnswerItem = styled.div`
  background-color: ${GuessMeColor.Gray700};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const QuestionNumber = styled.div`
  font-size: 16px;
  color: ${GuessMeColor.Yellow200};
  margin-bottom: 8px;
`;

const AnswerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const CorrectAnswer = styled.div`
  color: ${GuessMeColor.Yellow200};
`;
