import Layout from "@/components/layout"
import datasets from "../data/dataset.json"
import DatasetTable from "@/components/dataset-table"

type Dataset = {
  title: string
  headers: string[]
  rows: string[][]
}

const Datasets = () => (
  <Layout>
    <h1 className="mb-8 w-full max-w-7xl text-5xl sm:text-8xl font-bold tracking-tighter leading-tight dark:text-gray-100 animate-fade_in_up_10">
      datasets.
    </h1>
    <div className="w-full mx-auto flex flex-col gap-8 px-2 sm:max-w-6xl">

      {(Object.entries(datasets) as [string, Dataset][]).map(([key, dataset]) => (
        <DatasetTable key={key} dataset={dataset} />
      ))}
    </div>
  </Layout>
)

export default Datasets