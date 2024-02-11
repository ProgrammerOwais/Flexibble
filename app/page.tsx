import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};
type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(endcursor)) as ProjectSearch;

  let projectToDisplay = data?.projectSearch?.edges || [];
  if (category) {
    projectToDisplay = projectToDisplay.filter(
      (project) => project.node.category == category
    );
  }

  const pagination = data?.projectSearch?.pageInfo;
  if (projectToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="text-center no-result-text">
          No projects found, go get create some projects first
        </p>
      </section>
    );
  }
  return (
    <div className="mx-auto p-4 md:max-w-[1250px]">
      {}
      <Categories />
      <section className="projects-grid">
        {projectToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            name={node?.createdBy?.name}
            image={node.image}
            title={node.title}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
      />
    </div>
  );
};

export default Home;
