import { observer } from 'mobx-react-lite';
import {
  Timelapse1Icon,
  Timelapse2Icon,
  Timelapse3Icon,
  Timelapse4Icon,
  Timelapse5Icon,
} from '@/icons';

const icons = [Timelapse1Icon, Timelapse2Icon, Timelapse3Icon, Timelapse4Icon, Timelapse5Icon];

export const IconComponent = observer<{ type: number }>(({ type }) => {
  const Component = icons[type % 5];

  if (!Component) return null;
  return <Component style={{ fontSize: 19 }} />;
});
