import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  const createdExercise = await prisma.exercise.create({
    data: {
      question: "What's your name?",
      correctAnswer: "Admin",
    }
  })
  return NextResponse.json(createdExercise);
}
