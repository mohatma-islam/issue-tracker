"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdateIssueStatus = ({
  issue,
  issueStatus,
  setIssueStatus,
}: {
  issue: Issue;
  issueStatus: Status;
  setIssueStatus: (status: Status) => void;
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
        setIssueStatus(status);
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
      >
        <Select.Trigger placeholder="Update Status.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {containers.map((container) => (
              <Select.Item key={container.label} value={container.status}>
                {container.label}
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
