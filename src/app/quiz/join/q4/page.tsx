"use client";

import QuizJoinFormQ4 from "@/components/quiz/join/QuizJoinFormQ4";
import { useQuizStore } from "@/store/quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const QuizJoinQ4Page = () => {
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

  return <QuizJoinFormQ4 question={quizQuestions[3]} />;
};

export default QuizJoinQ4Page;