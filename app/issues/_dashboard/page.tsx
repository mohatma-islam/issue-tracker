"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex } from "@radix-ui/themes";
import LatestIssues from "./latestIssues";

const Dashboard = () => {
  const [open, setOpen] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [closed, setClosed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/issues/count"
      );
      setOpen(response.data.open);
      setInProgress(response.data.inProgress);
      setClosed(response.data.closed);
    };

    fetchData();
  }, []);
  return (
    <>
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </>
  );
};

export default Dashboard;
