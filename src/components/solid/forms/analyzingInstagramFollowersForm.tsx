import { createSignal } from "solid-js";
import JSZip from "jszip";

export default function AnalyzingInstagramFollowersForm() {
  // Specify the type as HTMLInputElement | undefined
  let fileInputRef: HTMLInputElement | undefined;

  const [followersData, setFollowersData] = createSignal<string[] | null>(null);
  const [followingData, setFollowingData] = createSignal<string[] | null>(null);
  const [nofollowData, setNoFollowData] = createSignal<
    string[] | null | undefined
  >(null);

  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

  // Handle the uploaded ZIP file and extract specific JSON files
  const handleFileUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // Ensure the uploaded file is a ZIP
    if (file.type !== "application/zip") {
      setErrorMessage("Please upload a valid ZIP file.");
      return;
    }

    const zip = new JSZip();

    try {
      // Load the ZIP file using JSZip
      const loadedZip = await zip.loadAsync(file);

      // Check for specific JSON files inside the ZIP
      const followersFile = loadedZip.file(
        "connections/followers_and_following/followers_1.json"
      );
      const followingFile = loadedZip.file(
        "connections/followers_and_following/following.json"
      );

      // Extract content from both JSON files if they exist
      if (followersFile) {
        const followersContent = await followersFile.async("string");
        setFollowersData(
          JSON.parse(followersContent).map(
            (item: any) => item["string_list_data"][0].href
          )
        ); // Parse JSON
      } else {
        setFollowersData(null);
        setErrorMessage("followers_1.json not found.");
      }

      if (followingFile) {
        const followingContent = await followingFile.async("string");
        setFollowingData(
          JSON.parse(followingContent)["relationships_following"].map(
            (item: any) => item["string_list_data"][0].href
          )
        ); // Parse JSON
      } else {
        setFollowingData(null);
        setErrorMessage("following.json not found.");
      }
    } catch (error) {
      setErrorMessage("Error extracting ZIP file.");
      setFollowersData(null);
      setFollowingData(null);
    } finally {
      const unFollow = followingData()?.filter(
        (following) =>
          !followersData()?.some((follower) => follower === following)
      );
      setNoFollowData(unFollow);
    }
  };

  const focusInput = () => {
    // Safe navigation with optional chaining
    fileInputRef?.click();
  };

  return (
    <div>
      <div
        onClick={focusInput}
        class="w-full my-3 py-5 bg-gray-200 rounded-2xl border-2 gap-3 grid border-dashed cursor-pointer border-gray-500 group hover:border-[#556ee6]"
      >
        <div class="grid gap-1 justify-center">
          <div class="w-11 h-11 bg-gray-400 rounded-full flex items-center justify-center text-[#556ee6]">
            <svg
              width={20}
              height={20}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
          </div>
        </div>
        <div class="grid gap-2">
          <h4 class="text-center text-sm font-medium leading-snug">
            فایل{" "}
            <span class="bg-gray-400 text-[#556ee6] text-xs font-medium px-1.5 py-1 rounded-full">
              zip.
            </span>{" "}
            که از اینستاگرام دریافت کرده‌اید را انتخاب کنید
          </h4>
          <div class="flex items-center justify-center">
            <label>
              <input
                type="file"
                accept=".zip"
                onInput={handleFileUpload}
                ref={fileInputRef}
                hidden
              />
              {/* <div class="flex w-28 h-9 px-2 flex-col bg-blue-600 rounded shadow text-white text-xs font-semibold leading-4 items-center justify-center  focus:outline-none">
                انتخاب فایل
              </div> */}
            </label>
          </div>
        </div>
      </div>

      {/* Display error message */}
      {errorMessage() && <p class="text-red-500">{errorMessage()}</p>}
      <div class="grid grid-cols-2 gap-4">
        <div class="col-6">
          {followersData() && followingData() && nofollowData() && (
            <div class="card">
              <div>
                <h5 class="text-lg mb-2">اطلاعات تکمیلی</h5>
                <p class="text-base">
                  براساس داده‌های اینستاگرام که از طریق فایل در اختیار ما گذاشته
                  است:
                </p>
                <p class="text-sm">
                  تعداد فالور‌های شما:{" "}
                  <span class="font-bold">
                    {followersData() ? followersData()!.length : 0}
                  </span>
                </p>
                <p class="text-sm">
                  تعداد فالویینگ‌های شما:{" "}
                  <span class="font-bold">
                    {followingData() ? followingData()!.length : 0}
                  </span>
                </p>
                <p class="text-sm">
                  تعداد کسانی که متقابلا شما را فالو نکرده‌اند:{" "}
                  <span class="font-bold">
                    {nofollowData() ? nofollowData()!.length : 0}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div class="col-6">
          {nofollowData() && (
            <div class="card">
              <ul class="flex flex-col divide-y divide-gray-500">
                {nofollowData()?.map((item) => (
                  <li class="inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium">
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, "")}
                    </span>
                    <a
                      href={item}
                      target="_blank"
                      class="py-1.5 px-3.5 text-xs bg-red-500 text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500 hover:bg-red-700"
                    >
                      آنفالو
                    </a>
                  </li>
                ))}
              </ul>
              {/* <ul class="list-group">
                {nofollowData()?.map((item) => (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, "")}
                    </span>
                    <a href={item} target="_blank" class="btn btn-danger">
                      آنفالو
                    </a>
                  </li>
                ))}
              </ul> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
