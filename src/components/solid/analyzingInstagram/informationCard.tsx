import type { Accessor } from "solid-js";

interface Props {
  followersCount: Accessor<string[]>;
  followingCount: Accessor<string[]>;
  noFollowCount: Accessor<string[]>;
  hideStoryCount: Accessor<string[]>;
  pendingRequestsCount: Accessor<string[]>;
  blockCount: Accessor<string[]>;
}

export default function InformationAnalyzingInstagramCard({
  followersCount,
  followingCount,
  noFollowCount,
  hideStoryCount,
  pendingRequestsCount,
  blockCount,
}: Props) {
  return (
    <div class="card">
      <div>
        <h5 class="text-lg mb-1">Additional Information</h5>
        <p class="text-base">
          Based on the Instagram data provided through the file:
        </p>
        <p class="text-sm mt-2">
          Your followers count:{" "}
          <span class="font-bold">{followersCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          Your following count:{" "}
          <span class="font-bold">{followingCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          Number of people who did not follow you back:{" "}
          <span class="font-bold">{noFollowCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          Number of people who have hidden your story:{" "}
          <span class="font-bold">{hideStoryCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          Number of people you have sent requests to but they haven't accepted yet:{" "}
          <span class="font-bold">{pendingRequestsCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          Number of people you have blocked:{" "}
          <span class="font-bold">{blockCount().length}</span>
        </p>
      </div>
    </div>
  );
}
