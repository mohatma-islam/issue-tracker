"use client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IssueStatusBadge } from "../../components";
import Link from "next/link";
import axios from "axios";
import { Status, User } from "@prisma/client";
import LoadinglatestIssuePage from "./LoadingLatestIssuePage";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  assignedToUserId: string | null;
  assignedToUser: User | null;
}

const LatestIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchIssues = async () => {
      const response = await axios.get<Issue[]>(
        "http://localhost:3000/api/issues"
      );

      setIssues(response.data);
      setIsLoading(false);
    };

    fetchIssues();
  }, []);

  if (isLoading) return <LoadinglatestIssuePage />;

  return (
    <Card>
      <Heading size="4" mb="2">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
