import prisma from "@/prisma/client";
import { Box,Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import dynamic from "next/dynamic";
import LoadingIssueDetailPage from "./loading";
interface Props {
  params: { id: string };
}

const IssueDetails = dynamic(
    () => import('@/app/issues/[id]/IssueDetails'),
    {
        ssr: false,
        loading: ()=> <LoadingIssueDetailPage/>
    }
)

const IssueDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
