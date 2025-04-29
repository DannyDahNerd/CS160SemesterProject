// import GridPostList from "@/components/shared/GridPostsList";
// import Loader from "@/components/shared/Loader";
// import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";


// const LikedPosts = () => {
// const { data: currentUser } = useGetCurrentUser();

//   if (!currentUser)
//     return (
//       <div className="flex-center w-full h-full">
//         <Loader />
//       </div>
//     );

//   return (
//     <>
//       {currentUser.liked.length === 0 && (
//         <p className="text-light-4">No liked posts</p>
//       )}

//       <GridPostList posts={currentUser.liked} showStats={false} />
//     </>
//   );
// };

import GridPostList from "@/components/shared/GridPostsList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();
  console.log("currentUser", currentUser);

  const likePosts = currentUser?.liked?.slice().reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/liked.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Liked Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {likePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={likePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default LikedPosts;