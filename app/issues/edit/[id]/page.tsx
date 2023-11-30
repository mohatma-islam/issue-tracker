import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";
import dynamic from "next/dynamic";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("@/app/issues/_components/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of Issue " + issue?.id,
  };
}

export default EditIssuePage;
