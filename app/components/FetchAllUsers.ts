import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";

export const fetchAllUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
