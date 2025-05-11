// This is a Server Component - no "use client" directive
import TaskEditor from "@/components/Tasks/TaskEditor";

// Server component that receives the params and passes the ID to client component
export default function TaskPage({ params }: { params: { id: string } }) {
  return <TaskEditor taskId={params.id} />;
}
