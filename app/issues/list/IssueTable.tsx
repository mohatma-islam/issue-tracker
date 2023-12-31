import { IssueStatusBadge } from "@/app/components";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import AssigneeSelect from "../../components/AssignTask";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import UpdateIssueStatus from "@/app/components/UpdateIssueStatus";
import EditIssueButton from "../../components/EditIssueButton";
import DeleteIssueButton from "../../components/DeleteIssueButton";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  orderDirection: "asc" | "desc";
  assignedToUserId: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    orderDirection:
                      searchParams.orderDirection === "asc" ? "desc" : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value &&
                column.value === searchParams.orderBy &&
                (searchParams.orderDirection === "asc" ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <AssigneeSelect issue={issue} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <UpdateIssueStatus issue={issue} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Flex gap="3">
                <EditIssueButton issueId={issue.id}/>
                <DeleteIssueButton issueId={issue.id} />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label?: string;
  value?: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Assigned To", value: "assignedToUserId", className: "hidden md:table-cell" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  { label: "Actions", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
