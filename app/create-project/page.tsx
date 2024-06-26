import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
// A component used to create a new project
// testing
const CreateProject = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">Create New Project </h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
