import React from "react";
import prisma from "@/prisma/db";
import ShortUniqueId from "short-unique-id";
import { revalidatePath } from "next/cache";
const uid = new ShortUniqueId();

const addData = async () => {
  "use server";

  let myArray = [];

  for (let i = 1; i <= 2; i++) {
    myArray.push(`MUST/DPL/2021/${uid.rnd(5)}`);
  }

  revalidatePath("/add");

  return myArray;
};

const findDuplicates = async () => {
  let myArray = await addData();
  let duplicates = myArray.filter(
    (item, index) => myArray.indexOf(item) !== myArray.lastIndexOf(item),
  );
  return duplicates;
};

const Page = async () => {
  const number = await addData();
  const duplicates = await findDuplicates();

  return (
    <div className="m-48">
      <div>Number: {number}</div>
      <div>duplicates: {duplicates}</div>
      <form action={addData}>
        <button>Add</button>
      </form>
    </div>
  );
};

export default Page;
