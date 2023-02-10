import { Menubar } from 'primereact/menubar';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';

export default function PersonListMenu({ onEdit, onDelete }: PersonListMenuProps) {
    const items: MenuItem[] = [
        {
            icon: 'pi pi-fw pi-ellipsis-v',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    command: onEdit
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash',
                    command: onDelete
                }
            ]
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}


export interface PersonListMenuProps {
    onEdit: (event: MenuItemCommandEvent) => void;
    onDelete: (event: MenuItemCommandEvent) => void;
}