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
        <MainButton onClick={handleGoHome}>메인으로</MainButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const TopMessage = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const HighlightText = styled.div`
  color: ${GuessMeColor.White};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Card = styled.div`
  background: ${GuessMeColor.Gray700};
  border-radius: 16px;
  padding: 24px;
  margin: 40px 0;
`;

const ProfileCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${GuessMeColor.Gray600};
  margin: 0 auto 20px;
`;

const CardContent = styled.div`
  text-align: center;
`;

const SubTitle = styled.div`
  color: ${GuessMeColor.Gray400};
  font-size: 14px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  color: ${GuessMeColor.White};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ShareSection = styled.div`
  margin-bottom: 16px;
`;

const ShareLabel = styled.div`
  color: ${GuessMeColor.Gray400};
  font-size: 14px;
  margin-bottom: 8px;
`;

const CodeWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ShareCode = styled.div`
  color: ${GuessMeColor.White};
  font-size: 18px;
  font-weight: bold;
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CopySuccessMessage = styled.div`
  color: ${GuessMeColor.Yellow200};
  font-size: 14px;
  margin-top: 8px;
`;

const ExpireDate = styled.div`
  color: ${GuessMeColor.Gray400};
  font-size: 12px;
  margin-top: 16px;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

const MainButton = styled.button`
  width: 100%;
  background-color: ${GuessMeColor.Yellow200};
  color: ${GuessMeColor.Gray900};
  font-size: 16px;
  padding: 16px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default QuizCreateComplete;
