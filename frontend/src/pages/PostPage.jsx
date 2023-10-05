import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comment";

function PostPage() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Lets talk about threads</Text>
      <Box
        position={"relative"}
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"}></Image>
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          238 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like,reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment="look really good"
        createdAt="2d"
        likes={200}
        username="johndoe"
        userAvatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
        comment="yes Dadddyy"
        createdAt="2d"
        likes={42}
        username="ulduz"
        userAvatar="https://bit.ly/ryan-florence"
      />
      <Comment
        comment="look really good"
        createdAt="2d"
        likes={150}
        username="polad"
        userAvatar="https://bit.ly/code-beast"
      />
      <Comment
        comment="look really good"
        createdAt="2d"
        likes={89}
        username="murads"
        userAvatar="https://bit.ly/sage-adebayo"
      />
    </>
  );
}

export default PostPage;
