import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/Table";

const works = [
  {
    title: "BEA",
    link: "https://www.beamediacompany.com/",
    tags: ["CMS", "Next", "Prismic", "TypeScript", "Vercel"],
  },
  {
    title: "The Syllabus",
    link: "https://www.the-syllabus.com/",
    tags: [
      "CMS",
      "Webapp",
      "Next",
      "Prismic",
      "TypeScript",
      "Vercel",
      "Elasticsearch",
      "Media library",
    ],
  },
  {
    title: "Giulia Faraon",
    link: "https://giuliafaraon.com/",
    tags: ["CMS", "Designer", "Nuxt", "Prismic", "Vercel"],
  },
  {
    title: "Edge",
    link: "https://www.edgemgmt.it/",
    tags: ["CMS", "Nuxt", "Prismic", "Vercel"],
  },
];

export const FreelanceWorks = () => {
  return (
    <div>
      <div>Some of my freelance works</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Client</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {works.map((work) => (
            <TableRow key={work.title}>
              <TableCell className="font-medium">{work.title}</TableCell>
              <TableCell>
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-orange-500"
                >
                  {work.link}
                </a>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {work.tags.map((tag) => (
                    <div
                      key={work.title + tag}
                      className="text-xs uppercase bg-foreground text-background py-0.5 px-1 rounded w-fit"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-5 text-sm text-orange-500">
        For more infos, visit my{" "}
        <a
          href="https://www.linkedin.com/in/matteo-breda-80484789/"
          target="_blank "
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};
