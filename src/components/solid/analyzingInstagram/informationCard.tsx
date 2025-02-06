import { createSignal, type Accessor } from "solid-js";

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
  const [isOpen, setIsOpen] = createSignal(true);
  return (
    <div class="card">
      <div onclick={()=>setIsOpen(!isOpen())} class="w-full text-left text-lg font-semibold flex justify-between items-center cursor-pointer">
        <span>Additional Information</span>
        <span>{isOpen() ? "▲" : "▼"}</span>
      </div>
      {isOpen() && (<div class="h-48">
        <p class="text-base mt-2">
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
      </div>)}
    </div>
  );
}
