import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(" i am here",process.env.SANITY_PREVIEW_SECRET);
  const { searchParams } = new URL(req.url);

  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: "Invalid preview secret" },
      { status: 401 },
    );
  }

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(`/${slug}`, req.url));
}
