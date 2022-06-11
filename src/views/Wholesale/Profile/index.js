// Chakra imports
import { Flex, Grid, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React, { useEffect, useState } from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import AddProductModal from "./components/AddProductModal";

import Projects from "./components/Projects";
import EditProfileForm from "./components/EditProfileForm";
import { apiFactory } from "../../../api_factory/index.ts";

function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  const [userInformation, setUserInformation] = useState(null);
  const [refetchUserInformation, setRefetchUserInformation] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const getUserInformation = async () => {
    const user = await apiFactory().data.account().getCurrentUser();

    setUserInformation(user[0]);
  };

  const onClose = () => setOpenAddProductModal((prevCheck) => !prevCheck);

  useEffect(() => {
    getUserInformation();
  }, [refetchUserInformation]);

  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar4}
        name={userInformation?.firstName + " " + userInformation?.lastName}
        email={userInformation?.email}
        tabs={[
          {
            name: "OVERVIEW",
            icon: <FaCube w="100%" h="100%" />,
          },
          {
            name: "TEAMS",
            icon: <IoDocumentsSharp w="100%" h="100%" />,
          },
          {
            name: "PROJECTS",
            icon: <FaPenFancy w="100%" h="100%" />,
          },
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        {userInformation && (
          <ProfileInformation userInformation={userInformation} />
        )}

        <EditProfileForm
          setRefetchUserInformation={setRefetchUserInformation}
        />
      </Grid>
      <Projects
        title={"Projects"}
        description={"Architects design houses"}
        setOpenAddProductModal={setOpenAddProductModal}
        reloadProducts={openAddProductModal}
      />
      <AddProductModal isOpen={openAddProductModal} onClose={onClose} />
    </Flex>
  );
}

export default Profile;
