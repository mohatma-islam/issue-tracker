"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllUsers } from "@/app/components/FetchAllUsers";

const AssignTask = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = fetchAllUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssueHandler = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId,
      })
      .then(() => {
        toast.success("Issue updated!");
      })
      .catch(() => {
        toast.error("Unable to assign User to Issue!");
      });
  };

  return (
    <>
      <Select.Root
        key={issue.id}
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssueHandler}
      >
        <Select.Trigger placeholder="Assign.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign Task:</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssignTask;
