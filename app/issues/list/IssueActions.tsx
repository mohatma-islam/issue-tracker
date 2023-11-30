import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";

export const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex justify="start" gap="3">
        <IssueStatusFilter />
        <IssueAssigneeFilter />
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};
