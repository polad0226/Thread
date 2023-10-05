import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

function UserPost({ likes, replies, postImg, postTitle }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Box w="1px" h={"full"} bg={"gray.dark"} my={2} />
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"sm"}
              name="John Doe"
              src="/zuck-avatar.png"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={2}
            />
            <Avatar
              size={"sm"}
              name="John Doe"
              src="/zuck-avatar.png"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={2}
            />
            <Avatar
              size={"sm"}
              name="John Doe"
              src="/zuck-avatar.png"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={2}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                markzuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} marginLeft={1}></Image>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              position={"relative"}
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"}></Image>
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {`${replies} replies`}
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {`${likes} likes`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default UserPost;
