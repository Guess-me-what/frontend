"use client";

import QuizJoinFormQ2 from "@/components/quiz/join/QuizJoinFormQ2";
import { useQuizStore } from "@/store/quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const QuizJoinQ2Page = () => {
  const router = useRouter();
  const { quizQuestions } = useQuizStore();

  useEffect(() => {
    if (!quizQuestions || quizQuestions.length === 0) {
      router.push("/quiz/join");
    }
  }, [quizQuestions, router]);

  if (!quizQuestions || quizQuestions.length === 0) {
    return null;
  }

  return <QuizJoinFormQ2 question={quizQuestions[1]} />;
};

export default QuizJoinQ2Page;