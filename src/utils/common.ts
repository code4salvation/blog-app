import { BASE_URL, VIEW_BLOG } from "@/constants/urls";

export async function getBlog(id: any) {
    try {
      const res = await fetch(`${BASE_URL}/${VIEW_BLOG}/${id}`,{
        cache: 'no-store'
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } catch (error) {
      console.error(error);
    }
  }