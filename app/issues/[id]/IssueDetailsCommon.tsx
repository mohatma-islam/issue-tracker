"use client";
import { Box, Flex } from "@radix-ui/themes";
import AssigneeSelect from "../../AssignTask";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { Issue } from "@prisma/client";
import UpdateIssueStatus from "@/app/UpdateIssueStatus";

const IssueDetailsCommon = ({
  issue,
  session,
}: {
  issue: Issue;
  session: any;
}) => {
  return (
    <>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <UpdateIssueStatus issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </>
  );
};

export default IssueDetailsCommon;
