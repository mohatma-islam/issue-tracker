import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
// import EditIssueButton from "./EditIssueButton";
import dynamic from "next/dynamic";
import LoadingIssueDetailPage from "./loading";
// import DeleteIssueButton from "./DeleteIssueButton";
import { Skeleton } from "@/app/components";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
interface Props {
  params: { id: string };
}

const IssueDetails = dynamic(() => import("@/app/issues/[id]/IssueDetails"), {
  ssr: false,
  loading: () => <LoadingIssueDetailPage />,
});

const EditIssueButton = dynamic(
  () => import("@/app/issues/[id]/EditIssueButton"),
  {
    ssr: false,
    loading: () => <Skeleton width="10rem" />,
  }
);

const DeleteIssueButton = dynamic(
  () => import("@/app/issues/[id]/DeleteIssueButton"),
  {
    ssr: false,
    loading: () => <Skeleton width="10rem" />,
  }
);

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of Issue " + issue?.id,
  };
}

export default IssueDetailPage;
