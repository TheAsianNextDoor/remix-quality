import { FileInput as MantineFileInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useState } from 'react';

export const FileInput = () => {
  const [value, setValue] = useState<File[]>([]);

  return (
    <MantineFileInput
      icon={<IconUpload size={14} />}
      label="Attachments:"
      placeholder="Upload a file..."
      size="md"
      multiple
      value={value}
      onChange={setValue}
      miw="20rem"
    />
  );
};
