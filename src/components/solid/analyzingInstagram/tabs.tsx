import { createSignal, Show, type Accessor } from "solid-js";
import NotFoundData from "./notFoundData";

interface Props {
  noFollow: Accessor<string[]>;
  hideStory: Accessor<string[]>;
  pendingRequests: Accessor<string[]>;
  blockList: Accessor<string[]>;
}

export default function AnalyzingInstagramTabs({
  noFollow,
  hideStory,
  pendingRequests,
  blockList,
}: Props) {
  const [tab, setTab] = createSignal<string>("no-follow");

  return (
    <div class="shadow-lg bg-gray-200 rounded-lg">
      <div class="flex">
        <ul class="flex overflow-x-auto md:justify-center items-start w-full transition-all duration-300 p-2">
          <li
            class={`${
              tab() === "no-follow" ? "bg-white text-[#556ee6]" : ""
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab("no-follow")}
          >
            Not Following Back
          </li>
          <li
            class={`${
              tab() === "hide-story" ? "bg-white text-[#556ee6]" : ""
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab("hide-story")}
          >
            Story Hidden
          </li>
          <li
            class={`${
              tab() === "pending-requests" ? "bg-white text-[#556ee6]" : ""
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab("pending-requests")}
          >
            Pending Follow Requests
          </li>
          <li
            class={`${
              tab() === "block-list" ? "bg-white text-[#556ee6]" : ""
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab("block-list")}
          >
            Blocked Users
          </li>
        </ul>
      </div>
      <div class="py-2 px-4">
        <Show when={tab() === "no-follow"}>
          <div class="overflow-y-auto h-44">
            {noFollow().length > 0 ? (
              <ul class="flex flex-col divide-y divide-gray-400">
                {noFollow().map((item: string) => (
                  <li class="inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium">
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, "")}
                    </span>
                    <a
                      href={item}
                      target="_blank"
                      class="py-1.5 px-3.5 text-xs bg-red-500 text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500 hover:bg-red-700"
                    >
                      Unfollow
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
        <Show when={tab() === "hide-story"}>
          <div class="overflow-y-auto h-44">
            {hideStory().length > 0 ? (
              <ul class="flex flex-col divide-y divide-gray-400">
                {hideStory().map((item: string) => (
                  <li class="inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium">
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, "")}
                    </span>
                    <a
                      href={item}
                      target="_blank"
                      class="py-1.5 px-3.5 text-xs bg-[#556ee6] hover:bg-[#3b53c9] text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
        <Show when={tab() === "pending-requests"}>
          <div class="overflow-y-auto h-44">
            {pendingRequests().length > 0 ? (
              <ul class="flex flex-col divide-y divide-gray-400">
                {pendingRequests().map((item: string) => (
                  <li class="inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium">
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, "")}
                    </span>
                    <a
                      href={item}
                      target="_blank"
                      class="py-1.5 px-3.5 text-xs bg-[#556ee6] hover:bg-[#3b53c9] text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
        <Show when={tab() === "block-list"}>
          <div class="overflow-y-auto h-44">
            {blockList().length > 0 ? (
              <ul class="flex flex-col divide-y divide-gray-400">
                {blockList().map((item: string) => (
                  <li class="inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium">
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\/_u\//, "")}
                    </span>
                    <a
                      href={item}
                      target="_blank"
                      class="py-1.5 px-3.5 text-xs bg-[#556ee6] hover:bg-[#3b53c9] text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
      </div>
    </div>
  );
}
