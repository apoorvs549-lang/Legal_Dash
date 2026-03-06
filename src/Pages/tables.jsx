import AuthorsTable from "@/components/tables/author-table";
import TablesHeader from "../components/table-header";
import React from 'react'
import ProjectsTable from "@/components/tables/project-table";

const Tables = () => {
  return (
    <div className="relative">
      <TablesHeader />
      <AuthorsTable />
      <ProjectsTable />
      {/* page content table */}
    </div>
  )
}

export default Tables