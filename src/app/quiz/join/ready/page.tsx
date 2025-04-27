"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const QuizCreateComplete = () => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGoTest = () => {
    router.push("/quiz/join/q1");
  };

  const handleGoJoin = () => {
    router.push("/quiz/join");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleGoJoin}>
          <ChevronLeft size={28} color="white" />
        </BackButton>
      </Header>

      <TopMessage>
        <HighlightText>테스트를 찾았어요!</HighlightText>
        <HighlightText>시작할까요?</HighlightText>
      </TopMessage>

      <Card>
        <ProfileCircle />

        <CardContent>
          <SubTitle>발견한 테스트</SubTitle>
          <Title>최미래님의 테스트</Title>

          <ShareSection>
            <ShareLabel>한마디</ShareLabel>
            <ShareCode>“우정 온도 100인 친구에게 엽떡 쏜다!”</ShareCode>
          </ShareSection>

          {copySuccess && (
            <SnsShareMessage>SNS에 공유해보세요!</SnsShareMessage>
          )}

          <ExpireDate>유효 기간: 2024.04.02</ExpireDate>
        </CardContent>
      </Card>

      <ButtonWrapper>
        <PrevButton onClick={handleGoJoin}>이전</PrevButton>
        <MainButton onClick={handleGoTest}>시작하기</MainButton>
      </ButtonWrapper>
    </Container>
  );
};

export default QuizCreateComplete;

// ===== 스타일 =====

const Container = styled.div`
  min-height: 100vh;
  padding: 24px 20px 32px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
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

const SnsShareMessage = styled.div`
  font-size: 12px;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 8px;
`;

const ExpireDate = styled.div`
  font-size: 12px;
  color: ${GuessMeColor.Gray700};
  margin-top: 8px;
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
