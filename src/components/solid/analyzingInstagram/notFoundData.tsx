export default function NotFoundData() {
  return (
    <>
      <p class="text-gray-900 text-base">
        It seems that there is no data available to display. This could be for several reasons:
      </p>
      <ul class="space-y-1 text-gray-500 text-sm list-disc list-inside my-3">
        <li>Everything is fine, and there is simply no data to display.</li>
        <li>The file you uploaded has been tampered with.</li>
      </ul>
      <p class="text-sm underline">
        If you are sure the application is not working properly, please let us know so we can resolve it as quickly as possible.
      </p>
    </>
  );
}
