"use client";
import { Box, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import UpdateIssueStatus from "./UpdateIssueStatus";
import { Issue } from "@prisma/client";

const IssueDetailsCommon = ({ issue, session }: { issue: Issue; session: any }) => {
  const [issueStatus, setIssueStatus] = useState(issue.status);
  return (
    <>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} issueStatus={issueStatus} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <UpdateIssueStatus
              issue={issue}
              issueStatus={issueStatus}
              setIssueStatus={setIssueStatus}
            />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </>
  );
};

export default IssueDetailsCommon;
