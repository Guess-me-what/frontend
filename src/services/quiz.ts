import config from '@/config/config.json';

interface GenerateQuizRequest {
  nickname: string;
  introduction: string;
  questions: {
    question: string;
    answer: boolean;
  }[];
}

interface GenerateQuizResponse {
  status: number;
  message: string;
  data: string;
}

interface GetQuizResponse {
  status: number;
  message: string;
  data: {
    nickname: string;
    introduction: string;
    expirationDate: string;
  };
}

interface SubmitQuizRequest {
  nickname: string;
  answers: {
    number: number;
    answer: string;
  }[];
}

interface SubmitQuizResponse {
  status: number;
  message: string;
  data: {
    nickname: string;
    score: number;
    wrongAnswers: {
      number: number;
      correctAnswer: string;
    }[];
  };
}

export const generateQuiz = async (data: GenerateQuizRequest): Promise<GenerateQuizResponse> => {
  const response = await fetch(`${config.SERVER}/quiz/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getQuiz = async (code: string): Promise<GetQuizResponse> => {
  const response = await fetch(`${config.SERVER}/quiz/${code}`, {
    method: 'GET',
  });
  return response.json();
};

export const submitQuiz = async (code: string, data: SubmitQuizRequest): Promise<SubmitQuizResponse> => {
  const response = await fetch(`${config.SERVER}/quiz/${code}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}; 