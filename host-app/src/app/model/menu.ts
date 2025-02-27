export interface Menu {
    name: string;
    label: string;
    icon: string;
    submenus: { label: string; link: string }[];
}
