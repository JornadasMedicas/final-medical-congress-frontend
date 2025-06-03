export interface PropsModal {
    isOpen: boolean;
    img?: string;
}

export interface PropsUIContext {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
    modalData: PropsModal;
    setModalData: React.Dispatch<React.SetStateAction<PropsModal>>;
    dynamic: number;
    setDynamic: React.Dispatch<React.SetStateAction<number>>
}