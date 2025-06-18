"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useQuizStore } from "@/store/quiz";
import { QuizQuestion } from "@/store/quiz";
import guessMeWhatAxios from "@/libs/axios/customAxios";

interface QuizJoinFormQ5Props {
  question: QuizQuestion;
}

const QuizJoinFormQ5 = ({ question }: QuizJoinFormQ5Props) => {
  const router = useRouter();
  const [answer, setAnswer] = useState<"O" | "X" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setParticipantAnswer, participantAnswers, quizCode, participantNickname } = useQuizStore();

  const handleAnswerSelect = async (selected: "O" | "X") => {
    if (isSubmitting) return;
    
    setAnswer(selected);
    setParticipantAnswer(4, selected === "O");
    setIsSubmitting(true);

    try {
      // null 값을 제외한 실제 답변만 필터링
      const validAnswers = participantAnswers
        .map((answer, index) => ({
          number: index + 1,
          answer: answer === null ? null : answer ? "O" : "X",
        }))
        .filter(item => item.answer !== null);

      console.log("제출 데이터:", {
        quizCode,
        nickname: participantNickname,
        answers: validAnswers
      });

      // 답변 제출
      const response = await guessMeWhatAxios.post(`/quiz/${quizCode}/submit`, {
        nickname: participantNickname,
        answers: validAnswers,
      });

      console.log("제출 응답:", response.data);

      if (response.data.status === 200) {
        console.log("제출 성공, 결과 페이지로 이동");
        // 제출 성공 시 결과 페이지로 이동
        router.push("/quiz/join/result");
      }
    } catch (error) {
      console.error("답변 제출 실패:", error);
      alert("답변 제출에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  const goToPrev = () => {
    router.push("/quiz/join/q4");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={goToPrev}>{"<"}</BackButton>
        <ProfileIcon src="/icons/profileIcon.svg" alt="프로필 아이콘" />
      </Header>

      <ProgressBarWrapper>
        <ProgressBar>
          <Progress width="100%" />
        </ProgressBar>
      </ProgressBarWrapper>

      <Content>
        <QuestionSection>
          <QuestionTitle>Q5.</QuestionTitle>
          <QuestionInput>{question.question}</QuestionInput>
        </QuestionSection>

        <BottomSection>
          <AnswerSection>
            <AnswerButton
              selected={answer === "O"}
              onClick={() => handleAnswerSelect("O")}
              disabled={isSubmitting}>
              {isSubmitting ? "제출 중..." : "O"}
            </AnswerButton>
            <AnswerButton
              selected={answer === "X"}
              onClick={() => handleAnswerSelect("X")}
              disabled={isSubmitting}>
              {isSubmitting ? "제출 중..." : "X"}
            </AnswerButton>
          </AnswerSection>
        </BottomSection>
      </Content>
    </Container>
  );
};

export default QuizJoinFormQ5;

// ===== 애니메이션 =====
const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

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

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${GuessMeColor.White};
  font-size: 24px;
  cursor: pointer;
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${GuessMeColor.Gray700};
  object-fit: cover;
`;

const ProgressBarWrapper = styled.div`
  margin: 20px 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${GuessMeColor.Gray600};
  border-radius: 2px;
`;

const Progress = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${GuessMeColor.White};
  border-radius: 2px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 200px);
  margin-top: 30px;
`;

const QuestionSection = styled.div`
  margin-bottom: 40px;
`;

const QuestionTitle = styled.div`
  font-size: 20px;
  color: ${GuessMeColor.White};
  margin-bottom: 10px;
`;

const QuestionInput = styled.div`
  width: 100%;
  background: transparent;
  color: ${GuessMeColor.White};
  font-size: 20px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnswerSection = styled.div`
  margin-bottom: 20px;
`;

const AnswerButton = styled.button<{ selected: boolean }>`
  width: 100%;
  background-color: ${({ selected }) =>
    selected ? GuessMeColor.Yellow200 : GuessMeColor.Gray700};
  color: ${({ selected }) =>
    selected ? GuessMeColor.Gray700 : GuessMeColor.White};
  font-size: 18px;
  padding: 12px 0;
  margin-bottom: 10px;
  border: 1px solid ${GuessMeColor.Gray500};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  animation: ${({ selected }) => (selected ? clickAnimation : "none")} 0.2s;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

