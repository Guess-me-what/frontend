"use client";

import QuizJoinFormQ5 from "@/components/quiz/join/QuizJoinFormQ5";
import { useQuizStore } from "@/store/quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const QuizJoinQ5Page = () => {
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

  return <QuizJoinFormQ5 question={quizQuestions[4]} />;
};

export default QuizJoinQ5Page;
