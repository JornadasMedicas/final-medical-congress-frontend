export interface PropsModal {
    isOpen: boolean;
    img?: string;
}

export interface PropsUIContext {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
    programTab: number;
    setProgramTab: React.Dispatch<React.SetStateAction<number>>;
    modalData: PropsModal;
    setModalData: React.Dispatch<React.SetStateAction<PropsModal>>;
    triggerRelocation: boolean;
    setTriggerRelocation: React.Dispatch<React.SetStateAction<boolean>>;
}