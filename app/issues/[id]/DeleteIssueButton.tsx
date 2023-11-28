"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      console.log("error occured!");
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={isDeleting}>
          <TrashIcon /> Delete Issue
          {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex className="mt-4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDelete}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
