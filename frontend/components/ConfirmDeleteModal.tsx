interface Kid {
  id: number;
  first_name: string;
  last_name: string;
}

interface ConfirmDeleteModalProps {
  kid: Kid;
  onConfirm: (id: number) => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({
  kid,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <>
      <div className="modal">
        <div className="modal-content-wrapper">
          <h3>
            Är du säker på att du vill ta bort {kid.first_name} {kid.last_name}?
          </h3>
          <div className="button-wrapper">
            <button className="confirm" onClick={() => onConfirm(kid.id)}>
              Bekräfta
            </button>
            <button className="cancel" onClick={onCancel}>
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

//När man klickar på papperskorgen(rad 116 i app.tsx) kommer denna modal upp med tre props, en för det barn man har klickat på och två funktioner, en som tar bort barnet och en som stänger modalen. Om jag klickar på bekräfta i modalen så körs funktionen på rad 79 i app.tsx. Modalen läses in på 249 i app.tsx, där jag också bestämmer propsen.

export default ConfirmDeleteModal;
