import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import { Skeleton } from "@/app/components/index";

const LoadinglatestIssuePage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <Card>
      <Heading size="4" mb="2">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Skeleton width="20rem"/>
                    <Skeleton width="3rem"/>
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LoadinglatestIssuePage;
