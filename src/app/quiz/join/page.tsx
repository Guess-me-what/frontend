"use client";

import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quiz";
import guessMeWhatAxios from "@/libs/axios/customAxios";

const QuizJoinFindPage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setQuizCode, setQuizInfo, setQuizQuestions, resetParticipantAnswers } = useQuizStore();

  const goToTest = async () => {
    if (code.trim() === "") {
      alert("코드를 입력해 주세요!");
      return;
    }

    setIsLoading(true);
    try {
      // 퀴즈 정보 가져오기
      const [quizResponse, questionsResponse] = await Promise.all([
        guessMeWhatAxios.get(`/quiz/${code}`),
        guessMeWhatAxios.get(`/quiz/${code}/questions`)
      ]);

      if (quizResponse.data.status === 200 && questionsResponse.data.status === 200) {
        setQuizCode(code);
        setQuizInfo(quizResponse.data.data);
        setQuizQuestions(questionsResponse.data.data.questions);
        resetParticipantAnswers();
        router.push("/quiz/join/ready");
      } else {
        alert("유효하지 않은 퀴즈 코드입니다.");
      }
    } catch (error) {
      console.error("퀴즈 정보 가져오기 실패:", error);
      alert("퀴즈 정보를 가져오는데 실패했습니다. 코드를 다시 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToCreate = () => {
    router.push("/quiz/create/q1");
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <Container>
      <Header>
        <ProfileIcon src="/icons/profileIcon.svg" alt="Profile Icon" />
      </Header>

      <Content>
        <Title>나는 베프에 대해 얼마나 알고 있을까?</Title>
        <SubTitle>
          간단한 퀴즈를 통해 서로에 대해 더 깊이
          <br />
          알아가는 기회를 가져보세요!
        </SubTitle>

        <TempBox>
          <TempText>_ _</TempText>
          <TempUnit>°C</TempUnit>
        </TempBox>

        <CodeInput
          type="text"
          value={code}
          onChange={handleCodeChange}
          placeholder="친구로부터 전달받은 코드를 입력해 주세요"
          disabled={isLoading}
        />
      </Content>

      <BottomArea>
        <TestButton onClick={goToTest} disabled={isLoading}>
          {isLoading ? "로딩 중..." : "테스트 하러 가기"}
        </TestButton>
        <CreateLink onClick={goToCreate}>내 퀴즈 만들러 가기</CreateLink>
      </BottomArea>
    </Container>
  );
};

export default QuizJoinFindPage;

// ===== 스타일 =====

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px 20px 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

const Title = styled.h1`
  font-size: 22px;
  color: ${GuessMeColor.White};
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: ${GuessMeColor.Gray300};
  text-align: center;
  margin-bottom: 48px;
  line-height: 1.6;
`;

const TempBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 80px;
  background-color: ${GuessMeColor.Gray600};
  border-radius: 12px;
  border: 1.5px solid ${GuessMeColor.Gray400};
  margin-bottom: 40px;
`;

const TempText = styled.span`
  font-size: 52px;
  color: ${GuessMeColor.White};
  margin-right: 4px;
`;

const TempUnit = styled.span`
  font-size: 20px;
  color: ${GuessMeColor.White};
`;

const CodeInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${GuessMeColor.White};
  color: ${GuessMeColor.White};
  font-size: 18px;
  padding: 12px 0;
  text-align: center;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${GuessMeColor.White};
  }
  &::placeholder {
    color: ${GuessMeColor.Gray100};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BottomArea = styled.div`
  margin-top: 24px;
`;

const TestButton = styled.button`
  width: 100%;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  font-size: 18px;
  padding: 16px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CreateLink = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: ${GuessMeColor.Gray300};
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

