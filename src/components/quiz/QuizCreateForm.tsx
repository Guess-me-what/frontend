// src/components/quiz/QuizCreateForm.tsx

"use client";

import { useState } from "react";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";

const QuizCreateForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<"O" | "X" | null>(null);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) {
      setQuestion(e.target.value);
    }
  };

  const handleAnswerSelect = (selected: "O" | "X") => {
    setAnswer(selected);
  };

  return (
    <Container>
      <Header>
        <BackButton>{"<"}</BackButton>
        <UserIcon />
      </Header>

      <ProgressBarWrapper>
        <ProgressBar>
          <Progress width="20%" /> {/* 1/5 진행바 */}
        </ProgressBar>
      </ProgressBarWrapper>

      <Content>
        <QuestionSection>
          <QuestionTitle>Q1.</QuestionTitle>
          <QuestionInput
            value={question}
            onChange={handleQuestionChange}
            placeholder="질문을 적어주세요 (25자 이내)"
          />
        </QuestionSection>

        <AnswerSection>
          <AnswerLabel>정답</AnswerLabel>
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

        <BottomButtonWrapper>
          <PrevButton disabled>이전</PrevButton>
          <NextButton>다음 문제</NextButton>
        </BottomButtonWrapper>
      </Content>
    </Container>
  );
};

export default QuizCreateForm;

// 스타일
const Container = styled.div`
  background-color: ${GuessMeColor.Gray900};
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

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${GuessMeColor.Gray700};
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

const QuestionInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${GuessMeColor.Gray600};
  color: ${GuessMeColor.White};
  font-size: 16px;
  padding: 8px 0;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${GuessMeColor.White};
  }
  &::placeholder {
    color: ${GuessMeColor.Gray400};
  }
`;

const AnswerSection = styled.div`
  margin-top: 20px;
`;

const AnswerLabel = styled.div`
  color: ${GuessMeColor.White};
  font-weight: bold;
  margin-bottom: 16px;
`;

const AnswerButton = styled.button<{ selected: boolean }>`
  width: 100%;
  background-color: ${({ selected }) =>
    selected ? GuessMeColor.Gray400 : GuessMeColor.Gray700};
  color: ${GuessMeColor.White};
  font-size: 18px;
  padding: 12px 0;
  margin-bottom: 10px;
  border: 1px solid ${GuessMeColor.Gray500};
  border-radius: 8px;
  cursor: pointer;
`;

const BottomButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const PrevButton = styled.button`
  flex: 1;
  background-color: ${GuessMeColor.Gray700};
  color: ${GuessMeColor.Gray400};
  font-size: 16px;
  padding: 12px 0;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: not-allowed;
`;

const NextButton = styled.button`
  flex: 2;
  background-color: ${GuessMeColor.Yellow300};
  color: ${GuessMeColor.Gray900};
  font-size: 16px;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
