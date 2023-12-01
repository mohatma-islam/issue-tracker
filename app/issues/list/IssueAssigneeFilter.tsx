"use client";

import { fetchAllUsers } from "@/app/components/FetchAllUsers";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: users, error, isLoading } = fetchAllUsers();

  return (
    <Select.Root
      // defaultValue={JSON.stringify(searchParams.get("assignedToUserId")) || "All"}
      onValueChange={(userString) => {
        const params = new URLSearchParams();
        if (userString && userString !== "All") {
          const user = JSON.parse(userString);
          if (user) params.append("assignedToUserId", user.id);
        }

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!);

        const query = params.size ? "?" + params.toString() : "";

        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Assignee..." />
      <Select.Content>
        <Select.Item value="All">All</Select.Item>
        {users?.map((user) => (
          <Select.Item key={user.id} value={JSON.stringify(user)}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
