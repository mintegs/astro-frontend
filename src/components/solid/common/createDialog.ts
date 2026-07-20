import { createSignal, onCleanup } from 'solid-js';
import {
  showDialog as showDialogUtil,
  hideDialog as hideDialogUtil,
  onDialogChange,
  type DialogConfig,
} from '../../../utils/dialog';

export function createDialog() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [config, setConfig] = createSignal<DialogConfig | null>(null);

  const dispose = onDialogChange((open, cfg) => {
    setIsOpen(open);
    if (cfg) setConfig(cfg);
  });
  onCleanup(dispose);

  return {
    isOpen,
    config,
    showDialog: (cfg: DialogConfig) => showDialogUtil(cfg),
    hideDialog: () => hideDialogUtil(),
  };
}
