import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={170}
        replies={481}
        postImg="/post2.png"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={10}
        replies={481}
        postImg="/post3.png"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={1202}
        replies={481}
        postTitle="Lets talk about threads"
      />
    </>
  );
}

export default UserPage;
