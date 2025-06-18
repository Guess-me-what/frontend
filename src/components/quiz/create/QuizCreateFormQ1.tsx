"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useQuizStore } from "@/store/quiz";

const QuizCreateFormQ1 = () => {
  const router = useRouter();
  const { questions, setQuestion, setAnswer } = useQuizStore();
  const [question, setLocalQuestion] = useState(questions[0].question);
  const [answer, setLocalAnswer] = useState<'O' | 'X' | null>(
    questions[0].answer ? 'O' : questions[0].answer === false ? 'X' : null
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) {
      setLocalQuestion(e.target.value);
      setQuestion(0, e.target.value);
    }
  };

  const handleAnswerSelect = (selected: 'O' | 'X') => {
    setLocalAnswer(selected);
    setAnswer(0, selected === 'O');
  };

  const goToPrev = () => {
    router.push("/quiz");
  };

  const goToNext = () => {
    if (!question.trim()) {
      alert('질문을 입력해주세요!');
      return;
    }
    if (!answer) {
      alert('답변을 선택해주세요!');
      return;
    }
    router.push("/quiz/create/q2");
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
          <QuestionInput
            value={question}
            onChange={handleQuestionChange}
            placeholder="질문을 입력해주세요"
            maxLength={25}
          />
          <CharCount>{question.length}/25</CharCount>
        </QuestionSection>

        <AnswerSection>
          <AnswerButton
            selected={answer === 'O'}
            onClick={() => handleAnswerSelect('O')}
          >
            O
          </AnswerButton>
          <AnswerButton
            selected={answer === 'X'}
            onClick={() => handleAnswerSelect('X')}
          >
            X
          </AnswerButton>
        </AnswerSection>
      </Content>

      <ButtonWrapper>
        <PrevButton onClick={goToPrev}>이전</PrevButton>
        <NextButton onClick={goToNext}>다음</NextButton>
      </ButtonWrapper>
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
  position: relative;
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
    color: ${GuessMeColor.Gray100};
  }
`;

const CharCount = styled.span`
  position: absolute;
  right: 0;
  bottom: -20px;
  color: ${GuessMeColor.Gray400};
  font-size: 12px;
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
`;

const BottomButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PrevButton = styled.button`
  flex: 1;
  background-color: ${GuessMeColor.Gray700};
  color: ${GuessMeColor.Gray300};
  font-size: 16px;
  padding: 12px 0;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const NextButton = styled.button`
  flex: 2;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  font-size: 16px;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
