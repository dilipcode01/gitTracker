import { GitHubLogoIcon } from "@radix-ui/react-icons";

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
  TextField,
  Switch,
  Spinner,
} from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { formatDateToReadableString } from "../utils/helper";
import { MARK_AS_SEEN } from "../graphql/mutations";
import { useUtils } from "../context/utilsContext/useUtils";
import Loading from "../components/Loader/Progress";

type ExampleLayoutProps = React.ComponentPropsWithoutRef<typeof Flex> & {
  focusable?: boolean;
};

export const Dashboard = ({
  focusable = true,
  ...props
}: ExampleLayoutProps) => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES);
  const { theme, triggerRefetch } = useUtils();

  const [repos, setRepos] = useState([]);
  const [markAsSeen] = useMutation(MARK_AS_SEEN);
  const tabIndex = focusable ? undefined : -1;
  const [filteredRepos, setFilteredRepos] = useState([]);

  const handleToggleSeen = async (id: number, event: any) => {
    try {
      const { data } = await markAsSeen({ variables: { id } });
      if (data.markAsSeen) {
        // After marking as seen, update the repos directly
        const updatedRepos = repos.map((repo) =>
          repo.id === id ? { ...repo, unseenUpdates: !repo.unseenUpdates } : repo
        );
        setRepos(updatedRepos);
        setFilteredRepos(updatedRepos);
      } else {
        alert("Failed to mark repository as seen.");
      }
    } catch (error) {
      console.error("Error marking repository as seen:", error);
    }
  };

  const handleSearchRepo = (value: string) => {
    const searchValue = value.toLowerCase();
    const filtered = repos.filter((repo: any) =>
      repo.name.toLowerCase().includes(searchValue)
    );
    setFilteredRepos(filtered);
  };

  const getRepos = () => {
    setRepos(data?.getRepositories);
    setFilteredRepos(data?.getRepositories);
  };

  useEffect(() => {
    getRepos();
  }, [data, triggerRefetch]);

  return (
    <Flex
      style={{ width: "100%", overflow: "hidden" }}
      gap="6"
      m={"5"}
      {...props}
    >
      <Flex flexShrink="1" gap="6" direction="column" minWidth={"96vw"}>
        <Card size="4">
          <Heading as="h3" size="6" trim="start" mb="2">
            Git Tracker
          </Heading>

          <Text as="p" size="2" mb="5" color="gray">
            All git repositories
          </Text>

          <Flex gap="3" mb="5">
            <Box flexGrow="1">
              <TextField.Root
                tabIndex={tabIndex}
                size="2"
                placeholder="find Repositories"
                onChange={(e) => handleSearchRepo(e.target.value)}
              />
            </Box>
            
          </Flex>

          {
            loading ? (<Loading size={50} />) : (
              <Flex direction="column">
                {filteredRepos?.length !== 0 ? (
                  filteredRepos?.map((repo, i) => (
                    <Box key={repo?.id}>
                      <Flex
                        direction="column"
                        gap="3"
                        p="3"
                        style={{
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                          background: !repo?.unseenUpdates === false ? '#D3D3D3' : '#F0EFEF'
                        }}
                      >
                        {/* Repository Header */}
                        <Flex align="center" justify="between">
                          <Flex gap="2" align="center">
                            <GitHubLogoIcon color={"#000000"} />
                            <Link
                              href="#"
                              tabIndex={tabIndex}
                              size="2"
                              wrap="nowrap"
                              onClick={(e) => e.preventDefault()}
                              style={theme == "dark" && {color:"#000000"}}
                            >
                              {repo?.name}
                            </Link>
                          </Flex>
                          {!repo?.unseenUpdates === false && (
                            <Flex gap="2" align="center">
                              <Text size="2" weight="bold" style={theme == "dark" && {color:"#000000"}}>
                                Seen:
                              </Text>
                              <Switch
                                style={theme == "dark" &&  {borderRadius:"100px", border:"1px solid black"}}
                                tabIndex={tabIndex}
                                defaultChecked={!repo?.unseenUpdates === true}
                                onCheckedChange={(e) => handleToggleSeen(repo?.id, e)}
                              />
                            </Flex>
                          )}
                        </Flex>

                        {/* Repository Description */}
                        <Flex direction="column" gap="2">
                          <Text
                            size="2"
                            color="gray"
                            className="line-clamp-3 max-w-full text-ellipsis overflow-hidden"
                            style={theme == "dark" && {color:"#000000"}}
                          >
                            {repo?.description}
                          </Text>
                        </Flex>

                        {/* Repository Dates */}
                        <Flex gap="6" align="center" justify="start">
                          <Text size="3" color="gray" style={theme == "dark" && {color:"#000000"}}>
                            Release: {formatDateToReadableString(repo?.releaseDate)}
                          </Text>
                          <Text size="3" color="gray" style={theme == "dark" && {color:"#000000"}}>
                            Latest: {formatDateToReadableString(repo?.latestRelease)}
                          </Text>
                        </Flex>
                      </Flex>

                      {i !== filteredRepos.length - 1 && (
                        <Box>
                          <Separator size="4" my="3" />
                        </Box>
                      )}
                    </Box>
                  ))
                ) : (
                  <Text size="2" color="gray">
                    No repositories found.
                  </Text>
                )}
              </Flex>
            )
          }
        </Card>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
