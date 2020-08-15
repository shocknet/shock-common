export const sawPost = (postID: string) =>
  ({
    type: 'sawPost',
    data: {
      postID,
    },
  } as const)

export type PostsAction = ReturnType<typeof sawPost>
