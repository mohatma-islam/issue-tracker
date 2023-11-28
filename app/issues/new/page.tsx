import dynamic from "next/dynamic"
import IssueFormSkeleton from "./loading"

const IssueForm = dynamic(
  () => import('@/app/issues/_components/issueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton/>
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm/>
  )
}

export default NewIssuePage