import { GlobalObservableKey, useGlobalObservable } from "open-observable";
import React, { ReactNode, useCallback } from "react";
import { HideModal } from "../ModalContainer/components/modalTrigger";

type Modal = {
    content: ReactNode;
    id: string;
};

export const modalsArray = new GlobalObservableKey<any>('modals', []);

interface UseModalReturnType {
    addModal: (content: ReactNode, id: string) => void;
    removeModal: (id: string) => void;
}

export default function useModal(): UseModalReturnType {
    const modalValue = useGlobalObservable(modalsArray);

    const addModal = useCallback(
          (content: ReactNode, id: string) => {
                if (!modalValue) return;
                console.log(modalValue)
            modalValue.next((old: Modal[]) => [{ content, id }]);
        },
        [modalValue]
    );

    const removeModal = useCallback(
        (id: string) => {
            if (!modalValue) return;
            HideModal(id);
            modalValue.next((old: Modal[]) => old.filter(modal => modal.id !== id));
        },
        [modalValue]
    );

    return { addModal, removeModal };
}
