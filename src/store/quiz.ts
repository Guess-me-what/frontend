import { create } from 'zustand';

interface Question {
  question: string;
  answer: boolean;
}

interface QuizInfo {
  nickname: string;
  introduction: string;
  expirationDate: string;
}

export interface QuizQuestion {
  number: number;
  question: string;
}

interface QuizState {
  // 퀴즈 생성 관련
  nickname: string;
  introduction: string;
  questions: Question[];
  quizCode: string | null;
  setNickname: (nickname: string) => void;
  setIntroduction: (introduction: string) => void;
  setQuestion: (index: number, question: string) => void;
  setAnswer: (index: number, answer: boolean) => void;
  setQuizCode: (code: string) => void;
  resetQuiz: () => void;

  // 퀴즈 참여 관련
  quizInfo: {
    nickname: string;
    introduction: string;
    expireAt: string;
  } | null;
  quizQuestions: QuizQuestion[];
  participantAnswers: (boolean | null)[];
  participantNickname: string | null;
  setQuizInfo: (info: { nickname: string; introduction: string; expireAt: string }) => void;
  setQuizQuestions: (questions: QuizQuestion[]) => void;
  setParticipantAnswer: (index: number, answer: boolean) => void;
  setParticipantNickname: (nickname: string) => void;
  resetParticipantAnswers: () => void;
}

const initialState = {
  // 퀴즈 생성 관련
  nickname: '',
  introduction: '',
  questions: Array(5).fill({ question: '', answer: null }),
  quizCode: null,

  // 퀴즈 참여 관련
  quizInfo: null,
  quizQuestions: [],
  participantAnswers: Array(5).fill(null),
  participantNickname: null,
};

export const useQuizStore = create<QuizState>((set) => ({
  ...initialState,
  // 퀴즈 생성 관련 액션
  setNickname: (nickname: string) => set({ nickname }),
  setIntroduction: (introduction: string) => set({ introduction }),
  setQuestion: (index: number, question: string) =>
    set((state: QuizState) => ({
      questions: state.questions.map((q: Question, i: number) =>
        i === index ? { ...q, question } : q
      ),
    })),
  setAnswer: (index: number, answer: boolean) =>
    set((state: QuizState) => ({
      questions: state.questions.map((q: Question, i: number) =>
        i === index ? { ...q, answer } : q
      ),
    })),
  setQuizCode: (code: string) => set({ quizCode: code }),
  resetQuiz: () => set(initialState),

  // 퀴즈 참여 관련 액션
  setQuizInfo: (info: { nickname: string; introduction: string; expireAt: string }) => set({ quizInfo: info }),
  setQuizQuestions: (questions: QuizQuestion[]) => set({ quizQuestions: questions }),
  setParticipantAnswer: (index: number, answer: boolean) =>
    set((state: QuizState) => {
      const newAnswers = [...state.participantAnswers];
      newAnswers[index] = answer;
      return { participantAnswers: newAnswers };
    }),
  setParticipantNickname: (nickname: string) => set({ participantNickname: nickname }),
  resetParticipantAnswers: () => set({ participantAnswers: Array(5).fill(null) }),
})); 