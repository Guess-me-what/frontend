"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useQuizStore } from "@/store/quiz";
import { useState } from "react";

const QuizJoinReadyPage = () => {
  const router = useRouter();
  const { quizInfo, setParticipantNickname } = useQuizStore();
  const [nickname, setNickname] = useState("");

  const goToPrev = () => {
    router.push("/quiz/join");
  };

  const goToNext = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요!");
      return;
    }
    setParticipantNickname(nickname);
    router.push("/quiz/join/q1");
  };

  if (!quizInfo) {
    router.push("/quiz/join");
    return null;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={goToPrev}>{"<"}</BackButton>
        <ProfileIcon src="/icons/profileIcon.svg" alt="프로필 아이콘" />
      </Header>

      <TopMessage>
        <HighlightText>테스트를 찾았어요!</HighlightText>
        <HighlightText>시작할까요?</HighlightText>
      </TopMessage>

      <Card>
        <ProfileCircle />
        <CardContent>
          <SubTitle>발견한 테스트</SubTitle>
          <Title>{quizInfo.nickname}님의 테스트</Title>

          <ShareSection>
            <ShareLabel>한마디</ShareLabel>
            <ShareCode>{quizInfo.introduction}</ShareCode>
          </ShareSection>

          <ExpireDate>유효 기간: {quizInfo.expireAt}</ExpireDate>
        </CardContent>
      </Card>

      <NicknameInput
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        maxLength={10}
      />

      <ButtonWrapper>
        <PrevButton onClick={goToPrev}>이전</PrevButton>
        <MainButton onClick={goToNext}>시작하기</MainButton>
      </ButtonWrapper>
    </Container>
  );
};

export default QuizJoinReadyPage;

// ===== 스타일 =====

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px 20px 32px;
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

const TopMessage = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
`;

const HighlightText = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${GuessMeColor.White};
  line-height: 1.4;
`;

const Card = styled.div`
  width: 100%;
  background-color: ${GuessMeColor.Yellow200};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 10vh;
`;

const ProfileCircle = styled.div`
  width: 60px;
  height: 60px;
  background-color: black;
  border-radius: 50%;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  margin-left: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: ${GuessMeColor.Gray700};
  margin-bottom: 4px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${GuessMeColor.Gray900};
  margin-bottom: 16px;
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ShareLabel = styled.div`
  background-color: ${GuessMeColor.Yellow100};
  color: ${GuessMeColor.Gray900};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  margin-right: 8px;
`;

const ShareCode = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${GuessMeColor.Gray900};
`;

const ExpireDate = styled.div`
  font-size: 12px;
  color: ${GuessMeColor.Gray700};
  margin-top: 8px;
`;

const NicknameInput = styled.input`
  width: 100%;
  background-color: ${GuessMeColor.Gray700};
  color: ${GuessMeColor.White};
  font-size: 16px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;

  &::placeholder {
    color: ${GuessMeColor.Gray400};
  }

  &:focus {
    outline: none;
    border: 1px solid ${GuessMeColor.Yellow200};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
`;

const PrevButton = styled.button`
  flex: 1;
  background-color: ${GuessMeColor.Gray700};
  color: ${GuessMeColor.Gray400};
  font-size: 16px;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const MainButton = styled.button`
  flex: 2;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  font-size: 16px;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
