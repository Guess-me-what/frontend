import { useMutation } from '@tanstack/react-query';
import guessMeWhatAxios from '@/libs/axios/customAxios';

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
  data: {
    code: string;
  };
}

export const useGenerateQuizMutation = () => {
  return useMutation<GenerateQuizResponse, Error, GenerateQuizRequest>({
    mutationFn: async (data) => {
      const response = await guessMeWhatAxios.post('/quiz/generate', data);
      return response.data;
    },
  });
}; 