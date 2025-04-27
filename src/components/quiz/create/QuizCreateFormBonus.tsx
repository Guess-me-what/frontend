"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";

const QuizCreateFormQ5 = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setQuestion(e.target.value);
    }
  };

  const goToPrev = () => {
    router.push("/quiz/create/q5");
  };

  const goToNext = () => {
    router.push("/quiz/create/complete");
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
          <QuestionTitle>Bonus. 한마디를 적어주세요</QuestionTitle>
          <QuestionInput
            value={question}
            onChange={handleQuestionChange}
            placeholder="예. “우정 온도 100인 친구에게 엽떡 쏜다!”"
          />
        </QuestionSection>

        <BottomButtonWrapper>
          <PrevButton onClick={goToPrev}>이전</PrevButton>
          <NextButton onClick={goToNext}>다음</NextButton>
        </BottomButtonWrapper>
      </Content>
    </Container>
  );
};

export default QuizCreateFormQ5;

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
