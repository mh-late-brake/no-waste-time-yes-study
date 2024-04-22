type Content = {
  questionInputLabel: string,
  questionInputPlaceholder?: string,
  answerInputLabel: string,
  answerInputPlaceholder?: string,
  submitButtonLabel: string,
  imageUploadInputLabel: string,
  imageUploadInputDescription?: string,
  resetButtonLabel: string,
  successAlert: string,
  failureAlert: string,
}
const content: Content = {
  questionInputLabel: "Question",
  answerInputLabel: "Answer",
  imageUploadInputLabel: "Image (optional)",
  imageUploadInputDescription: "You can add image to this problem (optional)",
  submitButtonLabel: "Add Exercise",
  resetButtonLabel: "Add other exercise",
  successAlert: "Successfully add exercise",
  failureAlert: "Something failed"
}

export default content
