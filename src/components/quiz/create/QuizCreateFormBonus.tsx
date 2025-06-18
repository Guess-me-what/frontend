"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useQuizStore } from "@/store/quiz";
import { useGenerateQuizMutation } from "@/queries/quiz/quiz.query";

const QuizCreateFormBonus = () => {
  const router = useRouter();
  const [introduction, setIntroduction] = useState("");
  const { nickname, questions, setQuizCode } = useQuizStore();
  const generateQuizMutation = useGenerateQuizMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleIntroductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setIntroduction(e.target.value);
    }
  };

  const goToPrev = () => {
    router.push("/quiz/create/q5");
  };

  const handleSubmit = () => {
    if (!introduction.trim()) {
      alert("한 마디를 입력해주세요!");
      return;
    }

    setIsLoading(true);
    generateQuizMutation.mutate(
      {
        nickname,
        introduction,
        questions,
      },
      {
        onSuccess: (response) => {
          setIsLoading(false);
          if (response.data?.code) {
            setQuizCode(response.data.code);
            router.push("/quiz/create/complete");
          } else {
            alert("퀴즈 생성에 실패했습니다. 다시 시도해주세요.");
          }
        },
        onError: (error) => {
          setIsLoading(false);
          alert("퀴즈 생성에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={goToPrev}>{"<"}</BackButton>
        <ProfileIcon src="/icons/profileIcon.svg" alt="프로필 아이콘" />
      </Header>

      <Content>
        <Title>마지막으로,</Title>
        <SubTitle>친구들에게 한마디를 남겨주세요!</SubTitle>

        <InputWrapper>
          <Input
            type="text"
            value={introduction}
            onChange={handleIntroductionChange}
            placeholder="예) 우정 온도 100인 친구에게 엽떡 쏜다!"
            maxLength={50}
          />
          <CharCount>{introduction.length}/50</CharCount>
        </InputWrapper>
      </Content>

      <ButtonWrapper>
        <PrevButton onClick={goToPrev} disabled={isLoading}>이전</PrevButton>
        <MainButton onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "생성 중..." : "완료"}
        </MainButton>
      </ButtonWrapper>
    </Container>
  );
};

export default QuizCreateFormBonus;

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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${GuessMeColor.Gray700};
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
  margin-top: 30px;
`;

const Title = styled.h1`
  color: ${GuessMeColor.White};
  font-size: 24px;
  margin-bottom: 8px;
  text-align: center;
`;

const SubTitle = styled.p`
  color: ${GuessMeColor.White};
  font-size: 16px;
  margin-bottom: 40px;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${GuessMeColor.Gray600};
  color: ${GuessMeColor.White};
  font-size: 16px;
  padding: 8px 0;
  text-align: center;
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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
