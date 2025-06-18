"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import GuessMeColor from "@/styles/foundation/color";
import { useQuizStore } from "@/store/quiz";

const QuizHome = () => {
  const router = useRouter();
  const { nickname } = useQuizStore();

  const handleCreateQuiz = () => {
    router.push("/quiz/create/q1");
  };

  const handleSolveFriendQuiz = () => {
    router.push("/quiz/join");
  };

  return (
    <Container>
      <Header>
        <ProfileIcon src="/icons/profileIcon.svg" alt="프로필 아이콘" />
      </Header>

      <Content>
        <WelcomeText>반가워요, {nickname} 님!</WelcomeText>
        <InstructionText>사용할 서비스를 선택해 주세요</InstructionText>

        <ButtonGroup>
          <MenuButton onClick={handleCreateQuiz}>
            <Icon src="/icons/createIcon.svg" alt="퀴즈 만들기" />
            <ButtonText>내 퀴즈 만들기</ButtonText>
          </MenuButton>

          <MenuButton onClick={handleSolveFriendQuiz}>
            <Icon src="/icons/participateIcon.svg" alt="퀴즈 풀러가기" />
            <ButtonText>
              친구 문제
              <br />
              풀러가기
            </ButtonText>
          </MenuButton>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${GuessMeColor.Gray700};
  object-fit: cover;
`;

const Content = styled.div`
  margin-top: 100px;
  text-align: left;
`;

const WelcomeText = styled.div`
  color: ${GuessMeColor.White};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InstructionText = styled.div`
  color: ${GuessMeColor.White};
  font-size: 18px;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const MenuButton = styled.button`
  flex: 1;
  background: ${GuessMeColor.Gray700};
  border: none;
  border-radius: 16px;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
`;

const ButtonText = styled.div`
  color: ${GuessMeColor.White};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default QuizHome;
