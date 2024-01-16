import Image from "next/image";
import Link from "next/link";

type goodFirstIssueLabelType = {
  id: number;
  name: string;
};

type goodFirstIssueType = {
  id: number;
  html_url: string;
  labels: goodFirstIssueLabelType[];
  title: string;
  created_at: string;
};

async function getGoodFirstIssuesData() {
  const res = await fetch(
    "https://api.github.com/search/issues?q=is%3Aissue+label%3A%22good+first+issue%22+state:open+no%3Aassignee&sort=opened&order=desc&per_page=10&page=1",
    {
      next: {
        revalidate: 600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch good first issues data from GitHub API");
  }

  const data = await res.json();

  return data.items;
}

export default async function Home() {
  const goodFirstIssuesData = await getGoodFirstIssuesData();

  return (
    <main className="bg-gradient-to-br dark:bg-gradient-to-bl flex min-h-screen flex-col items-center justify-between">
      <h1 className="mb-3 text-3xl md:text-4xl font-bold"><u>Good First Issues</u></h1>

      <p className="mb-5 text-sm font-bold">Find latest good first issues</p>

      {goodFirstIssuesData.map((goodFirstIssue: goodFirstIssueType) => (
        <Link
        key={goodFirstIssue.id}
        href={goodFirstIssue.html_url}
        className="block max-w-xl md:max-w-3xl w-full p-6 mb-5 bg-gradient-to-br border border-green-500 rounded-sm shadow hover:bg-green-100"
      >
      
      
          <h5 className="mb-2 text-base md:text-2xl font-bold tracking-tight text-gray-900">
            {goodFirstIssue.title}
          </h5>
          <p className="mb-2 font-sm text-gray-700">
            Repository:{" "}
            <span className="font-bold">
              {goodFirstIssue.html_url
                .replace("https://github.com/", "")
                .replace("/issues/", " #")}
            </span>
          </p>

          <p className="mb-2 font-sm text-gray-700">
            Created At:{" "}
            <span className="font-bold">
              {new Date(goodFirstIssue.created_at).toString()}
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {goodFirstIssue.labels.map((label: goodFirstIssueLabelType) => (
              <div
                key={label.id}
                
                className={`center relative inline-block select-none whitespace-nowrap rounded-lg py-1 md:py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white ${
                  label.name === 'good first issue' ? 'bg-red-600' : 'bg-blue-500'
                }`}
              >
                <div className="mt-px">{label.name}</div>
              </div>
            ))}
          </div>
        </Link>
      ))}

      <h5 className="text-base">
        Made with{" "}
        <Image
          className="inline-block mx-1"
          alt="love"
          src="/red-heart.png"
          width={25}
          height={25}
          priority
        />{" "}
        by{" "}
        <Link
          className="inline-block text-blue-500 mx-1"
          href="https://github.com/ptosbc"
        >
          PTOS B. C.
        </Link>
      </h5>
    </main>
  );
}
