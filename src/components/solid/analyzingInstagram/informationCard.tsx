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
        <h5 class="text-lg mb-1">اطلاعات تکمیلی</h5>
        <p class="text-base">
          براساس داده‌های اینستاگرام که از طریق فایل در اختیار ما گذاشته است:
        </p>
        <p class="text-sm mt-2">
          تعداد فالور‌های شما:{" "}
          <span class="font-bold">{followersCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          تعداد فالویینگ‌های شما:{" "}
          <span class="font-bold">{followingCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          تعداد کسانی که متقابلا شما را فالو نکرده‌اند:{" "}
          <span class="font-bold">{noFollowCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          تعداد کسانی که استوری شما برای آنها پنهان شده است :{" "}
          <span class="font-bold">{hideStoryCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          تعداد کسانی که شما به آنها درخواست داده‌اید ولی هنوز قبول نکرده‌اند :{" "}
          <span class="font-bold">{pendingRequestsCount().length}</span>
        </p>
        <p class="text-sm mt-2">
          تعداد کسانی که شما به آنها را مسدود کرده‌اید :{" "}
          <span class="font-bold">{blockCount().length}</span>
        </p>
      </div>
    </div>
  );
}
