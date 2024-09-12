import * as bootstrap from 'bootstrap';

// dispara um modal para o id definido

export default function ModalTrigger(id: string | number, close?: boolean) {
      const element = document.getElementById(id.toString());
      if (!element) return;
      const myModal = new bootstrap.Modal(element, { keyboard: true });

      myModal.show();

      return;
}

export function HideModal(id: string | number) {
      const element = document.getElementById(id.toString());
      if (!element) return;
      const myModal = bootstrap.Modal.getInstance(element);
      if (!myModal) return;
      myModal.hide();
}
