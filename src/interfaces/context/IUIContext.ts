export interface PropsModalImg {
    isOpen: boolean;
    img?: string;
}

export interface PropsModalAdmin extends PropsModalImg {
    title?: string;
    Component?: React.ComponentType<any> | null;
    Icon?: any;
    description?: string;
    width?: string;
    id?: number;
    deleteType?: string; 
}

export interface PropsUIContext {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
    programTab: number;
    setProgramTab: React.Dispatch<React.SetStateAction<number>>;
    modalProgramData: PropsModalImg;
    setModalProgramData: React.Dispatch<React.SetStateAction<PropsModalImg>>;
    modalAdminData: PropsModalAdmin;
    setModalAdminData: React.Dispatch<React.SetStateAction<PropsModalAdmin>>;
    modalConfirmDelete: PropsModalAdmin;
    setModalConfirmDelete: React.Dispatch<React.SetStateAction<PropsModalAdmin>>;
    triggerRelocation: boolean;
    setTriggerRelocation: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: boolean;
    setRefetch:  React.Dispatch<React.SetStateAction<boolean>>;
}