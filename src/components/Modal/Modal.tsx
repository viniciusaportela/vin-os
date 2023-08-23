import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends PropsWithChildren {}

export const Modal: React.FC<ModalProps> = ({ children }) =>
  createPortal(children, document.getElementById("modal-root") as HTMLElement);
