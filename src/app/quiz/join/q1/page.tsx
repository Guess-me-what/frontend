"use client";

import QuizJoinFormQ1 from "@/components/quiz/join/QuizJoinFormQ1";
import { useQuizStore } from "@/store/quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const QuizJoinQ1Page = () => {
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

  return <QuizJoinFormQ1 question={quizQuestions[0]} />;
};

export default QuizJoinQ1Page;