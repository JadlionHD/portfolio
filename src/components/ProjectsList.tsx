import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const LANGS: Record<string, string> = {
  Vue: "#4fc08d",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#1572B6",
  Shell: "#89e051",
  default: "#737373"
};

interface RepoData {
  name: string;
  svn_url: string;
  description: string;
  language: string;
  license: { spdx_id: string } | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

interface Props {
  repos: string[];
}

export default function ProjectsList({ repos }: Props) {
  const [data, setData] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const promises = repos.map((repo) => fetch(`https://api.github.com/repos/${repo}`).then((res) => res.json()));
        const results = await Promise.all(promises);
        setData(results);
      } catch (err) {
        setError("Failed to load projects");
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [repos]);

  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-96 h-64">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-lg font-semibold mb-2">Failed to load projects</p>
        <p className="text-sm">Please try again later or check your internet connection.</p>
      </div>
    );
  }

  return (
    <>
      {data.map((dt) => (
        <GithubCardClient
          key={dt.name}
          title={dt.name}
          href={dt.svn_url}
          description={dt.description}
          language={dt.language}
          license={dt.license?.spdx_id || "None"}
          star={dt.stargazers_count}
          fork={dt.forks_count}
          updatedDate={dt.pushed_at}
          showData={true}
        />
      ))}
      <GithubCardClient
        title="Yukio Lumina"
        href="https://discord.com/oauth2/authorize?client_id=510749305208963092&permissions=1644971949567&scope=applications.commands+bot"
        description="A Golang based, Discord bot that can play music."
        language="None"
        license="GPL-3.0"
        star={0}
        fork={0}
        showData={false}
      />
    </>
  );
}

interface GithubCardProps {
  title: string;
  href: string;
  description: string;
  language: string;
  license: string;
  star: number;
  fork: number;
  updatedDate?: string;
  showData: boolean;
}

function GithubCardClient({ title, href, description, language, license, star, fork, updatedDate, showData }: GithubCardProps) {
  const formattedDate = updatedDate ? dayjs(updatedDate).format("DD/MM/YYYY") : "None";

  return (
    <a
      href={href}
      target="_blank"
      className="border-2 p-6 rounded-lg border-zinc-500 h-64 w-96 ease-in-out transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg flex flex-col"
    >
      <div className="flex justify-start gap-x-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
          />
        </svg>
        <div className="font-bold">{title}</div>
      </div>
      <p className="text-sm overflow-hidden flex-1 max-h-24">{description}</p>
      {showData ? (
        <div className="flex justify-start gap-x-4 items-center mt-auto">
          <div className="flex justify-between gap-x-2 items-center">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LANGS[language] || LANGS.default }} />
            <div>{language ?? "None"}</div>
          </div>
          <div className="flex justify-between gap-x-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
              />
            </svg>
            {star ?? 0}
          </div>
          <div className="flex justify-between gap-x-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <circle cx="12" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="6" r="3" />
                <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9m6 3v3" />
              </g>
            </svg>
            {fork ?? 0}
          </div>
        </div>
      ) : (
        <div>None</div>
      )}

      <div className="flex justify-between gap-x-2 items-center">
        <div className="flex justify-end gap-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m16 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1M2 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1m5 5h10M12 3v18M3 7h2c2 0 5-1 7-2c2 1 5 2 7 2h2"
            />
          </svg>
          {license ?? "No License"}
        </div>
        <Button size="sm" variant="outline">
          {formattedDate}
        </Button>
      </div>
    </a>
  );
}
