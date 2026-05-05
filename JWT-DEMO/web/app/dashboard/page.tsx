import { fetchMe } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  console.log("token in next", token);
  if (token) {
    const res = await fetchMe("/auth/me", token);
    const a = await res.json();
    return a;
  }
}

export default async function DashBoard() {
  const data = await getCurrentUser();
  if (!data) {
    redirect("/login");
  }

  return <>{data.permissions}</>;
}
