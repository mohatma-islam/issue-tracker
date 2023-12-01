import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({
  issueId,
  buttonName,
}: {
  issueId: number;
  buttonName?: string;
}) => {
  return (
    <Button>
      <Link href={`/issues/edit/${issueId}`}>
        <Flex gap="2" align="center">
          <Pencil2Icon />
          {buttonName}
        </Flex>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
