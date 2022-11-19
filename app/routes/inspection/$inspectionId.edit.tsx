import { Tabs } from '@mantine/core';
import { Prisma } from '@prisma/client';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { FileInput } from '~/common/components';
import styles from '~/styles/inspection/inspection.css';
import { prisma } from '~/utils/prisma.server';

import type { LoaderFunction } from '@remix-run/node';
import type { ReactNode } from 'react';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const taskWithLinksValidator = Prisma.validator<Prisma.TaskArgs>()({
  include: { Links: true },
});
type TaskWithLinks = Prisma.TaskGetPayload<typeof taskWithLinksValidator>;

type LoaderData = {
  tasks: TaskWithLinks[];
};
export const loader: LoaderFunction = async () => {
  const tasks = await prisma.task.findMany({
    include: { Links: true },
  });

  return json({ tasks });
};

const InfoItem = ({ title, content }: { title: string; content: string | ReactNode }) => {
  return (
    <div>
      <div className="underline">{title}</div>
      <div>{content}</div>
    </div>
  );
};

const InfoSection = ({ task }: { task: TaskWithLinks }) => {
  return (
    <div className="bg-cyan-100 border-r-black border-r-2 w-full p-8 flex flex-col gap-3">
      <div className="text-2xl">{task.title}</div>
      <InfoItem title="Description" content={task.description} />
      <InfoItem
        title="Linked Material"
        content={task?.Links?.map(({ info, link }, idx) => (
          <div key={`${info}-${idx}`}>
            <span>{info}</span>
            <span>{link}</span>
          </div>
        ))}
      />
      <InfoItem title="Status" content={task.status} />
    </div>
  );
};

enum ActionTypes {
  observations = 'observations',
  comments = 'comments',
  attachments = 'attachments',
  photos = 'photos',
}

const ActionSection = () => {
  return (
    <div className="flex flex-col gap-3 p-8">
      <div className="text-2xl">Actions</div>
      <div className="h-full w-full">
        <Tabs className="h-full" radius="md" defaultValue="attachments">
          <Tabs.List>
            <Tabs.Tab value={ActionTypes.observations}>{ActionTypes.observations}</Tabs.Tab>
            <Tabs.Tab value={ActionTypes.comments}>{ActionTypes.comments}</Tabs.Tab>
            <Tabs.Tab value={ActionTypes.attachments}>{ActionTypes.attachments}</Tabs.Tab>
            <Tabs.Tab value={ActionTypes.photos}>{ActionTypes.photos}</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={ActionTypes.observations} pt="xs">
            Observations tab content
          </Tabs.Panel>

          <Tabs.Panel value={ActionTypes.comments} pt="xs">
            Comments tab content
          </Tabs.Panel>

          <Tabs.Panel className="w-full h-full" value={ActionTypes.attachments} pt="xs">
            <div className="h-full w-full flex justify-center items-center">
              <FileInput />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value={ActionTypes.photos} pt="xs">
            Photos tab content
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default function InspectionEdit() {
  const { tasks } = useLoaderData() as unknown as LoaderData;

  console.log(tasks);

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="my-5 bg-gray-100">
          <div className="grid">
            <InfoSection task={task} />
            <ActionSection />
          </div>
        </div>
      ))}
    </>
  );
}
