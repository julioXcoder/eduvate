"use server";

export const uploadStudentImage = async (image: File) => {
  try {
    console.log("Server image", image);
  } catch (error) {
    console.log("error", error);
  }
};
