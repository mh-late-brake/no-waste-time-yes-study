"use server"

// TODO: At the moment, if edit a exercise with image
// then save the exercise (without intentionally delete the image)
// the image still got delete

import content from "@/content/(main)/add-exercise/content-add-exercise-form";
import { z } from "zod";
import { prisma } from "../../prisma/client";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";

const schema = z.object({
  question: z.string(),
  answer: z.string(),
  image: z.instanceof(File),
  id: z.string(),
})

export default async function editExercise(_prevFormState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    question: formData.get(content.questionInputLabel),
    answer: formData.get(content.answerInputLabel),
    image: formData.get(content.imageUploadInputLabel),
    id: formData.get(content.idInputLabel),
  })

  if (!validatedFields.success) {
    return {
      error: "Error when parsing form data",
      errorDetail: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data;

  const randomSalt = Date.now();
  const imagePath = data.image.size > 0 ? `${process.cwd()}/public/${randomSalt}_${data.image.name}` : null;
  const imageUrl = data.image.size > 0 ? `/api/assets/${randomSalt}_${data.image.name}` : null;
  if (imagePath) {
    try {
      await fs.writeFile(imagePath, Buffer.from(await data.image.arrayBuffer()));
    }
    catch (e) {
      throw new Error("Cannot write file to system")
    }
  }

  let newExercise;
  try {
    newExercise = await prisma.exercise.update({
      where: {
        id: Number(data.id),
      },
      data: {
        question: data.question,
        correctAnswer: data.answer,
        imageUrl,
      }
    })
  }
  catch (e) {
    return {
      error: "Error when update record in database"
    }
  }

  revalidatePath("/list-exercise");
  revalidatePath("/add-exercise");
  return {
    success: true,
  }
}

