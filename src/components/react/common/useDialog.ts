import { useCallback, useEffect, useState } from 'react';
import {
  showDialog as showDialogUtil,
  hideDialog as hideDialogUtil,
  onDialogChange,
  type DialogConfig,
} from '../../../utils/dialog';

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DialogConfig | null>(null);

  useEffect(() => {
    return onDialogChange((open, cfg) => {
      setIsOpen(open);
      if (cfg) setConfig(cfg);
    });
  }, []);

  const showDialog = useCallback((cfg: DialogConfig) => {
    showDialogUtil(cfg);
  }, []);

  const hideDialog = useCallback(() => {
    hideDialogUtil();
  }, []);

  return { isOpen, config, showDialog, hideDialog };
}
