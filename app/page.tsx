import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import Dashboard from "./issues/_dashboard/page";

export default async function Home() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Dashboard/>
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a Summary of Project Issues",
};
