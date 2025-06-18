"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuizStore } from "@/store/quiz";

const QuizCreateComplete = () => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);
  const { nickname, quizCode } = useQuizStore();

  useEffect(() => {
    if (!quizCode) {
      alert('퀴즈 생성에 실패했습니다. 다시 시도해주세요.');
      router.push('/quiz/create/bonus');
      return;
    }
  }, [quizCode, router]);

  const handleGoHome = () => {
    router.push("/quiz");
  };

  const handleGoBonus = () => {
    router.push("/quiz/create/bonus");
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(quizCode || '');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert("코드 복사에 실패했습니다.");
    }
  };

  return (
    <Container>
      <TopMessage>
        <HighlightText>{nickname}님의 테스트를</HighlightText>
        <HighlightText>성공적으로 만들었어요!</HighlightText>
      </TopMessage>

      <Card>
        <ProfileCircle />

        <CardContent>
          <SubTitle>회원님의 테스트</SubTitle>
          <Title>{nickname}님의 테스트</Title>

          <ShareSection>
            <ShareLabel>공유 코드</ShareLabel>
            <CodeWithIcon>
              <ShareCode>{quizCode || ''}</ShareCode>
              <CopyIcon onClick={handleCopyCode}>
                <Copy size={20} color={GuessMeColor.Gray400} />
              </CopyIcon>
            </CodeWithIcon>
          </ShareSection>

          {copySuccess && (
            <CopySuccessMessage>코드가 복사되었습니다!</CopySuccessMessage>
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
  background-color: ${GuessMeColor.Gray700};
  border-radius: 16px;
  padding: 24px;
  position: relative;
`;

const ProfileCircle = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${GuessMeColor.Gray500};
  border-radius: 50%;
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
`;

const CardContent = styled.div`
  margin-top: 32px;
`;

const SubTitle = styled.div`
  color: ${GuessMeColor.Gray400};
  font-size: 14px;
  margin-bottom: 4px;
`;

const Title = styled.div`
  color: ${GuessMeColor.White};
  font-size: 20px;
  margin-bottom: 24px;
`;

const ShareSection = styled.div`
  margin-bottom: 8px;
`;

const ShareLabel = styled.div`
  color: ${GuessMeColor.Gray400};
  font-size: 14px;
  margin-bottom: 8px;
`;

const CodeWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareCode = styled.div`
  color: ${GuessMeColor.White};
  font-size: 24px;
  font-weight: bold;
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

const CopySuccessMessage = styled.div`
  color: ${GuessMeColor.Yellow200};
  font-size: 14px;
  margin-top: 8px;
`;

const ExpireDate = styled.div`
  color: ${GuessMeColor.Gray400};
  font-size: 14px;
  margin-top: 24px;
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
  color: ${GuessMeColor.Gray300};
  font-size: 16px;
  padding: 12px 0;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const MainButton = styled.button`
  flex: 2;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  font-size: 16px;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
