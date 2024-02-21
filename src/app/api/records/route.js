import connectDB from "@/lib/connect";
import Table from "@/models/table";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const table = await Table.find({});
    return NextResponse.json(
      {
        message: "Record fetched successfully",
        data: table,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { message: "Error while fetching records", error: err },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, email, number } = await request.json();
    await connectDB();
    const create = await Table.create({ name, email, number });
    return NextResponse.json(
      { message: "Record inserted successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { message: "Error while inserting record", error: err },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, name, email, number } = await request.json();
    const data = { name, email, number };
    await connectDB();
    const update = await Table.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: data },
      { new: true }
    );
    return NextResponse.json(
      { message: "Record updated successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { message: "Error while updating record", error: err },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let id = searchParams.get("id");
    await connectDB();

    const deleted = await Table.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error while deleting record", error: err },
      { status: 400 }
    );
  }
}
