const newLinkSubscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW_LINK");
};

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

const newVoteSubscrive = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW_VOTE");
};

export const newVote = {
  subscribe: newVoteSubscrive,
  resolve: (payload) => {
    return payload;
  },
};
