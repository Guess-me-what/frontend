"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import GuessMeColor from "@/styles/foundation/color";

const QuizCreateFormQ1 = () => {
  const router = useRouter();
  const [answer, setAnswer] = useState<"O" | "X" | null>(null);

  const handleAnswerSelect = (selected: "O" | "X") => {
    setAnswer(selected);
    setTimeout(() => {
      router.push("/quiz/join/q2"); // 0.2초 후 페이지 이동
    }, 200);
  };

  const goToPrev = () => {
    router.push("/quiz/join/ready");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={goToPrev}>{"<"}</BackButton>
        <ProfileIcon src="/icons/profileIcon.svg" alt="프로필 아이콘" />
      </Header>

      <ProgressBarWrapper>
        <ProgressBar>
          <Progress width="20%" />
        </ProgressBar>
      </ProgressBarWrapper>

      <Content>
        <QuestionSection>
          <QuestionTitle>Q1.</QuestionTitle>
          <QuestionInput>남녀 사이의 친구는 존재한다</QuestionInput>
        </QuestionSection>

        <BottomSection>
          <AnswerSection>
            <AnswerButton
              selected={answer === "O"}
              onClick={() => handleAnswerSelect("O")}>
              O
            </AnswerButton>
            <AnswerButton
              selected={answer === "X"}
              onClick={() => handleAnswerSelect("X")}>
              X
            </AnswerButton>
          </AnswerSection>
        </BottomSection>
      </Content>
    </Container>
  );
};

export default QuizCreateFormQ1;

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

// --- 버튼 눌림 애니메이션 ---
const clickAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
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
  animation: ${({ selected }) => (selected ? clickAnimation : "none")} 0.3s;
`;
