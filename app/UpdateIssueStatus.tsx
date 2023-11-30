"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IssueStatusBadge } from "./components";

const UpdateIssueStatus = ({
  issue,
}: {
  issue: Issue;
}) => {
  const containers: {
    label: string;
    status: Status;
  }[] = [
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];

  const updateIssueHandler = (status: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: status,
      })
      .then(() => {
        toast.success("Issue updated!");
      })
      .catch(() => {
        toast.error("Unable to Change Status!");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={updateIssueHandler}
        key={issue.id}
      >
        <Select.Trigger placeholder="Update Status.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Update Status:</Select.Label>
            {containers.map((container) => (
              <Select.Item
                key={container.label}
                value={container.status}
                className="hover:bg-neutral-50"
              >
                <IssueStatusBadge status={container.status} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default UpdateIssueStatus;
