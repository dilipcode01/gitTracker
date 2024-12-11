import React, { useState } from "react";
import { useUtils } from "../../context/utilsContext/useUtils";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { CREATE_REPOSITORY } from "../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from '../../graphql/queries';
import MiniLoader from "../MiniLoader/MiniLoader";
import Particles from "../Particles/Particles";

const NavBar = () => {
  const { theme, toggleTheme } = useUtils();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [createRepository] = useMutation(CREATE_REPOSITORY);
  const { refetch } = useQuery(GET_REPOSITORIES);
  const [loading, setLoading] = useState(false);
  const [flag,setFlag] = useState(false);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url || !url.startsWith("https://github.com/")) {
      alert("Please provide a valid GitHub repository URL.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await createRepository({ variables: { url } });
      if (data?.addRepository) {
        setLoading(false);
        setFlag(true);
        alert("Repository created successfully!");
        refetch();
        setUrl("");
        setIsOpen(false);
        setTimeout(() => {
           setFlag(false);
        }, 2000);
      } else {
        setLoading(false);
        alert("Failed to create repository. Please check the repository URL.");
      }
    } catch (err: any) {
      setLoading(false);
      alert("An error occurred while creating the repository.");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              position: "fixed",
              inset: 0
            }}
          />
          <Dialog.Content
            className="bg-white rounded-lg p-5 w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <form onSubmit={handleSave}>
              <Flex direction="column" gap="3">
                <label htmlFor="url" className="text-lg font-bold">
                  Repository URL
                </label>
                <input
                  className={`mt-5 ${theme === "dark" ? "bg-white" : ""}`}
                  id="url"
                  name="url"
                  required
                  style={{
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    color:"#000"
                  }}
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                />
                <Flex justify="end">
                  <Dialog.Close asChild>
                    <Button
                      variant="solid"
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "red",
                        borderRadius: "4px",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Dialog.Close>
                  {loading ? (
                    <MiniLoader />
                  ) : (
                    <button
                      type="submit"
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "#0070f3",
                        borderRadius: "4px",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        marginLeft: "1.5rem"
                      }}
                    >
                      Save
                    </button>
                  )}
                </Flex>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Main Navbar */}

      {
        flag && (
          <Particles 
           />
        )
      }
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          overflow: "hidden",
          padding: "1rem 2rem",
        }}
      >
        <div></div>
        <div className="flex gap-3">
          <Button tabIndex={-1} size="2" onClick={openDialog}>
            Add Repository
          </Button>
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.4rem",
              borderRadius: "8px",
            }}
          >
            {theme === "light" ? (
              <SunIcon onClick={toggleTheme} />
            ) : (
              <MoonIcon onClick={toggleTheme} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
