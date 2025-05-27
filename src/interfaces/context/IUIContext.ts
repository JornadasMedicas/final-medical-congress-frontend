export interface PropsUIContext {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
    dynamic: number;
    setDynamic: React.Dispatch<React.SetStateAction<number>>
}