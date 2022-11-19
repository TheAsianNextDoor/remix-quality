import { Tabs } from '@mantine/core';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { FileInput } from '~/common/components';
import styles from '~/styles/inspection/inspection.css';
import { prisma } from '~/utils/prisma.server';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const items = [
  {
    id: 1,
    title: 'Metal meets requirements',
    description:
      'Nulla Lorem proident aliquip in consectetur officia labore eiusmod non officia excepteur fugiat amet aliqua.',
    parentTask: 'Wind Tower 5',
    links: [{ title: 'Metal Manual', link: 'link1' }],
    actions: ['observations', 'comments', 'attachments', 'photos'],
    status: 'Not Started',
    statusOptions: ['Completed', 'Pending', 'Not Started', 'Skipped'],
  },
  {
    id: 2,
    title: 'Wood meets requirements',
    description: 'Cupidatat proident cillum et anim eu fugiat excepteur anim duis laboris reprehenderit veniam quis.',
    parentTask: 'Wind Tower 5',
    links: [
      { title: 'Metal Manual', link: 'link2' },
      { title: 'Wood Manual', link: 'link3' },
    ],
    actions: ['observations', 'comments', 'attachments', 'photos'],
    status: 'Completed',
    statusOptions: ['Completed', 'Pending', 'Not Started', 'Skipped'],
  },
  {
    id: 3,
    title: 'Water meets requirements',
    description: 'Enim esse amet sunt irure.',
    parentTask: 'Wind Tower 5',
    links: [],
    actions: ['observations', 'comments', 'attachments', 'photos'],
    status: 'Pending',
    statusOptions: ['Completed', 'Pending', 'Not Started', 'Skipped'],
  },
];

export const loader = async () => {};

const InfoItem = ({ title, content }) => {
  return (
    <div>
      <div className="underline">{title}</div>
      <div>{content}</div>
    </div>
  );
};

const InfoSection = ({ inspection }) => {
  return (
    <div className="bg-cyan-100 border-r-black border-r-2 w-full p-8 flex flex-col gap-3">
      <div className="text-2xl">{inspection.title}</div>
      <InfoItem title="Parent Task" content={inspection.parentTask} />
      <InfoItem title="Description" content={inspection.description} />
      <InfoItem title="Status" content={inspection.status} />
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
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      {items.map((inspection) => (
        <div key={inspection.id} className="my-5 bg-gray-100">
          <div className="grid">
            <InfoSection inspection={inspection} />
            <ActionSection />
          </div>
        </div>
      ))}
    </>
  );
}
