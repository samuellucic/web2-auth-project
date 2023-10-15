import { useState } from 'react';

const useForceUpdate = (): [boolean, () => void] => {
  const [toggle, setToggle] = useState<boolean>(false);
  return [toggle, () => setToggle((toggle) => !toggle)];
};

export default useForceUpdate;
