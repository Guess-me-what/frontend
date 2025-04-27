"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { Copy } from "lucide-react";
import { useState } from "react";

const QuizCreateComplete = () => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGoHome = () => {
    router.push("/quiz");
  };

  const handleGoBonus = () => {
    router.push("/quiz/create/bonus");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("ANSFKEW").then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <Container>
      <TopMessage>
        <HighlightText>USER 님의 테스트를</HighlightText>
        <HighlightText>성공적으로 만들었어요!</HighlightText>
      </TopMessage>

      <Card>
        <ProfileCircle />

        <CardContent>
          <SubTitle>회원님의 테스트</SubTitle>
          <Title>USER 님의 테스트</Title>

          <ShareSection>
            <ShareLabel>공유 코드</ShareLabel>
            <CodeWithIcon>
              <ShareCode>ABCDEFG</ShareCode>
              <CopyIcon onClick={handleCopyCode} />
            </CodeWithIcon>
          </ShareSection>

          {copySuccess && (
            <SnsShareMessage>SNS에 공유해보세요!</SnsShareMessage>
          )}

          <ExpireDate>유효 기간: 2025.12.30</ExpireDate>
        </CardContent>
      </Card>

      <ButtonWrapper>
        <PrevButton onClick={handleGoBonus}>이전</PrevButton>
        <MainButton onClick={handleGoHome}>메인으로</MainButton>
      </ButtonWrapper>
    </Container>
  );
};

export default QuizCreateComplete;

// ===== 스타일 =====

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopMessage = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 40px;
`;

const HighlightText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${GuessMeColor.White};
`;

const Card = styled.div`
  width: 100%;
  background-color: ${GuessMeColor.Yellow200};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  display: flex;
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
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: ${GuessMeColor.Gray700};
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${GuessMeColor.Gray900};
  margin: 4px 0 16px;
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ShareLabel = styled.div`
  background-color: ${GuessMeColor.Yellow100};
  color: ${GuessMeColor.Gray900};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  margin-right: 8px;
`;

const CodeWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

const ShareCode = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${GuessMeColor.Gray900};
`;

const CopyIcon = styled(Copy)`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  color: ${GuessMeColor.Gray900};
  cursor: pointer;
`;

const SnsShareMessage = styled.div`
  font-size: 12px;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 8px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ExpireDate = styled.div`
  font-size: 12px;
  color: ${GuessMeColor.Gray700};
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: auto;
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
