import { SchemaScript } from '@operationnation/sanity-plugin-schema-markup';

type Schema = {
  [key: string]: string;
};

type Props = {
  schema: Schema[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const SchemaMarkup = ({ schema }: Props) => {
  return (
    <SchemaScript schema={schema} projectId={projectId as string} dataset={dataset as string} />
  );
};

export default SchemaMarkup;
