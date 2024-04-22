"use server"

import content from "@/content/(main)/add-exercise/content-add-exercise-form";
import { z } from "zod";
import { prisma } from "../../prisma/client";

const schema = z.object({
  question: z.string(),
  answer: z.string(),
  image: z.instanceof(File),
})

export default async function addExercise(_prevFormState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    question: formData.get(content.questionInputLabel),
    answer: formData.get(content.answerInputLabel),
    image: formData.get(content.imageUploadInputLabel),
  })

  if (!validatedFields.success) {
    return {
      error: "Error when parsing form data",
      errorDetail: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data;

  let newExercise;
  try {
    newExercise = await prisma.exercise.create({
      data: {
        question: data.question,
        correctAnswer: data.answer,
        image: Buffer.from(await data.image.text()),
      }
    })
  }
  catch (e) {
    console.log(e);
    return {
      error: "Error when create new record in database"
    }
  }

  return {
    success: true,
  }
}
